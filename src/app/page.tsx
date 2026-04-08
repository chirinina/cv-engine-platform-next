"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  LayoutTemplate,
  Maximize2,
  Shield,
  Terminal,
  type LucideIcon,
  Zap,
} from "lucide-react";

const buildLinePath = (values: number[]) =>
  values
    .map((value, index) => {
      const x = (index * 100) / (values.length - 1);
      const y = 100 - value;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

const buildAreaPath = (values: number[]) => `${buildLinePath(values)} L 100 100 L 0 100 Z`;

const dashboardStats = [
  {
    icon: Globe,
    label: "Cobertura activa",
    value: "12 nodos",
    detail: "Failover en LA y US edge",
  },
  {
    icon: Layers,
    label: "Activos versionados",
    value: "2,418",
    detail: "+184 cambios sincronizados",
  },
  {
    icon: Cpu,
    label: "Latencia p95",
    value: "11.8 ms",
    detail: "Render estable en borde",
  },
] satisfies Array<{
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}>;

const workflowSteps = [
  { label: "Ingesta visual", value: "87%" },
  { label: "QA automatizado", value: "73%" },
  { label: "Entrega cliente", value: "94%" },
];

const liveProjects = [
  {
    name: "Atlas / Rebranding",
    scope: "Campana omnicanal",
    latency: "9 ms",
    state: "Sincronizado",
  },
  {
    name: "Nova / Lanzamiento",
    scope: "Micrositio + anuncios",
    latency: "12 ms",
    state: "En revision",
  },
  {
    name: "Kappa / Intranet",
    scope: "Portal privado",
    latency: "14 ms",
    state: "Protegido",
  },
];

const overlayIndicators = [
  { label: "Auto-layout activos", value: "87%", width: "87%" },
  { label: "Aprobacion cliente", value: "72%", width: "72%" },
  { label: "Entrega hoy", value: "94%", width: "94%" },
];

const primarySeries = [24, 38, 34, 56, 48, 72, 64];
const overlaySeries = [18, 30, 42, 36, 58, 74, 68, 82];
const textRevealViewport = { once: true, amount: 0.4 };
const textRevealTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
};
const revealFromLeft = {
  initial: { opacity: 0, x: -72 },
  whileInView: { opacity: 1, x: 0 },
  viewport: textRevealViewport,
  transition: textRevealTransition,
};
const revealFromRight = {
  initial: { opacity: 0, x: 72 },
  whileInView: { opacity: 1, x: 0 },
  viewport: textRevealViewport,
  transition: textRevealTransition,
};
const timezoneCountryFallbacks: Record<string, string> = {
  "America/La_Paz": "BO",
  "America/Argentina/Buenos_Aires": "AR",
  "America/Bogota": "CO",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Lima": "PE",
  "America/Los_Angeles": "US",
  "America/Mexico_City": "MX",
  "America/Miami": "US",
  "America/Montevideo": "UY",
  "America/New_York": "US",
  "America/Phoenix": "US",
  "America/Santiago": "CL",
  "America/Sao_Paulo": "BR",
  "Europe/Madrid": "ES",
};

const formatLocalClock = (date: Date) =>
  [date.getHours(), date.getMinutes(), date.getSeconds()].map((value) => String(value).padStart(2, "0")).join(".");

const getRegionFromLocale = (locale: string) => {
  try {
    return new Intl.Locale(locale).region?.toUpperCase();
  } catch {
    const match = locale.match(/[-_]([A-Za-z]{2})\b/);
    return match?.[1]?.toUpperCase();
  }
};

const getCountryLabel = (regionCode: string) => {
  if (typeof Intl.DisplayNames !== "undefined") {
    return new Intl.DisplayNames(["es"], { type: "region" }).of(regionCode) ?? regionCode;
  }

  return regionCode;
};

const resolveCountryLabel = (locales: readonly string[], timeZone?: string) => {
  for (const locale of locales) {
    const regionCode = getRegionFromLocale(locale);

    if (regionCode) {
      return getCountryLabel(regionCode);
    }
  }

  if (timeZone && timezoneCountryFallbacks[timeZone]) {
    return getCountryLabel(timezoneCountryFallbacks[timeZone]);
  }

  return timeZone?.split("/").at(-1)?.replace(/_/g, " ") ?? "Local";
};

function AutoLocaleClock() {
  const [clockLabel, setClockLabel] = useState("--.--.-- Local");

  useEffect(() => {
    const locales =
      typeof navigator !== "undefined" && navigator.languages.length > 0
        ? navigator.languages
        : [typeof navigator !== "undefined" ? navigator.language : "es-BO"];

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const countryLabel = resolveCountryLabel(locales, timeZone);

    const updateClock = () => {
      setClockLabel(`${formatLocalClock(new Date())} ${countryLabel}`);
    };

    updateClock();

    const intervalId = window.setInterval(updateClock, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return <span className="hidden font-mono text-[9px] text-zinc-600 xl:block">{clockLabel}</span>;
}

function TypingAccentText({
  text,
  className,
  delay = 0,
  active,
}: {
  text: string;
  className?: string;
  delay?: number;
  active?: boolean;
}) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.8 });
  const shouldStart = active ?? isInView;
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    setVisibleCount(0);

    let currentIndex = 0;
    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        currentIndex += 1;
        setVisibleCount(currentIndex);

        if (currentIndex >= text.length) {
          window.clearInterval(intervalId);
        }
      }, 42);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeoutId);

      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [delay, shouldStart, text]);

  return (
    <span ref={containerRef} aria-label={text} className={`${className ?? ""} relative inline-block whitespace-pre`}>
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute left-0 top-0 inline-flex items-baseline whitespace-pre">
        {shouldStart ? text.slice(0, visibleCount) : null}
        {shouldStart && visibleCount < text.length ? (
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.75, repeat: Infinity, ease: "easeInOut" }}
            className="ml-px inline-block h-[0.92em] w-px bg-current align-middle"
          />
        ) : null}
      </span>
    </span>
  );
}

