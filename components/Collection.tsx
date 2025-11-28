"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const properties = [
    {
        id: 1,
        image: "/images/collection_1.webp",
        price: "$18,500,000",
        address: "2800 Carbon Beach, Malibu",
        specs: "5 Beds / 6 Baths / 8,200 Sq Ft",
        desc: "A contemporary masterpiece featuring panoramic city views and private spa.",
    },
    {
        id: 2,
        image: "/images/collection_2.webp",
        price: "$14,000,000",
        address: "1010 Laurel Way, Beverly Hills",
        specs: "9 Beds / 12 Baths / 15,000 Sq Ft",
        desc: "An architectural triumph with seamless indoor-outdoor living spaces.",
    },
    {
        id: 3,
        image: "/images/collection_3.webp",
        price: "$24,900,000",
        address: "45 Star Island Dr, Miami Beach",
        specs: "6 Beds / 8 Baths / 9,400 Sq Ft",
        desc: "Exclusive waterfront estate with private dock and lush tropical gardens.",
    },
    {
        id: 4,
        image: "/images/collection_4.webp",
        price: "$32,000,000",
        address: "1200 Bel Air Road, Los Angeles",
        specs: "8 Beds / 10 Baths / 12,500 Sq Ft",
        desc: "The epitome of luxury living in the heart of Bel Air's most prestigious enclave.",
    },
    {
        id: 5,
        image: "/images/collection_5.webp",
        price: "$45,000,000",
        address: "9904 Kip Drive, Beverly Hills",
        specs: "7 Beds / 9 Baths / 11,000 Sq Ft",
        desc: "A grand estate offering unparalleled privacy and breathtaking canyon views.",
    },
];

const logos = [
    { name: "Daily Mail", src: "/images/assets/1.svg" },
    { name: "Bloomberg", src: "/images/assets/2.svg" },
    { name: "Fidelity", src: "/images/assets/3.svg" },
    { name: "Studio", src: "/images/assets/4.svg" },
    { name: "NYT", src: "/images/assets/5.svg" },
];

