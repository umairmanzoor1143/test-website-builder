import { About, ThemeColors, ContactInfo } from "@/app/types";
import { getTextColor, getTextColorWithOpacity } from "../utils/theme";

interface IntroSectionProps {
  about: About;
  colors: ThemeColors;
  contactInfo: ContactInfo;
}

export default function IntroSection({ about, colors, contactInfo }: IntroSectionProps) {
  const textColor = getTextColor(colors);

  return (
    <section
      className="py-20 px-6 md:px-20 max-w-[1800px] mx-auto intro-section"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      {/* Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <div
            className="text-xs uppercase tracking-widest mb-4 opacity-50"
            style={{ color: textColor }}
          >
            Über uns
          </div>
          <h2
            className="display text-4xl md:text-6xl uppercase leading-none"
            style={{ color: textColor }}
          >
            Dein
            <br />
            <span style={{ color: colors.accentColor }}>Unternehmen.</span>
          </h2>
        </div>

        <p
          className="max-w-md font-light leading-relaxed"
          style={{ color: getTextColorWithOpacity(colors) }}
        >
          {about.description || "Willkommen bei uns. Wir bieten Ihnen erstklassige Dienstleistungen und Produkte mit höchster Qualität und Professionalität."}
        </p>
      </div>

      {/* Additional Content */}
      {about.items?.[0]?.description && (
        <p 
          className="font-light text-lg leading-relaxed opacity-70 mb-8"
          style={{ color: textColor }}
        >
          {about.items[0].description}
        </p>
      )}

      <div
        className="h-px w-full my-8"
        style={{ backgroundColor: `${textColor}1A` }}
      />

      <div 
        className="flex gap-12 text-sm uppercase tracking-widest"
        style={{ color: getTextColorWithOpacity(colors) }}
      >
        {contactInfo.telefon && <div>{contactInfo.telefon}</div>}
        {contactInfo.email && <div>{contactInfo.email}</div>}
      </div>
    </section>
  );
}
