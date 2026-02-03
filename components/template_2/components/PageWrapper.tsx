import { ThemeColors, Company, ContactInfo } from "@/app/types";
import Header from "./Header";
import Footer from "./Footer";
import Template2Layout from "../layout";
import "../styles.css";
// Animation components
import {
  LenisProvider,
  FooterParallax,
} from "../animations";

interface PageWrapperProps {
  children: React.ReactNode;
  company: Company;
  contactInfo: ContactInfo;
  colors: ThemeColors;
  companyId: string;
}

export default function PageWrapper({
  children,
  company,
  contactInfo,
  colors,
  companyId,
}: PageWrapperProps) {
  return (
    <Template2Layout>
      {/* Animation Providers */}
      <LenisProvider />
      <FooterParallax />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      <div
        className="min-h-screen overflow-x-hidden template2-page wrapper"
        style={{
          fontFamily: "var(--font-manrope), sans-serif",
        }}
      >
        {/* Navigation */}
        <Header
          companyName={company.company}
          colors={colors}
          companyId={companyId}
        />

        {/* Main Content */}
        <main style={{ backgroundColor: colors.backgroundColor }}>
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer
        company={company}
        contactInfo={contactInfo}
        colors={colors}
        companyId={companyId}
      />
    </Template2Layout>
  );
}
