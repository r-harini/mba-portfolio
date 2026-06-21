"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home",          href: "#home"       },
  { label: "Selected Work", href: "work"       },
  { label: "Experience",    href: "#experience" },
  { label: "About",         href: "#about"      },
  { label: "Beyond Work",   href: "#beyond"     },
  { label: "Contact",       href: "#contact"    },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = NAV_ITEMS.map((i) => i.href.slice(1));
      let current = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-8 md:px-12 lg:px-16 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(10, 10, 10, 0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(248,247,244,0.06)" : "none",
      }}
    >
      {/* Logo */}
      <a
        href="#home"
        className="font-sans font-extrabold text-[17px] tracking-[-0.01em] uppercase transition-colors duration-200"
        style={{ color: "var(--ink)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--green-light)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
      >
        HRC
      </a>

      {/* Nav links — desktop */}
      <nav className="hidden md:flex items-center gap-9" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const id       = item.href.slice(1);
          const isActive = active === id;
          return (
            <a
              key={item.href}
              href={item.href}
              className="relative text-[30px] font-extrabold tracking-[0.01em] transition-colors duration-200"
              style={{ color: isActive ? "var(--ink)" : "var(--ink-3)" }}
              onMouseEnter={(e) =>
                !isActive && (e.currentTarget.style.color = "var(--ink-2)")
              }
              onMouseLeave={(e) =>
                !isActive && (e.currentTarget.style.color = "var(--ink-3)")
              }
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

      {/* Mobile — Contact pill */}
      <a
        href="#contact"
        className="md:hidden text-[13px] font-medium px-4 py-2 rounded-full border transition-all duration-200"
        style={{
          color: "var(--green-light)",
          borderColor: "rgba(0,124,0,0.4)",
        }}
      >
        Contact
      </a>
    </motion.header>
  );
}
