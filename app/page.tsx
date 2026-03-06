import Banner from "@/components/landingPage/Banner";
import Club from "@/components/landingPage/Club";
import Feature from "@/components/landingPage/Feature";
import HowItWorks from "@/components/landingPage/HowItWorks";
import Navbar from "@/components/sheard/Navbar";
import Footer from "@/components/sheard/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full font-sans">
        <Banner />
        <Club />
        <HowItWorks/>
        <Feature/>
      </main>
      <Footer />
    </>
  );
}
