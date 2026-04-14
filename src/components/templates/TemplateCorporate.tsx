"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Code2,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Layers,
  GraduationCap,
  Home,
  User,
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

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

  const heroSection = sections.find((s) => s.type === "hero");
  const title = heroSection?.content?.title || portfolio.name || "Professional Profile";
  const subtitle = heroSection?.content?.subtitle || "Strategic thinker and high-impact professional.";

  const primaryColor = portfolio.primaryColor || "#0f172a";
  const bgColor = portfolio.secondaryColor || "#f8fafc";
  const secondaryTextColor = portfolio.secondaryTextColor || "#475569";

  const courses = portfolio.courses ?? [];
  const projects = portfolio.projects ?? [];
  const experience = portfolio.experience ?? [];
  const skills = portfolio.skills ?? [];

  const getTools = (tools: PortfolioProject["tools"]): string[] => {
    if (!tools) return [];
    if (typeof tools === "string") return tools.split(",").map((t) => t.trim()).filter(Boolean);
    if (Array.isArray(tools)) return tools.map(String);
    return [];
  };

  const getSkillName = (s: PortfolioSkillEntry): string => {
    if (typeof s === "string") return s;
    if (s && typeof s === "object" && s.name) return String(s.name);
    return "";
  };

  // Nav Links
  const navLinks = [
    { name: "Inicio", href: "#home", icon: <Home className="w-4 h-4" /> },
    { name: "Experiencia", href: "#experience", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Proyectos", href: "#projects", icon: <Code2 className="w-4 h-4" /> },
    { name: "Habilidades", href: "#skills", icon: <Layers className="w-4 h-4" /> },
    { name: "Educación", href: "#education", icon: <GraduationCap className="w-4 h-4" /> },
    { name: "Contacto", href: "#contact", icon: <Mail className="w-4 h-4" /> },
  ];

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  // Animations
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
  };

  // Dynamic Styles
  const glassStyle = {
    backgroundColor: `color-mix(in srgb, ${primaryColor} 4%, transparent)`,
    borderColor: `color-mix(in srgb, ${primaryColor} 12%, transparent)`,
  };
  
  const glassHoverStyle = {
    backgroundColor: `color-mix(in srgb, ${primaryColor} 8%, transparent)`,
    borderColor: `color-mix(in srgb, ${primaryColor} 25%, transparent)`,
  };

  const glassNavStyle = {
    backgroundColor: `color-mix(in srgb, ${bgColor} 85%, transparent)`,
    borderColor: `color-mix(in srgb, ${primaryColor} 10%, transparent)`,
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row tracking-tight"
      style={{
        backgroundColor: bgColor,
        fontFamily: portfolio.fontFamily,
      }}
    >
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b px-6 py-4 flex justify-between items-center" style={glassNavStyle}>
        <h2 className="text-xl font-black uppercase tracking-tighter" style={{ color: primaryColor }}>
          {portfolio.initials || "CV"}
        </h2>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" style={{ color: primaryColor }}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(isMenuOpen || true) && (
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className={`fixed md:sticky top-0 left-0 h-screen w-72 z-40 backdrop-blur-3xl border-r flex flex-col justify-between py-12 px-8 ${isMenuOpen ? "block" : "hidden md:flex"}`}
            style={{ ...glassNavStyle, borderColor: `color-mix(in srgb, ${primaryColor} 10%, transparent)` }}
          >
            <div className="space-y-12">
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="space-y-4">
                {portfolio.logoUrl ? (
                  <img src={portfolio.logoUrl} alt="Logo" className="w-16 h-16 rounded-2xl object-cover shadow-xl" style={{ border: `1px solid color-mix(in srgb, ${primaryColor} 20%, transparent)` }} />
                ) : (
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl" style={{ backgroundColor: primaryColor }}>
                    {portfolio.initials || "PC"}
                  </div>
                )}
                <div>
                  <h1 className="text-xl font-bold tracking-tight" style={{ color: primaryColor }}>{portfolio.name || "Mi Portfolio"}</h1>
                  <p className="text-sm font-medium uppercase tracking-widest leading-tight mt-1" style={{ color: secondaryTextColor }}>
                    {portfolio.profession || "Expert"}
                  </p>
                </div>
              </motion.div>

              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <motion.a
                    whileHover={{ x: 5 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 text-sm font-bold transition-all group px-4 py-3 rounded-xl"
                    style={{ color: secondaryTextColor, ...glassStyle }}
                  >
                    <span className="group-hover:scale-110 transition-transform" style={{ color: primaryColor }}>
                      {link.icon}
                    </span>
                    <span className="group-hover:text-current transition-colors" style={{ color: primaryColor }}>{link.name}</span>
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="pt-8 border-t" style={{ borderColor: `color-mix(in srgb, ${primaryColor} 15%, transparent)` }}>
              <div className="flex gap-4">
                {portfolio.socialLinks?.linkedin && (
                  <motion.a whileHover={{ y: -3 }} href={portfolio.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ color: primaryColor }}>
                    <LinkedinIcon className="w-5 h-5 hover:opacity-70 transition-opacity" />
                  </motion.a>
                )}
                {portfolio.socialLinks?.github && (
                  <motion.a whileHover={{ y: -3 }} href={portfolio.socialLinks.github} target="_blank" rel="noreferrer" style={{ color: primaryColor }}>
                    <GithubIcon className="w-5 h-5 hover:opacity-70 transition-opacity" />
                  </motion.a>
                )}
                {portfolio.socialLinks?.twitter && (
                  <motion.a whileHover={{ y: -3 }} href={portfolio.socialLinks.twitter} target="_blank" rel="noreferrer" style={{ color: primaryColor }}>
                    <TwitterIcon className="w-5 h-5 hover:opacity-70 transition-opacity" />
                  </motion.a>
                )}
                {portfolio.socialLinks?.website && (
                  <motion.a whileHover={{ y: -3 }} href={portfolio.socialLinks.website} target="_blank" rel="noreferrer" style={{ color: primaryColor }}>
                    <GlobeIcon className="w-5 h-5 hover:opacity-70 transition-opacity" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 space-y-32">
        {/* Hero Section */}
        <motion.section
          id="home"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-5 py-2 rounded-full border shadow-sm text-xs font-bold uppercase tracking-widest" style={{ color: primaryColor, ...glassStyle }}>
            <motion.span animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
            {portfolio.location || "Available worldwide"}
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-[6rem] font-black tracking-tighter leading-[0.95] max-w-5xl" style={{ color: primaryColor }}>
            {title}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-2xl font-medium leading-relaxed max-w-3xl pt-4" style={{ color: secondaryTextColor }}>
            {subtitle}
          </motion.p>
        </motion.section>

        {/* Experience Section */}
        {experience.length > 0 && (
          <motion.section id="experience" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="space-y-12">
            <motion.div variants={fadeRight} className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: secondaryTextColor }}>Experiencia Laboral</h2>
              <div className="h-1 w-16 rounded-full" style={{ backgroundColor: primaryColor }} />
            </motion.div>

            <div className="grid gap-10 border-l-[3px] ml-4 pl-8 md:pl-12 relative" style={{ borderColor: `color-mix(in srgb, ${primaryColor} 15%, transparent)` }}>
              {experience.map((exp, idx) => (
                <motion.div key={idx} variants={fadeRight} whileHover={{ x: 10 }} className="relative group">
                  <div className="absolute -left-[45px] md:-left-[58px] top-1 w-5 h-5 rounded-full border-[4px] bg-white transition-colors" style={{ borderColor: primaryColor }} />
                  <div className="space-y-3">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: primaryColor }}>{exp.role}</h3>
                      <span className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full" style={{ color: primaryColor, ...glassStyle }}>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-lg font-bold" style={{ color: primaryColor }}>
                      <Briefcase className="w-5 h-5" />
                      {exp.company}
                    </div>
                    {exp.description && (
                      <p className="text-lg leading-relaxed max-w-4xl" style={{ color: secondaryTextColor }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <motion.section id="projects" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="space-y-12">
            <motion.div variants={fadeUp} className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: secondaryTextColor }}>Proyectos Destacados</h2>
              <div className="h-1 w-16 rounded-full" style={{ backgroundColor: primaryColor }} />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -10 }}
                  className="group rounded-[2.5rem] overflow-hidden border transition-all duration-500 flex flex-col h-full shadow-lg"
                  style={glassStyle}
                >
                  <div className="aspect-[16/10] overflow-hidden relative" style={{ backgroundColor: `color-mix(in srgb, ${primaryColor} 10%, transparent)` }}>
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.name || project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code2 className="w-12 h-12 opacity-20" style={{ color: primaryColor }} />
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-2xl font-bold tracking-tight" style={{ color: primaryColor }}>{project.name || project.title}</h3>
                        {project.link && (
                          <motion.a whileHover={{ scale: 1.1, rotate: 5 }} href={project.link} target="_blank" rel="noreferrer" className="p-3 rounded-full border shadow-sm" style={{ color: primaryColor, ...glassStyle }}>
                            <ExternalLink className="w-5 h-5" />
                          </motion.a>
                        )}
                      </div>
                      <p className="text-base leading-relaxed line-clamp-3" style={{ color: secondaryTextColor }}>
                        {project.description}
                      </p>
                    </div>
                    {project.tools && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {getTools(project.tools).map((tool, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest border" style={{ color: primaryColor, ...glassStyle }}>
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <motion.section id="skills" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="space-y-12">
            <motion.div variants={fadeUp} className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: secondaryTextColor }}>Habilidades & Expertise</h2>
              <div className="h-1 w-16 rounded-full" style={{ backgroundColor: primaryColor }} />
            </motion.div>

            <div className="flex flex-wrap gap-4">
              {skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="px-6 py-4 rounded-2xl border shadow-sm flex items-center gap-3 transition-colors"
                  style={{ color: primaryColor, ...glassStyle }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <span className="font-bold tracking-wide text-sm uppercase">{getSkillName(skill)}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education Section */}
        {courses.length > 0 && (
          <motion.section id="education" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="space-y-12">
            <motion.div variants={fadeUp} className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: secondaryTextColor }}>Formación Académica</h2>
              <div className="h-1 w-16 rounded-full" style={{ backgroundColor: primaryColor }} />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {courses.map((course, idx) => (
                <motion.div key={idx} variants={fadeUp} whileHover={{ y: -5 }} className="p-8 rounded-[2rem] border shadow-sm relative overflow-hidden group" style={glassStyle}>
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity" style={{ color: primaryColor }}>
                    <GraduationCap className="w-16 h-16" />
                  </div>
                  <div className="space-y-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                      <h3 className="text-xl font-bold leading-tight" style={{ color: primaryColor }}>{course.name}</h3>
                      <span className="text-xs font-black px-3 py-1.5 rounded-full border" style={{ color: primaryColor, ...glassStyle }}>{course.year}</span>
                    </div>
                    <div className="font-bold text-sm uppercase tracking-widest" style={{ color: secondaryTextColor }}>{course.institution}</div>
                    {course.description && (
                      <p className="text-sm leading-relaxed" style={{ color: secondaryTextColor }}>{course.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Contact Section */}
        <motion.section id="contact" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="space-y-12">
          <motion.div variants={fadeUp} className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: secondaryTextColor }}>Contacto & Alianzas</h2>
            <div className="h-1 w-16 rounded-full" style={{ backgroundColor: primaryColor }} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div variants={fadeRight} className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1]" style={{ color: primaryColor }}>
                  ¿Listo para elevar <br /> tu próximo proyecto?
                </h3>
                <p className="text-lg leading-relaxed max-w-md" style={{ color: secondaryTextColor }}>
                  Estoy disponible para colaboraciones estratégicas y roles de alto impacto. Hablemos sobre cómo puedo aportar valor a tus metas.
                </p>
              </div>

              <div className="space-y-6">
                {portfolio.email && (
                  <motion.div whileHover={{ x: 10 }} className="flex items-center gap-5 group cursor-pointer">
                    <div className="p-4 rounded-2xl border shadow-sm group-hover:scale-110 transition-transform" style={{ color: primaryColor, ...glassStyle }}>
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: secondaryTextColor }}>Email Directo</p>
                      <a href={`mailto:${portfolio.email}`} className="text-xl font-bold hover:underline" style={{ color: primaryColor }}>
                        {portfolio.email}
                      </a>
                    </div>
                  </motion.div>
                )}
                {portfolio.location && (
                  <motion.div whileHover={{ x: 10 }} className="flex items-center gap-5 group">
                    <div className="p-4 rounded-2xl border shadow-sm group-hover:scale-110 transition-transform" style={{ color: primaryColor, ...glassStyle }}>
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: secondaryTextColor }}>Ubicación Global</p>
                      <p className="text-xl font-bold" style={{ color: primaryColor }}>{portfolio.location}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-8 md:p-12 rounded-[2.5rem] border shadow-2xl relative overflow-hidden" style={glassStyle}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full -z-0 opacity-50" style={{ backgroundColor: `color-mix(in srgb, ${primaryColor} 10%, transparent)` }} />
              <div className="relative z-10">
                <PortfolioInquiryForm
                  portfolioSlug={portfolio.slug}
                  primaryColor={primaryColor}
                  secondaryColor={bgColor}
                  textColor={secondaryTextColor}
                  variant="corporate"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="pt-20 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-black uppercase tracking-[0.2em]" style={{ borderColor: `color-mix(in srgb, ${primaryColor} 15%, transparent)`, color: secondaryTextColor }}>
          <p>© {new Date().getFullYear()} {portfolio.name || "Portfolio"}</p>
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: primaryColor }} />
            <span style={{ color: primaryColor }}>Enterprise Engine</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
