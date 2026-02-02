import { ThemeColors, Company, ContactInfo } from "@/app/types";
import Header from "./Header";
import Footer from "./Footer";

// Animation components
import {
  LenisProvider,
  HeroAnimations,
  SplitTextAnimations,
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
    <>
      {/* Animation Providers */}
      <LenisProvider />
      <HeroAnimations />
      <SplitTextAnimations />
      <FooterParallax />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      <div
        className="min-h-screen overflow-x-hidden wrapper"
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
    </>
  );
}
