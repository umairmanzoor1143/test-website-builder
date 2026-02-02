import { Post, Event, ThemeColors } from "@/app/types";
import Image from "next/image";
import { formatDate, getContrastColor } from "../utils/theme";

interface CardStackSectionProps {
  posts: Post[];
  events: Event[];
  colors: ThemeColors;
}

export default function CardStackSection({ posts, events, colors }: CardStackSectionProps) {

  const cards = [
    ...posts.slice(0, 3).map((post, i) => ({
      id: post.postId || `post-${i}`,
      type: "post" as const,
      title: post.title || "Untitled",
      description: post.text || "",
      date: post.showAt || post.created || "",
      image: post.image || "",
      linkUrl: post.linkUrl || "",
    })),
    ...events.slice(0, 3).map((event, i) => ({
      id: event.id || `event-${i}`,
      type: "event" as const,
      title: event.title || "Untitled",
      description: event.description || "",
      date: event.date || "",
      image: event.image || "",
      linkUrl: "",
    })),
  ].slice(0, 5);
  if (cards.length === 0) return null;

  const sectionBg = colors.accentColor;
  const sectionTextColor = getContrastColor(sectionBg);

  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: sectionBg }}>
      <div className="text-center mb-20 px-6">
        <div
          className="text-xs uppercase tracking-widest mb-4 opacity-50"
          style={{ color: sectionTextColor }}
        >
          News Feed
        </div>
        <h2
          className="display text-4xl md:text-6xl lg:text-7xl"
          style={{ color: sectionTextColor }}
        >
          AKTUELLES & EVENTS
        </h2>
      </div>

      <div className="stack-container px-6">
        {cards.map((card, index) => (
          <div key={index} className="card-item">
            <div className="card-inner">
              <div className="card-content" style={{ backgroundColor: colors.backgroundColor }}>
                <div>
                  <div className="text-5xl display mb-2 opacity-30" style={{ color: colors.accentColor }}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ color: colors.textColor }}>
                    {card.title.toUpperCase()}
                  </h3>
                  {card.date && (
                    <p className="text-sm mt-4 opacity-70 uppercase tracking-widest" style={{ color: colors.accentColor }}>
                      {formatDate(card.date)}
                    </p>
                  )}
                </div>

                <div className="font-light line-clamp-4 opacity-70" style={{ color: colors.accentColor }}>
                  {card.description}
                </div>

                {card.linkUrl && (
                  <a
                    href={card.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-left uppercase tracking-widest text-xs pb-2 w-max hover:opacity-70 transition-opacity"
                    style={{ color: colors.accentColor, borderBottom: `1px solid ${colors.accentColor}50` }}
                  >
                    Mehr erfahren
                  </a>
                )}
              </div>

              <div className="card-img-wrap">
                {card.image ? (
                  <Image src={card.image} alt={card.title} fill className="card-img object-cover" style={{transform: "none"}} />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{ background: `linear-gradient(135deg, ${colors.primaryColor}40 0%, ${colors.accentColor}30 100%)` }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
