import { Event, ThemeColors } from "@/app/types";
import Image from "next/image";
import { formatDate, getContrastColor } from "../utils/theme";

interface EventsSectionProps {
  events: Event[];
  colors: ThemeColors;
}

export default function EventsSection({ events, colors }: EventsSectionProps) {
  const textColor = colors.textColor || getContrastColor(colors.backgroundColor);

  if (!events || events.length === 0) return null;

  return (
    <section className="py-12 px-6 md:px-20" style={{ backgroundColor: colors.backgroundColor }}>
      <div className="mx-auto w-full">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <div
              className="text-xs uppercase tracking-widest mb-4 opacity-50"
              style={{ color: colors.accentColor }}
            >
              Veranstaltungen
            </div>
            <h2 
              className="display text-4xl md:text-6xl uppercase leading-none"
              style={{ color: textColor }}
            >
              Upcoming
              <br />
              <span style={{ color: colors.accentColor }}>Events.</span>
            </h2>
          </div>
          <p
            className="max-w-md font-light leading-relaxed"
            style={{ color: `${textColor}99` }}
          >
            Entdecken Sie unsere kommenden Veranstaltungen und Aktivitäten.
          </p>
        </div>

        {/* Divider */}
        <div 
          className="h-px w-full mb-8"
          style={{ borderBottom: `1px dashed ${textColor}20` }}
        />

        {/* Events Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <div
              key={event.id || index}
              className="group flex flex-col gap-2 rounded-lg p-2 duration-150 transition-colors cursor-pointer"
              style={{ 
                backgroundColor: 'transparent',
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-lg aspect-video">
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={event.title || "Event"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.primaryColor}30 0%, ${colors.accentColor}20 100%)` 
                    }}
                  >
                    <span 
                      className="text-4xl opacity-30"
                      style={{ color: colors.accentColor }}
                    >
                      📅
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2 px-2 pb-2">
                {/* Meta Info */}
                <div 
                  className="flex items-center gap-2 text-[11px] sm:text-xs opacity-60"
                  style={{ color: textColor }}
                >
                  {event.date && (
                    <>
                      <p>{formatDate(event.date)}</p>
                      <div 
                        className="size-1 rounded-full"
                        style={{ backgroundColor: textColor }}
                      />
                    </>
                  )}
                  <p style={{ color: colors.accentColor }}>Event</p>
                </div>

                {/* Title */}
                <h3 
                  className="line-clamp-2 text-lg leading-5 font-semibold tracking-tight"
                  style={{ color: textColor }}
                >
                  {event.title || "Untitled Event"}
                </h3>

                {/* Description */}
                {event.description && (
                  <p 
                    className="line-clamp-3 text-sm opacity-70"
                    style={{ color: textColor }}
                  >
                    {event.description}
                  </p>
                )}

              
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
