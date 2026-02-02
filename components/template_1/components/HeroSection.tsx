import { Company, Intro, ThemeColors } from "@/app/types";
import Link from "next/link";
import { getContrastColor } from "../utils/theme";

interface HeroSectionProps {
  company: Company;
  colors: ThemeColors;
  intro: Intro;
}

export default function HeroSection({ company, colors, intro }: HeroSectionProps) {
  // Get welcome text (default to EN, fallback to DE)
  const welcomeText = intro.welcomeTextEN || intro.welcomeTextDE || "";

  // Check if we have a hero image
  const hasHeroImage =
    intro.imageDesktopMimeType ||
    intro.imageDesktopPreviewMimeType ||
    intro.imageMobileMimeType ||
    intro.imageMobilePreviewMimeType 

  // Get text color based on background
  const textColor = colors.textColor || getContrastColor(colors.backgroundColor);
  const secondaryTextColor = colors.secondaryColor || `${textColor}99`;

  return (
    <header
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      {/* Background - Image or Gradient */}
      {hasHeroImage && company.image ? (
        <>
          <div
            className="absolute inset-0 z-0 bg-fixed bg-center bg-cover bg-no-repeat opacity-60 scale-105"
            style={{
              backgroundImage: `url('${company.image}')`,
            }}
          />
          {/* Gradient Overlay for image */}
          <div
            className="z-10 absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${colors.backgroundColor}66 0%, ${colors.backgroundColor}99 50%, ${colors.backgroundColor} 100%)`,
            }}
          />
        </>
      ) : (
        /* Gradient Background when no image */
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, ${colors.primaryColor}40 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 100% 50%, ${colors.accentColor}30 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 0% 50%, ${colors.secondaryColor}30 0%, transparent 50%),
              radial-gradient(ellipse 80% 50% at 50% 120%, ${colors.accentColor}20 0%, transparent 50%),
              linear-gradient(180deg, ${colors.backgroundColor} 0%, ${colors.primaryColor}15 50%, ${colors.backgroundColor} 100%)
            `,
          }}
        />
      )}

      {/* Decorative Elements */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: colors.accentColor }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: colors.primaryColor }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16 md:mt-0">
        {/* Tagline */}
        <p
          className="uppercase tracking-[0.2em] text-xs md:text-sm mb-6 font-medium"
          style={{ color: colors.accentColor }}
        >
          {company.categories?.[0] || "Excellence in every detail"}
        </p>

        {/* Primary Heading */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight mb-8 drop-shadow-lg"
          style={{ color: textColor }}
        >
          {company.company}
        </h1>

        {/* Welcome Text */}
        {welcomeText && (
          <p
            className="font-light text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-80"
            style={{ color: secondaryTextColor }}
          >
            {welcomeText}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
          <Link
            href="#about"
            className="group flex items-center gap-3 pb-1 hover:opacity-80 transition-colors"
            style={{ 
              borderBottom: `1px solid ${colors.accentColor}`,
              color: textColor 
            }}
          >
            <span className="text-sm tracking-widest uppercase">Mehr entdecken</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <span 
          className="text-[10px] uppercase tracking-widest opacity-70"
          style={{ color: textColor }}
        >
          Scrollen
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={textColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </header>
  );
}
