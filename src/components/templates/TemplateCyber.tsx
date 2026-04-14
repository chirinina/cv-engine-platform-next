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
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-6a6 6 0 0 1 6-6z" />
    <line x1="8" y1="11" x2="8" y2="17" />
    <line x1="8" y1="8" x2="8" y2="8" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .36.04.71.11 1.05C7.69 5.4 4.07 3.67 1.64 1.15c-.4.68-.63 1.47-.63 2.31 0 1.6.81 3.01 2.05 3.84A4.48 4.48 0 0 1 .96 6.1v.06c0 2.23 1.59 4.09 3.7 4.51-.39.11-.8.17-1.22.17-.3 0-.59-.03-.87-.08.59 1.84 2.3 3.18 4.33 3.22A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z" />
  </svg>
);

// Componente de Fondo Sensacional Curvo Totalmente Adaptivo
const CyberBackground = ({ primaryColor, secondaryColor }: { primaryColor: string; secondaryColor: string }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" style={{ backgroundColor: secondaryColor }}>
      {/* Mallas de luz fluida ambientales en esquinas */}
      <div 
        className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] rounded-full blur-[160px] opacity-30 mix-blend-screen"
        style={{ backgroundColor: primaryColor }}
      />
      <div 
        className="absolute bottom-[-30%] right-[-20%] w-[70%] h-[70%] rounded-full blur-[160px] opacity-20 mix-blend-screen"
        style={{ backgroundColor: primaryColor }}
      />
      
      {/* Vías Curvas Hipnóticas */}
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
              "M0,400 C320,200 420,600 720,400 C1020,200 1120,600 1440,400"
            ]
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
              "M0,500 C400,300 500,700 800,500 C1100,300 1200,700 1440,500"
            ]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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
              "M0,300 C500,100 600,800 900,300 C1200,-200 1300,600 1440,300"
            ]
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
  const subtitle = heroSection?.content?.subtitle || "Desarrollador full-stack listo para nuevos despliegues.";
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

  // Estilos Dinámicos Cyber
  const cyberCardStyle = {
    backgroundColor: `color-mix(in srgb, ${primaryColor} 6%, ${secondaryColor} 94%)`,
    borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)`,
    boxShadow: `0 8px 32px 0 color-mix(in srgb, ${primaryColor} 5%, transparent)`,
  };

  const cyberCardHoverStyle = {
    backgroundColor: `color-mix(in srgb, ${primaryColor} 10%, ${secondaryColor} 90%)`,
    borderColor: `color-mix(in srgb, ${primaryColor} 40%, transparent)`,
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
      className="min-h-screen text-gray-100 font-sans tracking-tight"
      style={{
        backgroundColor: secondaryColor,
        fontFamily: portfolio.fontFamily,
      }}
    >
      <CyberBackground primaryColor={primaryColor} secondaryColor={secondaryColor} />

      {/* Top Navbar */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <div 
          className="flex items-center gap-1 md:gap-2 backdrop-blur-xl border p-2 rounded-full pointer-events-auto shadow-2xl overflow-x-auto max-w-[95%] md:max-w-none"
          style={topNavStyle}
        >
          <button className="p-2.5 rounded-full transition-colors shrink-0 hover:scale-110" style={{ color: primaryColor }}>
            <Home className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border shrink-0 transition-transform hover:scale-105" style={{ ...cyberButton, backgroundColor: primaryColor, color: secondaryColor }}>
            <User className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Acerca de</span>
          </button>
          <a href="#work" className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-colors shrink-0 hover:bg-white/10" style={{ color: secondaryTextColor }}>
            <Briefcase className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Trabajo</span>
          </a>
          <a href="#projects" className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-colors shrink-0 hover:bg-white/10" style={{ color: secondaryTextColor }}>
            <FileText className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Proyectos</span>
          </a>
        </div>
      </header>

      <div className="fixed top-8 left-8 text-sm font-mono hidden xl:block" style={{ color: secondaryTextColor }}>
        SYS_USR / {String(title).split(" ")[0] || "Client"}
      </div>
      <div className="fixed top-8 right-8 text-sm font-mono hidden xl:block" style={{ color: primaryColor }}>
        [ {currentTime || "00:00:00"} ]
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row relative pt-32 lg:pt-0">
        {/* Left Sidebar */}
        <aside className="lg:w-72 lg:fixed lg:h-screen flex flex-col justify-center px-6 lg:px-10 z-40 lg:border-r" style={{ borderColor: `color-mix(in srgb, ${primaryColor} 15%, transparent)` }}>
          <nav className="space-y-8 text-sm font-bold uppercase tracking-widest hidden lg:block" style={{ color: secondaryTextColor }}>
            {[
              { href: "#intro", label: "Inicio", active: true },
              { href: "#projects", label: "Proyectos", active: false },
              { href: "#work", label: "Experiencia", active: false },
              { href: "#skills", label: "Habilidades", active: false },
            ].map(({ href, label, active }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-4 transition-colors group hover:translate-x-2 duration-300"
                style={{ color: active ? primaryColor : secondaryTextColor }}
              >
                <span
                  className="h-px transition-colors duration-300 group-hover:w-8"
                  style={{
                    width: active ? "2rem" : "1rem",
                    backgroundColor: active ? primaryColor : `color-mix(in srgb, ${secondaryTextColor} 50%, transparent)`,
                  }}
                />
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 flex py-10 lg:py-40 px-6 lg:px-16 min-h-screen">
          <div className="flex flex-col gap-24 lg:gap-32 w-full">
            
            {/* HEROS SECTION */}
            <div className="flex flex-col xl:flex-row gap-12 lg:gap-20 w-full items-center xl:items-start" id="intro">
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center shrink-0 relative"
              >
                {/* Marco fotográfico con estilo target tecnológico */}
                <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full p-2 mb-8 group overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full animate-spin-slow rotate-12" style={{ border: `2px dashed color-mix(in srgb, ${primaryColor} 40%, transparent)` }} />
                  <div className="absolute inset-2 rounded-full animate-reverse-spin" style={{ border: `1px solid color-mix(in srgb, ${primaryColor} 20%, transparent)` }} />
                  <div className="w-full h-full rounded-full overflow-hidden relative z-10 border-4" style={{ borderColor: primaryColor, backgroundColor: secondaryColor }}>
                    <img
                      src={avatarUrl}
                      alt="Portrait"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter contrast-125 hover:filter-none"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-3 font-mono">
                  {portfolio.location && (
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border shadow-sm" style={{ backgroundColor: secondaryColor, borderColor: `color-mix(in srgb, ${primaryColor} 30%, transparent)`, color: primaryColor }}>
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                      {String(portfolio.location)}
                    </div>
                  )}
                  {portfolio.profession && (
                    <div className="flex items-center gap-2 text-sm font-bold" style={{ color: secondaryTextColor }}>
                      <Briefcase className="w-4 h-4" style={{ color: primaryColor }} />{" "}
                      {String(portfolio.profession)}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Info Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl text-center xl:text-left"
              >
                {/* Hero heading */}
                <div className="space-y-4 mb-10">
                  <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-none" style={{ color: primaryColor }}>
                    {String(title)}
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-medium tracking-wide" style={{ color: secondaryTextColor }}>
                    {portfolio.profession ? String(portfolio.profession) : String(subtitle)}
                  </h2>
                </div>

                {/* Subtitle Bio */}
                <div className="leading-relaxed text-lg mb-10 max-w-xl mx-auto xl:mx-0 font-medium" style={{ color: secondaryTextColor }}>
                  {String(subtitle)}
                </div>

                {/* Cyber Action Buttons */}
                <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4 mb-12">
                  {portfolio.email && (
                    <a
                      href={`mailto:${portfolio.email}`}
                      className="flex items-center gap-3 px-6 py-3.5 rounded-xl border transition-all text-sm font-bold uppercase tracking-widest shadow-lg hover:scale-105"
                      style={cyberButton}
                    >
                      <Mail className="w-5 h-5" />
                      Contactar
                    </a>
                  )}
                  <div className="flex gap-3">
                    {portfolio.socialLinks?.linkedin && (
                      <a href={String(portfolio.socialLinks.linkedin)} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl border transition-all hover:scale-110" style={cyberButton}>
                        <LinkedinIcon className="w-5 h-5" />
                      </a>
                    )}
                    {portfolio.socialLinks?.twitter && (
                      <a href={String(portfolio.socialLinks.twitter)} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl border transition-all hover:scale-110" style={cyberButton}>
                        <TwitterIcon className="w-5 h-5" />
                      </a>
                    )}
                    {portfolio.socialLinks?.github && (
                      <a href={String(portfolio.socialLinks.github)} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl border transition-all hover:scale-110" style={cyberButton}>
                        <GithubIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* PROJECTS SECTION (Bloques Tecnológicos) */}
            {projects.length > 0 && (
              <section id="projects" className="w-full">
                <div className="flex items-center gap-5 mb-14">
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter" style={{ color: primaryColor }}>
                    Proyectos
                  </h3>
                  <div className="h-px flex-1 mt-2" style={{ background: `linear-gradient(to right, ${primaryColor}, transparent)` }} />
                </div>

                <div className="flex flex-col gap-10">
                  {projects.map((project: PortfolioProject, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="sticky top-32 backdrop-blur-2xl rounded-3xl border p-8 md:p-12 group transition-all duration-500 overflow-hidden"
                      style={{ ...cyberCardStyle, marginTop: idx === 0 ? 0 : "2rem", zIndex: 10 + idx }}
                    >
                      <div className="absolute right-0 top-0 w-64 h-64 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 rounded-full" style={{ backgroundColor: primaryColor }} />

                      <div className="relative z-10 flex flex-col gap-8">
                        <div className="flex justify-between items-start mb-2">
                          <div className="p-3 rounded-2xl border" style={{ backgroundColor: secondaryColor, borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)` }}>
                            <Code2 className="w-6 h-6" style={{ color: primaryColor }} />
                          </div>
                          <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: primaryColor }}>
                            0{idx + 1} / BLOCK
                          </span>
                        </div>

                        {project.imageUrl && (
                          <div className="w-full h-56 md:h-72 rounded-2xl overflow-hidden border group-hover:border-opacity-50 transition-colors" style={{ borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)` }}>
                            <img src={project.imageUrl} alt={project.name || "Project"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                          <div className="space-y-4">
                            <h4 className="text-3xl md:text-4xl font-bold group-hover:translate-x-2 transition-transform duration-500" style={{ color: primaryColor }}>
                              {String(project.name || project.title || "")}
                            </h4>
                            <p className="text-lg leading-relaxed max-w-xl" style={{ color: secondaryTextColor }}>
                              {String(
                                project.description || "Análisis detallado e implementación de arquitectura y componentes."
                              )}
                            </p>
                          </div>

                          <div className="flex flex-col gap-6 lg:items-end">
                            <div className="flex flex-wrap gap-2 lg:justify-end">
                              {getTools(project.tools).map((t: string, j: number) => (
                                <span
                                  key={j}
                                  className="text-xs px-4 py-1.5 rounded-full border font-mono font-bold"
                                  style={{ 
                                    backgroundColor: secondaryColor,
                                    borderColor: `color-mix(in srgb, ${primaryColor} 30%, transparent)`,
                                    color: primaryColor 
                                  }}
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
                                className="flex items-center gap-3 font-bold uppercase tracking-widest text-xs px-6 py-4 rounded-xl transition-all hover:scale-105 border group/btn mt-4 shadow-lg"
                                style={{ ...cyberButton, backgroundColor: primaryColor, color: secondaryColor }}
                              >
                                Explorar Proyecto
                                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* EXPERIENCE */}
            {experience.length > 0 && (
              <section id="work" className="pt-10">
                <div className="flex items-center gap-5 mb-14">
                  <h3 className="text-4xl font-black tracking-tighter" style={{ color: primaryColor }}>
                    Experiencia
                  </h3>
                  <div className="h-px flex-1 mt-2" style={{ background: `linear-gradient(to right, ${primaryColor}, transparent)` }} />
                </div>
                <div className="space-y-14">
                  {experience.map((exp: PortfolioExperience, idx: number) => (
                    <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-8 md:pl-14 border-l-2" style={{ borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)` }}>
                      <div
                        className="absolute left-[-11px] top-1.5 w-5 h-5 rounded-full border-4"
                        style={{ backgroundColor: primaryColor, borderColor: secondaryColor }}
                      />
                      <h4 className="text-2xl md:text-3xl font-bold" style={{ color: primaryColor }}>
                        {String(exp.role || "")}
                      </h4>
                      <p className="font-mono text-sm mt-2 font-bold tracking-widest uppercase" style={{ color: primaryColor, opacity: 0.8 }}>
                        {String(exp.company || "")} • {String(exp.period || "")}
                      </p>
                      {exp.description && (
                        <p className="mt-4 text-lg leading-relaxed max-w-3xl" style={{ color: secondaryTextColor }}>
                          {String(exp.description)}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* SKILLS */}
            {skills.length > 0 && (
              <section id="skills">
                <div className="flex items-center gap-5 mb-12">
                  <h3 className="text-4xl font-black tracking-tighter" style={{ color: primaryColor }}>
                    Habilidades
                  </h3>
                  <div className="h-px flex-1 mt-2" style={{ background: `linear-gradient(to right, ${primaryColor}, transparent)` }} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                  {skills.map((skill: PortfolioSkillEntry, idx: number) => {
                    const name = getSkillName(skill);
                    const level = getSkillLevel(skill);
                    if (!name) return null;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="group p-5 border rounded-2xl transition-all text-center relative overflow-hidden"
                        style={cyberCardStyle}
                      >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: primaryColor }} />
                        <span className="text-sm font-bold uppercase tracking-widest transition-colors relative z-10" style={{ color: primaryColor }}>
                          {name}
                        </span>
                        {level !== null && (
                          <div className="w-full h-1.5 mt-4 rounded-full overflow-hidden border" style={{ backgroundColor: secondaryColor, borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)` }}>
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${level}%` }}
                              className="h-full"
                              style={{ backgroundColor: primaryColor }}
                            />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* EDUCATION */}
            {courses.length > 0 && (
              <section id="studies">
                <div className="flex items-center gap-5 mb-12">
                  <h3 className="text-4xl font-black tracking-tighter" style={{ color: primaryColor }}>
                    Educación
                  </h3>
                  <div className="h-px flex-1 mt-2" style={{ background: `linear-gradient(to right, ${primaryColor}, transparent)` }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course: PortfolioCourse, idx: number) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="rounded-2xl p-8 border transition-colors relative overflow-hidden"
                      style={cyberCardStyle}
                    >
                      <h4 className="font-bold text-xl md:text-2xl mb-1" style={{ color: primaryColor }}>
                        {String(course.name || "")}
                      </h4>
                      <p className="text-xs mt-2 font-mono uppercase tracking-widest font-bold" style={{ color: primaryColor, opacity: 0.8 }}>
                        {String(course.institution || "")} • {String(course.year || "")}
                      </p>
                      {course.description && (
                        <p className="text-sm mt-4 leading-relaxed" style={{ color: secondaryTextColor }}>
                          {String(course.description)}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* CONTACT FOOTER */}
            <section className="mb-32">
              <div 
                className="p-10 md:p-16 rounded-[3rem] border relative overflow-hidden text-center"
                style={{ backgroundColor: `color-mix(in srgb, ${secondaryColor} 90%, ${primaryColor} 10%)`, borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)` }}
              >
                <div className="relative z-10">
                  <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter" style={{ color: primaryColor }}>
                    Creemos algo genial
                  </h3>
                  <p className="mb-8 max-w-2xl mx-auto text-lg leading-relaxed font-medium" style={{ color: secondaryTextColor }}>
                    Disponible para oportunidades freelance, contratos y posiciones a tiempo completo. El sistema está en línea y listo para un nuevo input.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6">
                    {portfolio.email && (
                      <a
                        href={`mailto:${portfolio.email}`}
                        className="text-2xl font-bold uppercase tracking-widest transition-colors hover:opacity-80 underline underline-offset-[12px]"
                        style={{ color: primaryColor }}
                      >
                        {String(portfolio.email)}
                      </a>
                    )}
                  </div>
                </div>
                {/* Decorative element */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-[140px] rounded-full pointer-events-none opacity-20" 
                  style={{ backgroundColor: primaryColor }}
                />
              </div>
            </section>

            <PortfolioInquiryForm
              portfolioSlug={portfolio.slug}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              variant="cyber"
              className="mb-10"
            />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer 
        className="py-12 px-6 border-t text-center text-sm font-mono tracking-widest font-bold flex flex-col items-center gap-2"
        style={{ borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)`, color: secondaryTextColor }}
      >
        <div className="w-16 h-1 rounded-full mb-4" style={{ backgroundColor: primaryColor, opacity: 0.5 }} />
        &copy; {new Date().getFullYear()} — SISTEMA REGISTRADO — {String(title).toUpperCase()}
      </footer>
    </div>
  );
}
