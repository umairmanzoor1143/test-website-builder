"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FooterParallax() {
  const hasRun = useRef(false);

  useLayoutEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const ctx = gsap.context(() => {
      const footer = document.querySelector(".footer-sticky");
      const wrapper = document.querySelector(".wrapper");

      if (footer && wrapper) {
        // Footer reveal effect as wrapper scrolls past
        ScrollTrigger.create({
          trigger: wrapper,
          start: "bottom bottom",
          end: () => `+=${window.innerHeight}`,
          scrub: 1,
          onUpdate: (self: ScrollTrigger) => {
            const progress = self.progress;
            
            // Reveal footer content
            gsap.to(footer.querySelectorAll(".footer-content > *"), {
              y: (1 - progress) * 50,
              opacity: progress,
              duration: 0.1,
              ease: "none",
            });
          },
        });

        // Footer text animation
        gsap.fromTo(
          footer.querySelectorAll(".footer-animate"),
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "bottom 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
