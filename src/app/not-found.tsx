"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

// Kinetic lines tuned for error state
const KineticLines = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
      <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none">
        {[...Array(6)].map((_, i) => (
          <motion.path
            key={i}
            d={`M-100 ${200 + i * 100}C200 ${100 + i * 50} 400 ${600 - i * 50} 800 ${300 + i * 20}C1200 ${100 + i * 100} 1500 ${400} 1700 ${200}`}
            stroke={`url(#gradNotFound${i})`}
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 0.5, 0],
              pathOffset: [0, 1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
          />
        ))}
        <defs>
          {[...Array(6)].map((_, i) => (
            <linearGradient key={i} id={`gradNotFound${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-400 font-sans selection:bg-blue-500/30 flex flex-col relative overflow-hidden">
      {/* Background layer */}
      <div className="fixed inset-0 z-0">
        <KineticLines />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(5,10,20,0.4)_0%,rgba(5,5,5,1)_100%)]" />
      </div>

      {/* HEADER WITH LOGO */}
      <header className="absolute top-0 w-full z-[100] border-b border-white/5 backdrop-blur-md bg-black/40">
        <div className="max-w-[1600px] mx-auto px-8 h-14 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white/15 rounded-sm flex items-center justify-center">
                <Terminal className="w-3 h-3 text-white" />
              </div>
              <span className="text-[11px] font-black tracking-[0.3em] uppercase">
                <span className="text-white">Dio</span>
                <span className="text-blue-500">play</span>
              </span>
            </div>
            <div className="h-4 w-[1px] bg-white/10 mx-2" />
            <div className="flex gap-6 text-[9px] uppercase tracking-[0.2em] font-medium text-zinc-500">
              <span className="text-blue-500 font-mono">Error 404</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-center flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tighter mb-6 relative mt-12">
            <span className="absolute -left-8 -top-8 text-[120px] font-bold text-white/5 pointer-events-none select-none blur-sm">404</span>
            Página no <span className="text-blue-500 font-serif italic underline decoration-violet-500/30">encontrada</span>
          </h1>

          <p className="text-sm text-zinc-500 max-w-lg leading-relaxed font-light tracking-wide mb-10">
            La dirección a la que intentas acceder <strong className="text-zinc-300 font-normal">no existe</strong> en nuestra infraestructura.
          </p>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-sm py-8 text-center">
        <div className="flex justify-center items-center text-[9px] text-zinc-700 uppercase tracking-[0.5em]">
          <span>© 2026 Dioplay todo los Derechos Reservados</span>
          <span className="mx-4">|</span>
          <span>Encrypted Form</span>
        </div>
      </footer>
    </div>
  );
}
