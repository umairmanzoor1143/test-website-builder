import { LandingPageData } from "@/app/types";
import Image from "next/image";

import PageWrapper from "../components/PageWrapper";
import PageHero from "../components/PageHero";
import { getTextColor, getTextColorWithOpacity } from "../utils/theme";

interface AboutPageProps {
  companyId: string;
  data: LandingPageData;
}

export default function AboutPage({ companyId, data }: AboutPageProps) {
  const { company, contactInfo, about, settings } = data;
  const colors = settings.colors;
  const textColor = getTextColor(colors);

  return (
    <PageWrapper
      company={company}
      contactInfo={contactInfo}
      colors={colors}
      companyId={companyId}
    >
      <PageHero
        subtitle="Über uns"
        titleLine1="Wer wir"
        titleLine2="sind."
        colors={colors}
      />

      {/* About Content */}
      <section className="py-20 px-6 md:px-20 max-w-[1400px] mx-auto intro-section">
        {/* Main Description */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <h2
            className="display text-3xl md:text-4xl leading-tight"
            style={{ color: textColor }}
          >
            Unsere Geschichte
          </h2>
          <p
            className="text-lg font-light leading-relaxed"
            style={{ color: getTextColorWithOpacity(colors) }}
          >
            {about.description ||
              "Wir sind ein engagiertes Team, das sich der Exzellenz verschrieben hat. Mit jahrelanger Erfahrung und Leidenschaft bieten wir unseren Kunden erstklassige Dienstleistungen."}
          </p>
        </div>

        {/* About Items */}
        {about.items && about.items.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-section">
            {about.items.map((item) => (
              <div
                key={item.id}
                className="group"
                style={{ borderTop: `1px solid ${textColor}1A` }}
              >
                {item.image && (
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                )}
                <h3
                  className="display text-xl uppercase tracking-tight mb-3 pt-4"
                  style={{ color: textColor }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-light leading-relaxed"
                  style={{ color: getTextColorWithOpacity(colors, "99") }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
