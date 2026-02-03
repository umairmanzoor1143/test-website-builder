"use client";

import { Company, ThemeColors } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getContrastColor } from "../utils/theme";
import MobileMenuToggle from "./MobileMenuToggle";

interface HeaderProps {
  company: Company;
  colors: ThemeColors;
  companyId: string;
}

export default function Header({ company, colors, companyId }: HeaderProps) {
  const pathname = usePathname();
  const hasCompanyId = pathname.startsWith(`/${companyId}`);
  const basePath = hasCompanyId ? `/${companyId}` : "";

  const navItems = [
    { label: "Über uns", href: `${basePath}/about` },
    { label: "Team", href: `${basePath}/team` },
    { label: "Kontakt", href: `${basePath}/contact` },
  ];
  // Get text colors based on theme
  const textColor =
    colors.textColor || getContrastColor(colors.backgroundColor);

  // Check if a nav link is active
  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  // Get company initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 py-4 border-b"
      style={{
        backgroundColor: `${colors.backgroundColor}cc`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderColor: `${textColor}10`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href={`${basePath || "/"}`} className="group relative z-50 flex items-center gap-3">
          {company.image ? (
            <div className="relative w-10 h-10 rounded-lg overflow-hidden">
              <Image
                src={company.image}
                alt={company.company}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <span
              className="font-serif text-2xl tracking-tighter font-medium"
              style={{ color: textColor }}
            >
              {getInitials(company.company)}
              <span style={{ color: colors.accentColor }}>.</span>
            </span>
          )}
          <span
            className="font-medium text-lg hidden sm:block"
            style={{ color: textColor }}
          >
            {company.company}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide transition-colors duration-300"
              style={{
                color: isActive(item.href) ? colors.accentColor : textColor,
                opacity: isActive(item.href) ? 1 : 0.7,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle (Client Component) */}
        <MobileMenuToggle
          textColor={textColor}
          backgroundColor={colors.backgroundColor}
          accentColor={colors.accentColor}
          companyId={companyId}
        />
      </div>
    </nav>
  );
}
