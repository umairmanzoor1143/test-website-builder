"use client";
import { Team, Employee, ThemeColors } from "@/app/types";
import Image from "next/image";
import { getContrastColor } from "../utils/theme";

interface TeamSectionProps {
  teams: Team[];
  employees: Employee[];
  colors: ThemeColors;
}

export default function TeamSection({ teams, employees, colors }: TeamSectionProps) {
  // Get text colors based on theme
  const textColor = colors.textColor || getContrastColor(colors.backgroundColor);

  // Combine teams and employees for display, filtering out invalid entries
  const teamMembers = [
    ...teams
      .filter((t) => t.name && t.name.trim() !== "")
      .map((t) => ({
        id: t.id,
        name: t.name,
        role: t.role || "Team Member",
        image: t.image,
      })),
    ...employees
      .filter((e) => (e.firstname || e.name))
      .map((e) => ({
        id: e.id,
        name: `${e.firstname || ""} ${e.name || ""}`.trim(),
        role: "Team Member",
        image: e.image,
      })),
  ].filter((member) => member.name && member.name.trim() !== "");

  if (teamMembers.length === 0) return null;

  // Get initials for placeholder
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section
      id="team"
      className="py-24 md:py-32 relative"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span
            className="text-xs uppercase tracking-[0.3em] mb-4 block"
            style={{ color: colors.accentColor }}
          >
            Our Team
          </span>
          <h2 
            className="font-serif text-4xl md:text-5xl tracking-tight"
            style={{ color: textColor }}
          >
            Meet the Experts
          </h2>
        </div>

        {/* Team Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-[280px]"
                onClick={()=> window.open( `https://id.me-business.ch/card/${member?.id}`, "_blank")}
            >
              {/* Image */}
              <div 
                className="relative aspect-[3/4] mb-6 overflow-hidden rounded-sm"
                style={{ backgroundColor: `${colors.primaryColor}20` }}
              >
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primaryColor}30` }}
                  >
                    <span 
                      className="font-serif text-5xl opacity-40"
                      style={{ color: textColor }}
                    >
                      {getInitials(member.name)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 
                className="font-serif text-xl mb-1 text-center"
                style={{ color: textColor }}
              >
                {member.name}
              </h3>
              <p 
                className="text-sm uppercase tracking-wider opacity-60 text-center"
                style={{ color: textColor }}
              >
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
