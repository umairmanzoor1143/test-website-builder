import { getAllLandingPageData } from "@/app/services/api";
import { Section } from "@/app/types";
import { notFound } from "next/navigation";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import IntroSection from "./components/IntroSection";
import TeamSection from "./components/TeamSection";
import CardStackSection from "./components/CardStackSection";
import EventsSection from "./components/EventsSection";
import OpeningHoursSection from "./components/OpeningHoursSection";
import Footer from "./components/Footer";
// Animation wrapper (client-side, lazy loaded)
import { AnimationWrapper } from "./animations";
import Template2Layout from "./layout";

interface Template2Props {
    companyId: string;
    data: any;
}

export default async function Template2({ data, companyId }: Template2Props) {
    const { company, contactInfo, about, posts, openingHours, events, teams, employees, settings } = data;
    const colors = settings.colors;
    const intro = settings.intro;

    // Get visible sections sorted by order
    const visibleSections = settings.sections
        .filter((s: Section) => s.visible)
        .sort((a: Section, b: Section) => a.order - b.order);

    const isSectionVisible = (type: string) =>
        visibleSections.some((s: Section) => s.type === type);

    return (
        <Template2Layout>
            {/* Animation Providers - lazy loaded */}
            <AnimationWrapper />

            {/* Noise overlay */}
            <div className="noise-overlay" />

            <div
                className="min-h-screen overflow-x-hidden template2-page wrapper"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
                <Header
                    companyName={company.company}
                    colors={colors}
                    companyId={companyId}
                />

                <main style={{ backgroundColor: colors.backgroundColor }}>
                    <HeroSection company={company} colors={colors} intro={intro} />
                    <div className="mx-auto max-w-7xl">
                    {isSectionVisible("ABOUT") && (
                        <IntroSection about={about} colors={colors} contactInfo={contactInfo} />
                    )}

                    {isSectionVisible("POSTS") && (
                        <CardStackSection posts={posts} events={events} colors={colors} />
                    )}

                    {isSectionVisible("EVENTS") && (
                        <EventsSection events={events} colors={colors} />
                    )}

                    {isSectionVisible("TEAM") && (
                        <TeamSection teams={teams} employees={employees} colors={colors} />
                    )}

                    {isSectionVisible("OPENING_HOURS") && (
                        <OpeningHoursSection openingHours={openingHours} colors={colors} />
                    )}
                    </div>
                </main>
            </div>

            <Footer
                company={company}
                contactInfo={contactInfo}
                colors={colors}
                companyId={companyId}
            />
        </Template2Layout>
    );
}
