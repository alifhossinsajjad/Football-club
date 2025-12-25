"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const Banner = () => {
  const theme = useSelector((state) => state.theme);

  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(logoRef.current, {
      scale: 0.6,
      opacity: 0,
      duration: 0.8,
    })
      .from(
        titleRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .from(
        textRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.3"
      )
      .from(
        btnRef.current,
        {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.2"
      );
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src="/stadium.png"
        alt="Stadium Background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-10 pt-20 md:pt-28">
        {/* Logo */}
        <div
          ref={logoRef}
          className="mb-4 sm:mb-6 w-[140px] sm:w-[180px] md:w-[200px] h-auto mx-auto"
        >
          <Image
            src="/bannarLogo.png"
            alt={theme.platformName}
            width={200}
            height={180}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 sm:mb-6"
          style={{
            backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LEVEL UP YOUR PLAY
        </h1>

        {/* Text */}
        <p
          ref={textRef}
          className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-xl md:max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          Connect with top clubs, showcase your skills, and accelerate your
          football journey. The future of youth football scouting starts here.
        </p>

        {/* Buttons */}
        <div
          ref={btnRef}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <Link
            href="/auth/login"
            className="px-6 py-2 text-black rounded-full text-lg sm:text-xl font-semibold"
            style={{ backgroundColor: theme.colors.primaryCyan }}
          >
            Join Now
          </Link>

          <Link
            href="/auth/login"
            className="px-6 py-2 border-2 text-white rounded-full text-lg sm:text-xl font-semibold"
            style={{ borderColor: theme.colors.primaryMagenta }}
          >
            Join Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
