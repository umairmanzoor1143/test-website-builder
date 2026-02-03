"use client";
import { Team, Employee, ThemeColors } from "@/app/types";
import Image from "next/image";
import { getTextColor, getTextColorWithOpacity, combineTeamMembers, getInitials } from "../utils/theme";

interface TeamSectionProps {
  teams: Team[];
  employees: Employee[];
  colors: ThemeColors;
}

export default function TeamSection({ teams, employees, colors }: TeamSectionProps) {
  const textColor = getTextColor(colors);
  const teamMembers = combineTeamMembers(teams, employees);

  if (teamMembers.length === 0) return null;

  return (
    <section
      className="py-12 px-6 md:px-20 max-w-[1800px] mx-auto"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      {/* Header */}
      <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <div
            className="text-xs uppercase tracking-widest mb-4 opacity-50"
            style={{ color: textColor }}
          >
            Unser Team
          </div>
          <h2
            className="display text-4xl md:text-6xl uppercase leading-none"
            style={{ color: textColor }}
          >
            Die Köpfe
            <br />
            <span style={{ color: colors.accentColor }}>dahinter.</span>
          </h2>
        </div>
        <p
          className="max-w-md font-light leading-relaxed"
          style={{ color: getTextColorWithOpacity(colors) }}
        >
          Unser Team besteht aus erfahrenen Experten, die mit Leidenschaft und
          Engagement für Sie arbeiten.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.slice(0, 6).map((member, index) => (
          <div key={`team-member-${member.id || index}`} className="team-member group relative cursor-pointer"  
          onClick={()=> window.open( `https://id.me-business.ch/card/${member?.id}`, "_blank")}>
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
    </section>
  );
}
