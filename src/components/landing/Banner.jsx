import { Button } from "@/components/ui/button";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/stadium.png" // make sure this image is in your public folder
          alt="Stadium Background"
          fill
          priority
          className="object-contain" // change from object-cover to object-contain
        />
        {/* subtle overlay to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tight mb-6">
          <span className="text-gradient">LEVEL UP YOUR PLAY</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Connect with top clubs, showcase your skills, and accelerate your
          football journey. The future of youth football scouting starts here.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="heroOutline" size="lg">Join Now</Button>
          <Button variant="hero" size="lg">Join Now</Button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
