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
      className="py-32 px-6 md:px-20 grid md:grid-cols-2 gap-16 max-w-[1800px] mx-auto intro-section"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <div>
        <h2
          className="display text-4xl md:text-5xl leading-tight"
          style={{ color: textColor }}
        >
          Dein <br />
          <span style={{ color: colors.accentColor }}>Unternehmen.</span>
        </h2>
      </div>

      <div
        className="text-xl font-light leading-relaxed"
        style={{ color: getTextColorWithOpacity(colors) }}
      >
        <p className="mb-8">
          {about.description || "Willkommen bei uns. Wir bieten Ihnen erstklassige Dienstleistungen und Produkte mit höchster Qualität und Professionalität."}
        </p>

        <div
          className="h-px w-full my-8"
          style={{ backgroundColor: `${textColor}1A` }}
        />

        <div className="flex gap-12 text-sm uppercase tracking-widest">
          {contactInfo.telefon && <div>{contactInfo.telefon}</div>}
          {contactInfo.email && <div>{contactInfo.email}</div>}
        </div>
      </div>
    </section>
  );
}
