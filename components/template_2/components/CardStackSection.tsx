import { Post, Event, ThemeColors } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, getContrastColor } from "../utils/theme";

interface CardStackSectionProps {
  posts: Post[];
  events: Event[];
  colors: ThemeColors;
}

export default function CardStackSection({ posts, events, colors }: CardStackSectionProps) {
  const textColor = colors.textColor || getContrastColor(colors.backgroundColor);

  // Only use posts for this section
  const cards = posts.map((post, i) => ({
    id: post.postId || `post-${i}`,
    type: "post" as const,
    category: "NEWS",
    title: post.title || "Untitled",
    description: post.text || "",
    date: post.showAt || post.created || "",
    image: post.image || "",
    linkUrl: post.linkUrl || "",
  }));

  if (cards.length === 0) return null;

  return (
    <section className="py-12 px-6 md:px-20" style={{ backgroundColor: colors.backgroundColor }}>
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <div
              className="text-xs uppercase tracking-widest mb-4 opacity-50"
              style={{ color: textColor }}
            >
              News Feed
            </div>
            <h2 
              className="display text-4xl md:text-6xl uppercase leading-none"
              style={{ color: textColor }}
            >
              Aktuelles &
              <br />
              <span style={{ color: colors.accentColor }}>Events.</span>
            </h2>
          </div>
          <p
            className="max-w-md font-light leading-relaxed"
            style={{ color: `${textColor}99` }}
          >
            Bleiben Sie auf dem Laufenden mit unseren neuesten Nachrichten und Ankündigungen.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="cursor-pointer border shadow-none backdrop-blur-sm transition-shadow hover:shadow-md"
              style={{ 
                backgroundColor: `${colors.backgroundColor}80`,
                borderColor: `${textColor}15`,
              }}
            >
              <div className="p-0">
                <div className="relative mb-4 sm:mb-6">
                  {card.image ? (
                    <Image
                      alt={card.title}
                      className="aspect-square h-64 w-full object-cover sm:h-72 md:h-80"
                      height={1080}
                      src={card.image}
                      width={1920}
                    />
                  ) : (
                    <div 
                      className="aspect-square h-64 w-full sm:h-72 md:h-80"
                      style={{ 
                        background: `linear-gradient(135deg, ${colors.primaryColor}40 0%, ${colors.accentColor}30 100%)` 
                      }}
                    />
                  )}
                  <span
                    className="absolute top-0 left-0 px-2 py-0.5 font-medium text-[10px] uppercase backdrop-blur-sm sm:px-3 sm:py-1 sm:text-xs"
                    style={{ 
                      backgroundColor: colors.accentColor,
                      color: getContrastColor(colors.accentColor),
                    }}
                  >
                    #{card.category}
                  </span>
                </div>

                <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                  <h3 
                    className="mb-2 font-normal text-base tracking-tight sm:mb-2 sm:text-lg md:text-2xl"
                    style={{ color: textColor }}
                  >
                    {card.title}
                  </h3>
                  <p 
                    className="mb-4 text-xs leading-relaxed sm:mb-6 sm:text-sm opacity-70 line-clamp-3"
                    style={{ color: textColor }}
                  >
                    {card.description}
                  </p>

                  {/* Read More Link and Date */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <span
                        rel="noopener noreferrer"
                        className="group relative flex items-center overflow-hidden font-medium text-xs transition-colors sm:text-sm"
                        style={{ color: textColor }}
                      >
                        <span 
                          className="mr-2 overflow-hidden border p-2 transition-colors duration-300 ease-in group-hover:text-white sm:p-3"
                          style={{ 
                            borderColor: `${textColor}20`,
                          }}
                        >
                          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                        </span>
                        Mehr erfahren
                      </span>
                    
                    {card.date && (
                      <span 
                        className="flex items-center gap-2 text-[10px] sm:gap-3 sm:text-xs opacity-50"
                        style={{ color: textColor }}
                      >
                        {formatDate(card.date)}
                        <span 
                          className="w-6 border-t sm:w-16" 
                          style={{ borderColor: `${textColor}30` }}
                        />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
