"use client";

import dynamic from "next/dynamic";

// Dynamically import animation components - they will load after the initial render
const LenisProvider = dynamic(() => import("./LenisProvider"), {
  ssr: false,
});

const HeroAnimations = dynamic(() => import("./HeroAnimations"), {
  ssr: false,
});


const FooterParallax = dynamic(() => import("./FooterParallax"), {
  ssr: false,
});

// Animation wrapper that loads all animations lazily
export default function AnimationWrapper() {
  return (
    <>
      <LenisProvider />
      <HeroAnimations />
      <FooterParallax />
    </>
  );
}
