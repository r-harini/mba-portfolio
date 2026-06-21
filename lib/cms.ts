const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID ?? "";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// gviz returns dates as "Date(2026,5,1)" — month is 0-indexed
function parseCellValue(raw: unknown): string {
  if (raw == null) return "";
  const str = String(raw).trim();
  const dateMatch = str.match(/^Date\((\d+),(\d+),(\d+)\)$/);
  if (dateMatch) {
    const year = dateMatch[1];
    const month = parseInt(dateMatch[2], 10); // 0-indexed
    return `${MONTHS[month]} ${year}`;
  }
  return str;
}

export async function getSheet<T = Record<string, string>>(
  tabName: string
): Promise<T[]> {
  if (!SHEET_ID) {
    console.warn("CMS: NEXT_PUBLIC_SHEET_ID is not set.");
    return [];
  }

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}`;
  console.log(`CMS: Fetching "${tabName}"...`);

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const text = await res.text();
    const json = JSON.parse(text.replace(/^[^{]*({.*})[^}]*$/, "$1"));

    const { cols, rows } = json.table;

    const labelsEmpty = cols.every((c: { label: string }) => !c.label.trim());

    let headers: string[];
    let dataRows: typeof rows;

    if (labelsEmpty) {
      const firstRow = rows[0];
      headers = firstRow.c.map((cell: { v: unknown } | null) =>
        parseCellValue(cell?.v)
      );
      dataRows = rows.slice(1);
    } else {
      headers = cols.map((c: { label: string }) => c.label.trim());
      dataRows = rows;
    }

    const result: T[] = dataRows
      .map((row: { c: Array<{ v: unknown } | null> }) => {
        const obj: Record<string, string> = {};
        row.c.forEach((cell, i) => {
          if (headers[i]) obj[headers[i]] = parseCellValue(cell?.v);
        });
        return obj as T;
      })
      .filter((row: Record<string, string>) =>
        Object.values(row).some((v) => v !== "")
      );

    // console.log(`CMS: Got ${result.length} rows from "${tabName}"`);

    return result;
  } catch (err) {
    console.error(`CMS: Failed to fetch "${tabName}":`, err);
    return [];
  }
}

export async function getKeyValue(tabName: string): Promise<Record<string, string>> {
  const rows = await getSheet<{ key: string; value: string }>(tabName);
  return Object.fromEntries(
    rows.filter((r) => r.key).map((r) => [r.key.trim(), (r.value ?? "").trim()])
  );
}

export type SiteConfig = Record<string, string>;
export async function getSiteConfig(): Promise<SiteConfig> {
  return getKeyValue("SITE_CONFIG");
}

export type ImpactMetric = { order: string; value: string; label: string; context: string };
export async function getImpactMetrics(): Promise<ImpactMetric[]> {
  const rows = await getSheet<ImpactMetric>("IMPACT_METRICS");
  return rows.sort((a, b) => Number(a.order) - Number(b.order));
}

export type Project = {
  id: string; title: string; subtitle: string; category: string;
  project_type: string;
  tags: string; doc_id: string; cover_drive_id: string;
  featured: string; status: string; order: string; impact_metric: string;
};
export async function getProjects(featuredOnly = false): Promise<Project[]> {
  const rows = await getSheet<Project>("SELECTED_WORK");
  const live = rows.filter((r) => r.status !== "draft");
  const sorted = live.sort((a, b) => Number(a.order) - Number(b.order));
  return featuredOnly ? sorted.filter((r) => r.featured?.toLowerCase() === "true") : sorted;
}

export type ExperienceRole = {
  id: string; company: string; role_title: string; type: string;
  start_date: string; end_date: string; location: string; logo_drive_id: string;
  headline: string; narrative: string; highlights: string; metrics: string; order: string;
  concentrations: string; honors: string; involvement: string;
};
export async function getExperience(): Promise<ExperienceRole[]> {
  const rows = await getSheet<ExperienceRole>("EXPERIENCE");
  return rows.sort((a, b) => Number(a.order) - Number(b.order));
}

export type AboutSection = { id: string; label: string; content: string; cover_id: string; order: string };
export async function getAboutSections(): Promise<AboutSection[]> {
  const rows = await getSheet<AboutSection>("ABOUT");
  return rows.sort((a, b) => Number(a.order) - Number(b.order));
}

export type BeyondPhoto = {
  id: string; title: string; caption: string; story: string;
  drive_image_id: string; aspect: string; order: string;
};
export async function getBeyondPhotos(): Promise<BeyondPhoto[]> {
  const rows = await getSheet<BeyondPhoto>("BEYOND_WORK");
  return rows.sort((a, b) => Number(a.order) - Number(b.order));
}

export function driveImage(fileId: string, width = 800): string {
  if (!fileId) return "";
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`;
}

export function driveFile(fileId: string): string {
  if (!fileId) return "";
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}