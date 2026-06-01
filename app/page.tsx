'use client'


import Banner from "@/components/landingPage/Banner";
import Club from "@/components/landingPage/Club";
import Feature from "@/components/landingPage/Feature";
import HowItWorks from "@/components/landingPage/HowItWorks";
import Navbar from "@/components/sheard/Navbar";
import Footer from "@/components/sheard/Footer";
import LatestNews from "@/components/landingPage/LatestNews";
import UpcomingEventsSection from "@/components/landingPage/UpcomingEvents";
import AddSection from "@/components/landingPage/AddSection";
import AdBanner from "@/components/landingPage/AdBanner";
import { useAppSelector } from "@/redux/hooks";
import FAQSection from "@/components/landingPage/FAQSection";
import { useSyncExternalStore } from "react";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);
  // useSyncExternalStore: returns false on server, true on client — avoids setState-in-effect
  const mounted = useSyncExternalStore(
    () => () => {},   // subscribe (no-op — value never changes after mount)
    () => true,       // client snapshot
    () => false,      // server snapshot
  );

  return (
    <>
      <Navbar />
      <main className="w-full font-sans">
        <Banner />
        <Club />
        {/* Only show when user is NOT logged in — deferred to client to avoid hydration mismatch */}
        {mounted && !user && <HowItWorks />}
        <Feature />
        <div className="container mx-auto px-4 md:px-0">
          <AdBanner />
        </div>
        <LatestNews />
        <UpcomingEventsSection />
        <AddSection />
        {/* <div className="container mx-auto px-4 md:px-0">
          <AdBanner position="BOTTOM" />
        </div> */}
        <FAQSection/>
      </main>
      <Footer />
    </>
  );
}
