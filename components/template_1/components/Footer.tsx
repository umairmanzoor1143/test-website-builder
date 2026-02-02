import { Company, ThemeColors } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import { getContrastColor } from "../utils/theme";

interface FooterProps {
  company: Company;
  colors: ThemeColors;
  companyId: string;
}

export default function Footer({ company, colors, companyId }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Get text colors based on theme
  const textColor = colors.textColor || getContrastColor(colors.backgroundColor);

  // Get company initials for logo
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const address = company.address || company.adresse;

  return (
    <footer
      className="pt-24 pb-12 border-t"
      style={{ 
        backgroundColor: colors.backgroundColor,
        borderColor: `${textColor}10`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              {company.image ? (
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src={company.image}
                    alt={company.company}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <span 
                  className="font-serif text-2xl tracking-tighter"
                  style={{ color: textColor }}
                >
                  {getInitials(company.company)}
                  <span style={{ color: colors.accentColor }}>.</span>
                </span>
              )}
              <span
                className="font-medium text-lg"
                style={{ color: textColor }}
              >
                {company.company}
              </span>
            </div>
            <p 
              className="text-sm leading-relaxed opacity-60"
              style={{ color: textColor }}
            >
              {company.categories?.[0]
                ? `Providing exceptional ${company.categories[0].toLowerCase()} services in ${address?.city || "your area"}.`
                : `Excellence and quality in everything we do.`}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 
              className="text-xs uppercase tracking-widest mb-6"
              style={{ color: textColor }}
            >
              Kontakt
            </h4>
            <ul 
              className="space-y-4 text-sm opacity-60"
              style={{ color: textColor }}
            >
              {address && (
                <li>
                  {address.street} {address.streetNumber}
                </li>
              )}
              {address && (
                <li>
                  {address.zip} {address.city}
                </li>
              )}
              {company.state && <li>{company.state}</li>}
            </ul>
          </div>

          {/* Sitemap */}
          <div>
            <h4 
              className="text-xs uppercase tracking-widest mb-6"
              style={{ color: textColor }}
            >
              Seitenverzeichnis
            </h4>
            <ul 
              className="space-y-4 text-sm opacity-60"
              style={{ color: textColor }}
            >
              <li>
                <Link
                  href={`/about`}
                  className="hover:opacity-100 transition-opacity"
                  style={{ color: textColor }}
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href={`/team`}
                  className="hover:opacity-100 transition-opacity"
                  style={{ color: textColor }}
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href={`/contact`}
                  className="hover:opacity-100 transition-opacity"
                  style={{ color: textColor }}
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 
              className="text-xs uppercase tracking-widest mb-6"
              style={{ color: textColor }}
            >
              Folgen Sie uns
            </h4>
            {/* <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:opacity-80"
                style={{ 
                  borderColor: `${textColor}20`,
                  color: `${textColor}99`,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:opacity-80"
                style={{ 
                  borderColor: `${textColor}20`,
                  color: `${textColor}99`,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:opacity-80"
                style={{ 
                  borderColor: `${textColor}20`,
                  color: `${textColor}99`,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t text-[10px] uppercase tracking-wider opacity-50"
          style={{ 
            borderColor: `${textColor}10`,
            color: textColor,
          }}
        >
          <p>
            © {currentYear} {company.company}. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* <Link href="#" className="hover:opacity-80" style={{ color: textColor }}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:opacity-80" style={{ color: textColor }}>
              Terms of Service
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
