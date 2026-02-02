"use client";

import { Event, ThemeColors } from "@/app/types";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getContrastColor } from "../utils/theme";

interface EventsSectionProps {
  events: Event[];
  colors: ThemeColors;
}

export default function EventsSection({ events, colors }: EventsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Get text colors based on theme
  const textColor = colors.textColor || getContrastColor(colors.backgroundColor);

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleThumbnailClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!events || events.length === 0) return null;

  const activeEvent = events[currentIndex];
  
  // Get thumbnails excluding current
  const thumbnailEvents = events
    .map((event, index) => ({ ...event, originalIndex: index }))
    .filter((_, i) => i !== currentIndex)
    .slice(0, 3);

  // Animation variants for the main image
  const imageVariants = {
    enter: (direction: "left" | "right") => ({
      y: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      y: direction === "right" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  // Animation variants for the text content
  const textVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <section
      id="events"
      className="py-24 border-y"
      style={{
        backgroundColor: colors.backgroundColor,
        borderColor: `${textColor}10`,
      }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center">
          <span
            className="text-xs uppercase tracking-[0.3em] mb-4 block"
            style={{ color: colors.accentColor }}
          >
            What&apos;s Happening
          </span>
          <h2
            className="font-serif text-4xl md:text-5xl tracking-tight"
            style={{ color: textColor }}
          >
            Upcoming Events
          </h2>
        </div>
      </div>

      {/* Slider Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 min-h-[500px]">
          {/* Left Column: Pagination and Thumbnails */}
          <div className="md:col-span-3 flex flex-col justify-between order-2 md:order-1">
            <div className="flex flex-row md:flex-col justify-between md:justify-start space-x-4 md:space-x-0 md:space-y-4">
              {/* Pagination */}
              <span
                className="text-sm font-mono opacity-60"
                style={{ color: textColor }}
              >
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(events.length).padStart(2, "0")}
              </span>
              {/* Vertical "Events" Text */}
              <h3
                className="text-xs font-medium tracking-[0.2em] uppercase [writing-mode:vertical-rl] md:rotate-180 hidden md:block opacity-40"
                style={{ color: textColor }}
              >
                Events
              </h3>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex space-x-3 mt-8 md:mt-0">
              {thumbnailEvents.map((event) => (
                <Button
                  key={event.id}
                  onClick={() => handleThumbnailClick(event.originalIndex)}
                  variant="ghost"
                  className="overflow-hidden rounded-sm w-16 h-20 md:w-20 md:h-24 opacity-50 hover:opacity-100 p-0 focus:outline-none relative"
                  style={{
                    border: `1px solid ${textColor}20`,
                  }}
                  aria-label={`Ereignis anzeigen: ${event.title}`}
                >
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: `${colors.primaryColor}30` }}
                    >
                      <span
                        className="font-serif text-lg opacity-50"
                        style={{ color: textColor }}
                      >
                        {event.title[0]}
                      </span>
                    </div>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Center Column: Main Image */}
          <div className="md:col-span-5 relative min-h-[350px] md:min-h-[450px] order-1 md:order-2 rounded-sm overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                {activeEvent.image ? (
                  <Image
                    src={activeEvent.image}
                    alt={activeEvent.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primaryColor}30` }}
                  >
                    <span
                      className="font-serif text-6xl opacity-30"
                      style={{ color: textColor }}
                    >
                      {activeEvent.title[0]}
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Text and Navigation */}
          <div className="md:col-span-4 flex flex-col justify-between md:pl-4 order-3">
            {/* Text Content */}
            <div className="relative overflow-hidden pt-4 md:pt-12 min-h-[200px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p
                    className="text-xs uppercase tracking-[0.2em] opacity-60"
                    style={{ color: textColor }}
                  >
                    {formatDate(activeEvent.date)}
                  </p>
                  <h3
                    className="font-serif text-2xl md:text-3xl mt-3"
                    style={{ color: textColor }}
                  >
                    {activeEvent.title}
                  </h3>
                  {activeEvent.description && (
                    <p
                      className="mt-6 text-base leading-relaxed opacity-70 line-clamp-4"
                      style={{ color: textColor }}
                    >
                      {activeEvent.description}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-3 mt-8 md:mt-0">
              <Button
                onClick={handlePrev}
                variant="outline-round"
                size="icon-lg"
                style={{
                  borderColor: `${textColor}30`,
                  color: textColor,
                }}
                aria-label="Vorheriges Ereignis"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </Button>
              <Button
                onClick={handleNext}
                variant="icon-round"
                size="icon-lg"
                style={{
                  backgroundColor: colors.accentColor,
                  color: getContrastColor(colors.accentColor),
                }}
                aria-label="Nächstes Ereignis"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
