"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SplitTextAnimations() {
  const hasRun = useRef(false);

  useLayoutEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const ctx = gsap.context(() => {
      // Intro section animation
      const introSection = document.querySelector(".intro-section");
      if (introSection) {
        gsap.fromTo(
          introSection.children,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introSection,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // General section animations
      const sections = document.querySelectorAll<HTMLElement>(".animate-section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
