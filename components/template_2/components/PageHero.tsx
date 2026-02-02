import { ThemeColors } from "@/app/types";
import { getContrastColor } from "../utils/theme";

interface PageHeroProps {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  colors: ThemeColors;
}

export default function PageHero({
  subtitle,
  titleLine1,
  titleLine2,
  colors,
}: PageHeroProps) {
  const textColor = colors.textColor || getContrastColor(colors.backgroundColor);

  return (
    <section
      className="min-h-[50vh] flex items-center justify-center pt-28 pb-16"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <div className="text-center px-6">
        <div
          className="text-xs uppercase tracking-widest mb-4 opacity-50 hero-fade"
          style={{ color: textColor }}
        >
          {subtitle}
        </div>
        <h1
          className="display text-4xl md:text-6xl lg:text-7xl uppercase leading-none hero-text"
          style={{ color: textColor }}
        >
          {titleLine1}
          <br />
          <span style={{ color: colors.accentColor }}>{titleLine2}</span>
        </h1>
      </div>
    </section>
  );
}
