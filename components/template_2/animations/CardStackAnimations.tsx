"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CardStackAnimations() {
  const hasRun = useRef(false);

  useLayoutEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".card-item");
        const totalCards = cards.length;

        if (totalCards === 0) return;

        cards.forEach((card: HTMLElement, index: number) => {
          const inner = card.querySelector(".card-inner") as HTMLElement;
          const isLast = index === totalCards - 1;

          if (!inner) return;

          // Set initial state
          gsap.set(inner, {
            transformOrigin: "top center",
          });

          // Create the sticky stack animation
          // Each card scales down and fades as the next card stacks on top
          if (!isLast) {
            ScrollTrigger.create({
              trigger: card,
              start: () => `top ${10 + index * 3}%`,
              end: () => `+=${window.innerHeight * 0.8}`,
              scrub: 0.5,
              onUpdate: (self) => {
                const progress = self.progress;
                
                // Scale down from 1 to 0.9 as card gets "pushed back"
                const scale = 1 - (progress * 0.08);
                // Fade out slightly
                const opacity = 1 - (progress * 0.4);
                // Move up slightly to create depth
                const yOffset = progress * -15;
                
                gsap.to(inner, {
                  scale: scale,
                  opacity: opacity,
                  y: yOffset,
                  duration: 0.1,
                  ease: "none",
                  overwrite: "auto",
                });
              },
              onLeaveBack: () => {
                // Reset when scrolling back up
                gsap.to(inner, {
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                });
              },
            });
          }

          // Entrance animation for each card
          gsap.fromTo(
            inner,
            {
              y: 80,
              opacity: 0,
              scale: 0.95,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(initTimeout);
  }, []);

  return null;
}
