"use client";

import { ThemeColors } from "@/app/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getTextColor } from "../utils/theme";

interface HeaderProps {
  companyName: string;
  colors: ThemeColors;
  companyId: string;
}

export default function Header({ companyName, colors, companyId }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const textColor = getTextColor(colors);

  // ✅ Detect if current route is company-scoped
  const hasCompanyId = !!companyId && pathname.startsWith(`/template_2/${companyId}`);
  const basePath = hasCompanyId ? `/template_2/${companyId}` : "";

  // ✅ Use basePath for nav items
  const navItems = [
    { label: "Über uns", href: `${basePath}/about` },
    { label: "Team", href: `${basePath}/team` },
    { label: "Kontakt", href: `${basePath}/contact` },
  ];

  // ✅ Logo should go to company home if company route, else root
  const homeHref = basePath || "/";

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className="fixed top-0 w-full px-6 md:px-8 py-6 flex justify-between items-center z-50 mix-blend-difference text-white">
        <Link
          href={homeHref}
          className="display text-lg md:text-xl tracking-tighter font-semibold hover:opacity-80 transition-opacity"
        >
          {companyName.toUpperCase()}
        </Link>

        <div className="hidden md:flex gap-10 text-xs uppercase tracking-widest">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-gray-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-xs uppercase tracking-widest"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "SCHLIESSEN" : "MENU"}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ backgroundColor: colors.backgroundColor }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="display text-2xl uppercase tracking-widest transition-colors hover:opacity-70"
              style={{
                color: isActive(item.href) ? colors.accentColor : textColor,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
