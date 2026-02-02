"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroAnimations() {
  const hasRun = useRef(false);

  useLayoutEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const ctx = gsap.context(() => {
      // Check if we're on a sub-page (no preloader)
      const hasPreloader = document.querySelector(".loader");
      const delay = hasPreloader ? 2.8 : 0.3;

      // Set initial state for hero text
      gsap.set(".hero-text span", { y: "100%" });

      // Hero text reveal animation - animate the inner span
      gsap.to(".hero-text span", {
        y: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
      });

      // Set initial state for hero fade
      gsap.set(".hero-fade", { opacity: 0 });

      // Hero fade elements (subtitle, tagline)
      gsap.to(".hero-fade", {
        opacity: 1,
        duration: 1,
        delay: delay + 0.5,
      });

      // Hero image parallax effect
      const heroImg = document.querySelector(".hero-img");
      if (heroImg) {
        gsap.to(heroImg, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: heroImg.closest("section"),
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
