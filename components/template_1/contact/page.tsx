import { LandingPageData } from "@/app/types";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getContrastColor } from "../utils/theme";
import ContactForm from "./ContactForm";

interface ContactPageProps {
  companyId: string;
  data: LandingPageData;
}

export default function ContactPage({ companyId, data }: ContactPageProps) {
  const { company, contactInfo, settings } = data;
  const colors = settings.colors;
  const textColor =
    colors.textColor || getContrastColor(colors.backgroundColor);
  const address = company.address || company.adresse;

  return (
    <div
      style={{ backgroundColor: colors.backgroundColor, minHeight: "100vh" }}
    >
      <Header company={company} colors={colors} companyId={companyId} />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <span
              className="text-xs uppercase tracking-[0.3em] mb-4 block"
              style={{ color: colors.accentColor }}
            >
              Kontaktieren Sie uns
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6"
              style={{ color: textColor }}
            >
              Starten Sie ein{" "}
              <span style={{ color: colors.accentColor }}>Gespräch</span>
            </h1>
            <p
              className="text-lg opacity-70 max-w-2xl mx-auto"
              style={{ color: textColor }}
            >
              Haben Sie eine Frage oder möchten Sie mit uns zusammenarbeiten? Wir freuen uns von Ihnen zu hören. 
              Füllen Sie das untenstehende Formular aus und wir melden uns so schnell wie möglich bei Ihnen.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {/* Location Card */}
            {address && (
              <div
                className="p-8 rounded-2xl text-center group hover:scale-[1.02] transition-transform duration-300"
                style={{
                  backgroundColor: `${textColor}05`,
                  border: `1px solid ${textColor}10`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${colors.accentColor}15` }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.accentColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: textColor }}
                >
                  Besuchen Sie uns
                </h3>
                <p className="opacity-70" style={{ color: textColor }}>
                  {address.street} {address.streetNumber}
                  <br />
                  {address.zip} {address.city}
                </p>
              </div>
            )}

            {/* Email Card */}
            {contactInfo?.email && (
              <div
                className="p-8 rounded-2xl text-center group hover:scale-[1.02] transition-transform duration-300"
                style={{
                  backgroundColor: `${textColor}05`,
                  border: `1px solid ${textColor}10`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${colors.accentColor}15` }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.accentColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: textColor }}
                >
                  E-Mail
                </h3>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                  style={{ color: textColor }}
                >
                  {contactInfo.email}
                </a>
              </div>
            )}

            {/* Phone Card */}
            {contactInfo?.telefon && (
              <div
                className="p-8 rounded-2xl text-center group hover:scale-[1.02] transition-transform duration-300"
                style={{
                  backgroundColor: `${textColor}05`,
                  border: `1px solid ${textColor}10`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${colors.accentColor}15` }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.accentColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: textColor }}
                >
                  Rufen Sie uns an
                </h3>
                <a
                  href={`tel:${contactInfo.telefon}`}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                  style={{ color: textColor }}
                >
                  {contactInfo.telefon}
                </a>
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left Column - Info */}
            <div className="lg:col-span-2">
              <h2
                className="text-2xl md:text-3xl font-serif mb-6"
                style={{ color: textColor }}
              >
                Schreiben Sie uns
              </h2>
              <p className="opacity-70 mb-8 leading-relaxed" style={{ color: textColor }}>
                Ob Sie eine Frage zu unseren Dienstleistungen, Preisen oder
                etwas anderem haben, unser Team ist bereit, alle Ihre Fragen zu beantworten.
              </p>

              {/* Business Hours */}
              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: `${colors.accentColor}08`,
                  border: `1px solid ${colors.accentColor}20`,
                }}
              >
                <h4
                  className="text-sm font-semibold uppercase tracking-wider mb-4"
                  style={{ color: colors.accentColor }}
                >
                  Öffnungszeiten
                </h4>
                <div className="space-y-2 text-sm" style={{ color: textColor }}>
                  <div className="flex justify-between">
                    <span className="opacity-70">Montag - Freitag</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Samstag</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Sonntag</span>
                    <span>Geschlossen</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div
              className="lg:col-span-3 p-8 md:p-10 rounded-2xl"
              style={{
                backgroundColor: `${textColor}03`,
                border: `1px solid ${textColor}10`,
              }}
            >
              <ContactForm
                accentColor={colors.accentColor}
                textColor={textColor}
                companyId={companyId}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer company={company} colors={colors} companyId={companyId} />
    </div>
  );
}