const KineticLines = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-40 md:opacity-60">
      <svg className="h-full w-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.path
            key={i}
            d={`M-100 ${200 + i * 100}C200 ${100 + i * 50} 400 ${600 - i * 50} 800 ${300 + i * 20}C1200 ${100 + i * 100} 1500 ${400} 1700 ${200}`}
            stroke={`url(#grad${i})`}
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 0.5, 0],
              pathOffset: [0, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
        <defs>
          {Array.from({ length: 6 }).map((_, i) => (
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
  const startOffsets = [
    { x: 250, y: 100 },
    { x: -150, y: 300 },
    { x: 400, y: -200 },
    { x: -300, y: 150 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
      {Array.from({ length: 4 }).map((_, i) => {
        const maskId = `mask-next-${i}`;

        return (
          <motion.div
            key={i}
            className="absolute flex items-center gap-4 opacity-[0.03] xl:gap-6"
            initial={{ x: startOffsets[i % 4].x, y: startOffsets[i % 4].y }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ left: `${i * 25}%`, top: `${20 + i * 15}%` }}
          >
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className="xl:h-[200px] xl:w-[200px]">
              <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                <circle cx="90" cy="90" r="90" fill="white" />
              </mask>
              <g mask={`url(#${maskId})`}>
                <circle cx="90" cy="90" r="90" fill="white" fillOpacity="1" />
                <path
                  d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                  fill="black"
                />
                <rect x="115" y="54" width="12" height="72" fill="black" />
              </g>
            </svg>

            <svg width="108" height="108" viewBox="0 0 24 24" fill="white" className="opacity-80 xl:h-[120px] xl:w-[120px]">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.089-.745.082-.729.082-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.49 11.49 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
};

const CodePreview = () => (
  <div className="group relative overflow-hidden rounded-[1.25rem] border border-white/5 bg-[#0a0a0a] p-4 font-mono text-[9px] leading-relaxed shadow-2xl sm:p-6 sm:text-[10px] md:text-[11px]">
    <div className="absolute right-0 top-0 p-3 opacity-20">
      <Code2 size={14} />
    </div>
    <div className="mb-4 flex gap-1.5">
      <div className="h-2 w-2 rounded-full bg-red-500/20" />
      <div className="h-2 w-2 rounded-full bg-orange-500/20" />
      <div className="h-2 w-2 rounded-full bg-green-500/20" />
    </div>
    <div className="overflow-x-auto">
      <div className="min-w-[20rem] space-y-1">
        <p className="text-blue-400">
          export const <span className="text-white">PortfolioEngine</span> = () =&gt; &#123;
        </p>
        <p className="pl-4 text-zinc-500">const [assets, setAssets] = useStorage("v3");</p>
        <p className="pl-4 italic text-zinc-500">// Optimize visual pipeline</p>
        <p className="pl-4 text-zinc-500">return assets.map(asset =&gt; (</p>
        <p className="pl-8 text-indigo-400">&lt;NeuralRenderer</p>
        <p className="pl-12 text-indigo-400">key=&#123;asset.id&#125;</p>
        <p className="pl-12 text-indigo-400">precision="surgical"</p>
        <p className="pl-12 text-indigo-400">latency=&#123;0.002&#125;</p>
        <p className="pl-8 text-indigo-400">/&gt;</p>
        <p className="pl-4 text-zinc-500">));</p>
        <p className="text-blue-400">&#125;;</p>
      </div>
    </div>
    <motion.div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
  </div>
);

function DashboardMetricCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-zinc-950/80 p-4 sm:p-5">
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="text-[10px] uppercase tracking-[0.26em] text-zinc-600">{label}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-blue-400">
          <Icon size={16} />
        </div>
      </div>
      <div className="font-mono text-2xl text-white sm:text-[1.75rem]">{value}</div>
      <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">{detail}</p>
    </div>
  );
}

function SurfaceTile({
  icon: Icon,
  title,
  stat,
}: {
  icon: LucideIcon;
  title: string;
  stat: string;
}) {
  return (
    <div className="group/item rounded-xl border border-white/5 bg-zinc-950/60 p-4 transition-colors duration-300 hover:border-blue-500/30">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-zinc-500 transition-colors duration-300 group-hover/item:text-blue-400">
          <Icon size={16} />
        </div>
        <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-600">{stat}</span>
      </div>
      <p className="mb-4 text-sm font-medium text-white">{title}</p>
      <div className="space-y-2">
        <div className="h-1.5 w-full rounded-full bg-zinc-800" />
        <div className="h-1.5 w-4/5 rounded-full bg-zinc-800/90" />
        <div className="grid grid-cols-3 gap-2 pt-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-6 rounded-md border border-white/5 bg-black/40" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartCanvas({
  series,
  labels,
  accent,
  className,
}: {
  series: number[];
  labels: string[];
  accent: string;
  className: string;
}) {
  const baseId = useId().replace(/:/g, "");
  const areaId = `${baseId}-area`;
  const linePath = buildLinePath(series);
  const areaPath = buildAreaPath(series);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/5 bg-[#070707] ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(59,130,246,0.12)_0%,rgba(59,130,246,0)_70%)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: 5 }).map((_, index) => {
          const offset = index * 25;

          return <line key={`h-${offset}`} x1="0" y1={offset} x2="100" y2={offset} stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />;
        })}
        {Array.from({ length: 6 }).map((_, index) => {
          const offset = index * 20;

          return <line key={`v-${offset}`} x1={offset} y1="0" x2={offset} y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />;
        })}

        <defs>
          <linearGradient id={areaId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.34" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          d={areaPath}
          fill={`url(#${areaId})`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke={accent}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1.15, ease: "easeOut" }}
        />
        {series.map((value, index) => (
          <motion.circle
            key={index}
            cx={(index * 100) / (series.length - 1)}
            cy={100 - value}
            r="1.7"
            fill={accent}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.22, delay: 0.55 + index * 0.05 }}
          />
        ))}
      </svg>

      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2 text-[9px] uppercase tracking-[0.18em] text-zinc-500">
        {labels.map((label, index) => (
          <span
            key={label}
            className={[
              "flex-1",
              index === 0 ? "text-left" : "",
              index === labels.length - 1 ? "text-right" : "",
              index > 0 && index < labels.length - 1 ? "text-center" : "",
            ].join(" ")}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dashboardRef = useRef<HTMLElement | null>(null);
  const heroIntroRef = useRef<HTMLDivElement | null>(null);
  const infraIntroRef = useRef<HTMLDivElement | null>(null);
  const demoIntroRef = useRef<HTMLDivElement | null>(null);
  const heroIntroInView = useInView(heroIntroRef, { once: true, amount: 0.45 });
  const infraIntroInView = useInView(infraIntroRef, { once: true, amount: 0.45 });
  const demoIntroInView = useInView(demoIntroRef, { once: true, amount: 0.45 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: dashboardProgress } = useScroll({
    target: dashboardRef,
    offset: ["start 85%", "end 30%"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 0.18], [0, -72]);
  const heroPreviewY = useTransform(scrollYProgress, [0, 0.18], [0, -32]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.62]);

  const dashboardShellY = useTransform(dashboardProgress, [0, 1], [96, 0]);
  const dashboardShellOpacity = useTransform(dashboardProgress, [0, 0.28], [0.2, 1]);
  const insightY = useTransform(dashboardProgress, [0, 1], [140, -28]);
  const insightOpacity = useTransform(dashboardProgress, [0, 0.38], [0, 1]);
  const insightScale = useTransform(dashboardProgress, [0, 0.45], [0.92, 1]);

  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-x-hidden bg-[#030303] font-sans text-zinc-400 selection:bg-blue-500/30"
    >
      <div className="fixed inset-0 z-0">
        <KineticLines />
        <FloatingBrand />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,25,0)_0%,rgba(5,5,5,1)_100%)]" />
      </div>

      <header className="fixed top-0 z-[100] w-full border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-14 lg:px-8">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-white/15">
                <Terminal className="h-3 w-3 text-white" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                <span className="text-white">Dio</span>
                <span className="text-blue-500">play</span>
              </span>
            </div>
            <div className="hidden h-4 w-px bg-white/10 sm:block" />
            <div className="hidden items-center gap-4 text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:flex lg:gap-6">
              <a
                href="#infraestructura"
                className="relative transition-colors duration-300 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
              >
                Infraestructura
              </a>
              <a
                href="#demo"
                className="relative transition-colors duration-300 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
              >
                Demo
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <AutoLocaleClock />
            <button
              onClick={() => router.push("/login")}
              className="rounded-sm border border-white px-4 py-2 text-[9px] font-bold uppercase tracking-[0.24em] text-white transition-all duration-100 hover:bg-white hover:text-black sm:px-6 sm:text-[10px]"
            >
              Comenzar
            </button>
          </div>
        </div>
        <motion.div
          className="h-px origin-left bg-gradient-to-r from-transparent via-blue-500/80 to-transparent"
          style={{ scaleX: scrollYProgress }}
        />
      </header>

      <section className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pt-44">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.95fr)] lg:gap-20">
          <motion.div ref={heroIntroRef} style={{ y: heroTextY, opacity: heroOpacity }} className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, x: -72 }}
              animate={heroIntroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -72 }}
              transition={textRevealTransition}
              className="mb-8 text-[2.75rem] font-light leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
            >
              Gestion de activos <br />
              <TypingAccentText text="con precision " className="text-zinc-600" active={heroIntroInView} />
              <span className="font-serif italic text-white underline decoration-blue-500/30">atomica.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 72 }}
              animate={heroIntroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 72 }}
              transition={textRevealTransition}
              className="mb-10 max-w-md text-sm font-light leading-relaxed tracking-wide text-zinc-500 sm:text-base"
            >
              Arquitectura modular para la visualizacion de portafolios de alto impacto. Rendimiento optimizado mediante renderizado
              perimetral y entrega de baja latencia.
            </motion.p>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <button
                onClick={scrollToDemo}
                className="group flex items-center gap-3 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all group-hover:bg-white group-hover:text-black sm:h-11 sm:w-11">
                  <ArrowRight size={14} />
                </span>
                Desplegar Entorno
              </button>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#030303] bg-zinc-800 text-[8px] font-bold"
                    >
                      U{i}
                    </div>
                  ))}
                </div>
                <div className="flex items-center text-[9px] text-zinc-600 sm:pl-1">+2.4k Agencias activas</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ y: heroPreviewY }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-full bg-blue-500/10 blur-3xl" />
            <CodePreview />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mt-4 inline-flex w-full max-w-[13rem] items-start gap-3 rounded-2xl border border-white/10 bg-black/80 p-4 shadow-2xl backdrop-blur-xl sm:absolute sm:-bottom-8 sm:-left-8 sm:mt-0"
            >
              <Activity className="mt-1 text-green-500" size={12} />
              <div>
                <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-400">Global Throughput</span>
                <div className="mt-1 font-mono text-xl text-white">99.99%</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="infraestructura" className="relative z-10 border-t border-white/5 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div ref={infraIntroRef} className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: -72 }}
              animate={infraIntroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -72 }}
              transition={textRevealTransition}
              className="max-w-2xl"
            >
              <span className="mb-4 block font-mono text-[10px] uppercase tracking-widest text-blue-500">01 // Otras Cosas</span>
              <h2 className="text-3xl font-light tracking-tighter text-white sm:text-4xl md:text-5xl">
                Disenado para la <TypingAccentText text="velocidad." className="text-zinc-600" active={infraIntroInView} /> <br />
                Construido para la <TypingAccentText text="escala." className="text-zinc-600" active={infraIntroInView} />
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 72 }}
              animate={infraIntroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 72 }}
              transition={textRevealTransition}
              className="max-w-xs text-[11px] uppercase tracking-wider leading-loose text-zinc-500"
            >
              Nuestro motor de renderizado procesa mas de 14M de activos visuales diariamente con redundancia global.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-px border border-white/5 bg-white/5 md:grid-cols-2 xl:grid-cols-4">
            <FeatureCard
              icon={<Database size={16} />}
              title="Storage Sharding"
              desc="Distribucion inteligente de datos para acceso instantaneo desde cualquier nodo."
              enterFrom="left"
              delay={0}
            />
            <FeatureCard
              icon={<Shield size={16} />}
              title="Identity Protocol"
              desc="Autenticacion biometrica y JWT avanzado para proteccion de propiedad intelectual."
              enterFrom="right"
              delay={0.08}
            />
            <FeatureCard
              icon={<Zap size={16} />}
              title="L2 Caching"
              desc="Capas de cache redundantes que reducen el Time-To-First-Byte a menos de 12 ms."
              enterFrom="left"
              delay={0.16}
            />
            <FeatureCard
              icon={<Terminal size={16} />}
              title="API-First"
              desc="Integracion total mediante GraphQL para arquitecturas headless modernas."
              enterFrom="right"
              delay={0.24}
            />
          </div>
        </div>
      </section>

      <section ref={dashboardRef} id="demo" className="relative z-10 px-4 pb-28 pt-16 sm:px-6 sm:pb-36 sm:pt-20 lg:px-8 lg:pb-48 lg:pt-24">
        <div className="mx-auto max-w-6xl">
          <div ref={demoIntroRef} className="mb-10 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -72 }}
              animate={demoIntroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -72 }}
              transition={textRevealTransition}
              className="max-w-2xl"
            >
              <span className="mb-4 block font-mono text-[10px] uppercase tracking-widest text-blue-500">02 // Control Surface</span>
              <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl lg:text-5xl">
                Demo operativa mas real. <br />
                Mucho mas fina en <TypingAccentText text="scroll y responsive." className="text-zinc-600" active={demoIntroInView} />
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 72 }}
              animate={demoIntroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 72 }}
              transition={textRevealTransition}
              className="max-w-sm text-[11px] uppercase tracking-[0.24em] leading-loose text-zinc-500"
            >
              Vista compartida entre administracion y cliente con trazas, actividad viva y una capa de insight que entra al hacer scroll.
            </motion.p>
          </div>

          <div className="relative">
            <motion.div
              style={{ y: dashboardShellY, opacity: dashboardShellOpacity }}
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050505] shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
            >
              <div className="flex h-12 items-center justify-between gap-4 border-b border-white/5 bg-white/5 px-4 sm:px-6">
                <div className="flex gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                </div>
                <div className="text-[9px] uppercase tracking-[0.4em] text-zinc-500">Admin / Cliente</div>
                <div className="flex items-center gap-3">
                  <span className="hidden rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-emerald-400 sm:inline-flex">
                    Sync 99.99%
                  </span>
                  <Maximize2 size={12} className="text-zinc-700" />
                </div>
              </div>

              <div className="grid gap-5 p-4 sm:gap-6 sm:p-6 xl:grid-cols-[260px_minmax(0,1fr)] xl:p-8">
                <div className="space-y-5">
                  <div className="rounded-[1.25rem] border border-white/5 bg-zinc-950/70 p-5">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-zinc-600">Pipeline operativo</span>
                      <Layers size={15} className="text-zinc-500" />
                    </div>

                    <div className="mb-5">
                      <div className="flex items-end justify-between gap-4">
                        <span className="font-mono text-3xl text-white">248</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400">+18 activas</span>
                      </div>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-zinc-500">Portafolios listos para cliente</p>
                    </div>

                    <div className="space-y-4">
                      {workflowSteps.map((item, index) => (
                        <div key={item.label} className="space-y-2">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">{item.label}</span>
                            <span className="font-mono text-xs text-white">{item.value}</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: item.value }}
                              viewport={{ once: true, amount: 0.5 }}
                              transition={{ duration: 0.8, delay: 0.15 * index }}
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.25rem] border border-white/5 bg-zinc-950/70 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-zinc-600">Regiones y blindaje</span>
                      <Shield size={15} className="text-zinc-500" />
                    </div>
                    <div className="mb-5 flex flex-wrap gap-2">
                      {["La Paz", "Santiago", "Miami", "Madrid"].map((region) => (
                        <span
                          key={region}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-400"
                        >
                          {region}
                        </span>
                      ))}
                    </div>
                    <div className="rounded-xl border border-white/5 bg-black/40 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Proteccion activa</span>
                        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-blue-400">
                          JWT + RBAC
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-400">
                        Flujos segmentados para admin, cliente y reviewers sin romper continuidad del despliegue.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="min-w-0 space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {dashboardStats.map((stat) => (
                      <DashboardMetricCard key={stat.label} {...stat} />
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <SurfaceTile icon={LayoutTemplate} title="Libreria de assets" stat="142 templates" />
                    <SurfaceTile icon={Terminal} title="Control de deploy" stat="4 colas vivas" />
                    <SurfaceTile icon={Shield} title="Revision cliente" stat="18 aprobaciones" />
                  </div>

                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
                    <div className="rounded-[1.25rem] border border-white/5 bg-zinc-950/70 p-5">
                      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-600">Rendimiento semanal</p>
                          <h3 className="mt-3 text-xl text-white sm:text-2xl">Carga sincronizada por entorno</h3>
                        </div>
                        <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-400">
                          +12.8%
                        </div>
                      </div>

                      <ChartCanvas
                        series={primarySeries}
                        labels={["lun", "mar", "mie", "jue", "vie", "sab", "dom"]}
                        accent="#3b82f6"
                        className="h-56"
                      />
                    </div>

                    <div className="rounded-[1.25rem] border border-white/5 bg-zinc-950/70 p-5">
                      <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-600">Actividad reciente</p>
                          <h3 className="mt-2 text-lg text-white">Flujos en vivo</h3>
                        </div>
                        <BarChart3 size={16} className="text-zinc-500" />
                      </div>

                      <div className="space-y-3">
                        {liveProjects.map((project) => (
                          <div key={project.name} className="rounded-xl border border-white/5 bg-black/40 p-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div className="min-w-0">
                                <p className="truncate text-sm text-white">{project.name}</p>
                                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">{project.scope}</p>
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                                  {project.latency}
                                </span>
                                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-blue-400">
                                  {project.state}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{ y: insightY, opacity: insightOpacity, scale: insightScale }}
              className="relative z-20 mx-3 -mt-8 sm:mx-6 sm:-mt-12 lg:absolute lg:bottom-0 lg:right-8 lg:mx-0 lg:mt-0 lg:w-[min(32rem,44%)] lg:translate-y-1/2"
            >
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/85 shadow-[0_40px_120px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4 border-b border-white/5 px-5 py-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-600">Insight Layer</p>
                    <h3 className="mt-2 text-lg text-white sm:text-xl">Demanda predictiva</h3>
                  </div>
                  <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-blue-400">
                    Live
                  </span>
                </div>

                <div className="grid gap-5 p-5 sm:grid-cols-[1.05fr_0.95fr]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Curva de demanda</span>
                      <span className="font-mono text-sm text-emerald-400">+18.2%</span>
                    </div>

                    <ChartCanvas
                      series={overlaySeries}
                      labels={["06h", "10h", "14h", "18h", "22h"]}
                      accent="#6366f1"
                      className="h-44"
                    />

                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                        <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-500">Carga</p>
                        <p className="mt-2 font-mono text-lg text-white">84%</p>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                        <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-500">SLA</p>
                        <p className="mt-2 font-mono text-lg text-white">99.7</p>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                        <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-500">Drift</p>
                        <p className="mt-2 font-mono text-lg text-white">0.3%</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Escucha operacional</span>
                        <Activity size={14} className="text-zinc-500" />
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-400">
                        El panel inferior se activa al entrar al viewport y se monta medio superpuesto para darle mas profundidad al demo.
                      </p>
                    </div>

                    {overlayIndicators.map((indicator, index) => (
                      <div key={indicator.label} className="space-y-2 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">{indicator.label}</span>
                          <span className="font-mono text-sm text-white">{indicator.value}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: indicator.width }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.85, delay: 0.12 * index }}
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-20">
        <div className="mx-auto mb-16 grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-4 lg:mb-20 lg:px-8">
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-white/16">
                <Terminal size={14} className="text-white" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                <span className="text-white">Dio</span>
                <span className="text-blue-500">play</span>
              </span>
            </div>
            <p className="max-w-sm text-[11px] leading-relaxed tracking-widest text-zinc-600">
              Sistemas de visualizacion de proxima generacion para entidades creativas y estudios de diseno global.
            </p>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-white">Demo</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-widest text-zinc-500">
              <li className="cursor-pointer transition-colors hover:text-blue-500">Seguridad L3</li>
              <li className="cursor-pointer transition-colors hover:text-blue-500">Nodos Edge</li>
              <li className="cursor-pointer transition-colors hover:text-blue-500">Gobernanza</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-white">Soporte</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-widest text-zinc-500">
              <li className="cursor-pointer transition-colors hover:text-blue-500">Documentacion</li>
              <li className="cursor-pointer transition-colors hover:text-blue-500">Terminal SSH</li>
              <li className="cursor-pointer transition-colors hover:text-blue-500">Status</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-[9px] uppercase tracking-[0.4em] text-zinc-700 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <span>© 2026 Dioplay todos los derechos reservados</span>
          <span>Encrypted Chiri</span>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  enterFrom = "left",
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  enterFrom?: "left" | "right";
  delay?: number;
}) {
  const baseId = useId().replace(/:/g, "");
  const gradientOneId = `${baseId}-line-gradient-1`;
  const gradientTwoId = `${baseId}-line-gradient-2`;

  return (
    <motion.div
      initial={{ opacity: 0, x: enterFrom === "left" ? -72 : 72 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ ...textRevealTransition, delay }}
      whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
      className="group relative cursor-default overflow-hidden bg-[#030303] p-6 transition-colors sm:p-8 lg:p-10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <svg className="h-full w-full">
          <motion.path
            d="M-20 40 Q 80 0, 200 40 T 420 40"
            stroke={`url(#${gradientOneId})`}
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M-20 80 Q 120 20, 260 80 T 500 80"
            stroke={`url(#${gradientTwoId})`}
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 0.4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: 0.3 }}
          />

          <defs>
            <linearGradient id={gradientOneId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            <linearGradient id={gradientTwoId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded border border-white/10 transition-all duration-500 group-hover:border-blue-500/50 group-hover:text-blue-500 sm:mb-8">
          {icon}
        </div>
        <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">{title}</h3>
        <p className="text-[11px] font-light uppercase tracking-wider leading-relaxed text-zinc-500">{desc}</p>
      </div>
    </motion.div>
  );
}
