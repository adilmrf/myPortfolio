"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function HeaderNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

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

  return (
    <div className="relative">
      <nav className="hidden md:flex gap-4 text-sm">
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/experience">Experience</Link>
        <Link href="/about">About</Link>
        <Link href="/#contact" onClick={handleContactClick}>Contact</Link>
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
              <li className="px-4 py-2 hover:bg-zinc-50"><Link href="/">Home</Link></li>
              <li className="px-4 py-2 hover:bg-zinc-50"><Link href="/projects">Projects</Link></li>
              <li className="px-4 py-2 hover:bg-zinc-50"><Link href="/experience">Experience</Link></li>
              <li className="px-4 py-2 hover:bg-zinc-50"><Link href="/about">About</Link></li>
              <li className="px-4 py-2 hover:bg-zinc-50"><Link href="/#contact" onClick={handleContactClick}>Contact</Link></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
