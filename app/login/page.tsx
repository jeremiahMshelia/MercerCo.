"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Check, ArrowLeft } from "lucide-react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <main className="relative w-full h-screen overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/location_1.webp"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Back to Home */}
            <Link href="/" className="absolute top-8 left-8 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition-all group">
                <ArrowLeft className="w-5 h-5 text-white" />
            </Link>

            {/* Glass Card */}
            <div className="relative z-10 w-full max-w-[420px] p-4">
                <div className="bg-black/50 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-medium text-white mb-3">Welcome back</h1>
                        <p className="text-white/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                            Enter your details to access your private dashboard.
                        </p>
                    </div>

                    {/* Social Login */}
                    <button className="w-full h-14 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-3 transition-colors mb-10 group">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        <span className="text-white font-medium text-sm">Continue with Google</span>
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-[1px] flex-1 bg-white/10" />
                        <span className="text-white/40 text-xs uppercase tracking-wider">or sign in with email</span>
                        <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    {/* Form */}
                    <form className="space-y-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-white/80 text-xs font-medium ml-1">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-white/80 text-xs font-medium ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between pt-2">
                            <button
                                type="button"
                                onClick={() => setRememberMe(!rememberMe)}
                                className="flex items-center gap-2 group"
                            >
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${rememberMe ? "bg-white border-white" : "border-white/30 group-hover:border-white/50"}`}>
                                    {rememberMe && <Check className="w-3 h-3 text-black" />}
                                </div>
                                <span className="text-white/70 text-sm group-hover:text-white transition-colors">Remember me</span>
                            </button>
                            <Link href="#" className="text-white/70 text-sm hover:text-white hover:underline transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button className="w-full h-14 bg-white text-black rounded-xl font-medium text-base flex items-center justify-center gap-2 hover:bg-white/90 transition-colors mt-4">
                            Sign In
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="text-center mt-6">
                        <p className="text-white/60 text-xs">
                            Don't have an account?{" "}
                            <Link href="#" className="text-white font-medium hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}
