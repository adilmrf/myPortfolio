"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CloseIcon, MenuIcon } from "./icons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export default function HeaderNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isContactInView, setIsContactInView] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && !isContactInView;
    if (href === "/#contact") return pathname === "/" && isContactInView;
    return pathname.startsWith(href);
  };

  // No pills. The active state is a 1px accent underline rather than a filled
  // capsule, which is what keeps the header reading as an instrument bar.
  const linkClass = (href: string) =>
    `label border-b px-3 py-2 transition-colors duration-100 ${
      isActive(href)
        ? "border-accent text-accent"
        : "border-transparent hover:text-ink"
    }`;

  const handleContactClick = (e: React.MouseEvent) => {
    // Already on home: scroll rather than navigate, and move focus to the
    // heading so keyboard and screen-reader users land in the right place.
    if (pathname !== "/") return;
    e.preventDefault();
    const el = document.getElementById("contact");
    if (!el) {
      router.push("/#contact");
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    const heading = el.querySelector("h2");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  };

  const closeMenu = React.useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Highlight the Contact link while the footer contact block is on screen.
  React.useEffect(() => {
    if (pathname !== "/") {
      setIsContactInView(false);
      return;
    }
    const titleEl = document.querySelector("#contact h2");
    if (!titleEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsContactInView(entry.isIntersecting),
      { threshold: 1.0 },
    );
    observer.observe(titleEl);
    return () => observer.disconnect();
  }, [pathname]);

  // Close on outside pointer press or Escape, and keep Tab inside the menu.
  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (menuRef.current && target && !menuRef.current.contains(target)) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;

      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeMenu]);

  return (
    <div className="relative" ref={menuRef}>
      <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={linkClass(href)}
            aria-current={isActive(href) ? "page" : undefined}
            onClick={href === "/#contact" ? handleContactClick : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="md:hidden">
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((s) => !s)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] text-ink-muted transition-colors duration-100 hover:bg-surface hover:text-ink"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-[2px] border border-line bg-surface-raised shadow-xl shadow-black/40"
          >
            <ul className="flex flex-col py-1">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={`label block px-4 py-3 transition-colors duration-100 hover:bg-surface ${
                      isActive(href) ? "text-accent" : ""
                    }`}
                    onClick={(e) => {
                      if (href === "/#contact") handleContactClick(e);
                      closeMenu();
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
