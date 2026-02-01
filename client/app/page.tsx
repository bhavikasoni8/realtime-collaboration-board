"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/Home.css";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Geometric shapes */}
        <svg
          className="absolute top-20 right-20 w-24 h-24 text-white/5 animate-float"
          viewBox="0 0 100 100"
        >
          <polygon points="50,10 90,90 10,90" fill="currentColor" />
        </svg>
        <svg
          className="absolute bottom-32 left-32 w-16 h-16 text-white/5 animate-float"
          style={{ animationDelay: "1s" }}
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
        <svg
          className="absolute top-1/2 right-1/3 w-20 h-20 text-white/5 animate-float"
          style={{ animationDelay: "3s" }}
          viewBox="0 0 100 100"
        >
          <rect width="80" height="80" x="10" y="10" fill="currentColor" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full">
          {/* Logo/Badge */}
          <div
            className={`flex justify-center mb-8 ${
              mounted ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0s" }}
          >
            <div className="glass px-6 py-2.5 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-white/80 text-sm font-medium tracking-wide">
                Real-time Collaboration Platform
              </span>
            </div>
          </div>

          {/* Hero heading */}
          <div className="text-center mb-12">
            <h1
              className={`text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight ${
                mounted ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: "0.1s" }}
            >
              <span className="block text-white mb-2">Create.</span>
              <span className="block gradient-border mb-2">Collaborate.</span>
              <span className="block text-white">Connect.</span>
            </h1>

            <p
              className={`text-xl md:text-2xl text-indigo-200 max-w-3xl mx-auto leading-relaxed ${
                mounted ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              A distributed whiteboard that brings teams together in real-time.
              Built for scale with enterprise-grade architecture.
            </p>
          </div>

          {/* CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 ${
              mounted ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            <button
              onClick={() => router.push("/login")}
              className="group glow-button px-8 py-4 rounded-xl bg-white text-indigo-950 font-semibold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>

            <button
              onClick={() => router.push("/register")}
              className="group px-8 py-4 rounded-xl glass text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/40"
            >
              <span>Create Account</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </button>
          </div>

          {/* Tech stack badges */}
          <div
            className={`flex flex-wrap justify-center gap-3 mb-20 ${
              mounted ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            {["Next.js", "WebSockets", "Redis", "MongoDB", "JWT Auth"].map(
              (tech, i) => (
                <div
                  key={tech}
                  className="glass px-4 py-2 rounded-lg text-white/90 text-sm font-medium hover:bg-white/10 transition-all duration-300 hover:scale-110 cursor-default"
                  style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                >
                  {tech}
                </div>
              )
            )}
          </div>

          {/* Feature cards */}
          <div
            className={`grid md:grid-cols-3 gap-6 ${
              mounted ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.5s" }}
          >
            <div className="group glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-default">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Real-time Sync
              </h3>
              <p className="text-indigo-200 leading-relaxed">
                See changes instantly as your team collaborates. No refresh
                needed.
              </p>
            </div>

            <div className="group glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-default">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Room-based Collab
              </h3>
              <p className="text-indigo-200 leading-relaxed">
                Create dedicated spaces for different projects and teams.
              </p>
            </div>

            <div className="group glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-default">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Enterprise Scale
              </h3>
              <p className="text-indigo-200 leading-relaxed">
                Redis-powered scaling handles thousands of concurrent users.
              </p>
            </div>
          </div>

          {/* Footer note */}
          <div
            className={`text-center mt-20 ${
              mounted ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.6s" }}
          >
            <p className="text-indigo-300 text-sm">
              Trusted by teams worldwide • SOC 2 compliant • 99.9% uptime
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-950 to-transparent pointer-events-none"></div>
    </div>
  );
}
