"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { withBasePathAndSlash } from "../lib/assetPath";

export default function HeaderNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isContactInView, setIsContactInView] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && !isContactInView;
    if (href === "/projects") return pathname.startsWith("/projects");
    if (href === "/experience") return pathname.startsWith("/experience");
    if (href === "/about") return pathname.startsWith("/about");
    if (href === "/#contact") return pathname === "/" && isContactInView;
    return false;
  };

  const linkClass = (href: string) =>
    `rounded-full transition-colors ${
      isActive(href)
        ? "bg-zinc-900 text-white px-2 py-0.5 -mx-2 -my-0.5"
        : "text-zinc-700 hover:text-zinc-900"
    }`;

  const handleContactClick = (e: React.MouseEvent) => {
    // If already on home, smooth-scroll to the contact section
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else router.push("/#contact");
    } else {
      // navigate to home with hash
      // let the Link or browser handle the navigation
    }
  };

  const handleNavSelect = () => setOpen(false);

  React.useEffect(() => {
    if (pathname !== "/") {
      setIsContactInView(false);
      return;
    }
    const titleEl = document.querySelector("#contact h3");
    if (!titleEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsContactInView(entry.isIntersecting),
      { threshold: 1.0 }
    );
    observer.observe(titleEl);
    return () => observer.disconnect();
  }, [pathname]);

  React.useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (menuRef.current && target && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <nav className="hidden md:flex gap-4 text-sm">
        <Link href={withBasePathAndSlash("/")} className={linkClass("/")}>Home</Link>
        <Link href={withBasePathAndSlash("/experience")} className={linkClass("/experience")}>Experience</Link>
        <Link href={withBasePathAndSlash("/projects")} className={linkClass("/projects")}>Projects</Link>
        <Link href={withBasePathAndSlash("/about")} className={linkClass("/about")}>About</Link>
        <Link href={withBasePathAndSlash("/#contact")} className={linkClass("/#contact")} onClick={handleContactClick}>Contact</Link>
      </nav>

      <div className="md:hidden">
        <button
          aria-expanded={open}
          aria-label="Open menu"
          onClick={() => setOpen((s) => !s)}
          className="inline-flex items-center justify-center px-3 py-1 rounded-md border bg-white/90 text-sm"
        >
          ☰
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md border shadow-lg z-50">
            <ul className="flex flex-col">
              <li className="px-4 py-2 hover:bg-zinc-50"><Link href={withBasePathAndSlash("/")} onClick={handleNavSelect}>Home</Link></li>
              <li className="px-4 py-2 hover:bg-zinc-50"><Link href={withBasePathAndSlash("/experience")} onClick={handleNavSelect}>Experience</Link></li>
              <li className="px-4 py-2 hover:bg-zinc-50"><Link href={withBasePathAndSlash("/projects")} onClick={handleNavSelect}>Projects</Link></li>
              <li className="px-4 py-2 hover:bg-zinc-50"><Link href={withBasePathAndSlash("/about")} onClick={handleNavSelect}>About</Link></li>
              <li className="px-4 py-2 hover:bg-zinc-50"><Link href={withBasePathAndSlash("/#contact")} onClick={(e) => { handleContactClick(e); handleNavSelect(); }}>Contact</Link></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
