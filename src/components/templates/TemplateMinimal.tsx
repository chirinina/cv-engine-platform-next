"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import {
  Briefcase,
  Mail,
  GraduationCap,
  ArrowUpRight,
  Cpu,
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

// --- ICONOS SOCIALES PERSONALIZADOS ---
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// --- FONDO ANIMADO DE LÍNEAS CURVAS ---
const ModernBackground = ({ color }: { color: string }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent">
      <svg className="absolute w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M-100 100 Q 150 300 500 100 T 1100 150"
          stroke={color}
          strokeWidth="2"
          fill="transparent"
          animate={{
            d: [
              "M-100 100 Q 150 300 500 100 T 1100 150",
              "M-100 150 Q 200 50 600 200 T 1100 100",
              "M-100 100 Q 150 300 500 100 T 1100 150"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M-100 600 Q 250 400 600 700 T 1200 500"
          stroke={color}
          strokeWidth="1"
          fill="transparent"
          animate={{
            d: [
              "M-100 600 Q 250 400 600 700 T 1200 500",
              "M-100 500 Q 300 800 700 400 T 1200 600",
              "M-100 600 Q 250 400 600 700 T 1200 500"
            ]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      {/* Luces difusas de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: color }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: color }} />
    </div>
  );
};

export default function TemplateProPremium({
  portfolio,
  sections,
}: {
  portfolio: PortfolioData;
  sections: PortfolioSection[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  useTransform(smoothProgress, [0, 0.2], [1, 0.95]);

  const heroSection = sections.find((s) => s.type === "hero");
  const primaryColor = portfolio.primaryColor || "#000000";
  const secondaryColor = portfolio.secondaryColor || "#ffffff";
  const textColor = portfolio.secondaryTextColor || "#444444";
  const projects = portfolio.projects ?? [];
  const experience = portfolio.experience ?? [];
  const skills = portfolio.skills ?? [];
  const courses = portfolio.courses ?? [];
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, bounce: 0.3, duration: 1 } }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full relative selection:bg-black selection:text-white"
      style={{ backgroundColor: secondaryColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <ModernBackground color={primaryColor} />

      {/* Barra de progreso superior */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 z-50 origin-left"
        style={{ scaleX: smoothProgress, backgroundColor: primaryColor }}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 lg:py-32">

        {/* --- HERO SECTION --- */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="min-h-[80vh] flex flex-col justify-center mb-20 lg:mb-40"
        >
          <motion.div variants={itemFadeUp} className="flex items-center gap-3 mb-8">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border" style={{ borderColor: `${primaryColor}20`, color: primaryColor, backgroundColor: `${primaryColor}05` }}>
              Disponible para proyectos
            </span>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <motion.h1
                variants={itemFadeUp}
                className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-10"
                style={{ color: primaryColor }}
              >
                {heroSection?.content?.title || "Digital Artisan"}
              </motion.h1>

              <motion.p
                variants={itemFadeUp}
                className="text-xl md:text-3xl font-medium leading-tight max-w-2xl opacity-80"
                style={{ color: textColor }}
              >
                {heroSection?.content?.subtitle || "Creating high-impact digital experiences through clean code and elegant design."}
              </motion.p>
            </div>

            <motion.div variants={itemFadeUp} className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-transparent to-black/5 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={portfolio.logoUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"}
                  alt="Profile"
                  className="w-48 h-48 lg:w-64 lg:h-64 object-cover rounded-[2rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemFadeUp} className="flex flex-wrap gap-4 mt-16">
            {portfolio.email && (
              <a href={`mailto:${portfolio.email}`} className="group relative px-8 py-4 rounded-full overflow-hidden transition-all" style={{ backgroundColor: primaryColor }}>
                <span className="relative z-10 text-black font-bold flex items-center gap-2">
                  Hablemos <Mail className="w-4 h-4" />
                </span>
                <motion.div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            )}
            <div className="flex gap-2">
              {portfolio.socialLinks?.linkedin && (
                <a href={portfolio.socialLinks.linkedin} className="p-4 rounded-full border hover:bg-black hover:text-white transition-all duration-300" style={{ borderColor: `${primaryColor}20` }}>
                  <LinkedinIcon className="w-6 h-6" />
                </a>
              )}
              {portfolio.socialLinks?.github && (
                <a href={portfolio.socialLinks.github} className="p-4 rounded-full border hover:bg-black hover:text-white transition-all duration-300" style={{ borderColor: `${primaryColor}20` }}>
                  <GithubIcon className="w-6 h-6" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* --- PROJECTS SECTION (BENTO GRID) --- */}
        {projects.length > 0 && (
          <section className="mb-40">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-end justify-between mb-16"
            >
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.4em] mb-4 opacity-50" style={{ color: primaryColor }}>Proyectos Destacados</h3>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter" style={{ color: primaryColor }}>Obras Seleccionadas</h2>
              </div>
              <div className="hidden md:block text-right max-w-xs text-sm font-medium opacity-60" style={{ color: textColor }}>
                Una colección de soluciones digitales enfocadas en la experiencia de usuario y rendimiento.
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {projects.map((proj: PortfolioProject, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border p-8 flex flex-col justify-end transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                  style={{ borderColor: `${primaryColor}10`, backgroundColor: `${primaryColor}03` }}
                >
                  {proj.imageUrl && (
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]">
                      <img src={proj.imageUrl} alt={proj.name} className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    </div>
                  )}

                  <div className="absolute top-8 right-8 flex gap-2 z-10">
                    {proj.link && (
                      <a href={proj.link} className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-black hover:scale-110 transition-transform shadow-lg">
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  {/* Decoración gráfica interna */}
                  <div className="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" style={{ backgroundColor: primaryColor }} />

                  <div className="relative z-10">
                    <div className="flex gap-2 mb-4">
                      {(typeof proj.tools === "string" ? proj.tools.split(",") : proj.tools || []).slice(0, 3).map((t: string, i: number) => (
                        <span key={i} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md bg-white/50 backdrop-blur-sm border border-black/5">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-3xl font-bold mb-3 tracking-tight" style={{ color: primaryColor }}>{proj.name}</h4>
                    <p className="text-sm leading-relaxed max-w-sm opacity-70 group-hover:opacity-100 transition-opacity" style={{ color: textColor }}>
                      {proj.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* --- EXPERIENCE SECTION (MODERN TIMELINE) --- */}
        {experience.length > 0 && (
          <section className="mb-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.4em] mb-4 opacity-50" style={{ color: primaryColor }}>Trayectoria</h3>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter sticky top-32" style={{ color: primaryColor }}>
                  Experiencia Profesional
                </h2>
              </div>
              <div className="lg:col-span-8 space-y-12">
                {experience.map((exp: PortfolioExperience, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="group relative pb-12 border-b last:border-0"
                    style={{ borderColor: `${primaryColor}10` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-2xl font-bold group-hover:translate-x-2 transition-transform duration-300" style={{ color: primaryColor }}>{exp.role}</h4>
                        <div className="flex items-center gap-2 mt-1 opacity-60">
                          <span className="font-bold">{exp.company}</span>
                          <span>•</span>
                          <span className="text-sm">{exp.period}</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center border group-hover:bg-black group-hover:text-white transition-all" style={{ borderColor: `${primaryColor}20` }}>
                        <Briefcase className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-lg leading-relaxed opacity-70 max-w-2xl" style={{ color: textColor }}>{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- SKILLS & EDUCATION (DASHBOARD STYLE) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-40">

          {/* Habilidades con diseño moderno */}
          {skills.length > 0 && (
            <div className="p-10 rounded-[3rem] border bg-white/40 backdrop-blur-xl" style={{ borderColor: `${primaryColor}10` }}>
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 rounded-2xl bg-black text-white"><Cpu className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold tracking-tight">Stack Tecnológico</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill: PortfolioSkillEntry, idx: number) => {
                  const name = typeof skill === "string" ? skill : skill.name;
                  return (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05, backgroundColor: primaryColor, color: "#fff" }}
                      className="px-5 py-3 rounded-2xl border text-sm font-bold cursor-default transition-colors duration-300"
                      style={{ borderColor: `${primaryColor}15`, color: primaryColor }}
                    >
                      {name}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Educación / Cursos */}
          {courses.length > 0 && (
            <div className="p-10 rounded-[3rem] border bg-black" style={{ borderColor: `${primaryColor}10` }}>
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 rounded-2xl bg-white text-black"><GraduationCap className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold tracking-tight text-white">Formación</h3>
              </div>
              <div className="space-y-6">
                {courses.map((course: PortfolioCourse, idx: number) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-1 h-12 rounded-full bg-white/20" />
                    <div>
                      <h4 className="text-white font-bold text-lg leading-none mb-2">{course.name}</h4>
                      <p className="text-white/60 text-sm">{course.institution} — {course.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <PortfolioInquiryForm
          portfolioSlug={portfolio.slug}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          textColor={textColor}
          variant="minimal"
          className="mb-40"
        />

        {/* --- FOOTER --- */}
        <footer className="relative pt-20 border-t" style={{ borderColor: `${primaryColor}10` }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black mb-2" style={{ color: primaryColor }}>{portfolio.name || "Portfolio"}</h2>
              <p className="text-sm font-medium opacity-50">© {new Date().getFullYear()} Diseñado con precisión y pasión.</p>
            </div>

            <div className="flex gap-8">
              <a href="#" className="text-sm font-bold hover:opacity-50 transition-opacity uppercase tracking-widest">Twitter</a>
              <a href="#" className="text-sm font-bold hover:opacity-50 transition-opacity uppercase tracking-widest">LinkedIn</a>
              <a href="#" className="text-sm font-bold hover:opacity-50 transition-opacity uppercase tracking-widest">Email</a>
            </div>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -5 }}
              className="w-16 h-16 rounded-full border flex items-center justify-center hover:bg-black hover:text-white transition-all"
              style={{ borderColor: `${primaryColor}20` }}
            >
              <ArrowUpRight className="w-6 h-6 -rotate-45" />
            </motion.button>
          </div>

          {/* Gran texto de fondo en el footer */}
          <div className="overflow-hidden pointer-events-none select-none opacity-[0.02] absolute bottom-0 left-0 right-0 leading-none">
            <h2 className="text-[20vw] font-black text-center whitespace-nowrap translate-y-1/4">
              {portfolio.profession || "DEVELOPER"}
            </h2>
          </div>
        </footer>
      </main>
    </div>
  );
}
