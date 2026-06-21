"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Mail, Github, ScrollText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const NAV_ITEMS = [
  // { label: "Selected Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Beyond Work", href: "/#beyond" },
  { label: "Contact", href: "/#contact" },
];

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/harini-ramesh/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:harini.ramesh17@gmail.com", label: "Email" },
  { icon: Github, href: "https://github.com/harini", label: "GitHub" },
  {
    icon: ScrollText,
    href: "https://drive.google.com/file/d/1gpAv84E-Tv7cdJeehixNIGUW6rCD7gtS/view?usp=drive_link",
    label: "Resume",
  },
];

interface NavbarProps {
  variant?: "home" | "page";
}

export function Navbar({ variant = "page" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [iconsVisible, setIconsVisible] = useState(variant === "page");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      if (variant === "home") {
        setIconsVisible(window.scrollY > window.innerHeight * 0.8);

        const ids = NAV_ITEMS.map((i) => i.href.replace("/#", ""));
        let current = "";
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && window.scrollY >= el.offsetTop - 120) current = id;
        }
        setActive(current);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const resolvedItems = NAV_ITEMS.map((item) => ({
    ...item,
    href: variant === "home" ? item.href.replace("/", "") : item.href,
  }));

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center px-8 md:px-14 lg:px-16 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.90)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(248,247,244,0.06)" : "none",
      }}
    >
      <a
        href={variant === "home" ? "#home" : "/"}
        className="font-sans font-bold text-[22px] tracking-[-0.01em] uppercase transition-colors duration-200 mr-10 flex-shrink-0"
        style={{ color: "#F8F7F4" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--green-light)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#F8F7F4")}
      >
        HRC
      </a>

      <nav className="hidden md:flex items-center gap-8 flex-1" aria-label="Main navigation">
        {resolvedItems.map((item) => {
          const id = item.href.replace("/#", "").replace("#", "");
          const isActive = active === id;
          return (
            <a
              key={item.href}
              href={item.href}
              className="relative text-[20px] font-medium tracking-[0.01em] transition-colors duration-200 whitespace-nowrap"
              style={{ color: isActive ? "#F8F7F4" : "#5A5955" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F8F7F4")}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isActive ? "#F8F7F4" : "#5A5955";
              }}
            >
              {item.label}
              {isActive && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-[3px] left-0 right-0 h-px"
                  style={{ background: "var(--green)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </nav>

      <AnimatePresence>
        {iconsVisible && (
          <motion.div
            key="social-icons"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden md:flex items-center gap-10 flex-shrink-0 ml-8"
          >
            <div className="w-px h-4" style={{ background: "rgba(248,247,244,0.12)" }} />

            {SOCIAL_LINKS.map((social) => (
              <NavSocialIcon
                key={social.label}
                icon={social.icon}
                href={social.href}
                label={social.label}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={variant === "home" ? "#contact" : "/#contact"}
        className="md:hidden ml-auto text-[13px] font-medium px-4 py-2 rounded-full transition-all duration-200"
        style={{
          color: "var(--green-light)",
          border: "1px solid rgba(0,124,0,0.4)",
        }}
      >
        Contact
      </a>
    </motion.header>
  );
}

interface NavSocialIconProps {
  icon: LucideIcon;
  href: string;
  label: string;
}

function NavSocialIcon({ icon: Icon, href, label }: NavSocialIconProps) {
  const [hovered, setHovered] = useState(false);
  const isExternal = href.startsWith("http");

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        aria-label={label}
        className="block transition-colors duration-200"
        style={{ color: hovered ? "var(--green-light)" : "#5A5955" }}
      >
        <Icon size={30} strokeWidth={1.5} />
      </a>

      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 whitespace-nowrap pointer-events-none"
            style={{
              top: "calc(100% + 13px)",
              transform: "translateX(-50%)",
              background: "#111111",
              border: "1px solid rgba(248,247,244,0.08)",
              color: "#F8F7F4",
              fontSize: "15px",
              fontWeight: 500,
              padding: "4px 9px",
              borderRadius: "6px",
              zIndex: 60,
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
