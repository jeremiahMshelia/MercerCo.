"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "The Collection", href: "#collection" },
        { name: "Global Reach", href: "#global-reach" },
        { name: "Advisory", href: "#advisory" },
        { name: "Private Office", href: "#footer" },
    ];

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // If mobile menu is open, don't hide navbar
            if (isOpen) return;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // Scrolling Down -> Hide
                gsap.to(navRef.current, {
                    y: "-150%",
                    duration: 0.5,
                    ease: "power1.out",
                });
            } else {
                // Scrolling Up -> Show
                gsap.to(navRef.current, {
                    y: "0%",
                    duration: 0.6,
                    ease: "power1.out",
                });
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";

            // Menu Animation
            gsap.to(menuRef.current, {
                y: 0,
                duration: 0.8,
                ease: "power3.inOut",
            });

            // Links Animation
            gsap.fromTo(
                linksRef.current?.children || [],
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.4,
                    ease: "power3.out",
                }
            );

            // Hamburger Animation (to X)
            gsap.to(line1Ref.current, {
                rotate: 45,
                y: 4,
                width: "24px",
                backgroundColor: "#ffffff",
                duration: 0.3,
            });
            gsap.to(line2Ref.current, {
                rotate: -45,
                y: -4,
                width: "24px",
                backgroundColor: "#ffffff",
                duration: 0.3,
            });

        } else {
            document.body.style.overflow = "";

            // Menu Animation
            gsap.to(menuRef.current, {
                y: "-100%",
                duration: 0.8,
                ease: "power3.inOut",
            });

            // Hamburger Animation (back to normal)
            gsap.to(line1Ref.current, {
                rotate: 0,
                y: 0,
                width: "24px", // Reset to initial w-6 (24px)
                backgroundColor: "#000000",
                duration: 0.3,
            });
            gsap.to(line2Ref.current, {
                rotate: 0,
                y: 0,
                width: "16px", // Reset to initial w-4 (16px)
                backgroundColor: "#000000",
                duration: 0.3,
            });
        }
    }, [isOpen]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.substring(1);

            // Special handling for Home to ensure it goes to the very top
            if (targetId === "home") {
                setIsOpen(false);
                const scrollObj = { y: window.scrollY };
                gsap.to(scrollObj, {
                    y: 0,
                    duration: 1.5,
                    ease: "power3.inOut",
                    onUpdate: () => window.scrollTo(0, scrollObj.y)
                });
                return;
            }

            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                setIsOpen(false);

                // GSAP Smooth Scroll with Offset for Navbar
                const offset = 0; // Adjust based on navbar height
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const targetPosition = elementPosition - offset;
                const startPosition = window.scrollY;

                const scrollObj = { y: startPosition };

                gsap.to(scrollObj, {
                    y: targetPosition,
                    duration: 1.5,
                    ease: "power3.inOut",
                    onUpdate: () => {
                        window.scrollTo(0, scrollObj.y);
                    }
                });
            }
        } else {
            setIsOpen(false);
        }
    };

    return (
        <>
            <div ref={navRef} className="w-full pt-4 pb-4 px-4 md:px-12 flex justify-center sticky top-0 z-50">
                <nav
                    className={`w-full backdrop-blur-md border rounded-[28px] px-6 md:px-8 py-3 flex items-center justify-between shadow-sm transition-colors duration-500 ${isOpen ? "bg-transparent border-transparent" : "bg-white/50 border-white/20"
                        }`}
                >
                    <div className="flex-shrink-0 mr-4 md:mr-12 z-50">
                        <Link
                            href="#home"
                            onClick={(e) => handleLinkClick(e, "#home")}
                            className={`text-lg md:text-[20px] font-bold tracking-tight uppercase transition-colors duration-500 ${isOpen ? "text-white" : "text-black"
                                }`}
                        >
                            Mercer & Co.
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-12 mr-44 ml-auto">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className="text-base font-bold text-black hover:text-neutral-600 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:block flex-shrink-0">
                        <Link href="/login">
                            <button className="bg-[#1a0f0a] text-white px-7 py-2.5 rounded-[16px] text-[16px] font-medium hover:bg-black transition-colors">
                                Join / Sign in
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Fancy Hamburger */}
                    <button
                        ref={hamburgerRef}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2 group z-50"
                    >
                        <span ref={line1Ref} className="w-6 h-0.5 bg-black rounded-full transition-all ml-auto block origin-center"></span>
                        <span ref={line2Ref} className="w-4 h-0.5 bg-black rounded-full transition-all ml-auto block origin-center"></span>
                    </button>
                </nav>
            </div>

            {/* Full Screen Mobile Menu */}
            <div
                ref={menuRef}
                className="fixed top-0 left-0 w-full h-[100dvh] bg-black z-[200] flex flex-col items-center justify-center translate-y-[-100%]"
            >
                <div ref={linksRef} className="flex flex-col items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="text-4xl font-light text-white hover:text-neutral-400 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-white/70 hover:text-white mt-8 transition-colors"
                    >
                        Join / Sign in
                    </Link>
                </div>
            </div>
        </>
    );
}
