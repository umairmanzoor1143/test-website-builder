import { Company, ThemeColors, Intro } from "@/app/types";
import Image from "next/image";
import { getTextColor } from "../utils/theme";

interface HeroSectionProps {
  company: Company;
  colors: ThemeColors;
  intro: Intro;
}

export default function HeroSection({ company, colors, intro }: HeroSectionProps) {
  const welcomeText = intro.welcomeTextDE || intro.welcomeTextEN || "";
  const hasHeroImage =
  intro.imageDesktop || 
  intro.imageDesktopPreview ||
    intro.imageDesktopPreview ||
    intro.imageMobilePreview;
  const nameParts = company.company.split(" ");
  const firstPart = nameParts.slice(0, Math.ceil(nameParts.length / 2)).join(" ");
  const secondPart = nameParts.slice(Math.ceil(nameParts.length / 2)).join(" ");
  return (
    <section
      className="h-screen relative flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      {!!hasHeroImage && (
        <img
          src={hasHeroImage}
          alt={hasHeroImage}
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
      )}

      {!hasHeroImage && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${colors.primaryColor}40 0%, ${colors.backgroundColor} 50%, ${colors.accentColor}30 100%)`,
          }}
        />
      )}

      <div className="px-6 md:px-16 lg:px-24 relative z-10 text-center max-w-[95vw] text-white mix-blend-difference">
        <h1
          className="display text-[12vw] leading-none hero-text overflow-hidden"
        >
          <span className="block">{firstPart.toUpperCase()}</span>
        </h1>
        {secondPart && (
          <h1
            className="display text-[12vw] leading-none hero-text overflow-hidden"
          >
            <span className="block">{secondPart.toUpperCase()}</span>
          </h1>
        )}

        {(welcomeText || company.categories?.[0]) && (
          <p
            className="mt-8 text-sm uppercase tracking-[0.5em] hero-fade"
          >
            {welcomeText || company.categories?.[0]}
          </p>
        )}
      </div>
    </section>
  );
}
