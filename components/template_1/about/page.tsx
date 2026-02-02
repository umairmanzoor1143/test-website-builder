import { LandingPageData } from "@/app/types";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getContrastColor } from "../utils/theme";

interface AboutPageProps {
  companyId: string;
  data: LandingPageData;
}

export default function AboutPage({ companyId, data }: AboutPageProps) {
  const { company, about, settings } = data;
  const colors = settings.colors;
  const textColor = colors.textColor || getContrastColor(colors.backgroundColor);
  const address = company.address || company.adresse;

  return (
    <div style={{ backgroundColor: colors.backgroundColor, minHeight: "100vh" }}>
      <Header company={company} colors={colors} companyId={companyId} />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-12">
          {/* Breadcrumb */}
          <div className="mb-8 pt-8">
            <Link
              href="/"
              className="text-sm opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: textColor }}
            >
              Startseite
            </Link>
            <span className="mx-2 opacity-40" style={{ color: textColor }}>/</span>
            <span className="text-sm" style={{ color: colors.accentColor }}>
              Über uns
            </span>
          </div>

          {/* Page Title */}
          <h1
            className="text-4xl md:text-5xl font-serif mb-8"
            style={{ color: textColor }}
          >
            Über <span style={{ color: colors.accentColor }}>uns</span>
          </h1>

          {/* Description */}
          <div className="space-y-4 mb-16">
            {about.description ? (
              about.description.split("\n").map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className="text-base leading-relaxed opacity-80"
                  style={{ color: textColor }}
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-base leading-relaxed opacity-80" style={{ color: textColor }}>
                Willkommen bei {company.company}. Wir sind bestrebt, außergewöhnliche Dienstleistungen zu erbringen
                und unvergessliche Erlebnisse für unsere Kunden zu schaffen.
              </p>
            )}
          </div>

          {/* Image Gallery */}
          {about.items && about.items.length > 0 && (
            <section className="mb-16">
              <h2
                className="text-2xl font-semibold mb-6"
                style={{ color: textColor }}
              >
                Galerie
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {about.items.map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden group"
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title || "Gallery image"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: `${colors.primaryColor}20` }}
                      >
                        <span style={{ color: textColor }} className="opacity-40">
                          {item.title || "Image"}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Location Section */}
          {address && (
            <section className="mb-16">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: textColor }}
              >
                Location
              </h2>
              <p className="mb-6 opacity-80" style={{ color: textColor }}>
                {address.street} {address.streetNumber}, {address.zip} {address.city}
              </p>

              {/* Map */}
              {address.coordinate && (
                <div className="rounded-lg overflow-hidden border" style={{ borderColor: `${textColor}20` }}>
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${address.coordinate.latitude},${address.coordinate.longitude}&zoom=14`}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      <Footer company={company} colors={colors} companyId={companyId} />
    </div>
  );
}
