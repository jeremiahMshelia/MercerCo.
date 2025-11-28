"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const innerContentRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const textBaseRef = useRef<HTMLSpanElement>(null);
    const textOverlayRef = useRef<HTMLSpanElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => setIsComplete(true),
        });

        // 1. Fill Animation (L -> R)
        tl.to(fillRef.current, {
            width: "100%",
            duration: 2.5,
            ease: "power2.inOut",
        })
            // 2. Zoom In (Start expanding the Pill)
            // Text remains visible because we removed the explicit fade out
            .to(pillRef.current, {
                scale: 50,
                duration: 2.0,
                ease: "power3.inOut",
            })
            // 3. Fade Text Sooner (Simple animation)
            .to([textBaseRef.current, textOverlayRef.current], {
                opacity: 0,
                duration: 0.4,
                ease: "power1.out",
            }, "<") // Start at the same time as zoom
            // 4. Reveal Hero INSIDE the Pill (Fade out the cover)
            // Start sooner so Hero appears "a tiny bit sooner"
            .to(innerContentRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
            }, "<+=0.15")
            // 5. Cleanup
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.2,
            });

    }, []);

    if (isComplete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-[var(--app-vh,100vh)] z-[9999] flex items-center justify-center pointer-events-none"
        >
            {/* Pill Container (The Window) */}
            {/* box-shadow creates the black screen around the pill */}
            <div
                ref={pillRef}
                className="relative w-[350px] h-[90px] rounded-[32px] flex items-center justify-center overflow-hidden"
                style={{ boxShadow: "0 0 0 9999px black" }}
            >
                {/* Inner Content (The Cover) */}
                <div
                    ref={innerContentRef}
                    className="absolute inset-0 bg-[#383838] flex items-center justify-center"
                >
                    {/* Base Text (White) */}
                    <span
                        ref={textBaseRef}
                        className="absolute z-10 text-white font-medium text-3xl tracking-tight whitespace-nowrap"
                    >
                        Mercer & Co.
                    </span>

                    {/* Fill Layer (White) */}
                    {/* z-20 ensures this covers the base text to show the black text overlay */}
                    <div
                        ref={fillRef}
                        className="absolute top-0 left-0 h-full w-0 bg-white overflow-hidden z-20"
                    >
                        {/* Overlay Text Container - Matches Parent Size Exactly */}
                        <div className="w-[350px] h-[90px] flex items-center justify-center">
                            <span
                                ref={textOverlayRef}
                                className="text-black font-medium text-3xl tracking-tight whitespace-nowrap"
                            >
                                Mercer & Co.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
