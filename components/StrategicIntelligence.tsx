"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function StrategicIntelligence() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

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

                        // Animate Image (Desktop only)
                        if (window.innerWidth >= 1024) {
                            gsap.fromTo(imageRef.current,
                                { opacity: 0, y: 50 },
                                { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: "power3.out" }
                            );
                        }

                        // Animate Stats Cards (Staggered)
                        if (statsRef.current) {
                            gsap.fromTo(statsRef.current.children,
                                { opacity: 0, y: 40 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 1,
                                    stagger: 0.15,
                                    delay: 0.6,
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
        <section ref={sectionRef} className="w-full min-h-screen md:h-screen px-4 md:px-12 py-12 bg-white flex flex-col justify-center overflow-y-auto md:overflow-hidden">
            {/* Header */}
            <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 opacity-0 flex-shrink-0">
                <h2 className="text-[30px] font-medium text-black tracking-tight leading-tight max-w-md">
                    Strategic Intelligence <br /> & Market Insight
                </h2>

                <p className="text-black max-w-[400px] text-left md:text-right ml-auto font-medium leading-relaxed">
                    At Mercer & Co. we believe true value is found where data meets intuition. We look beyond the surface trends to provide our clients with the clarity and confidence needed to make lasting investment decisions.
                </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 h-auto md:h-[60vh] lg:h-[65vh]">
                {/* Left Column: Large Image (Hidden on Mobile/Tablet, visible on Desktop) */}
                <div ref={imageRef} className="hidden lg:block relative w-full h-full rounded-[32px] overflow-hidden opacity-0">
                    <Image
                        src="/images/strategic_img.webp"
                        alt="Strategic Intelligence"
                        fill
                        className="object-cover"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Right Column: Stats Grid */}
                <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-full">
                    {/* Card 1 */}
                    <div
                        className={`bg-[#E6E6E6] rounded-[32px] p-6 flex flex-col justify-center items-center text-center w-[320px] h-[120px] md:w-full md:h-full transition-colors duration-500 hover:bg-black group cursor-pointer opacity-0 mx-auto active:bg-black active:scale-95 md:active:scale-100`}
                    >
                        <span className="text-[33px] md:text-5xl font-medium text-black group-hover:text-white group-active:text-white transition-colors duration-500 mb-2">$125M+</span>
                        <span className="text-black/70 group-hover:text-white/70 group-active:text-white/70 transition-colors duration-500 text-sm font-medium">Quarterly Sales Volume</span>
                    </div>

                    {/* Card 2 */}
                    <div
                        className={`bg-[#E6E6E6] rounded-[32px] p-6 flex flex-col justify-center items-center text-center w-[320px] h-[120px] md:w-full md:h-full transition-colors duration-500 hover:bg-black group cursor-pointer opacity-0 mx-auto active:bg-black active:scale-95 md:active:scale-100`}
                    >
                        <span className="text-[33px] md:text-5xl font-medium text-black group-hover:text-white group-active:text-white transition-colors duration-500 mb-2">19 Days</span>
                        <span className="text-black/70 group-hover:text-white/70 group-active:text-white/70 transition-colors duration-500 text-sm font-medium">Average Days On Market</span>
                    </div>

                    {/* Card 3 */}
                    <div
                        className={`bg-[#E6E6E6] rounded-[32px] p-6 flex flex-col justify-center items-center text-center w-[320px] h-[120px] md:w-full md:h-full transition-colors duration-500 hover:bg-black group cursor-pointer opacity-0 mx-auto active:bg-black active:scale-95 md:active:scale-100`}
                    >
                        <span className="text-[33px] md:text-5xl font-medium text-black group-hover:text-white group-active:text-white transition-colors duration-500 mb-2">98.5%</span>
                        <span className="text-black/70 group-hover:text-white/70 group-active:text-white/70 transition-colors duration-500 text-sm font-medium">List-To-Sale Price Ratio</span>
                    </div>

                    {/* Card 4 */}
                    <div
                        className={`bg-[#E6E6E6] rounded-[32px] p-6 flex flex-col justify-center items-center text-center w-[320px] h-[120px] md:w-full md:h-full transition-colors duration-500 hover:bg-black group cursor-pointer opacity-0 mx-auto active:bg-black active:scale-95 md:active:scale-100`}
                    >
                        <span className="text-[33px] md:text-5xl font-medium text-black group-hover:text-white group-active:text-white transition-colors duration-500 mb-2">450+</span>
                        <span className="text-black/70 group-hover:text-white/70 group-active:text-white/70 transition-colors duration-500 text-sm font-medium">Private Client Network</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
