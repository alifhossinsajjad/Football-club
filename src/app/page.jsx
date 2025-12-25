import Banner from "@/components/landing/Banner";
import ClubsSection from "@/components/landing/ClubSection";
import FeaturedPlayers from "@/components/landing/Featured";
import Footer from "@/components/landing/Footer";
import HowItWorks from "@/components/landing/HowItWorks";
import LatestNews from "@/components/landing/LatestNews";
import Navbar from "@/components/landing/Navbar";
import Subscription from "@/components/landing/Subscription";
import UpcomingEvent from "@/components/landing/UpcomingEvents";
import React from "react";

export default function LandingPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Banner />
      <ClubsSection />
      <HowItWorks />
      <FeaturedPlayers />
      <LatestNews />
      <UpcomingEvent />
      <Subscription />
      <Footer />
    </div>
  );
}
