
"use client"
import { UserPlus, FileText, Heart, Trophy } from 'lucide-react';
import { useSelector } from 'react-redux';
import SectionTitel from './ReUseable/SectionTitle';

const steps = [
    {
        number: '01',
        icon: UserPlus,
        title: 'Join',
        description: 'Sign up and create your account in under 2 minutes'
    },
    {
        number: '02',
        icon: FileText,
        title: 'Build Profile',
        description: 'Showcase your skills, stats, and highlight videos'
    },
    {
        number: '03',
        icon: Trophy,
        title: 'Get Discovered',
        description: 'Connect with scouts and clubs worldwide'
    }
];

const HowItWorks = () => {
    const theme = useSelector(state => state.theme);
    return (
        <section className="py-10 px-4 ">
            <div className="container mx-auto px-4">
                {/* Header */}
                {/* <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl  font-bold mb-2 inline-block"
                        style={{
                            backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        HOW IT WORKS
                    </h2>
                    <p className="text-landing mt-2">
                        Your journey to professional football starts with three simple steps.
                    </p>
                </div> */}

                <SectionTitel title=" HOW IT WORKS" subtitle=" Your journey to professional football starts with three simple steps."/>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative p-8 rounded-lg border-2 border-purple-500/60 bg-background/50 text-center group hover:border-purple-400 transition-colors duration-300"
                        style={{ borderColor: theme.colors.primaryMagenta }}
                        
                        >
                            {/* Step Number */}
                            <div className="font-display text-6xl font-bold mb-6 text-landing-number ">
                                {step.number}
                            </div>

                            <div
                                className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-6"
                                style={{
                                    background: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                                }}
                            >
                                <step.icon className="w-6 h-6 text-white" />
                            </div>


                            {/* Title */}
                            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;