export default function Collection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const logosRef = useRef<HTMLDivElement>(null);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % properties.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate Logos
                        gsap.fromTo(logosRef.current,
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
                        );

                        // Animate Header
                        gsap.fromTo(headerRef.current,
                            { opacity: 0, y: 30 },
                            { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
                        );

                        // Animate Carousel Container
                        gsap.fromTo(containerRef.current,
                            { opacity: 0, y: 50 },
                            { opacity: 1, y: 0, duration: 1.2, delay: 1, ease: "power3.out" }
                        );

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

    useEffect(() => {
        if (!containerRef.current) return;

        const updateLayout = () => {
            const isMobile = window.innerWidth < 768;

            properties.forEach((_, index) => {
                const card = cardsRef.current[index];
                if (!card) return;

                let offset = (index - currentIndex);
                const len = properties.length;
                const halfLen = Math.floor(len / 2);
                offset = ((index - currentIndex + len + halfLen) % len) - halfLen;

                let xPercent = 0;
                let widthPercent = 25;
                let zIndex = 0;
                let scale = 1;
                let opacity = 1;

                if (isMobile) {
                    // Mobile: Show only active card, full width
                    if (offset === 0) {
                        xPercent = 0;
                        widthPercent = 100;
                        zIndex = 20;
                        opacity = 1;
                    } else {
                        xPercent = offset < 0 ? -100 : 100;
                        widthPercent = 100;
                        zIndex = 0;
                        opacity = 0;
                    }
                } else {
                    // Desktop: 3-6-3 layout
                    if (offset === 0) {
                        xPercent = 25;
                        widthPercent = 50;
                        zIndex = 20;
                    } else if (offset === -1) {
                        xPercent = 0;
                        widthPercent = 25;
                        zIndex = 10;
                    } else if (offset === 1) {
                        xPercent = 75;
                        widthPercent = 25;
                        zIndex = 10;
                    } else if (offset < -1) {
                        xPercent = -25;
                        widthPercent = 25;
                        zIndex = 0;
                        opacity = 0;
                    } else if (offset > 1) {
                        xPercent = 100;
                        widthPercent = 25;
                        zIndex = 0;
                        opacity = 0;
                    }
                }

                gsap.to(card, {
                    left: `${xPercent}%`,
                    width: `${widthPercent}%`,
                    zIndex: zIndex,
                    opacity: opacity,
                    duration: 1.2,
                    ease: "power3.inOut",
                });
            });
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, [currentIndex]);

    return (
        <section id="collection" ref={sectionRef} className="w-full h-screen flex flex-col justify-center px-4 md:px-12 bg-white overflow-hidden pb-12">
            {/* Logos */}
            <div ref={logosRef} className="flex flex-wrap justify-center items-center gap-8 md:gap-22 mb-16 opacity-0 grayscale max-w-5xl mx-auto w-full">
                {logos.map((logo) => (
                    <div
                        key={logo.name}
                        className="relative h-5 md:h-6 w-20 md:w-30 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    >
                        <Image
                            src={logo.src}
                            alt={logo.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Header */}
            <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-8 opacity-0">
                <h2 className="text-[30px] font-medium text-black tracking-tight leading-none translate-y-1.5">
                    The Signature Collection
                </h2>

                <div className="flex flex-col gap-8 w-full md:w-auto">
                    <p className="text-black max-w-[300px] text-right md:text-left ml-auto font-medium leading-relaxed">
                        A curation of exclusive homes <br className="hidden md:block" /> currently available for acquisition.
                    </p>

                    <div className="flex items-center gap-4 justify-end">
                        <button
                            onClick={handlePrev}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black bg-black text-white flex items-center justify-center transition-transform hover:scale-105"
                        >
                            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </button>

                        <span className="text-base md:text-lg font-medium tabular-nums text-black">
                            0{currentIndex + 1}<span className="text-neutral-500">/5</span>
                        </span>

                        <button
                            onClick={handleNext}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black bg-black text-white flex items-center justify-center transition-transform hover:scale-105"
                        >
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Carousel Container */}
            <div ref={containerRef} className="relative w-full h-[500px] md:h-[600px] opacity-0">
                {properties.map((property, index) => {
                    const isActive = index === currentIndex;

                    return (
                        <div
                            key={property.id}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className="absolute top-0 h-full px-0 md:px-3" // Remove gap padding on mobile since it's full width
                            style={{
                                left: '100%',
                                width: '25%',
                            }}
                        >
                            <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl">
                                <Image
                                    src={property.image}
                                    alt={property.address}
                                    fill
                                    className="object-cover"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Content Container */}
                                <div className={`absolute bottom-6 left-6 right-6 transition-all duration-700 ${isActive ? "delay-300" : ""}`}>
                                    <div className={`bg-black/20 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 shadow-2xl overflow-hidden h-full flex flex-col justify-end relative`}>
                                        <div className="flex flex-col md:flex-row md:items-end w-full">

                                            {/* Left Side: Basic Info */}
                                            <div className={`flex-shrink-0 transition-all duration-700 ${isActive ? "w-full md:w-1/2 md:border-r md:border-white/10 md:pr-6 delay-300" : "w-full"}`}>
                                                <h3 className="text-2xl md:text-[25px] font-medium text-white mb-2">{property.price}</h3>
                                                <p className="text-white/90 text-sm mb-1 md:mb-2">{property.address}</p>
                                                <p className="text-white/70 text-xs">{property.specs}</p>
                                            </div>

                                            {/* Right Side: Extended Info (Desktop Only) */}
                                            <div className={`hidden md:flex flex-grow pl-6 justify-between items-end transition-all duration-700 ${isActive ? "opacity-100 translate-x-0 delay-500" : "opacity-0 translate-x-10 hidden"}`}>
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-white/80 text-xs uppercase tracking-wider">Active Listing</span>
                                                    <p className="text-white/90 text-sm leading-relaxed max-w-[200px] line-clamp-2">
                                                        {property.desc}
                                                    </p>
                                                </div>

                                                <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/20 backdrop-blur-md flex-shrink-0">
                                                    <ArrowUpRight className="w-5 h-5 text-white stroke-[2.5px]" />
                                                </div>
                                            </div>

                                            {/* Mobile Arrow (Absolute Bottom Right) */}
                                            <div className="md:hidden absolute bottom-6 right-6">
                                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-md">
                                                    <ArrowUpRight className="w-4 h-4 text-white stroke-[2.5px]" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
