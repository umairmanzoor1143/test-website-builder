"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

interface PreloaderProps {
  accentColor?: string;
  companyName?: string;
  companyLogo?: string;
}

export default function Preloader({ 
  accentColor = "#374336",
  companyName = "LOADING",
  companyLogo,
}: PreloaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
        },
      });

      // Fade out content
      tl.to(
        contentRef.current,
        {
          opacity: 0,
          y: -30,
          duration: 0.4,
          ease: "power2.in",
        },
        2
      );

      // Slide loader up
      tl.to(
        loaderRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
        },
        2.2
      );
    }, loaderRef);

    // Prevent scroll during loading
    document.body.style.overflow = "hidden";

    return () => ctx.revert();
  }, []);

  return (
    <div ref={loaderRef} className="loader" style={{ backgroundColor: "#000" }}>
      <div ref={contentRef} className="flex flex-col items-center justify-center gap-6">
        {/* Company Logo */}
        {companyLogo && (
          <div className="relative w-20 h-20 mb-4">
            <Image
              src={companyLogo}
              alt={companyName}
              fill
              className="object-contain"
              priority
            />
          </div>
        )}
        
        {/* Company Name */}
        <div className="loader-text" style={{ color: accentColor }}>
          {companyName.toUpperCase()}
        </div>
        
 
      </div>
      <div
        ref={barRef}
        className="loader-bar"
        style={{ backgroundColor: accentColor }}
      />
    </div>
  );
}

