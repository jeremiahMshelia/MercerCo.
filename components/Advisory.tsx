"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

const advisoryItems = [
    {
        id: "01",
        question: "How does Mercer & Co. handle off-market listings?",
        answer: "We leverage our extensive private network and exclusive partnerships to access properties before they hit the public market, giving our clients a significant competitive advantage.",
        image: "/images/advisory_1.webp"
    },
    {
        id: "02",
        question: "Can you facilitate transactions for international buyers?",
        answer: "Absolutely. Over 60% of our volume involves international capital. We coordinate with tax advisors, immigration attorneys, and private banks to structure the acquisition efficiently, handling all Know Your Customer (KYC) and compliance requirements remotely.",
        image: "/images/collection_1.webp"
    },
    {
        id: "03",
        question: "Do you offer post-acquisition concierge services?",
        answer: "Yes, our Private Office provides bespoke concierge services, including property management, interior design coordination, and lifestyle management to ensure a seamless transition.",
        image: "/images/collection_3.webp"
    },
    {
        id: "04",
        question: "How are complex financing structures handled?",
        answer: "Our team works closely with leading financial institutions to tailor financing solutions that meet complex requirements, ensuring optimal capital structure for every investment.",
        image: "/images/collection_4.webp"
    },
    {
        id: "05",
        question: "What represents the timeline for a private acquisition?",
        answer: "Timelines vary based on complexity, but our streamlined due diligence and negotiation processes typically allow for a swift and secure closing, often within 30-45 days.",
        image: "/images/collection_5.webp"
    }
];

export default function Advisory() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(1); // Default to 2nd item open as per design

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

                        // Animate Content
                        if (contentRef.current) {
                            gsap.fromTo(contentRef.current,
                                { opacity: 0, y: 40 },
                                { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" }
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

    const toggleAccordion = (index: number) => {
        if (window.innerWidth < 1024) {
            setActiveIndex(activeIndex === index ? null : index);
        } else {
            if (activeIndex !== index) {
                setActiveIndex(index);
            }
        }
    };

    return (
        <section id="advisory" ref={sectionRef} className="w-full min-h-screen px-4 md:px-12 py-24 bg-white flex flex-col justify-center">
            {/* Header */}
            <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8 opacity-0">
                <h2 className="text-[30px] font-medium text-black tracking-tight leading-tight max-w-md">
                    Expertise <br /> & Advisory
                </h2>

                <p className="text-black max-w-[400px] text-left md:text-right ml-auto font-medium leading-relaxed">
                    Navigating the complexities of luxury acquisition with discretion and precision.
                </p>
            </div>

            {/* Content Grid */}
            <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 opacity-0">
                {/* Left Column: Dynamic Image */}
                <div className="lg:col-span-4 relative h-[400px] lg:h-[600px] rounded-[32px] overflow-hidden hidden lg:block">
                    {advisoryItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex === index ? "opacity-100" : "opacity-0"}`}
                        >
                            <Image
                                src={item.image}
                                alt={item.question}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                    ))}
                    {/* Fallback if all closed (optional, keeps last active or default) */}
                    <div className={`absolute inset-0 bg-[#E6E6E6] -z-10`} />
                </div>

                {/* Right Column: Accordion */}
                <div className="lg:col-span-8 flex flex-col">
                    {advisoryItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="border-b border-black/10 last:border-none"
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full py-8 flex items-start text-left group transition-colors"
                            >
                                <span className="text-lg md:text-xl font-medium text-black mr-12 md:mr-50 w-8">
                                    {item.id}
                                </span>
                                <div className="flex-1 pr-8">
                                    <h3 className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${activeIndex === index ? "text-black" : "text-black/80 group-hover:text-black"}`}>
                                        {item.question}
                                    </h3>
                                    <div
                                        className={`grid transition-all duration-500 ease-in-out ${activeIndex === index ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="text-black/60 leading-relaxed max-w-xl">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-1">
                                    {activeIndex === index ? (
                                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transform rotate-45 transition-transform duration-300">
                                            <ArrowUpRight className="w-4 h-4 stroke-[2.5px]" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-black transition-colors duration-300">
                                            <ArrowUpRight className="w-4 h-4 text-black/40 group-hover:text-black stroke-[2.5px]" />
                                        </div>
                                    )}
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
