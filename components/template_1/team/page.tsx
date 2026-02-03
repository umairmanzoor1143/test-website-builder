"use client";
import { LandingPageData } from "@/app/types";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getContrastColor } from "../utils/theme";

interface TeamPageProps {
  companyId: string;
  data: LandingPageData;
}

export default function TeamPage({ companyId, data }: TeamPageProps) {
  const { company, teams, employees, settings } = data;
  const colors = settings.colors;
  const textColor = colors.textColor || getContrastColor(colors.backgroundColor);

  // Combine teams and employees, filter out invalid entries
  const allTeamMembers = [
    ...teams.filter((t: { name: string }) => t.name && t.name.trim() !== ""),
    ...employees.filter((e: { name: string; firstname: string }) => 
      (e.name && e.name.trim() !== "") || (e.firstname && e.firstname.trim() !== "")
    ),
  ];

  // Helper to get initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper to get full name for employees
  const getFullName = (member: { name?: string; firstname?: string }) => {
    if (member.firstname && member.name) {
      return `${member.firstname} ${member.name}`;
    }
    return member.name || member.firstname || "";
  };

  return (
    <div style={{ backgroundColor: colors.backgroundColor, minHeight: "100vh" }}>
      <Header company={company} colors={colors} companyId={companyId} />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
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
              Unser Team
            </span>
          </div>

          {/* Page Title */}
          <div className="text-center mb-16">
            <span
              className="text-xs uppercase tracking-[0.3em] mb-4 block"
              style={{ color: colors.accentColor }}
            >
              Unser Team
            </span>
            <h1
              className="text-4xl md:text-5xl font-serif mb-4"
              style={{ color: textColor }}
            >
              Die Menschen hinter{" "}
              <span style={{ color: colors.accentColor }}>{company.company}</span>
            </h1>
            <p className="text-lg opacity-70 max-w-2xl mx-auto" style={{ color: textColor }}>
              Unser engagiertes Team von Fachleuten ist bestrebt, in allem, was wir tun, Exzellenz zu liefern.
            </p>
          </div>

          {/* Team Grid */}
          {allTeamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {allTeamMembers.map((member: any, index: number) => {
                const fullName = getFullName(member);
                return (
                  <div
                    key={member.id || index}
                    className="group text-center"
                    onClick={()=> window.open(`https://id.me-business.ch/card/${member?.id}`,"_blank")}
                  >
                    {/* Image */}
                    <div
                      className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 transition-all duration-300 group-hover:border-4"
                      style={{ borderColor: colors.accentColor }}
                    >
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={fullName}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ backgroundColor: `${colors.primaryColor}20` }}
                        >
                          <span
                            className="text-4xl font-serif"
                            style={{ color: colors.accentColor }}
                          >
                            {getInitials(fullName)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <h3
                      className="text-xl font-medium mb-1"
                      style={{ color: textColor }}
                    >
                      {fullName}
                    </h3>
                    {member.role && (
                      <p
                        className="text-sm opacity-60"
                        style={{ color: textColor }}
                      >
                        {member.role}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="opacity-60" style={{ color: textColor }}>
                Team-Informationen folgen in Kürze.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer company={company} colors={colors} companyId={companyId}/>
    </div>
  );
}
  