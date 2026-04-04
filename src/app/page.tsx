"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Briefcase, ArrowRight, LayoutTemplate, Shield,
  Zap, Globe, BarChart3, Layers, Code2, Cpu,
  Terminal, Database, Maximize2, Activity
} from "lucide-react";

// --- COMPONENTE: LÍNEAS CURVAS DE ALTA VELOCIDAD ---
const KineticLines = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
      <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none">
        {[...Array(6)].map((_, i) => (
          <motion.path
            key={i}
            d={`M-100 ${200 + i * 100}C200 ${100 + i * 50} 400 ${600 - i * 50} 800 ${300 + i * 20}C1200 ${100 + i * 100} 1500 ${400} 1700 ${200}`}
            stroke={`url(#grad${i})`}
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
            <linearGradient key={i} id={`grad${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor={i % 2 === 0 ? "#3b82f6" : "#6366f1"} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
};

const FloatingBrand = () => {
  // Deterministic starting positions for SSR hydration safety
  const startOffsets = [
    { x: 250, y: 100 },
    { x: -150, y: 300 },
    { x: 400, y: -200 },
    { x: -300, y: 150 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.03] flex items-center gap-4"
          initial={{ x: startOffsets[i % 4].x, y: startOffsets[i % 4].y }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ left: `${i * 25}%`, top: `${20 + i * 15}%` }}
        >
          {/* LOGO NEXT.JS */}
          <svg width="200" height="200" viewBox="0 0 180 180" fill="none">
            <mask id="mask-next" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
              <circle cx="90" cy="90" r="90" fill="white" />
            </mask>
            <g mask="url(#mask-next)">
              <circle cx="90" cy="90" r="90" fill="white" fillOpacity="1" />
              <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="black" />
              <rect x="115" y="54" width="12" height="72" fill="black" />
            </g>
          </svg>

          {/* LOGO GITHUB (más pequeño) */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="white"
            className="opacity-80"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
    0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754
    -1.089-.745.082-.729.082-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 
    3.492.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.93 
    0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 
    0 0 1.005-.322 3.3 1.23a11.49 11.49 0 0 1 3-.405c1.02.005 2.045.138 
    3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 
    1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.102.81 
    2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 
    21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// --- COMPONENTE: TERMINAL DE CÓDIGO ---
const CodePreview = () => (
  <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-6 font-mono text-[10px] leading-relaxed shadow-2xl relative group overflow-hidden">
    <div className="absolute top-0 right-0 p-2 opacity-20">
      <Code2 size={14} />
    </div>
    <div className="flex gap-1.5 mb-4">
      <div className="w-2 h-2 rounded-full bg-red-500/20" />
      <div className="w-2 h-2 rounded-full bg-orange-500/20" />
      <div className="w-2 h-2 rounded-full bg-green-500/20" />
    </div>
    <div className="space-y-1">
      <p className="text-blue-400">export const <span className="text-white">PortfolioEngine</span> = () =&gt; &#123;</p>
      <p className="text-zinc-500 pl-4">const [assets, setAssets] = useStorage("v3");</p>
      <p className="text-zinc-500 pl-4 italic">// Optimize visual pipeline</p>
      <p className="text-zinc-500 pl-4">return assets.map(asset =&gt; (</p>
      <p className="text-indigo-400 pl-8">&lt;NeuralRenderer</p>
      <p className="text-indigo-400 pl-12">key=&#123;asset.id&#125;</p>
      <p className="text-indigo-400 pl-12">precision="surgical"</p>
      <p className="text-indigo-400 pl-12">latency=&#123;0.002&#125;</p>
      <p className="text-indigo-400 pl-8">/&gt;</p>
      <p className="text-zinc-500 pl-4">));</p>
      <p className="text-blue-400">&#125;;</p>
    </div>
    <motion.div
      className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
    />
  </div>
);

export default function Home() {
  const router = useRouter();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-[300vh] bg-[#030303] text-zinc-400 font-sans selection:bg-blue-500/30">
      <div className="fixed inset-0 z-0">
        <KineticLines />
        <FloatingBrand />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,25,0)_0%,rgba(5,5,5,1)_100%)]" />
      </div>

      {/* NAV */}
      <header className="fixed top-0 w-full z-[100] border-b border-white/5 backdrop-blur-md bg-black/40">
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

              <a href="#" className="relative hover:text-white transition-colors duration-300 
    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-white 
    after:transition-all after:duration-300 hover:after:w-full">
                Infraestructura
              </a>

              <a href="#" className="relative hover:text-white transition-colors duration-300 
    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-white 
    after:transition-all after:duration-300 hover:after:w-full">
                Demo
              </a>

            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[9px] text-zinc-600 font-mono hidden lg:block">12.00.52 Bolivia</span>
            <button
              onClick={() => router.push("/login")}
              className="text-[10px] uppercase tracking-widest px-6 py-2 border border-white text-white font-bold hover:bg-white hover:text-black transition-all duration-100 rounded-sm"            >
              Comenzar
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-44 px-8 max-w-7xl mx-auto h-screen">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h1 className="text-5xl md:text-7xl font-light text-white tracking-[ -0.04em] leading-[0.95] mb-8">
              Gestión de activos <br />
              <span className="text-zinc-600">con precisión </span>
              <span className="font-serif italic text-white underline decoration-blue-500/30">atómica.</span>
            </h1>

            <p className="text-sm text-zinc-500 max-w-md leading-relaxed font-light tracking-wide mb-10">
              Arquitectura modular para la visualización de portafolios de alto impacto. Rendimiento optimizado mediante renderizado perimetral y entrega de baja latencia.
            </p>

            <div className="flex items-center gap-8">
              <button className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white">
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowRight size={14} />
                </span>
                Desplegar Entorno
              </button>
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#030303] bg-zinc-800 flex items-center justify-center text-[8px] font-bold">
                    U{i}
                  </div>
                ))}
                <div className="pl-4 text-[9px] text-zinc-600 flex items-center">
                  +2.4k Agencias activas
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full" />
            <CodePreview />
            {/* MINI FLOATING STATS */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-10 -left-10 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-lg shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <Activity className="text-green-500" size={12} />
                <span className="text-[9px] uppercase tracking-tighter text-zinc-400">Global Throughput</span>
              </div>
              <div className="text-xl font-mono text-white">99.99%</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION: ARCHITECTURE (SCROLL BASED) */}
      <section className="relative z-10 py-40 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-2xl">
              <span className="text-[10px] text-blue-500 font-mono tracking-widest uppercase mb-4 block">01 // Otras Cosas</span>
              <h2 className="text-3xl md:text-5xl text-white font-light tracking-tighter">
                Diseñado para la <span className="text-zinc-600">velocidad</span>. <br />
                Construido para la <span className="text-zinc-600">escala</span>.
              </h2>

            </div>
            <p className="text-[11px] text-zinc-500 max-w-xs uppercase tracking-wider leading-loose">
              Nuestro motor de renderizado procesa más de 14M de activos visuales diariamente con redundancia global.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
            <FeatureCard
              icon={<Database size={16} />}
              title="Storage Sharding"
              desc="Distribución inteligente de datos para acceso instantáneo desde cualquier nodo."
            />
            <FeatureCard
              icon={<Shield size={16} />}
              title="Identity Protocol"
              desc="Autenticación biométrica y JWT avanzado para protección de propiedad intelectual."
            />
            <FeatureCard
              icon={<Zap size={16} />}
              title="L2 Caching"
              desc="Capas de caché redundantes que reducen el Time-To-First-Byte a <12ms."
            />
            <FeatureCard
              icon={<Terminal size={16} />}
              title="API-First"
              desc="Integración total mediante GraphQL para arquitecturas Headless modernas."
            />
          </div>
        </div>
      </section>

      {/* SECTION: VISUAL DASHBOARD PREVIEW */}
      <section className="relative z-10 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-[#050505] border border-white/10 rounded-xl overflow-hidden">
              <div className="h-10 border-b border-white/5 bg-white/5 flex items-center justify-between px-6">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
                <div className="text-[9px] uppercase tracking-[0.4em] text-zinc-500">Admin / Cliente</div>
                <Maximize2 size={12} className="text-zinc-700" />
              </div>

              <div className="p-10 grid grid-cols-12 gap-6">
                <div className="col-span-3 space-y-6">
                  <div className="h-32 bg-zinc-900/50 rounded-lg border border-white/5 p-4">
                    <div className="w-full h-1 bg-blue-500/20 rounded-full mb-4 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "70%" }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 w-full bg-zinc-800 rounded" />
                      <div className="h-1.5 w-2/3 bg-zinc-800 rounded" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-8 w-full border border-white/5 rounded flex items-center px-3 justify-between">
                        <div className="h-1 w-10 bg-zinc-800 rounded" />
                        <div className="w-2 h-2 rounded-full bg-zinc-800" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-9">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="aspect-video bg-zinc-900 border border-white/5 rounded-lg flex items-center justify-center group/item hover:border-blue-500/40 transition-colors cursor-crosshair">
                        <LayoutTemplate className="text-zinc-800 group-hover/item:text-blue-500/50 transition-colors" />
                      </div>
                    ))}
                  </div>
                  <div className="h-64 bg-gradient-to-br from-zinc-900/50 to-black border border-white/5 rounded-lg p-6">
                    <div className="flex items-end h-full gap-2">
                      {[40, 70, 45, 90, 65, 80, 30, 95].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          className="flex-1 bg-blue-500/10 border-t border-blue-500/40"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER: INDUSTRIAL STYLE */}
      <footer className="relative z-10 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-white/16 rounded-sm flex items-center justify-center">
                <Terminal size={14} className="text-white" />
              </div>
              <span className="text-[11px] font-black tracking-[0.3em] uppercase">
                <span className="text-white">Dio</span>
                <span className="text-blue-500">play</span>
              </span>
            </div>
            <p className="text-[11px] text-zinc-600 max-w-sm leading-relaxed tracking-widest">
              Sistemas de visualización de próxima generación para entidades creativas y estudios de diseño global.
            </p>
          </div>
          <div>
            <h4 className="text-white text-[10px] uppercase tracking-widest mb-6 font-bold">Demo</h4>
            <ul className="text-[10px] space-y-4 text-zinc-500 uppercase tracking-widest">
              <li className="hover:text-blue-500 cursor-pointer">Seguridad L3</li>
              <li className="hover:text-blue-500 cursor-pointer">Nodos Edge</li>
              <li className="hover:text-blue-500 cursor-pointer">Gobernanza</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[10px] uppercase tracking-widest mb-6 font-bold">Soporte</h4>
            <ul className="text-[10px] space-y-4 text-zinc-500 uppercase tracking-widest">
              <li className="hover:text-blue-500 cursor-pointer">Documentación</li>
              <li className="hover:text-blue-500 cursor-pointer">Terminal SSH</li>
              <li className="hover:text-blue-500 cursor-pointer">Status</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-[9px] text-zinc-700 uppercase tracking-[0.5em]">
          <span>© 2026 Dioplay todo los Derechos Reservados</span>
          <span>Encrypted Chiri</span>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
      className="relative p-10 bg-[#030303] transition-colors group cursor-default overflow-hidden"
    >
      {/* 🔥 Líneas animadas curvas (solo hover) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <svg className="w-full h-full">
          <motion.path
            d="M-20 40 Q 80 0, 200 40 T 420 40"
            stroke="url(#lineGradient1)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M-20 80 Q 120 20, 260 80 T 500 80"
            stroke="url(#lineGradient2)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 0.4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: 0.3 }}
          />

          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10">
        <div className="w-12 h-12 border border-white/10 rounded flex items-center justify-center mb-8 group-hover:border-blue-500/50 group-hover:text-blue-500 transition-all duration-500">
          {icon}
        </div>
        <h3 className="text-white text-[11px] uppercase tracking-[0.2em] font-bold mb-4">{title}</h3>
        <p className="text-[11px] leading-relaxed text-zinc-500 font-light uppercase tracking-wider">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}