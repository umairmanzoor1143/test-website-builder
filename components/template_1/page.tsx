import { getAllLandingPageData } from "@/app/services/api";
import { Section } from "@/app/types";
import { notFound } from "next/navigation";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PostsSection from "./components/PostsSection";
import EventsSection from "./components/EventsSection";
import TeamSection from "./components/TeamSection";
import OpeningHoursSection from "./components/OpeningHoursSection";
import Footer from "./components/Footer";

interface Template1Props {
  companyId: string;
  data: any;
}

export default async function Template1({ data, companyId }: Template1Props) {
  // Validate companyId exists
 

  const {
    company,
    contactInfo,
    about,
    posts,
    openingHours,
    events,
    teams,
    employees,
    settings,
  } = data;
  const colors = settings.colors;

  // Sort sections by order and filter visible ones
  const visibleSections = settings.sections
    .filter((section: Section) => section.visible)
    .sort((a: Section, b: Section) => a.order - b.order);

  // Map section type to component
  const renderSection = (section: Section) => {
    switch (section.type) {
      case "ABOUT":
        return (
          <AboutSection
            key="about"
            about={about}
            colors={colors}
            company={company}
          />
        );
      case "POSTS":
        return (
          <PostsSection
            key="posts"
            posts={posts}
            colors={colors}
            company={company}
          />
        );
      case "EVENTS":
        return <EventsSection key="events" events={events} colors={colors} />;
      case "TEAM":
        return (
          <TeamSection
            key="team"
            teams={teams}
            employees={employees}
            colors={colors}
          />
        );
      case "OPENING_HOURS":
        return (
          <OpeningHoursSection
            key="opening-hours"
            openingHours={openingHours}
            colors={colors}
            company={company}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen selection:text-[#1a1a1a] scroll-smooth"
      style={{
        backgroundColor: colors.backgroundColor,
        ["--color-accent" as string]: colors.accentColor,
      }}
    >
      {/* Header Navigation */}
      <Header company={company} colors={colors} companyId={companyId} />

      {/* Hero Section */}
      <HeroSection company={company} colors={colors} intro={settings.intro} />

      {/* Dynamic Sections based on settings order */}
      {visibleSections.map((section: Section) => renderSection(section))}

      {/* Footer */}
      <Footer company={company} colors={colors} companyId={companyId} />
    </div>
  );
}
