"use client";

import { useState } from "react";
import { OpeningHours, ThemeColors } from "@/app/types";
import { getTextColor, getTextColorWithOpacity } from "../utils/theme";

interface OpeningHoursSectionProps {
  openingHours: OpeningHours;
  colors: ThemeColors;
}

const dayTranslation: Record<string, string> = {
  monday: "Mo",
  tuesday: "Di",
  wednesday: "Mi",
  thursday: "Do",
  friday: "Fr",
  saturday: "Sa",
  sunday: "So",
};

function groupOpeningHours(items: OpeningHours["items"]) {
  const groups: { days: string; times: string[]; isClosed: boolean }[] = [];
  let currentGroup: typeof groups[0] | null = null;

  items.forEach((item) => {
    const isClosed = !item.from || !item.to || item.from === item.to;
    const dayAbbr = dayTranslation[item.weekday.toLowerCase()] || item.weekday;
    const timeStr = isClosed ? "" : `${item.from} - ${item.to}`;

    if (currentGroup) {
      const currentTimeKey = currentGroup.times.join(",");
      if (currentTimeKey === timeStr && currentGroup.isClosed === isClosed) {
        const days = currentGroup.days.split(" - ");
        currentGroup.days = `${days[0]} - ${dayAbbr}`;
      } else {
        groups.push(currentGroup);
        currentGroup = { days: dayAbbr, times: isClosed ? [] : [timeStr], isClosed };
      }
    } else {
      currentGroup = { days: dayAbbr, times: isClosed ? [] : [timeStr], isClosed };
    }
  });

  if (currentGroup) groups.push(currentGroup);
  return groups;
}

export default function OpeningHoursSection({ openingHours, colors }: OpeningHoursSectionProps) {
  const textColor = getTextColor(colors);
  const [showAll, setShowAll] = useState(false);

  if (!openingHours?.items || openingHours.items.length === 0) return null;

  const groupedHours = groupOpeningHours(openingHours.items);
  const INITIAL_SLOTS = 3;
  const hasMoreSlots = groupedHours.length > INITIAL_SLOTS;
  const displayedHours = showAll ? groupedHours : groupedHours.slice(0, INITIAL_SLOTS);

  return (
    <section
      className="py-20 px-6 md:px-20 relative z-10"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <div
              className="text-xs uppercase tracking-widest mb-4 opacity-50"
              style={{ color: textColor }}
            >
              Geschäftszeiten
            </div>
            <h2
              className="display text-4xl md:text-6xl uppercase leading-none"
              style={{ color: textColor }}
            >
              Öffnungs
              <br />
              <span style={{ color: colors.accentColor }}>zeiten.</span>
            </h2>
          </div>
          <p
            className="max-w-md font-light leading-relaxed"
            style={{ color: getTextColorWithOpacity(colors) }}
          >
            Besuchen Sie uns zu den folgenden Zeiten.
          </p>
        </div>

      <div
        className="mx-auto flex items-center justify-center flex-col font-light mb-12 leading-relaxed"
        style={{ color: getTextColorWithOpacity(colors, "99") }}
      >
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-left text-lg max-w-sm">
          {displayedHours.map((group, index) => (
            <div key={index} className="contents">
              <div className="font-semibold" style={{ color: textColor }}>
                {group.days}
              </div>
              <div>
                {group.isClosed ? (
                  <span className="opacity-60">Geschlossen</span>
                ) : (
                  group.times.map((time, i) => (
                    <div key={i}>{time}</div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show more/less button */}
        {hasMoreSlots && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 text-sm uppercase tracking-widest transition-colors"
            style={{ color: colors.accentColor }}
          >
            {showAll ? "Weniger anzeigen" : "Mehr anzeigen"}
          </button>
        )}

        {/* Additional message */}
        {openingHours.message && (
          <p className="mt-8 text-sm opacity-60">{openingHours.message}</p>
        )}
      </div>
      </div>
    </section>
  );
}
