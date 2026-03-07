"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Banner = () => {
    const theme = useSelector(state => state.theme);

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
            .from(titleRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.8,
            }, "-=0.4")
            .from(textRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.6,
            }, "-=0.3")
            .from(btnRef.current, {
                scale: 0.9,
                opacity: 0,
                duration: 0.6,
            }, "-=0.2");
    }, []);

    return (
        <section className="relative w-full flex items-center justify-center">
            {/* Background */}
            <div className="relative w-full">
                <Image
                    src="/stadium.png"
                    alt="Stadium Background"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 md:mt-14">

                {/* Logo */}
                <div ref={logoRef} className="mb-4 w-[200px] h-[180px] aspect-square mx-auto">
                    <Image
                        src="/bannarLogo.png"
                        alt={theme.platformName}
                        width={200}
                        height={180}
                        className="w-full h-full object-contain"
                        priority
                    />
                </div>

                {/* Title */}
                <h1
                    ref={titleRef}
                    className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6"
                    style={{
                        backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    LEVEL UP YOUR PLAY
                </h1>

<<<<<<< HEAD
                {/* Text */}
                <p
                    ref={textRef}
                    className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
                >
                    Connect with top clubs, showcase your skills, and accelerate your
                    football joumey. The future of youth football scouting starts here.
                </p>

                {/* Buttons */}
                <div
                    ref={btnRef}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button
                        className="px-6 py-2 text-black rounded-full text-xl font-semibold"
                        style={{ backgroundColor: theme.colors.primaryCyan }}
                    >
                        Join Now
                    </button>
                    <button
                        className="px-6 py-2 border-2 text-white rounded-full text-xl font-semibold"
                        style={{ borderColor: theme.colors.primaryMagenta }}
                    >
                        Join Now
                    </button>
                </div>

            </div>
        </section>
    );
=======
        {/* Buttons */}
        <div
          ref={btnRef}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <Link
            href="/auth/login"
            className="px-6 py-2 text-black rounded-full text-lg sm:text-xl font-semibold  hover:scale-105"
            style={{ backgroundColor: theme.colors.primaryCyan }}
          >
            Join Now
          </Link>

          <Link
            href="/auth/login"
            className="px-6 py-2 border-2 text-white rounded-full text-lg sm:text-xl font-semibold hover:bg-purple-500 hover:scale-105"
            style={{ borderColor: theme.colors.primaryMagenta }}
          >
            Join Now
          </Link>
        </div>
      </div>
    </section>
  );
>>>>>>> 699ac9eb32942f2d41fe3de5c376fcc4a5c188ec
};

export default Banner;
