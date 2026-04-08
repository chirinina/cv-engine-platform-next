"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Mail,
  Briefcase,
  Code2,
  GraduationCap,
  MapPin,
  Calendar,
  Layers,
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

// Social Icons
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

// Dynamic Ambient Background
const AmbientBackground = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      <motion.div
        animate={{
          x: `${mousePosition.x * 0.5}%`,
          y: `${mousePosition.y * 0.5}%`,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 10 }}
        className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full mix-blend-screen filter blur-[120px] opacity-40"
        style={{
          background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
        }}
      />
      <motion.div
        animate={{
          x: `-${mousePosition.x * 0.3}%`,
          y: `-${mousePosition.y * 0.3}%`,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 10 }}
        className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 rounded-full mix-blend-screen filter blur-[100px] opacity-30"
        style={{
          background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
};

// Glass Card Component
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
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={`bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-3xl p-8 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 ${className}`}
  >
    {children}
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
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const heroSection = sections.find((s) => s.type === "hero");
  const title = heroSection?.content?.title || "Creative Vision";
  const subtitle =
    heroSection?.content?.subtitle ||
    "Designing interactive experiences through code and imagination.";

  const avatarUrl =
    portfolio.logoUrl ||
    heroSection?.content?.avatarUrl ||
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80";

  const primaryColor = portfolio.primaryColor || "#ec4899"; // default pink
  const secondaryColor = portfolio.secondaryColor || "#8b5cf6"; // default purple
  const projects = portfolio.projects ?? [];
  const experience = portfolio.experience ?? [];
  const courses = portfolio.courses ?? [];
  const skills = portfolio.skills ?? [];

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

  const getSkillName = (s: PortfolioSkillEntry): string => {
    if (typeof s === "string") return s;
    if (s && typeof s === "object" && s.name) return String(s.name);
    return "";
  };

  return (
    <div
      className="min-h-screen text-slate-100 font-sans selection:bg-white/20"
      style={{ fontFamily: portfolio.fontFamily }}
    >
      <AmbientBackground
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />

      {/* Navigation - Floating Glass Pill */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className="flex items-center gap-6 px-8 py-4 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-full">
          <a
            href="#home"
            className="text-sm font-medium hover:text-white text-slate-300 transition-colors"
          >
            Inicio
          </a>
          <a
            href="#projects"
            className="text-sm font-medium hover:text-white text-slate-300 transition-colors"
          >
            Proyectos
          </a>
          <a
            href="#experience"
            className="text-sm font-medium hover:text-white text-slate-300 transition-colors"
          >
            Experiencia
          </a>
          <a
            href="#skills"
            className="text-sm font-medium hover:text-white text-slate-300 transition-colors"
          >
            Habilidades
          </a>
        </div>
      </motion.nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-32 md:py-40 flex flex-col gap-32">
        {/* Hero Section */}
        <section
          id="home"
          className="flex flex-col lg:flex-row items-center gap-16 min-h-[70vh]"
        >
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm backdrop-blur-md"
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: primaryColor }}
              />
              Disponible para nuevas oportunidades
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1]"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">
                {title}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl leading-relaxed"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {portfolio.email && (
                <a
                  href={`mailto:${portfolio.email}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-all hover:scale-105 active:scale-95"
                >
                  <Mail className="w-5 h-5" />
                  Let&apos;s Talk
                </a>
              )}

              <div className="flex gap-4 items-center pl-4 bg-white/5 border border-white/10 rounded-xl px-4 backdrop-blur-md">
                {portfolio.socialLinks?.linkedin && (
                  <a
                    href={portfolio.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                )}
                {portfolio.socialLinks?.github && (
                  <a
                    href={portfolio.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                )}
                {portfolio.socialLinks?.twitter && (
                  <a
                    href={portfolio.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <TwitterIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-md lg:w-1/2 relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative border border-white/20 shadow-2xl">
              <motion.img
                style={{ y: yImage }}
                src={avatarUrl}
                alt="Profile"
                className="w-full h-[120%] object-cover absolute top-0 left-0 -mt-[10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent"></div>

              {/* Floating badges */}
              {portfolio.profession && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-8 right-8 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center gap-3 shadow-xl"
                >
                  <Briefcase
                    className="w-5 h-5"
                    style={{ color: primaryColor }}
                  />
                  <span className="font-medium text-sm text-white">
                    {portfolio.profession}
                  </span>
                </motion.div>
              )}
              {portfolio.location && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute top-8 left-8 px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center gap-2 shadow-xl"
                >
                  <MapPin
                    className="w-4 h-4"
                    style={{ color: secondaryColor }}
                  />
                  <span className="font-medium text-sm text-white">
                    {portfolio.location}
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        {projects.length > 0 && (
          <section id="projects" className="space-y-12">
            <GlassCard delay={0}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Layers className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">
                  Featured Work
                </h2>
              </div>
              <p className="text-slate-400 max-w-2xl text-lg mb-12">
                A selection of my recent projects, showcasing my ability to
                solve complex problems through design and code.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project: PortfolioProject, idx: number) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>

                    <div className="space-y-6 relative z-10">
                      {project.imageUrl && (
                        <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:border-white/20 transition-all">
                          <img src={project.imageUrl} alt={project.name || project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                        {project.name || project.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed font-light line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {getTools(project.tools).map((t: string, j: number) => (
                          <span
                            key={j}
                            className="text-xs px-3 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.link && (
                      <div className="mt-12 flex justify-end">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/10 group/btn"
                        >
                          View Live
                          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </a>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </section>
        )}

        {/* Experience & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Experience Array */}
          {experience.length > 0 && (
            <GlassCard className="h-full" delay={0.1}>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Briefcase
                    className="w-6 h-6"
                    style={{ color: secondaryColor }}
                  />
                </div>
                <h2 className="text-3xl font-bold">Experience</h2>
              </div>

              <div className="space-y-10">
                {experience.map((exp: PortfolioExperience, idx: number) => (
                  <div key={idx} className="relative pl-8 group">
                    <div
                      className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-slate-900 z-10"
                      style={{ backgroundColor: secondaryColor }}
                    />
                    {idx !== experience.length - 1 && (
                      <div className="absolute left-1.5 top-3 w-px h-full bg-white/10 group-hover:bg-white/20 transition-colors" />
                    )}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-xl font-bold text-white">
                          {exp.role}
                        </h3>
                        <span className="text-sm px-3 py-1 bg-white/5 rounded-full text-slate-300 flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>
                      </div>
                      <h4
                        className="text-lg font-medium"
                        style={{ color: secondaryColor }}
                      >
                        {exp.company}
                      </h4>
                      {exp.description && (
                        <p className="text-slate-400 font-light leading-relaxed pt-2">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Education Array */}
          {courses.length > 0 && (
            <GlassCard className="h-full" delay={0.2}>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-white/10 rounded-xl">
                  <GraduationCap
                    className="w-6 h-6"
                    style={{ color: primaryColor }}
                  />
                </div>
                <h2 className="text-3xl font-bold">Cursos / Capacitaciones</h2>
              </div>

              <div className="space-y-8">
                {courses.map((course: PortfolioCourse, idx: number) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">
                      {course.name}
                    </h3>
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                      <span
                        className="text-[15px] font-medium"
                        style={{ color: primaryColor }}
                      >
                        {course.institution}
                      </span>
                      <span className="text-sm px-3 py-1 rounded-md bg-white/5 text-slate-400">
                        {course.year}
                      </span>
                    </div>
                    {course.description && (
                      <p className="text-slate-400 font-light leading-relaxed">
                        {course.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>

        {/* Skills Section */}
        {skills.length > 0 && (
          <section id="skills">
            <GlassCard delay={0.3}>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Code2 className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <h2 className="text-3xl font-bold">Habilidades técnicas</h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill: PortfolioSkillEntry, idx: number) => {
                  const name = getSkillName(skill);
                  if (!name) return null;
                  return (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                      key={idx}
                      className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white text-slate-300 font-medium transition-all shadow-lg backdrop-blur-md cursor-default"
                    >
                      {name}
                    </motion.div>
                  );
                })}
              </div>
            </GlassCard>
          </section>
        )}

        <PortfolioInquiryForm
          portfolioSlug={portfolio.slug}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          variant="glass"
        />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950/50 backdrop-blur-3xl py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden">
              <img
                src={avatarUrl}
                alt="Footer avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-white">{title}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider">
                {portfolio.profession}
              </p>
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Designed with precision.
          </p>
        </div>
      </footer>
    </div>
  );
}
