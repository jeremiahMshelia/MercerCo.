"use client";

import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import { useState } from 'react';

export default function Hero() {
    const [intent, setIntent] = useState("Buy");
    const [location, setLocation] = useState("New York");
    const [residence, setResidence] = useState("Penthouse");
    const [budget, setBudget] = useState("Any Price");
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    return (
        <section id="home" className="relative w-full px-4 md:px-12 pb-8 bg-black">
            <div className="relative w-full h-[85vh] rounded-[2rem]">
                {/* Background Container (Clipped) */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
                    <Image
                        src="/images/hero_img.webp"
                        alt="Luxury Estate"
                        fill
                        className="object-cover scale-115"
                        priority
                        quality={100}
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                </div>

                {/* Content (Not Clipped) */}
                <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 pointer-events-none">
                    <div className="max-w-4xl -mt-70 pointer-events-auto">
                        <h1 className="text-5xl md:text-[80px] font-medium text-white leading-[1.1] tracking-tight mb-6">
                            Acquire The <br /> Extraordinary
                        </h1>
                        <p className="text-white/90 text-base md:text-[16px] font-medium max-w-[400px] leading-relaxed">
                            Representing the pinnacle of architectural excellence, we present a curated portfolio of the world's most desirable estates, available for immediate ownership.
                        </p>
                    </div>

                    {/* Search/Filter Bar */}
                    <div className="absolute bottom-12 md:bottom-20 left-6 md:left-16 lg:left-24 bg-black/5 backdrop-blur-md border border-white/10 rounded-[40px] p-1.5 md:p-2 pr-1.5 md:pr-2 flex items-center gap-2 max-w-fit shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_32px_0_rgba(0,0,0,0.2)] z-50 pointer-events-auto">

                        <div className="flex items-center gap-4 md:gap-6 px-4 md:px-5 py-4 md:py-7">
                            {/* Intent */}
                            <div
                                className="flex flex-col gap-0.5 cursor-pointer relative"
                                onClick={() => setActiveDropdown(activeDropdown === "Intent" ? null : "Intent")}
                            >
                                <span className="text-[12px] md:text-[14px] font-light tracking-wide text-white/80">Intent</span>
                                <div className="flex items-center gap-2 text-white text-[14px] md:text-[16px] font-normal whitespace-nowrap">
                                    {intent} <ChevronDown className={`w-3 h-3 md:w-3.5 md:h-3.5 text-white/80 transition-transform duration-300 ${activeDropdown === "Intent" ? "rotate-180 text-white" : ""}`} />
                                </div>

                                {/* Dropdown */}
                                <div className={`absolute top-full left-0 pt-4 w-32 transition-all z-[100] ${activeDropdown === "Intent" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                                    <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                        <div className="py-2">
                                            {["Buy", "Rent", "Sell"].map((item) => (
                                                <div
                                                    key={item}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIntent(item);
                                                        setActiveDropdown(null);
                                                    }}
                                                    className="px-4 py-2 hover:bg-white/10 text-white text-sm transition-colors"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div
                                className="flex flex-col gap-0.5 cursor-pointer relative"
                                onClick={() => setActiveDropdown(activeDropdown === "Location" ? null : "Location")}
                            >
                                <span className="text-[12px] md:text-[14px] font-light tracking-wide text-white/80">Location</span>
                                <div className="flex items-center gap-2 text-white text-[14px] md:text-[16px] font-normal whitespace-nowrap">
                                    {location} <ChevronDown className={`w-3 h-3 md:w-3.5 md:h-3.5 text-white/80 transition-transform duration-300 ${activeDropdown === "Location" ? "rotate-180 text-white" : ""}`} />
                                </div>

                                {/* Dropdown */}
                                <div className={`absolute top-full left-0 pt-4 w-40 transition-all z-[100] ${activeDropdown === "Location" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                                    <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                        <div className="py-2">
                                            {["New York", "Los Angeles", "Miami", "London"].map((item) => (
                                                <div
                                                    key={item}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setLocation(item);
                                                        setActiveDropdown(null);
                                                    }}
                                                    className="px-4 py-2 hover:bg-white/10 text-white text-sm transition-colors"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Residence - Hidden on mobile */}
                            <div
                                className="hidden md:flex flex-col gap-0.5 cursor-pointer relative"
                                onClick={() => setActiveDropdown(activeDropdown === "Residence" ? null : "Residence")}
                            >
                                <span className="text-[14px] font-light tracking-wide text-white/80">Residence</span>
                                <div className="flex items-center gap-2 text-white text-[16px] font-normal whitespace-nowrap">
                                    {residence} <ChevronDown className={`w-3.5 h-3.5 text-white/80 transition-transform duration-300 ${activeDropdown === "Residence" ? "rotate-180 text-white" : ""}`} />
                                </div>

                                {/* Dropdown */}
                                <div className={`absolute top-full left-0 pt-4 w-40 transition-all z-[100] ${activeDropdown === "Residence" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                                    <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                        <div className="py-2">
                                            {["Penthouse", "Villa", "Apartment", "Estate"].map((item) => (
                                                <div
                                                    key={item}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setResidence(item);
                                                        setActiveDropdown(null);
                                                    }}
                                                    className="px-4 py-2 hover:bg-white/10 text-white text-sm transition-colors"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Budget - Hidden on mobile */}
                            <div
                                className="hidden md:flex flex-col gap-0.5 cursor-pointer relative"
                                onClick={() => setActiveDropdown(activeDropdown === "Budget" ? null : "Budget")}
                            >
                                <span className="text-[14px] font-light tracking-wide text-white/80">Budget</span>
                                <div className="flex items-center gap-2 text-white text-[16px] font-normal whitespace-nowrap">
                                    {budget} <ChevronDown className={`w-3.5 h-3.5 text-white/80 transition-transform duration-300 ${activeDropdown === "Budget" ? "rotate-180 text-white" : ""}`} />
                                </div>

                                {/* Dropdown */}
                                <div className={`absolute top-full right-0 pt-4 w-40 transition-all z-[100] ${activeDropdown === "Budget" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                                    <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                        <div className="py-2">
                                            {["Any Price", "< $1M", "$1M - $5M", "> $5M"].map((item) => (
                                                <div
                                                    key={item}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setBudget(item);
                                                        setActiveDropdown(null);
                                                    }}
                                                    className="px-4 py-2 hover:bg-white/10 text-white text-sm transition-colors"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search Button */}
                        <button className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10 flex-shrink-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_4px_10px_0_rgba(0,0,0,0.2)] backdrop-blur-md">
                            <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
