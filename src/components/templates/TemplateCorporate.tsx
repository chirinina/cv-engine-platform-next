"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Briefcase,
  Code2,
  Mail,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Layers,
  GraduationCap,
  Home,
  User,
  ArrowUpRight,
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

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function TemplateCorporate({
  portfolio,
  sections,
}: {
  portfolio: PortfolioData;
  sections: PortfolioSection[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroSection = sections.find((s) => s.type === "hero");
  const title =
    heroSection?.content?.title || portfolio.name || "Professional Profile";
  const subtitle =
    heroSection?.content?.subtitle ||
    "Strategic thinker and high-impact professional.";

  const primaryColor = portfolio.primaryColor || "#0f172a";
  const bgColor = portfolio.secondaryColor || "#f8fafc";
  const secondaryTextColor = portfolio.secondaryTextColor || "#475569";

  const courses = portfolio.courses ?? [];
  const projects = portfolio.projects ?? [];
  const experience = portfolio.experience ?? [];
  const skills = portfolio.skills ?? [];

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
    if (s && typeof s === "object" && s.name) return String(s.name);
    return "";
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", duration: 0.8, bounce: 0.3 },
    },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.4 } },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 50 },
    },
    exit: { opacity: 0, x: -50 },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 50 },
    },
    exit: { opacity: 0, x: 50 },
  };

  const navLinks = [
    { name: "Inicio", href: "#home", icon: <Home className="w-4 h-4" /> },
    {
      name: "Experiencia",
      href: "#experience",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      name: "Proyectos",
      href: "#projects",
      icon: <Code2 className="w-4 h-4" />,
    },
    {
      name: "Habilidades",
      href: "#skills",
      icon: <Layers className="w-4 h-4" />,
    },
    {
      name: "Educación",
      href: "#education",
      icon: <GraduationCap className="w-4 h-4" />,
    },
    { name: "Contacto", href: "#contact", icon: <Mail className="w-4 h-4" /> },
  ];

  const glassStyle = {
    backgroundColor: `color-mix(in srgb, ${primaryColor} 4%, transparent)`,
    borderColor: `color-mix(in srgb, ${primaryColor} 12%, transparent)`,
    backdropFilter: "blur(12px)",
  };

  const glassNavStyle = {
    backgroundColor: `color-mix(in srgb, ${bgColor} 80%, transparent)`,
    borderColor: `color-mix(in srgb, ${primaryColor} 10%, transparent)`,
    backdropFilter: "blur(20px)",
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row overflow-x-hidden selection:bg-blue-500/30 relative"
      style={{ backgroundColor: bgColor, fontFamily: portfolio.fontFamily }}
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 z-[100] origin-left"
        style={{ scaleX, backgroundColor: primaryColor }}
      />

      {/* Mobile Header (Solo visible en móviles) */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-50 border-b px-4 py-4 flex justify-between items-center"
        style={glassNavStyle}
      >
        <h2
          className="text-xl font-black tracking-tighter"
          style={{ color: primaryColor }}
        >
          {portfolio.initials || "Hola"}
        </h2>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2"
          style={{ color: primaryColor }}
        >
          {isMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </header>

      {/* Botón para Mostrar/Ocultar Sidebar en Desktop */}
      <button
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className="hidden md:flex fixed left-4 bottom-8 z-[60] w-12 h-12 items-center justify-center rounded-full shadow-xl border transition-all hover:scale-110 active:scale-95"
        style={{
          backgroundColor: primaryColor,
          color: "white",
          borderColor: `color-mix(in srgb, ${primaryColor} 20%, white)`,
        }}
        title={isSidebarCollapsed ? "Mostrar Menú" : "Ocultar Menú"}
      >
        {isSidebarCollapsed ? (
          <ChevronRight className="w-6 h-6" />
        ) : (
          <ChevronLeft className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar Navigation */}
      <AnimatePresence mode="wait">
        {(!isSidebarCollapsed || isMenuOpen) && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`
              fixed top-0 left-0 h-screen z-40 border-r flex flex-col justify-between py-10 px-6
              ${isMenuOpen ? "w-full flex" : "w-80 hidden md:flex"}
            `}
            style={glassNavStyle}
          >
            <div className="space-y-10">
              <div className="flex flex-col items-start gap-4">
                {portfolio.logoUrl ? (
                  <img
                    src={portfolio.logoUrl}
                    alt="Logo"
                    className="w-14 h-14 rounded-xl object-cover shadow-2xl"
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-2xl"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {portfolio.initials || "Hola"}
                  </div>
                )}
                <div>
                  <h1
                    className="text-xl font-bold"
                    style={{ color: primaryColor }}
                  >
                    {portfolio.name}
                  </h1>
                  <p
                    className="text-[10px] font-black uppercase tracking-widest opacity-60"
                    style={{ color: primaryColor }}
                  >
                    {portfolio.profession}
                  </p>
                </div>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 text-sm font-bold transition-all hover:bg-black/5 px-4 py-3.5 rounded-xl group"
                    style={{ color: secondaryTextColor }}
                  >
                    <span
                      className="group-hover:scale-110 transition-transform"
                      style={{ color: primaryColor }}
                    >
                      {link.icon}
                    </span>
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            <div
              className="pt-6 border-t"
              style={{
                borderColor: `color-mix(in srgb, ${primaryColor} 10%, transparent)`,
              }}
            >
              <div className="flex gap-5 px-4">
                {portfolio.socialLinks?.linkedin && (
                  <a
                    href={portfolio.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: primaryColor }}
                  >
                    <LinkedinIcon className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" />
                  </a>
                )}
                {portfolio.socialLinks?.github && (
                  <a
                    href={portfolio.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: primaryColor }}
                  >
                    <GithubIcon className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" />
                  </a>
                )}
                {portfolio.socialLinks?.website && (
                  <a
                    href={portfolio.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: primaryColor }}
                  >
                    <GlobeIcon className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" />
                  </a>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`flex-1 w-full flex flex-col transition-all duration-500 ease-in-out ${!isSidebarCollapsed ? "md:ml-80" : "md:ml-0"}`}
      >
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center px-4 md:px-10 lg:px-16 py-20 relative"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={slideInLeft}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black tracking-[0.2em] mb-8"
            style={{ color: primaryColor, ...glassStyle }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: primaryColor }}
            />
            {portfolio.location || "Remote / Global"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-[12vw] md:text-[8vw] lg:text-[7rem] font-black tracking-tighter leading-[0.85] mb-8"
            style={{ color: primaryColor }}
          >
            {title.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-4">
                {word}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl max-w-4xl font-medium leading-tight opacity-80"
            style={{ color: secondaryTextColor }}
          >
            {subtitle}
          </motion.p>
        </section>

        {/* Dynamic Sections Wrapper */}
        <div className="px-4 md:px-10 lg:px-16 space-y-40 pb-40">
          {/* Experience Section */}
          {experience.length > 0 && (
            <section id="experience" className="space-y-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={slideInLeft}
                className="flex items-center gap-6"
              >
                <h2
                  className="text-sm font-black tracking-[0.3em]"
                  style={{ color: primaryColor }}
                >
                  Mi Trayectoria Profesional
                </h2>
                <div
                  className="h-[1px] flex-1 opacity-20"
                  style={{ backgroundColor: primaryColor }}
                />
              </motion.div>

              <div
                className="grid gap-1 border-l-2"
                style={{
                  borderColor: `color-mix(in srgb, ${primaryColor} 10%, transparent)`,
                }}
              >
                {experience.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: false, amount: 0.2 }}
                    className="pl-8 pb-16 relative group"
                  >
                    <div
                      className="absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 bg-white group-hover:scale-150 transition-transform"
                      style={{ borderColor: primaryColor }}
                    />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <h3
                        className="text-3xl md:text-5xl font-bold tracking-tighter"
                        style={{ color: primaryColor }}
                      >
                        {exp.role}
                      </h3>
                      <span
                        className="text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-lg"
                        style={{ ...glassStyle, color: primaryColor }}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-2 text-xl font-bold opacity-70 mb-6"
                      style={{ color: primaryColor }}
                    >
                      <Briefcase className="w-5 h-5" /> {exp.company}
                    </div>
                    <p
                      className="text-lg md:text-xl max-w-5xl leading-relaxed"
                      style={{ color: secondaryTextColor }}
                    >
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section id="projects" className="space-y-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={slideInLeft}
                className="flex items-center gap-6"
              >
                <h2
                  className="text-sm font-black tracking-[0.3em]"
                  style={{ color: primaryColor }}
                >
                  Mis Trabajos Destacados
                </h2>
                <div
                  className="h-[1px] flex-1 opacity-20"
                  style={{ backgroundColor: primaryColor }}
                />
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    variants={idx % 2 === 0 ? slideInLeft : slideInRight}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: false, amount: 0.1 }}
                    className="group rounded-[2rem] overflow-hidden border p-1"
                    style={glassStyle}
                  >
                    <div className="relative aspect-video rounded-[1.8rem] overflow-hidden">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black/5">
                          <Code2 className="w-12 h-12 opacity-10" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-black p-4 rounded-full"
                          >
                            <ArrowUpRight className="w-6 h-6" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="p-8 space-y-4">
                      <h3
                        className="text-2xl font-bold"
                        style={{ color: primaryColor }}
                      >
                        {project.name || project.title}
                      </h3>
                      <p
                        className="line-clamp-2 text-sm leading-relaxed"
                        style={{ color: secondaryTextColor }}
                      >
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {getTools(project.tools).map((tool, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-black uppercase tracking-tighter px-3 py-1.5 rounded-md border"
                            style={{
                              color: primaryColor,
                              borderColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)`,
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section id="skills" className="space-y-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={slideInLeft}
                className="flex items-center gap-6"
              >
                <h2
                  className="text-sm font-black tracking-[0.3em]"
                  style={{ color: primaryColor }}
                >
                  Mis Habilidades Clave
                </h2>
              </motion.div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{
                      y: -5,
                      backgroundColor: primaryColor,
                      color: "#fff",
                    }}
                    viewport={{ once: false }}
                    className="px-8 py-5 rounded-2xl border font-bold text-sm uppercase tracking-widest transition-all cursor-default"
                    style={{ ...glassStyle, color: primaryColor }}
                  >
                    {getSkillName(skill)}
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Education & Contact */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
            {/* Education */}
            <section id="education" className="space-y-12">
              <h2
                className="text-sm font-black tracking-[0.3em]"
                style={{ color: primaryColor }}
              >
                Me sigo formando...
              </h2>
              <div className="space-y-6">
                {courses.map((course, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    variants={slideInLeft}
                    viewport={{ once: false }}
                    className="p-8 rounded-3xl border flex flex-col gap-4"
                    style={glassStyle}
                  >
                    <div className="flex justify-between items-start">
                      <h3
                        className="text-xl font-bold leading-tight"
                        style={{ color: primaryColor }}
                      >
                        {course.name}
                      </h3>
                      <span className="text-[10px] font-black opacity-40">
                        {course.year}
                      </span>
                    </div>
                    <p
                      className="text-sm uppercase tracking-widest font-black"
                      style={{ color: primaryColor }}
                    >
                      {course.institution}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section id="contact" className="space-y-12">
              <h2
                className="text-sm font-black tracking-[0.3em]"
                style={{ color: primaryColor }}
              >
                Puedes contactarme aquí
              </h2>
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={slideInRight}
                viewport={{ once: false }}
                className="p-8 md:p-12 rounded-[3rem] border shadow-2xl"
                style={{ ...glassStyle, borderColor: primaryColor }}
              >
                <PortfolioInquiryForm
                  portfolioSlug={portfolio.slug}
                  primaryColor={primaryColor}
                  secondaryColor={bgColor}
                  textColor={secondaryTextColor}
                  variant="corporate"
                />
              </motion.div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="mt-20 px-4 md:px-10 lg:px-16 py-12 border-t flex flex-col md:flex-row justify-between items-center gap-8"
          style={{
            borderColor: `color-mix(in srgb, ${primaryColor} 10%, transparent)`,
          }}
        >
          <p
            className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40"
            style={{ color: primaryColor }}
          >
            © {new Date().getFullYear()} — {portfolio.name}
          </p>
          <div
            className="flex items-center gap-4 text-[10px] font-black tracking-widest"
            style={{ color: primaryColor }}
          >
            <span className="opacity-40">Desarrollado por</span>
            <div
              className="w-8 h-[1px]"
              style={{ backgroundColor: primaryColor }}
            />
            <span>Diolay</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
