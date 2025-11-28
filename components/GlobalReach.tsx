"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function GlobalReach() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate Header
                        gsap.fromTo(headerRef.current,
                            { opacity: 0, y: 30 },
                            { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
                        );

                        // Animate Content Grid
                        if (contentRef.current) {
                            gsap.fromTo(contentRef.current.children,
                                { opacity: 0, y: 40 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 1,
                                    stagger: 0.2,
                                    delay: 0.4,
                                    ease: "power3.out"
                                }
                            );
                        }

                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="global-reach" ref={sectionRef} className="w-full h-auto md:h-screen px-4 md:px-12 py-12 bg-white flex flex-col justify-center md:overflow-hidden">
            {/* Header */}
            <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 opacity-0 flex-shrink-0">
                <h2 className="text-[30px] font-medium text-black tracking-tight leading-tight max-w-md">
                    Find Your Place <br /> In The World
                </h2>

                <p className="text-black max-w-[400px] text-left md:text-right ml-auto font-medium leading-relaxed">
                    From the skyline of the city to the sanctuary of the coast, discover a setting that reflects who you are.
                </p>
            </div>

            {/* Content Grid */}
            <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 h-auto md:h-[60vh] lg:h-[65vh]">
                {/* Left Column: Large Image (New York) */}
                <div className="relative w-full h-[300px] md:h-full rounded-[32px] overflow-hidden group">
                    <Image
                        src="/images/location_1.webp"
                        alt="New York"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-8 left-8">
                        <h3 className="text-3xl text-white font-medium mb-1">New York</h3>
                        <p className="text-white/70 text-sm">145 Listings</p>
                    </div>
                </div>

                {/* Right Column: Split Grid */}
                <div className="flex flex-col gap-4 md:grid md:grid-rows-2 md:gap-6 h-auto md:h-full">
                    {/* Top Row: The Hamptons Image */}
                    <div className="relative w-full h-[300px] md:h-full rounded-[32px] overflow-hidden group flex-shrink-0">
                        <Image
                            src="/images/location_2.webp"
                            alt="The Hamptons"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6">
                            <h3 className="text-2xl text-white font-medium mb-1">The Hamptons</h3>
                            <p className="text-white/70 text-sm">42 Listings</p>
                        </div>
                    </div>

                    {/* Bottom Row: Split Columns */}
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 h-auto md:h-full flex-shrink-0">
                        {/* Miami Image */}
                        <div className="relative w-full h-[300px] md:h-full rounded-[32px] overflow-hidden group">
                            <Image
                                src="/images/location_3.webp"
                                alt="Miami"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-2xl text-white font-medium mb-1">Miami</h3>
                                <p className="text-white/70 text-sm">84 Listings</p>
                            </div>
                        </div>

                        {/* Text/Action Card */}
                        <div className="bg-black rounded-[32px] p-8 flex flex-col justify-center h-[300px] md:h-full relative overflow-hidden group cursor-pointer">
                            {/* Hover Gradient Effect */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <span className="text-[30px] font-medium text-white block mb-1">200+</span>
                                    <span className="text-white/70 text-sm font-medium">Properties</span>
                                </div>

                                <div>
                                    <p className="text-white/80 text-sm leading-relaxed max-w-[200px] mb-4">
                                        Explore our wide variety of properties to find the dream home for you
                                    </p>
                                </div>
                            </div>

                            {/* Arrow Button */}
                            <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                                <ArrowUpRight className="w-5 h-5 stroke-[2.5px] text-white group-hover:text-black" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
