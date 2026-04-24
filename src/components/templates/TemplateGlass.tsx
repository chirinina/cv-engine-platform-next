"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Mail,
  Briefcase,
  Code2,
  GraduationCap,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Heart,
  ImageIcon,
} from "lucide-react";
import PortfolioInquiryForm from "./PortfolioInquiryForm";
import {
  PortfolioCourse,
  PortfolioData,
  PortfolioExperience,
  PortfolioProject,
  PortfolioSection,
  PortfolioSkillEntry,
} from "@/types/portfolio";

// --- Animaciones Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

// --- Iconos Sociales ---
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

// --- Fondo Dinámico ---
const AmbientBackground = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) => {
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: secondaryColor || "#020617" }}
    >
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, color-mix(in srgb, ${primaryColor} 33%, transparent) 0%, transparent 70%)`,
        }}
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none opacity-60"
      />
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-20%",
          translateY: "-20%",
          background: `radial-gradient(circle, color-mix(in srgb, ${secondaryColor} 22%, transparent) 0%, transparent 70%)`,
        }}
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none opacity-40"
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
    </div>
  );
};

// --- Glass Card ---
const GlassCard = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInUp}
    className={`group relative overflow-hidden bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-700 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

export default function TemplateGlass({
  portfolio,
  sections,
}: {
  portfolio: PortfolioData;
  sections: PortfolioSection[];
}) {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const heroSection = sections.find((s) => s.type === "hero");
  const title = heroSection?.content?.title || "Creative Vision";
  const subtitle =
    heroSection?.content?.subtitle ||
    "Designing interactive experiences through code and imagination.";
  const avatarUrl =
    portfolio.logoUrl ||
    heroSection?.content?.avatarUrl ||
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80";

  const primaryColor = portfolio.primaryColor || "#ec4899";
  const secondaryColor = portfolio.secondaryColor || "#8b5cf6";
  const textColor = portfolio.secondaryTextColor || "#f1f5f9";
  const projects = portfolio.projects ?? [];
  const experience = portfolio.experience ?? [];
  const courses = portfolio.courses ?? [];
  const skills = portfolio.skills ?? [];
  const hobbies = portfolio.hobbies ?? [];

  const getTools = (tools: PortfolioProject["tools"]): string[] => {
    if (!tools) return [];
    if (typeof tools === "string")
      return tools
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    if (Array.isArray(tools)) return tools.map(String);
    return [];
  };

  const getSkillName = (s: PortfolioSkillEntry): string => {
    if (typeof s === "string") return s;
    return s?.name ? String(s.name) : "";
  };

  const getSkillLevel = (s: PortfolioSkillEntry): number | null => {
    if (s && typeof s === "object" && s.level != null) return Number(s.level);
    return null;
  };

  return (
    <div
      className="min-h-screen font-sans selection:bg-white/30 selection:opacity-100 overflow-x-hidden"
      style={{ fontFamily: portfolio.fontFamily, color: textColor }}
    >
      <AmbientBackground
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />

      {/* Barra de progreso superior */}
      <motion.div
        style={{ scaleX: scaleProgress }}
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
      />

      {/* Navegación - Ultra Slim Glass */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className="flex items-center gap-2 md:gap-8 px-6 py-3 bg-black/20 backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl overflow-x-auto no-scrollbar max-w-full">
          {["Inicio", "Proyectos", "Experiencia", "Habilidades", "Pasatiempos"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold opacity-80 hover:opacity-100 transition-all whitespace-nowrap"
            >
              {item}
            </a>
          ))}
        </div>
      </motion.nav>

      <main className="relative z-10 w-full px-2 md:px-6 lg:px-10 pt-24 md:pt-32 flex flex-col gap-16 md:gap-32 max-w-[1600px] mx-auto">
        {/* Hero Section - Inmersiva */}
        <section
          id="inicio"
          className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[85vh] py-10"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex-1 space-y-6 md:space-y-10 text-center lg:text-left"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: primaryColor }}
                ></span>
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: primaryColor }}
                ></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-90">
                Disponible ahora
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9]"
              style={{ color: primaryColor }}
            >
              {title.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-4 last:mr-0">
                  {word}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-2xl opacity-80 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              {subtitle}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4"
            >
              {portfolio.email && (
                <a
                  href={`mailto:${portfolio.email}`}
                  className="group relative px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold overflow-hidden transition-all hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Hablemos <Mail className="w-5 h-5" />
                  </span>
                </a>
              )}

              <div className="flex gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                {[
                  {
                    icon: <LinkedinIcon className="w-5 h-5" />,
                    link: portfolio.socialLinks?.linkedin,
                  },
                  {
                    icon: <GithubIcon className="w-5 h-5" />,
                    link: portfolio.socialLinks?.github,
                  },
                  {
                    icon: <TwitterIcon className="w-5 h-5" />,
                    link: portfolio.socialLinks?.twitter,
                  },
                ].map(
                  (social, i) =>
                    social.link && (
                      <a
                        key={i}
                        href={social.link}
                        target="_blank"
                        className="p-3 opacity-80 hover:opacity-100 hover:bg-white/10 rounded-xl transition-all"
                      >
                        {social.icon}
                      </a>
                    ),
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Imagen Hero - Efecto Parallax Suave */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full max-w-[500px] lg:w-[40%] relative aspect-[4/5]"
          >
            <div
              className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[3rem] blur-3xl opacity-30 animate-pulse"
              style={{ backgroundColor: primaryColor }}
            />
            <div className="relative h-full w-full rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl group">
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />

              {/* Badges Flotantes */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                {portfolio.profession && (
                  <div className="px-5 py-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl">
                    <p className="text-[10px] uppercase tracking-widest opacity-80 mb-1">
                      Especialidad
                    </p>
                    <p className="font-bold text-sm opacity-100">
                      {portfolio.profession}
                    </p>
                  </div>
                )}
                {portfolio.location && (
                  <div className="p-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl">
                    <MapPin className="w-4 h-4 opacity-100" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Projects Section - Full Width Grid */}
        {projects.length > 0 && (
          <section id="proyectos" className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">
                  Proyectos <span className="opacity-20">Destacados</span>
                </h2>
                <p className="opacity-80 max-w-xl text-lg font-light">
                  Soluciones digitales que combinan estética y funcionalidad
                  técnica.
                </p>
              </div>
              <div className="h-px flex-1 bg-white/10 hidden md:block mb-6 mx-8" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
              {projects.map((project: PortfolioProject, idx: number) => (
                <GlassCard key={idx} className="!p-0 group/card">
                  <div className="flex flex-col h-full">
                    <div className="relative aspect-video overflow-hidden">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.name || project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                          <Layers className="w-12 h-12 opacity-10" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    <div className="p-8 md:p-10 space-y-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono opacity-40">
                            0{idx + 1}
                          </span>
                          <h3 className="text-3xl font-bold tracking-tight"
                            style={{ color: primaryColor }}>
                            {project.name || project.title}
                          </h3>
                        </div>
                        <p className="opacity-80 font-light leading-relaxed line-clamp-3 text-lg">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {getTools(project.tools).map((tool, i) => (
                            <span
                              key={i}
                              className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 opacity-90"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      {project.link && (
                        <div className="pt-6">
                          <a
                            href={project.link}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-100 group/link"
                          >
                            Ver Proyecto{" "}
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        )}

        {/* Experience & Education - Adaptive Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8">
          {experience.length > 0 && (
            <GlassCard id="experiencia">
              <div className="flex items-center gap-4 mb-12">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <Briefcase
                    className="w-6 h-6"
                    style={{ color: secondaryColor }}
                  />
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                  Experiencia
                </h2>
              </div>
              <div className="space-y-12">
                {experience.map((exp: PortfolioExperience, idx: number) => (
                  <div key={idx} className="relative pl-10 group/item">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 group-hover/item:bg-white/30 transition-colors" />
                    <div
                      className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-white transition-all group-hover/item:scale-150"
                      style={{ backgroundColor: secondaryColor }}
                    />
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-xl md:text-2xl font-bold"
                          style={{ color: primaryColor }}>
                          {exp.role}
                        </h3>
                        <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-full opacity-80 flex items-center gap-2">
                          <Calendar className="w-3 h-3" /> {exp.period}
                        </span>
                      </div>
                      <p
                        className="text-lg font-medium opacity-80"
                        style={{ color: secondaryColor }}
                      >
                        {exp.company}
                      </p>
                      <p className="opacity-80 font-light leading-relaxed pt-2 text-base md:text-lg">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {courses.length > 0 && (
            <GlassCard>
              <div className="flex items-center gap-4 mb-12">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <GraduationCap
                    className="w-6 h-6"
                    style={{ color: primaryColor }}
                  />
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                  Formación
                </h2>
              </div>
              <div className="grid gap-6">
                {courses.map((course: PortfolioCourse, idx: number) => (
                  <div
                    key={idx}
                    className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group/course"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold transition-colors"
                          style={{ color: primaryColor }}>
                          {course.name}
                        </h3>
                        <p
                          className="text-lg opacity-80"
                          style={{ color: primaryColor }}
                        >
                          {course.institution}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/10 rounded-lg self-start">
                        {course.year}
                      </span>
                    </div>
                    {course.description && (
                      <p className="opacity-80 font-light mt-4 leading-relaxed">
                        {course.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>

        {/* Skills - Modern Cloud */}
        {skills.length > 0 && (
          <section id="habilidades">
            <GlassCard>
              <div className="flex items-center gap-4 mb-12">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <Code2 className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                  Habilidades Técnicas
                </h2>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-6">
                {skills.map((skill: PortfolioSkillEntry, idx: number) => {
                  const name = getSkillName(skill);
                  const level = getSkillLevel(skill);
                  if (!name) return null;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group relative px-6 py-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all cursor-default flex flex-col gap-3 min-w-[160px] flex-1 sm:flex-none"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                          style={{ backgroundColor: primaryColor }}
                        />
                        <span className="font-bold text-sm md:text-base opacity-90 tracking-wide">{name}</span>
                      </div>
                      {level !== null && (
                        <div className="w-full flex flex-col gap-2 mt-1">
                          <div className="flex justify-end w-full">
                            <span className="text-[10px] font-bold opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: primaryColor }}>{level}%</span>
                          </div>
                          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${level}%` }}
                              transition={{ duration: 1.2, delay: idx * 0.1, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{ 
                                background: `linear-gradient(90deg, transparent, ${primaryColor})`,
                                boxShadow: `0 0 10px ${primaryColor}` 
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </GlassCard>
          </section>
        )}

        {/* Hobbies - Glass */}
        {hobbies.length > 0 && (
          <section id="pasatiempos">
            <GlassCard>
              <div className="flex items-center gap-4 mb-12">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <Heart className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                  Pasatiempos
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {hobbies.map((hobby, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all overflow-hidden"
                  >
                    {hobby.link ? (
                      <a href={hobby.link} target="_blank" rel="noreferrer" className="flex flex-col w-full h-full">
                        {hobby.imageUrl ? (
                          <div className="aspect-square w-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                            <img src={hobby.imageUrl} alt={hobby.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          </div>
                        ) : (
                          <div className="aspect-square w-full flex items-center justify-center bg-white/5">
                            <ImageIcon className="w-12 h-12 opacity-20" />
                          </div>
                        )}
                        <div className="p-5 flex items-center justify-between">
                          <span className="font-bold text-sm" style={{ color: primaryColor }}>{hobby.name}</span>
                          <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" style={{ color: primaryColor }} />
                        </div>
                      </a>
                    ) : (
                      <div className="flex flex-col w-full h-full items-center justify-center p-6 gap-4 aspect-square">
                        {hobby.imageUrl ? (
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2" style={{ borderColor: `color-mix(in srgb, ${primaryColor} 50%, transparent)` }}>
                            <img src={hobby.imageUrl} alt={hobby.name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <Heart className="w-12 h-12 opacity-30" style={{ color: primaryColor }} />
                        )}
                        <span className="font-bold text-sm text-center" style={{ color: primaryColor }}>{hobby.name}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </section>
        )}

        {/* Formulario de Contacto */}
        <div className="px-2">
          <PortfolioInquiryForm
            portfolioSlug={portfolio.slug}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            variant="glass"
            textColor={textColor}
          />
        </div>
      </main>

      {/* Footer - Cinematic */}
      <footer className="relative z-10 w-full mt-32 border-t border-white/5 bg-black/40 backdrop-blur-3xl py-20 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-70 font-bold">
                  {portfolio.user?.name || portfolio.name}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-6">
              {portfolio.socialLinks?.linkedin && (
                <a
                  href={portfolio.socialLinks.linkedin}
                  className="opacity-80 hover:opacity-100 transition-colors"
                >
                  <LinkedinIcon className="w-6 h-6" />
                </a>
              )}
              {portfolio.socialLinks?.github && (
                <a
                  href={portfolio.socialLinks.github}
                  className="opacity-80 hover:opacity-100 transition-colors"
                >
                  <GithubIcon className="w-6 h-6" />
                </a>
              )}
            </div>
            <p className="opacity-70 text-xs font-medium tracking-widest mt-4">
              © {new Date().getFullYear()} • Todo los derechos reservados •
              Desarrollado por Diolay
            </p>
          </div>
        </div>

        {/* Decoración de fondo en footer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </footer>

      {/* Estilos Globales Extra */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
