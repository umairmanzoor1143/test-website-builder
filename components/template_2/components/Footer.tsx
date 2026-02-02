import { Company, ContactInfo, ThemeColors } from "@/app/types";
import Link from "next/link";
import { getContrastColor } from "../utils/theme";

interface FooterProps {
  company: Company;
  contactInfo: ContactInfo;
  colors: ThemeColors;
  companyId: string;
}

export default function Footer({ company, contactInfo, colors, companyId }: FooterProps) {
  const address = company.address || company.adresse;
  const textColor = getContrastColor(colors.accentColor);

  return (
    <footer className="footer-sticky py-20" style={{ backgroundColor: colors.accentColor }}>
      <div className="footer-content relative z-10 text-center">
        <div className="footer-animate text-xs uppercase tracking-[0.3em] mb-4 opacity-60" style={{ color: textColor }}>
          Besuche uns
        </div>

        <Link
          href={`/contact`}
          className="footer-animate display text-[8vw] md:text-[6vw] leading-none hover:opacity-70 transition-opacity inline-block"
          style={{ color: textColor }}
        >
          KONTAKT
        </Link>

        <div
          className="footer-animate flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-12 text-sm uppercase tracking-widest opacity-70"
          style={{ color: textColor }}
        >
          {address && (
            <>
              <span>{address.street} {address.streetNumber}</span>
              <span>{address.zip} {address.city}</span>
            </>
          )}
          {contactInfo.telefon && <span>{contactInfo.telefon}</span>}
        </div>

        <div className="footer-animate mt-20 text-[10px] opacity-50" style={{ color: textColor }}>
          © {new Date().getFullYear()} {company.company.toUpperCase()}
        </div>
      </div>
    </footer>
  );
}
