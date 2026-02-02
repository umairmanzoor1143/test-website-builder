"use client";

import { useState } from "react";
import { OpeningHours, ThemeColors, Company } from "@/app/types";
import { Button } from "@/components/ui/button";
import { getContrastColor } from "../utils/theme";
import Link from "next/link";

interface OpeningHoursSectionProps {
  openingHours: OpeningHours;
  colors: ThemeColors;
  company?: Company;
}

// Helper to group days by their schedule
function groupOpeningHours(items: OpeningHours["items"]) {
  const groups: {
    label: string;
    days: string;
    times: { from: string; to: string }[];
    isByAppointment: boolean;
  }[] = [];

  // Group consecutive days with same hours
  let currentGroup: typeof groups[0] | null = null;

  items.forEach((item, index) => {
    const isClosed = !item.from || !item.to || item.from === item.to;
    const isWeekend = item.weekday.toLowerCase() === "saturday" || item.weekday.toLowerCase() === "sunday";
    
    if (isClosed) {
      // By appointment days
      if (currentGroup?.isByAppointment) {
        // Extend current appointment group
        const days = currentGroup.days.split(" - ");
        if (days.length === 1) {
          currentGroup.days = `${days[0]} - ${item.weekday}`;
        } else {
          currentGroup.days = `${days[0]} - ${item.weekday}`;
        }
      } else {
        if (currentGroup) groups.push(currentGroup);
        currentGroup = {
          label: "NACH VEREINBARUNG",
          days: item.weekday,
          times: [],
          isByAppointment: true,
        };
      }
    } else {
      // Has opening hours
      const timeKey = `${item.from}-${item.to}`;
      
      if (currentGroup && !currentGroup.isByAppointment) {
        const existingTimeKey = currentGroup.times.map(t => `${t.from}-${t.to}`).join(",");
        if (existingTimeKey === timeKey && !isWeekend) {
          // Same hours, extend the range
          const days = currentGroup.days.split(" - ");
          if (days.length === 1) {
            currentGroup.days = `${days[0]} - ${item.weekday}`;
          } else {
            currentGroup.days = `${days[0]} - ${item.weekday}`;
          }
        } else {
          // Different hours, create new group
          groups.push(currentGroup);
          currentGroup = {
            label: isWeekend ? "WOCHENENDE" : "SHOWROOM GEÖFFNET",
            days: item.weekday,
            times: [{ from: item.from, to: item.to }],
            isByAppointment: false,
          };
        }
      } else {
        if (currentGroup) groups.push(currentGroup);
        currentGroup = {
          label: isWeekend ? "WOCHENENDE" : "SHOWROOM GEÖFFNET",
          days: item.weekday,
          times: [{ from: item.from, to: item.to }],
          isByAppointment: false,
        };
      }
    }
  });

  if (currentGroup) groups.push(currentGroup);
  return groups;
}

export default function OpeningHoursSection({
  openingHours,
  colors,
  company,
}: OpeningHoursSectionProps) {
  // Get text colors based on theme
  const textColor = colors.textColor || getContrastColor(colors.backgroundColor);
  const cardBg = colors.backgroundColor || colors.backgroundColor;
  const cardTextColor = getContrastColor(cardBg);

  if (!openingHours?.items || openingHours.items.length === 0) return null;

  const groupedHours = groupOpeningHours(openingHours.items);
  const address = company?.address || company?.adresse;
  const [showAll, setShowAll] = useState(false);
  
  const INITIAL_SLOTS = 3;
  const hasMoreSlots = groupedHours.length > INITIAL_SLOTS;
  const displayedHours = showAll ? groupedHours : groupedHours.slice(0, INITIAL_SLOTS);

  return (
    <section
      id="hours"
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      {/* Decorative Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 blur-[150px] rounded-full pointer-events-none"
        style={{ backgroundColor: colors.primaryColor }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-xs uppercase tracking-[0.3em] mb-4 block"
            style={{ color: `${colors.accentColor}` }}
          >
            Showroom
          </span>
          <h2 
            className="font-serif text-4xl md:text-6xl"
            style={{ color: textColor }}
          >
            Öffnungszeiten
          </h2>
        </div>

        {/* Hours Card */}
        <div 
          className="rounded-sm overflow-hidden"
          style={{ 
            backgroundColor: `${cardBg}`,
            border: `1px solid ${cardTextColor}10`,
          }}
        >
          {displayedHours.map((group, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center justify-between px-8 py-8"
              style={{
                borderBottom: index < displayedHours.length - 1 || hasMoreSlots ? `1px solid ${cardTextColor}15` : 'none',
              }}
            >
              {/* Left side - Label and Days */}
              <div className="mb-4 md:mb-0">
                <span 
                  className="text-[10px] uppercase tracking-[0.2em] block mb-2"
                  style={{ color: `${cardTextColor}50` }}
                >
                  {group.label}
                </span>
                <h3 
                  className="font-serif text-xl md:text-2xl"
                  style={{ color: cardTextColor }}
                >
                  {group.days}
                </h3>
              </div>

              {/* Right side - Times or Button */}
              <div className="flex items-center gap-6">
                {group.isByAppointment ? (
                  <Link
                    href="#contact"
                    className="px-6 py-3 text-[10px] uppercase tracking-[0.2em] border rounded-sm transition-all duration-300 hover:opacity-80"
                    style={{ 
                      borderColor: `${cardTextColor}30`,
                      color: cardTextColor,
                    }}
                  >
                    Persönliche Beratung
                  </Link>
                ) : (
                  group.times.map((time, timeIndex) => (
                    <span 
                      key={timeIndex}
                      className="text-sm md:text-base font-light"
                      style={{ color: cardTextColor }}
                    >
                      {time.from} <span style={{ color: `${cardTextColor}40` }}>—</span> {time.to}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
          
          {/* Show More/Less Button */}
          {hasMoreSlots && (
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="ghost"
              className="w-full px-8 py-5 text-xs uppercase tracking-[0.2em] hover:opacity-80 flex items-center justify-center gap-2"
              style={{ color: cardTextColor }}
            >
              {showAll ? (
                <>
                  Weniger anzeigen
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </>
              ) : (
                <>
                  Mehr anzeigen ({groupedHours.length - INITIAL_SLOTS} weitere)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </>
              )}
            </Button>
          )}
        </div>

        {/* Address */}
        {address && (
          <div className="text-center mt-12">
            <p 
              className="text-sm opacity-50"
              style={{ color: textColor }}
            >
              {address.street} {address.streetNumber}, {address.zip} {address.city}{address.state ? `, ${address.state}` : ''}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
