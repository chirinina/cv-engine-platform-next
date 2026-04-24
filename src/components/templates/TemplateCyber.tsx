"use client";

import { motion } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  FileText,
  Mail,
  ChevronRight,
  ExternalLink,
  Code2,
} from "lucide-react";
import React from "react";
import PortfolioInquiryForm from "./PortfolioInquiryForm";
import {
  PortfolioCourse,
  PortfolioData,
  PortfolioExperience,
  PortfolioProject,
  PortfolioSection,
  PortfolioSkillEntry,
} from "@/types/portfolio";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-6a6 6 0 0 1 6-6z" />
    <line x1="8" y1="11" x2="8" y2="17" />
    <line x1="8" y1="8" x2="8" y2="8" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .36.04.71.11 1.05C7.69 5.4 4.07 3.67 1.64 1.15c-.4.68-.63 1.47-.63 2.31 0 1.6.81 3.01 2.05 3.84A4.48 4.48 0 0 1 .96 6.1v.06c0 2.23 1.59 4.09 3.7 4.51-.39.11-.8.17-1.22.17-.3 0-.59-.03-.87-.08.59 1.84 2.3 3.18 4.33 3.22A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z" />
  </svg>
);

const CyberBackground = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) => {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ backgroundColor: secondaryColor }}
    >
      <div
        className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] rounded-full blur-[160px] opacity-30 mix-blend-screen"
        style={{ backgroundColor: primaryColor }}
      />
      <div
        className="absolute bottom-[-30%] right-[-20%] w-[70%] h-[70%] rounded-full blur-[160px] opacity-20 mix-blend-screen"
        style={{ backgroundColor: primaryColor }}
      />

      <svg
        className="absolute w-full h-full opacity-40 mix-blend-plus-lighter"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,400 C320,200 420,600 720,400 C1020,200 1120,600 1440,400"
          stroke={primaryColor}
          strokeWidth="3"
          fill="none"
          animate={{
            d: [
              "M0,400 C320,200 420,600 720,400 C1020,200 1120,600 1440,400",
              "M0,400 C320,600 420,200 720,400 C1020,600 1120,200 1440,400",
              "M0,400 C320,200 420,600 720,400 C1020,200 1120,600 1440,400",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,500 C400,300 500,700 800,500 C1100,300 1200,700 1440,500"
          stroke={primaryColor}
          strokeWidth="1"
          fill="none"
          animate={{
            d: [
              "M0,500 C400,300 500,700 800,500 C1100,300 1200,700 1440,500",
              "M0,500 C300,700 400,300 700,500 C1000,700 1100,300 1440,500",
              "M0,500 C400,300 500,700 800,500 C1100,300 1200,700 1440,500",
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.path
          d="M0,300 C500,100 600,800 900,300 C1200,-200 1300,600 1440,300"
          stroke={primaryColor}
          strokeWidth="0.5"
          fill="none"
          animate={{
            d: [
              "M0,300 C500,100 600,800 900,300 C1200,-200 1300,600 1440,300",
              "M0,300 C400,800 500,100 800,300 C1100,600 1200,-200 1440,300",
              "M0,300 C500,100 600,800 900,300 C1200,-200 1300,600 1440,300",
            ],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
};

export default function TemplateCyber({
  portfolio,
  sections,
}: {
  portfolio: PortfolioData;
  sections: PortfolioSection[];
}) {
  const heroSection = sections.find((s) => s.type === "hero");
  const title = heroSection?.content?.title || "Sistema Inicializado...";
  const subtitle =
    heroSection?.content?.subtitle ||
    "Desarrollador full-stack listo para nuevos despliegues.";
  const avatarUrl =
    portfolio.logoUrl ||
    heroSection?.content?.avatarUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

  const primaryColor = portfolio.primaryColor || "#00ffcc";
  const secondaryColor = portfolio.secondaryColor || "#0a0a0f";
  const secondaryTextColor = portfolio.secondaryTextColor || "#9ca3af";
  const projects = portfolio.projects ?? [];
  const experience = portfolio.experience ?? [];
  const courses = portfolio.courses ?? [];
  const skills = portfolio.skills ?? [];

  const getSkillName = (s: PortfolioSkillEntry): string => {
    if (typeof s === "string") return s;
    if (s && typeof s === "object" && s.name) return String(s.name);
    return "";
  };
  const getSkillLevel = (s: PortfolioSkillEntry): number | null => {
    if (s && typeof s === "object" && s.level != null) return Number(s.level);
    return null;
  };

  const getTools = (tools: PortfolioProject["tools"]): string[] => {
    if (!tools) return [];
    if (typeof tools === "string")
      return tools
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);
    if (Array.isArray(tools)) return tools.map(String);
    return [];
  };

  const [currentTime, setCurrentTime] = React.useState("");

  React.useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const cyberCardStyle = {
    backgroundColor: `color-mix(in srgb, ${primaryColor} 6%, ${secondaryColor} 94%)`,
    borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)`,
    boxShadow: `0 8px 32px 0 color-mix(in srgb, ${primaryColor} 5%, transparent)`,
  };

  const cyberButton = {
    backgroundColor: `color-mix(in srgb, ${primaryColor} 15%, transparent)`,
    color: primaryColor,
    borderColor: `color-mix(in srgb, ${primaryColor} 40%, transparent)`,
  };

  const topNavStyle = {
    backgroundColor: `color-mix(in srgb, ${secondaryColor} 85%, transparent)`,
    borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)`,
  };

  return (
    <div
      className="min-h-screen text-gray-100 font-sans tracking-tight overflow-x-hidden w-full relative"
      style={{
        backgroundColor: secondaryColor,
        fontFamily: portfolio.fontFamily,
      }}
    >
      <CyberBackground
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />

      {/* Top Navbar - Ajustada para mayor visibilidad en bordes */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-2">
        <div
          className="flex items-center gap-1 md:gap-3 flex-nowrap backdrop-blur-xl border p-1.5 rounded-full pointer-events-auto shadow-2xl overflow-x-auto scrollbar-hide max-w-full"
          style={topNavStyle}
        >
          <button
            className="p-2.5 rounded-full transition-colors shrink-0 hover:scale-110"
            style={{ color: primaryColor }}
          >
            <Home className="w-5 h-5" />
          </button>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-bold border shrink-0 transition-transform hover:scale-105"
            style={{
              ...cyberButton,
              backgroundColor: primaryColor,
              color: secondaryColor,
            }}
          >
            <User className="w-4 h-4" />{" "}
            <span className="hidden xs:inline">Acerca de</span>
          </button>
          {[
            { id: "work", icon: Briefcase, label: "Trabajo" },
            { id: "projects", icon: FileText, label: "Proyectos" },
            { id: "experience", icon: FileText, label: "Exp." },
            { id: "skills", icon: FileText, label: "Skills" },
            { id: "contact", icon: Mail, label: "Contacto" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors shrink-0 hover:bg-white/10"
              style={{ color: secondaryTextColor }}
            >
              <item.icon className="w-4 h-4" />{" "}
              <span className="hidden sm:inline">{item.label}</span>
            </a>
          ))}
        </div>
      </header>

      {/* Indicadores de Sistema */}
      <div
        className="fixed top-6 left-6 text-[10px] font-mono hidden xl:block tracking-[0.3em] opacity-50"
        style={{ color: secondaryTextColor }}
      >
        {String(title).split(" ")[0] || "USER-01"}
      </div>
      <div
        className="fixed top-6 right-6 text-[10px] font-mono hidden xl:block tracking-[0.3em]"
        style={{ color: primaryColor }}
      >
        {currentTime || "00:00:00"}
      </div>

      <div className="w-full flex flex-col lg:flex-row relative pt-24 lg:pt-0">
        {/* Left Sidebar - Ajustada para ser más esbelta */}
        <aside
          className="lg:w-64 xl:w-72 lg:fixed lg:h-screen flex flex-col justify-center px-4 xl:px-8 z-40 lg:border-r"
          style={{
            borderColor: `color-mix(in srgb, ${primaryColor} 10%, transparent)`,
          }}
        >
          <nav
            className="space-y-6 text-xs font-bold tracking-widest hidden lg:block"
            style={{ color: secondaryTextColor }}
          >
            {[
              { href: "#intro", label: "Inicio", active: true },
              { href: "#projects", label: "Proyectos", active: false },
              { href: "#skills", label: "Skills", active: false },
              { href: "#contact", label: "Contacto", active: false },
            ].map(({ href, label, active }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-4 transition-all group hover:translate-x-2 duration-300"
                style={{ color: active ? primaryColor : secondaryTextColor }}
              >
                <span
                  className="h-[1px] transition-all duration-300 group-hover:w-8"
                  style={{
                    width: active ? "1.5rem" : "0.75rem",
                    backgroundColor: active
                      ? primaryColor
                      : `color-mix(in srgb, ${secondaryTextColor} 30%, transparent)`,
                  }}
                />
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content - Ajustado para ocupar todo el ancho disponible */}
        <main className="flex-1 lg:ml-64 xl:ml-72 flex flex-col py-8 md:py-20 lg:py-32 px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 w-full">
          <div className="flex flex-col gap-20 md:gap-32 w-full max-w-full">
            {/* HERO SECTION */}
            <div
              className="flex flex-col xl:flex-row gap-12 lg:gap-16 w-full items-center xl:items-start"
              id="intro"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center shrink-0 relative"
              >
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full">
                  <div
                    className="absolute inset-0 rounded-full animate-spin-slow"
                    style={{
                      border: `1px dashed ${primaryColor}`,
                      opacity: 0.3,
                    }}
                  />
                  <div
                    className="absolute inset-4 rounded-full animate-reverse-spin"
                    style={{
                      border: `1px solid ${primaryColor}`,
                      opacity: 0.1,
                    }}
                  />
                  <div
                    className="w-full h-full rounded-full overflow-hidden relative z-10 border-2 p-1"
                    style={{
                      borderColor: `color-mix(in srgb, ${primaryColor} 50%, transparent)`,
                    }}
                  >
                    <img
                      src={avatarUrl}
                      alt="Portrait"
                      className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center space-y-3">
                  {portfolio.location && (
                    <div
                      className="text-[10px] font-mono tracking-[0.2em] px-4 py-1.5 rounded-full border"
                      style={{
                        backgroundColor: secondaryColor,
                        borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)`,
                        color: primaryColor,
                      }}
                    >
                      {String(portfolio.location)}
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 text-center xl:text-left"
              >
                <div className="mb-8">
                  <h1
                    className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.85]"
                    style={{ color: primaryColor }}
                  >
                    {String(title)}
                  </h1>
                  <p
                    className="mt-6 text-xl md:text-2xl font-light tracking-wide max-w-2xl mx-auto xl:mx-0"
                    style={{ color: secondaryTextColor }}
                  >
                    {String(subtitle)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4">
                  {portfolio.email && (
                    <a
                      href={`mailto:${portfolio.email}`}
                      className="px-8 py-4 rounded-full border text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-2xl"
                      style={cyberButton}
                    >
                      <Mail className="w-4 h-4 inline mr-2" /> Iniciar Contacto
                    </a>
                  )}
                  <div className="flex gap-2">
                    {[
                      {
                        icon: LinkedinIcon,
                        link: portfolio.socialLinks?.linkedin,
                      },
                      {
                        icon: TwitterIcon,
                        link: portfolio.socialLinks?.twitter,
                      },
                      { icon: GithubIcon, link: portfolio.socialLinks?.github },
                    ].map(
                      (social, i) =>
                        social.link && (
                          <a
                            key={i}
                            href={String(social.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-full border transition-all hover:bg-white/5"
                            style={{
                              borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)`,
                              color: primaryColor,
                            }}
                          >
                            <social.icon className="w-5 h-5" />
                          </a>
                        ),
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* PROJECTS SECTION */}
            {projects.length > 0 && (
              <section id="projects" className="w-full">
                <div
                  className="flex items-end justify-between mb-12 border-b pb-6"
                  style={{
                    borderColor: `color-mix(in srgb, ${primaryColor} 10%, transparent)`,
                  }}
                >
                  <h3
                    className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
                    style={{ color: primaryColor }}
                  >
                    Proyectos
                  </h3>
                  <span
                    className="font-mono text-xs opacity-50"
                    style={{ color: secondaryTextColor }}
                  >
                    CANTIDAD: {projects.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {projects.map((project: PortfolioProject, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 border overflow-hidden rounded-3xl transition-all duration-500"
                      style={cyberCardStyle}
                    >
                      <div
                        className="lg:col-span-5 h-64 lg:h-auto overflow-hidden border-b lg:border-b-0 lg:border-r"
                        style={{
                          borderColor: `color-mix(in srgb, ${primaryColor} 10%, transparent)`,
                        }}
                      >
                        {project.imageUrl ? (
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-black/40">
                            <Code2 className="w-12 h-12 opacity-20" />
                          </div>
                        )}
                      </div>
                      <div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className="text-[10px] font-mono px-2 py-1 rounded border"
                            style={{
                              color: primaryColor,
                              borderColor: primaryColor,
                            }}
                          >
                            0{idx + 1}
                          </span>
                          <div
                            className="h-[1px] flex-1"
                            style={{
                              backgroundColor: primaryColor,
                              opacity: 0.1,
                            }}
                          />
                        </div>
                        <h4
                          className="text-2xl md:text-4xl font-bold mb-4"
                          style={{ color: primaryColor }}
                        >
                          {String(project.name || project.title)}
                        </h4>
                        <p
                          className="text-sm md:text-base leading-relaxed mb-8 opacity-80"
                          style={{ color: secondaryTextColor }}
                        >
                          {String(project.description)}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {getTools(project.tools).map((t, j) => (
                            <span
                              key={j}
                              className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-white/5 border border-white/10"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        {project.link && (
                          <a
                            href={String(project.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all"
                            style={{ color: primaryColor }}
                          >
                            Ver Despliegue <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* EXPERIENCE & SKILLS GRID (Ajustado para ocupar ancho) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
              {/* EXPERIENCE */}
              <section id="experience">
                <h3
                  className="text-3xl font-black uppercase tracking-tighter mb-10"
                  style={{ color: primaryColor }}
                >
                  Experiencia
                </h3>
                <div className="space-y-10">
                  {experience.map((exp, idx) => (
                    <div
                      key={idx}
                      className="relative pl-6 border-l"
                      style={{
                        borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)`,
                      }}
                    >
                      <div
                        className="absolute -left-[5px] top-0 w-2 h-2 rounded-full"
                        style={{ backgroundColor: primaryColor }}
                      />
                      <h4
                        className="text-xl font-bold"
                        style={{ color: primaryColor }}
                      >
                        {String(exp.role)}
                      </h4>
                      <p className="text-xs font-mono mb-4 opacity-60 uppercase">
                        {String(exp.company)} // {String(exp.period)}
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: secondaryTextColor }}
                      >
                        {String(exp.description)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SKILLS */}
              <section id="skills">
                <h3
                  className="text-3xl font-black uppercase tracking-tighter mb-10"
                  style={{ color: primaryColor }}
                >
                  Habilidades
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {skills.map((skill, idx) => {
                    const name = getSkillName(skill);
                    const level = getSkillLevel(skill);
                    return name ? (
                      <div
                        key={idx}
                        className="p-4 border rounded-xl"
                        style={cyberCardStyle}
                      >
                        <div className="text-[10px] font-mono mb-2 opacity-50">
                          SKL_{idx}
                        </div>
                        <div
                          className="font-bold text-xs uppercase tracking-widest"
                          style={{ color: primaryColor }}
                        >
                          {name}
                        </div>
                        {level !== null && (
                          <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${level}%` }}
                              className="h-full"
                              style={{ backgroundColor: primaryColor }}
                            />
                          </div>
                        )}
                      </div>
                    ) : null;
                  })}
                </div>
              </section>
            </div>

            {/* EDUCATION */}
            {courses.length > 0 && (
              <section id="education">
                <h3
                  className="text-3xl font-black uppercase tracking-tighter mb-10"
                  style={{ color: primaryColor }}
                >
                  Formación
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course, idx) => (
                    <div
                      key={idx}
                      className="p-6 border rounded-2xl"
                      style={cyberCardStyle}
                    >
                      <h4
                        className="font-bold text-lg mb-2"
                        style={{ color: primaryColor }}
                      >
                        {String(course.name)}
                      </h4>
                      <p className="text-[10px] font-mono opacity-60 uppercase mb-4">
                        {String(course.institution)} • {String(course.year)}
                      </p>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: secondaryTextColor }}
                      >
                        {String(course.description)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div id="contact" className="w-full">
              <PortfolioInquiryForm
                portfolioSlug={portfolio.slug}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                variant="cyber"
                className="w-full"
              />
            </div>
          </div>
        </main>
      </div>

      {/* Footer - Ultra Wide */}
      <footer
        className="mt-20 py-10 px-6 border-t flex flex-col md:flex-row justify-between items-center gap-6"
        style={{
          borderColor: `color-mix(in srgb, ${primaryColor} 10%, transparent)`,
          color: secondaryTextColor,
        }}
      >
        <div className="font-mono text-[10px] tracking-[0.4em]">
          &copy; {new Date().getFullYear()} {String(title)}
        </div>
        <div className="flex gap-6 font-mono text-[10px]">
          <span className="opacity-40">Todo los derechos reservados</span>
          <span className="opacity-40">Desarrollo: oor mioc</span>
        </div>
      </footer>
    </div>
  );
}
