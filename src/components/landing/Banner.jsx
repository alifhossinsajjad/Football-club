"use client"
import Image from "next/image";
import { useSelector } from "react-redux";

const Banner = () => {


    const theme = useSelector(state => state.theme)
    return (
        <section className="relative w-full flex items-center justify-center">

            {/* Background Image */}
            <div className="relative w-full">
                <Image
                    src="/stadium.png"
                    alt="Stadium Background"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent " />
            </div>

            {/* Main Content - Centered */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 mt-0  md:mt-10">


                <div className="mb-4 w-[200px] h-[200px] aspect-square mx-auto">
                    <Image
                        src="/bannarLogo.png"
                        alt={theme.platformName}
                        width={200}
                        height={200}
                        className="w-full h-full object-contain"
                        priority
                    />
                </div>




                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black  tracking-tight mb-6"
                    style={{
                        backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                    }}

                >
                    <span className="text-gradient">LEVEL UP YOUR PLAY</span>
                </h1>

                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Connect with top clubs, showcase your skills, and accelerate your
                    football journey. The future of youth football scouting starts here.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        className="px-6 py-2 text-black rounded-full text-xl font-semibold transition"
                        style={{ backgroundColor: theme.colors.primaryCyan }}
                    >
                        Join Now
                    </button>
                    <button
                        className="px-6 py-2  border-2 text-white rounded-full text-xl font-semibold transition"
                        style={{ borderColor: theme.colors.primaryMagenta }}
                    >
                        Join Now
                    </button>

                </div>

            </div>
        </section>
    );
};

export default Banner;
