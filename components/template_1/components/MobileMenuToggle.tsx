"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface MobileMenuToggleProps {
  textColor: string;
  backgroundColor: string;
  accentColor: string;
  companyId: string;
}

export default function MobileMenuToggle({
  textColor,
  backgroundColor,
  accentColor,
  companyId,
}: MobileMenuToggleProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const hasCompanyId = !!companyId && pathname.startsWith(`/${companyId}`);
  const basePath = hasCompanyId ? `/${companyId}` : "";

  const navItems = [
    { label: "Startseite", href: `${basePath || "/"}` },
    { label: "Über uns", href: `${basePath}/about` },
    { label: "Team", href: `${basePath}/team` },
    { label: "Kontakt", href: `${basePath}/contact` },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden relative z-50"
        style={{ color: textColor }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Menü umschalten"
      >
        {isMobileMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="5" x2="20" y2="5"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="19" x2="20" y2="19"></line>
          </svg>
        )}
      </Button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full py-6 px-6"
          style={{
            backgroundColor: `${backgroundColor}f5`,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm tracking-widest uppercase transition-colors duration-300 opacity-70 hover:opacity-100"
                style={{ color: textColor }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
