"use client";
import { LandingPageData } from "@/app/types";
import Image from "next/image";

import PageWrapper from "../components/PageWrapper";
import PageHero from "../components/PageHero";
import { getTextColor, getTextColorWithOpacity, combineTeamMembers, getInitials } from "../utils/theme";

interface TeamPageProps {
  companyId: string;
  data: LandingPageData;
}

export default function TeamPage({ companyId, data }: TeamPageProps) {
  const { company, contactInfo, teams, employees, settings } = data;
  const colors = settings.colors;
  const textColor = getTextColor(colors);
  const teamMembers = combineTeamMembers(teams, employees);

  return (
    <PageWrapper
      company={company}
      contactInfo={contactInfo}
      colors={colors}
      companyId={companyId}
    >
      <PageHero
        subtitle="Unser Team"
        titleLine1="Die Köpfe"
        titleLine2="dahinter."
        colors={colors}
      />

      {/* Team Grid */}
      <section className="py-20 px-6 md:px-20 max-w-[1800px] mx-auto intro-section">
        {teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="team-member group relative cursor-pointer"
                onClick={()=> window.open(`https://id.me-business.ch/card/${member?.id}`,"_blank")}
              >
                <div className="overflow-hidden aspect-[3/4] mb-5 bg-gray-200">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={533}
                      className="w-full h-full object-cover team-member-image"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: `${colors.primaryColor}30` }}
                    >
                      <span
                        className="display text-5xl opacity-40"
                        style={{ color: textColor }}
                      >
                        {getInitials(member.name)}
                      </span>
                    </div>
                  )}
                </div>

                <div
                  className="flex justify-between items-start pt-4"
                  style={{ borderTop: `1px solid ${textColor}1A` }}
                >
                  <div>
                    <h3
                      className="display text-xl uppercase tracking-tight"
                      style={{ color: textColor }}
                    >
                      {member.name}
                    </h3>
                    <div
                      className="text-xs uppercase tracking-widest opacity-50 mt-1"
                      style={{ color: textColor }}
                    >
                      {member.role}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="team-member-arrow"
                    style={{ color: textColor }}
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-20"
            style={{ color: getTextColorWithOpacity(colors, "99") }}
          >
            <p className="text-lg">Keine Teammitglieder verfügbar.</p>
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
