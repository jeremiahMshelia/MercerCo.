"use client";

import { type ReactNode, useEffect } from "react";

interface ViewportProviderProps {
    children: ReactNode;
}

export default function ViewportProvider({ children }: ViewportProviderProps) {
    useEffect(() => {
        const setVh = () => {
            // Use visualViewport height if available, otherwise fallback to innerHeight
            const vh = window.visualViewport?.height ?? window.innerHeight;
            document.documentElement.style.setProperty("--app-vh", `${vh}px`);
        };

        setVh();

        // Listeners for various events that might change viewport size
        window.visualViewport?.addEventListener("resize", setVh);
        window.visualViewport?.addEventListener("scroll", setVh);
        window.addEventListener("resize", setVh);
        window.addEventListener("orientationchange", setVh);

        return () => {
            window.visualViewport?.removeEventListener("resize", setVh);
            window.visualViewport?.removeEventListener("scroll", setVh);
            window.removeEventListener("resize", setVh);
            window.removeEventListener("orientationchange", setVh);
        };
    }, []);

    return <>{children}</>;
}
