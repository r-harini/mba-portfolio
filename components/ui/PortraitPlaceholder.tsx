// ════════════════════════════════════════════════════════════
// PORTRAIT PLACEHOLDER
//
// When you have Harini's photo ready, delete this entire file
// and in Hero.tsx replace <PortraitPlaceholder /> with:
//
//   import Image from "next/image";
//
//   <Image
//     src="https://lh3.googleusercontent.com/d/{YOUR_DRIVE_FILE_ID}"
//     fill
//     alt="Harini Ramesh Chandran"
//     className="object-cover object-top"
//     priority
//   />
//
// The image will fill the entire black panel edge-to-edge.
// Use object-top to keep her face visible at the top of frame.
// ════════════════════════════════════════════════════════════

export function PortraitPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      {/* Silhouette shape */}
      <div
        className="rounded-[16px] opacity-[0.08]"
        style={{
          width: "160px",
          height: "260px",
          background: "#F8F7F4",
        }}
      />
      <p
        className="text-[10px] tracking-[0.14em] uppercase font-medium"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        Add portrait photo
      </p>
    </div>
  );
}
