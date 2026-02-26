import Banner from "@/components/landingPage/Banner";
import Club from "@/components/landingPage/Club";
import Feature from "@/components/landingPage/Feature";
import HowItWorks from "@/components/landingPage/HowItWorks";

export default function Home() {
  return (
    <main className="w-full font-sans">
      <Banner />
      <Club />
      <HowItWorks/>
      <Feature/>
    </main>
  );
}
