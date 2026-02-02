import { About, Company, ThemeColors } from "@/app/types";
import Image from "next/image";
import { getContrastColor } from "../utils/theme";

interface AboutSectionProps {
  about: About;
  colors: ThemeColors;
  company: Company;
}

export default function AboutSection({ about, colors, company }: AboutSectionProps) {
  // Get text colors based on theme
  const textColor = colors.textColor || getContrastColor(colors.backgroundColor);

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 relative overflow-hidden"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Centered Header */}
        <div className="text-center mb-16">
          <span
            className="text-xs uppercase tracking-[0.3em] mb-4 block"
            style={{ color: colors.accentColor }}
          >
            Über uns
          </span>
          <h2 
            className="font-serif text-4xl md:text-5xl tracking-tight"
            style={{ color: textColor }}
          >
            Unsere Philosophie
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <div
              className="w-12 h-[1px] mb-8 mx-auto md:mx-0"
              style={{ backgroundColor: colors.accentColor }}
            />
            <p 
              className="font-light text-lg leading-relaxed mb-6 opacity-80 text-center md:text-left"
              style={{ color: textColor }}
            >
              {about.description}
            </p>
            {about.items?.[0]?.description && (
              <p 
                className="font-light text-lg leading-relaxed opacity-70 text-center md:text-left"
                style={{ color: textColor }}
              >
                {about.items[0].description}
              </p>
          )}
        </div>

        {/* Stats and Images Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4 mt-12">
            {/* Stats Card */}
            <div
              className="p-6 md:p-8 text-center rounded-sm transition-colors border"
              style={{
                borderColor: `${colors.accentColor}30`,
                backgroundColor: `${colors.primaryColor}10`,
              }}
            >
              <span 
                className="block font-serif text-4xl mb-2"
                style={{ color: colors.accentColor }}
              >
                {company.reviewPoints || "5"}+
              </span>
              <span 
                className="text-xs uppercase tracking-widest opacity-60"
                style={{ color: textColor }}
              >
                Sterne-Bewertung
              </span>
            </div>

            {/* Image 1 */}
            {about.items?.[0]?.image && (
              <div className="relative overflow-hidden aspect-[3/4] rounded-sm">
                <Image
                  src={about.items[0].image}
                  alt={about.items[0].title || "About"}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Image 2 */}
            {about.items?.[1]?.image && (
              <div className="relative overflow-hidden aspect-[3/4] rounded-sm">
                <Image
                  src={about.items[1].image}
                  alt={about.items[1].title || "About"}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            )}

            {/* Stats Card 2 */}
            <div
              className="p-6 md:p-8 text-center rounded-sm transition-colors border"
              style={{
                borderColor: `${colors.accentColor}30`,
                backgroundColor: `${colors.primaryColor}10`,
              }}
            >
              <span 
                className="block font-serif text-4xl mb-2"
                style={{ color: colors.accentColor }}
              >
                {about.items?.length || "10"}+
              </span>
              <span 
                className="text-xs uppercase tracking-widest opacity-60"
                style={{ color: textColor }}
              >
                Specialties
              </span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
