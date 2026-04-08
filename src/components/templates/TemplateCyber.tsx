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

// Componente de Fondo con Líneas Curvas Animadas
const BackgroundAnimation = ({ color }: { color: string }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M-100,200 C200,100 400,500 600,300 S900,100 1100,400"
          stroke={color}
          strokeWidth="2"
          fill="transparent"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M-100,700 C150,800 350,400 600,600 S850,900 1100,700"
          stroke={color}
          strokeWidth="1"
          fill="transparent"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.1, 0.3, 0.1] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="1"
          fill={color}
          animate={{ x: [0, 800, 0], y: [0, 400, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
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
  const title = heroSection?.content?.title || "System initialized...";
  const subtitle =
    heroSection?.content?.subtitle ||
    "Full-stack developer ready for new deployments.";
  const avatarUrl =
    portfolio.logoUrl ||
    heroSection?.content?.avatarUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

  const primaryColor = portfolio.primaryColor || "#00ffcc";
  const secondaryColor = portfolio.secondaryColor || "#0a0a0f";
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

  return (
    <div
      className="min-h-screen text-gray-100 font-sans selection:bg-cyan-500/30"
      style={{
        backgroundColor: secondaryColor,
        fontFamily: portfolio.fontFamily,
      }}
    >
      <BackgroundAnimation color={primaryColor} />

      {/* Top Navbar */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="flex items-center gap-1 md:gap-2 bg-gray-950/80 backdrop-blur-xl border border-gray-800/60 p-1.5 rounded-full pointer-events-auto shadow-2xl shadow-black/50 overflow-x-auto max-w-[95%] md:max-w-none">
          <button className="p-2.5 rounded-full hover:bg-gray-800/80 text-gray-400 hover:text-white transition-colors shrink-0">
            <Home className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 rounded-full text-white text-sm font-medium border border-gray-700/50 shrink-0">
            <User className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Acerca de</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-full text-sm font-medium transition-colors shrink-0">
            <Briefcase className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Trabajo</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-full text-sm font-medium transition-colors shrink-0">
            <FileText className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Proyectos</span>
          </button>
        </div>
      </header>

      <div className="fixed top-8 left-8 text-sm font-mono text-gray-500 hidden xl:block">
        Client / {String(title).split(" ")[0] || "User"}
      </div>
      <div className="fixed top-8 right-8 text-sm font-mono text-gray-500 hidden xl:block">
        {currentTime || "00:00:00"}
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row relative pt-32 lg:pt-0">
        {/* Left Sidebar */}
        <aside className="lg:w-64 lg:fixed lg:h-screen flex flex-col justify-center px-8 z-40 lg:border-r border-gray-800/30">
          <nav className="space-y-8 text-sm font-medium text-gray-500">
            {[
              { href: "#intro", label: "Introduction", active: true },
              { href: "#projects", label: "Proyectos", active: false },
              { href: "#work", label: "Experiencia", active: false },
              { href: "#skills", label: "Habilidades técnicas", active: false },
            ].map(({ href, label, active }) => (
              <a
                key={href}
                href={href}
                className={`flex items-center gap-4 transition-colors group ${active ? "text-gray-200" : "hover:text-gray-200"}`}
              >
                <span
                  className="w-4 h-px transition-colors"
                  style={{
                    backgroundColor: active ? primaryColor : "rgb(31 41 55)",
                  }}
                />
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 flex py-10 lg:py-40 px-6 lg:px-20 min-h-screen">
          <div className="flex flex-col gap-16 lg:gap-24 w-full">
            {/* Hero Section Container */}
            <div className="flex flex-col md:flex-row gap-16 lg:gap-24 w-full justify-center">
              {/* Left Photo column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center shrink-0"
              >
                <div
                  className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-1 shadow-2xl mb-8 group"
                  style={{
                    background:
                      "linear-gradient(to top right, rgb(31 41 55), rgb(55 65 81), rgb(75 85 99))",
                  }}
                >
                  <div
                    className="w-full h-full rounded-full overflow-hidden border-4 relative z-10"
                    style={{ borderColor: secondaryColor }}
                  >
                    <img
                      src={avatarUrl}
                      alt="Portrait"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  {portfolio.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-300 font-mono">
                      <svg
                        className="w-4 h-4 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      {String(portfolio.location)}
                    </div>
                  )}
                  {portfolio.profession && (
                    <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                      <Briefcase className="w-4 h-4" />{" "}
                      {String(portfolio.profession)}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Right Info Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl"
              >
                {/* Email CTA */}
                {portfolio.email && (
                  <a
                    href={`mailto:${portfolio.email}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all mb-10 text-sm font-medium backdrop-blur-sm group w-fit"
                  >
                    <Mail className="w-4 h-4 text-blue-400" />
                    {String(portfolio.email)}
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </a>
                )}

                {/* Hero heading */}
                <div id="intro" className="space-y-2 mb-8">
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2">
                    {String(title)}
                  </h1>
                  <h2
                    className="text-2xl md:text-4xl font-light"
                    style={{ color: primaryColor }}
                  >
                    {portfolio.profession
                      ? String(portfolio.profession)
                      : String(subtitle)}
                  </h2>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3 mb-12">
                  {portfolio.socialLinks?.linkedin && (
                    <a
                      href={String(portfolio.socialLinks.linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl text-sm transition-all"
                    >
                      <LinkedinIcon className="w-4 h-4" /> LinkedIn
                    </a>
                  )}
                  {portfolio.socialLinks?.twitter && (
                    <a
                      href={String(portfolio.socialLinks.twitter)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl text-sm transition-all"
                    >
                      <TwitterIcon className="w-4 h-4" /> Twitter
                    </a>
                  )}
                  {portfolio.socialLinks?.github && (
                    <a
                      href={String(portfolio.socialLinks.github)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl text-sm transition-all"
                    >
                      <GithubIcon className="w-4 h-4" /> GitHub
                    </a>
                  )}
                </div>

                {/* Bio */}
                <div className="text-gray-300 leading-relaxed text-lg mb-16">
                  {String(subtitle)}
                </div>
              </motion.div>
            </div>

            {/* PROJECTS SECTION - REIMAGINED STICKY STACK */}
            {projects.length > 0 && (
              <section id="projects" className="w-full mt-20">
                <div className="flex items-center gap-4 mb-12">
                  <h3 className="text-4xl font-bold text-white tracking-tighter">
                    Proyectos
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-gray-700 to-transparent" />
                </div>

                <div className="flex flex-col gap-10">
                  {projects.map((project: PortfolioProject, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      // ESTE ES EL TRUCO DEL STICKY: Se apilan al subir
                      className="sticky top-32 bg-gray-900/40 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:border-white/20 transition-all duration-500 overflow-hidden"
                      style={{
                        marginTop: idx === 0 ? 0 : "2rem",
                        zIndex: 10 + idx,
                      }}
                    >
                      {/* Decoración de fondo de la tarjeta */}
                      <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors duration-700" />

                      <div className="relative z-10 flex flex-col gap-6">
                        <div className="flex justify-between items-start mb-6">
                          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 w-fit">
                            <Code2
                              className="w-6 h-6 text-gray-300"
                              style={{ color: primaryColor }}
                            />
                          </div>
                          <span className="font-mono text-xs text-gray-500">
                            0{idx + 1} / PROJECT
                          </span>
                        </div>

                        {project.imageUrl && (
                          <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                            <img src={project.imageUrl} alt={project.name || "Project"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                          <div className="space-y-4">
                            <h4 className="text-3xl md:text-4xl font-bold text-white group-hover:translate-x-2 transition-transform duration-500">
                              {String(project.name || project.title || "")}
                            </h4>

                            {/* DESCRIPCIÓN LARGA SOPORTADA AQUÍ */}
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                              {String(
                                project.description ||
                                  "Detailed analysis and implementation of system architecture and frontend components.",
                              )}
                            </p>
                          </div>

                          <div className="flex flex-col gap-6">
                            <div className="flex flex-wrap gap-2">
                              {getTools(project.tools).map(
                                (t: string, j: number) => (
                                  <span
                                    key={j}
                                    className="text-xs px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-300 font-mono"
                                  >
                                    {t}
                                  </span>
                                ),
                              )}
                            </div>

                            {project.link && (
                              <a
                                href={String(project.link)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-white font-medium group/btn w-fit px-6 py-3 bg-white/5 rounded-xl hover:bg-white/10 border border-white/10 transition-all"
                              >
                                Explore Project{" "}
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

            {/* Experience */}
            {experience.length > 0 && (
              <section id="work" className="mb-16 pt-20">
                <h3 className="text-3xl font-bold mb-10 text-white">
                  Experiencia
                </h3>
                <div className="space-y-12">
                  {experience.map((exp: PortfolioExperience, idx: number) => (
                    <div
                      key={idx}
                      className="relative pl-8 md:pl-12 border-l border-gray-800"
                    >
                      <div
                        className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: primaryColor }}
                      />
                      <h4 className="text-2xl font-bold text-white">
                        {String(exp.role || "")}
                      </h4>
                      <p
                        className="font-mono text-sm mt-1"
                        style={{ color: primaryColor }}
                      >
                        {String(exp.company || "")} • {String(exp.period || "")}
                      </p>
                      {exp.description && (
                        <p className="text-gray-400 mt-4 text-base leading-relaxed max-w-3xl">
                          {String(exp.description)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education / Courses */}
            {courses.length > 0 && (
              <section id="studies" className="mb-16">
                <h3 className="text-3xl font-bold mb-8 text-white">
                  Education
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course: PortfolioCourse, idx: number) => (
                    <div
                      key={idx}
                      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
                    >
                      <h4 className="font-bold text-white text-lg">
                        {String(course.name || "")}
                      </h4>
                      <p
                        className="text-sm mt-2 opacity-80"
                        style={{ color: primaryColor }}
                      >
                        {String(course.institution || "")} ·{" "}
                        {String(course.year || "")}
                      </p>
                      {course.description && (
                        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                          {String(course.description)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section id="skills" className="mb-16">
                <h3 className="text-3xl font-bold mb-8 text-white">
                  Habilidades
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {skills.map((skill: PortfolioSkillEntry, idx: number) => {
                    const name = getSkillName(skill);
                    const level = getSkillLevel(skill);
                    if (!name) return null;
                    return (
                      <div
                        key={idx}
                        className="group p-4 bg-gray-900/40 border border-gray-800 rounded-2xl hover:border-cyan-500/50 transition-all text-center"
                      >
                        <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                          {name}
                        </span>
                        {level !== null && (
                          <div className="w-full bg-gray-800 h-1 mt-3 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${level}%` }}
                              className="h-full"
                              style={{ backgroundColor: primaryColor }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Contact */}
            <section className="mb-32">
              <div className="p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-gray-900 to-black border border-white/5 relative overflow-hidden text-center">
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                    Let&apos;s build something together
                  </h3>
                  <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">
                    Available for freelance opportunities and full-time
                    positions. System is online and ready for new input.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6 text-gray-300">
                    {portfolio.email && (
                      <a
                        href={`mailto:${portfolio.email}`}
                        className="text-xl font-medium hover:text-white transition-colors underline decoration-cyan-500/50 underline-offset-8"
                      >
                        {String(portfolio.email)}
                      </a>
                    )}
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
              </div>
            </section>

            <PortfolioInquiryForm
              portfolioSlug={portfolio.slug}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              variant="cyber"
              className="mb-32"
            />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-gray-800/50 text-center text-gray-600 text-sm font-mono">
        &copy; {new Date().getFullYear()} — SYSTEM_STABLE —{" "}
        {String(title).toUpperCase()}
      </footer>
    </div>
  );
}
