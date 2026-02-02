import { LandingPageData } from "@/app/types";

import PageWrapper from "../components/PageWrapper";
import PageHero from "../components/PageHero";
import ContactForm from "./ContactForm";
import { getTextColor } from "../utils/theme";

interface ContactPageProps {
  companyId: string;
  data: LandingPageData;
}

export default function ContactPage({ companyId, data }: ContactPageProps) {
  const { company, contactInfo, settings } = data;
  const colors = settings.colors;
  const textColor = getTextColor(colors);
  const address = company.address || company.adresse;

  return (
    <PageWrapper
      company={company}
      contactInfo={contactInfo}
      colors={colors}
      companyId={companyId}
    >
      <PageHero
        subtitle="Kontakt"
        titleLine1="Schreiben Sie"
        titleLine2="uns."
        colors={colors}
      />

      {/* Contact Content */}
      <section className="py-20 px-6 md:px-20 max-w-[1400px] mx-auto intro-section">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2
              className="display text-2xl md:text-3xl uppercase mb-8"
              style={{ color: textColor }}
            >
              Kontaktinformationen
            </h2>

            <div className="space-y-6">
              {address && (
                <div>
                  <div
                    className="text-xs uppercase tracking-widest mb-2 opacity-50"
                    style={{ color: textColor }}
                  >
                    Adresse
                  </div>
                  <p style={{ color: textColor }}>
                    {address.street} {address.streetNumber}
                    <br />
                    {address.zip} {address.city}
                  </p>
                </div>
              )}

              {contactInfo.telefon && (
                <div>
                  <div
                    className="text-xs uppercase tracking-widest mb-2 opacity-50"
                    style={{ color: textColor }}
                  >
                    Telefon
                  </div>
                  <a
                    href={`tel:${contactInfo.telefon}`}
                    className="hover:opacity-70 transition-opacity"
                    style={{ color: textColor }}
                  >
                    {contactInfo.telefon}
                  </a>
                </div>
              )}

              {contactInfo.email && (
                <div>
                  <div
                    className="text-xs uppercase tracking-widest mb-2 opacity-50"
                    style={{ color: textColor }}
                  >
                    E-Mail
                  </div>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:opacity-70 transition-opacity"
                    style={{ color: textColor }}
                  >
                    {contactInfo.email}
                  </a>
                </div>
              )}

              {contactInfo.website && (
                <div>
                  <div
                    className="text-xs uppercase tracking-widest mb-2 opacity-50"
                    style={{ color: textColor }}
                  >
                    Webseite
                  </div>
                  <a
                    href={contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                    style={{ color: colors.accentColor }}
                  >
                    {contactInfo.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2
              className="display text-2xl md:text-3xl uppercase mb-8"
              style={{ color: textColor }}
            >
              Nachricht senden
            </h2>
            <ContactForm companyId={companyId} colors={colors} />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
