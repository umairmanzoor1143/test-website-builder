import { Post, Company, ThemeColors } from "@/app/types";
import Image from "next/image";
import { getContrastColor } from "../utils/theme";

interface PostsSectionProps {
  posts: Post[];
  colors: ThemeColors;
  company: Company;
}

export default function PostsSection({ posts, colors }: PostsSectionProps) {
  // Section uses backgroundColor, calculate contrast accordingly
  const sectionBg = colors.backgroundColor;
  const textColor = colors.textColor || getContrastColor(sectionBg);
  
  // Card text needs to contrast against the card/image overlay
  // Cards have dark overlay on images, so text should be light
  const cardTextColor = "#ffffff";

  if (!posts || posts.length === 0) return null;

  return (
    <section
      id="services"
      className="py-24 relative"
      style={{ backgroundColor: sectionBg }}
    >
          <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 blur-[150px] rounded-full pointer-events-none"
        style={{ backgroundColor: colors.primaryColor }}
      />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span
            className="text-xs uppercase tracking-[0.3em] mb-4 block"
            style={{ color: colors.accentColor }}
          >
            Unsere Dienstleistungen
          </span>
          <h2 
            className="font-serif text-4xl md:text-5xl tracking-tight"
            style={{ color: textColor }}
          >
            Was wir anbieten
          </h2>
        </div>

        {/* Posts Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {posts.map((post, index) => (
            <div
              key={post.postId || index}
              className="group relative overflow-hidden h-[500px] rounded-sm w-full md:w-[calc(33.333%-1.5rem)] max-w-[400px]"
              style={{
                backgroundColor: colors.primaryColor || "#1a1a1a",
              }}
            >
              {/* Background Image */}
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                />
              )}
              
              {/* Gradient Overlay for text readability */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
         

                {/* Title */}
                <h3 
                  className="font-serif text-2xl mb-3"
                  style={{ color: cardTextColor }}
                >
                  {post.title}
                </h3>

                {/* Description - shown on hover */}
                <p 
                  className="font-light text-sm leading-relaxed opacity-0 group-hover:opacity-80 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto overflow-hidden line-clamp-3"
                  style={{ color: cardTextColor }}
                >
                  {post.text}
                </p>

                {/* Link */}
                {post.linkUrl && (
                  <span
                    className="inline-flex items-center gap-2 mt-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 hover:underline"
                    style={{ color: colors.accentColor }}
                  >
                    Learn More
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
                      <path d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
