"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;

        gsap.fromTo(card,
            {
                y: 100,
                opacity: 0,
                scale: 0.95,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#footer",
                    start: "top 80%", // Start animation when footer top hits 80% of viewport
                    toggleActions: "play none none reverse",
                }
            }
        );
    }, []);

    return (
        <footer id="footer" className="relative w-full min-h-screen md:h-screen px-4 md:px-8 overflow-hidden flex items-end pb-4 md:pb-8">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/footer.webp"
                    alt="Footer Background"
                    fill
                    className="object-cover object-[center_20%] brightness-130 contrast-120"
                />
            </div>

            <div
                ref={cardRef}
                className="relative z-10 w-full bg-black/5 backdrop-blur-[80px] border border-white/10 rounded-[32px] p-8 md:p-10 text-white flex flex-col justify-between shadow-2xl mt-20 md:mt-0"
            >

                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mb-10">

                    {/* Left Side: Brand & Newsletter */}
                    <div className="flex flex-col justify-between gap-10 max-w-sm">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold tracking-tight uppercase mb-4">
                                Mercer & Co.
                            </h2>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Facilitating the acquisition of the world's most significant assets through deep market intelligence, global reach, and uncompromising discretion.
                            </p>
                        </div>

                        <div>
                            <span className="text-white font-medium text-base block mb-3">The Private Briefing</span>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all pr-12 text-sm"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Menus */}
                    <div className="flex-1 flex lg:justify-end">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-20 w-full lg:w-auto">
                            {/* Column 1: The Firm */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-base font-medium mb-1 text-white">The Firm</h3>
                                <Link href="#collection" className="text-white/60 hover:text-white transition-colors text-sm">The Collection</Link>
                                <Link href="#global-reach" className="text-white/60 hover:text-white transition-colors text-sm">Our Territories</Link>
                                <Link href="#advisory" className="text-white/60 hover:text-white transition-colors text-sm">Market Intelligence</Link>
                                <Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">The Journal</Link>
                            </div>

                            {/* Column 2: Corporate */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-base font-medium mb-1 text-white">Corporate</h3>
                                <Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">Press Room</Link>
                                <Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">Careers</Link>
                                <Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">Contact</Link>
                                <Link href="/login" className="text-white/60 hover:text-white transition-colors text-sm">Private Office</Link>
                            </div>

                            {/* Column 3: Global HQ */}
                            <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
                                <h3 className="text-base font-medium mb-1 text-white">Global HQ</h3>
                                <p className="text-white/60 text-sm">57th Street, New York</p>
                                <p className="text-white/60 text-sm">Mayfair, London</p>
                                <p className="text-white/60 text-sm mt-1">+223 (70) 555-0198</p>
                                <a href="mailto:inquiries@mercer.co" className="text-white/60 hover:text-white transition-colors text-sm underline decoration-white/30 hover:decoration-white">
                                    inquiries@mercer.co
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-white/10 mb-6" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-white/40 text-sm">© 2025 Mercer & Co. Real Estate.</span>
                        <span className="text-white/40 text-sm">Crafted by JETI</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                        <Link href="#" className="text-white/40 hover:text-white transition-colors text-sm mr-8 md:mr-56">Privacy Policy</Link>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="text-white/40 hover:text-white transition-colors text-sm">Instagram</Link>
                            <Link href="#" className="text-white/40 hover:text-white transition-colors text-sm">LinkedIn</Link>
                            <Link href="#" className="text-white/40 hover:text-white transition-colors text-sm">Twitter(X)</Link>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
