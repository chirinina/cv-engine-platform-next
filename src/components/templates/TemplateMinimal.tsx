"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  Briefcase,
  Mail,
  GraduationCap,
  ArrowUpRight,
  Cpu,
  Heart,
  ImageIcon,
  ExternalLink,
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

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ModernBackground = ({
  color,
  bgColor,
}: {
  color: string;
  bgColor: string;
}) => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <svg
        className="absolute w-full h-full opacity-[0.1]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M-100 100 Q 150 300 500 100 T 1100 150"
          stroke={color}
          strokeWidth="2"
          fill="transparent"
          animate={{
            d: [
              "M-100 100 Q 150 300 500 100 T 1100 150",
              "M-100 150 Q 200 50 600 200 T 1100 100",
              "M-100 100 Q 150 300 500 100 T 1100 150",
            ],
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
              "M-100 600 Q 250 400 600 700 T 1200 500",
            ],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <div
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default function TemplateMinimal({
  portfolio,
  sections,
}: {
  portfolio: PortfolioData;
  sections: PortfolioSection[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const heroSection = sections.find((s) => s.type === "hero");
  const primaryColor = portfolio.primaryColor || "#000000";
  const secondaryColor = portfolio.secondaryColor || "#ffffff";
  const textColor = portfolio.secondaryTextColor || "#444444";

  const projects = portfolio.projects ?? [];
  const experience = portfolio.experience ?? [];
  const skills = portfolio.skills ?? [];
  const courses = portfolio.courses ?? [];
  const hobbies = portfolio.hobbies ?? [];

  const getSkillLevel = (s: PortfolioSkillEntry): number | null => {
    if (s && typeof s === "object" && s.level != null) return Number(s.level);
    return null;
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, bounce: 0.3, duration: 1 },
    },
  };

  const interactiveBg = `color-mix(in srgb, ${primaryColor} 10%, transparent)`;
  const subtleBorder = `color-mix(in srgb, ${primaryColor} 15%, transparent)`;
  const strongSubtleBg = `color-mix(in srgb, ${primaryColor} 4%, transparent)`;

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full relative tracking-tight selection:bg-black/10"
      style={{
        backgroundColor: secondaryColor,
        fontFamily: portfolio.fontFamily || "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <ModernBackground color={primaryColor} bgColor={secondaryColor} />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ scaleX: smoothProgress, backgroundColor: primaryColor }}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 lg:py-32">
        {/* HERO SECTION */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="min-h-[80vh] flex flex-col justify-center mb-20 lg:mb-40"
        >
          <motion.div
            variants={itemFadeUp}
            className="flex items-center gap-3 mb-8"
          >
            <div
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: primaryColor }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <motion.h1
                variants={itemFadeUp}
                className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-10"
                style={{ color: primaryColor }}
              >
                {heroSection?.content?.title || "Digital Artisan"}
              </motion.h1>

              <motion.p
                variants={itemFadeUp}
                className="text-2xl md:text-3xl font-medium leading-tight max-w-2xl opacity-90"
                style={{ color: textColor }}
              >
                {heroSection?.content?.subtitle ||
                  "Creating high-impact digital experiences through clean code and elegant design."}
              </motion.p>
            </div>

            <motion.div
              variants={itemFadeUp}
              className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6"
            >
              <div className="relative group">
                <div
                  className="absolute -inset-4 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: interactiveBg }}
                />
                <img
                  src={
                    portfolio.logoUrl ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                  }
                  alt="Profile"
                  className="w-48 h-48 lg:w-64 lg:h-64 object-cover rounded-[2rem] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 relative z-10"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemFadeUp}
            className="flex flex-wrap items-center gap-4 mt-16"
          >
            {portfolio.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="group relative px-8 py-4 rounded-full overflow-hidden shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                <span
                  className="relative z-10 font-bold flex items-center gap-2"
                  style={{ color: secondaryColor }}
                >
                  Hablemos <Mail className="w-4 h-4" />
                </span>
                <motion.div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            )}
            <div className="flex gap-3">
              {portfolio.socialLinks?.linkedin && (
                <a
                  href={portfolio.socialLinks.linkedin}
                  className="p-4 rounded-full border shadow-sm hover:scale-110 transition-transform"
                  style={{
                    borderColor: subtleBorder,
                    color: primaryColor,
                    backgroundColor: strongSubtleBg,
                  }}
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              )}
              {portfolio.socialLinks?.github && (
                <a
                  href={portfolio.socialLinks.github}
                  className="p-4 rounded-full border shadow-sm hover:scale-110 transition-transform"
                  style={{
                    borderColor: subtleBorder,
                    color: primaryColor,
                    backgroundColor: strongSubtleBg,
                  }}
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* PROJECTS SECTION */}
        {projects.length > 0 && (
          <section className="mb-40">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            >
              <div>
                <h3
                  className="text-sm font-bold uppercase tracking-[0.4em] mb-4 opacity-70"
                  style={{ color: textColor }}
                >
                  Proyectos Destacados
                </h3>
                <h2
                  className="text-4xl md:text-6xl font-black tracking-tighter"
                  style={{ color: primaryColor }}
                >
                  Obras Seleccionadas
                </h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj: PortfolioProject, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative h-[450px] rounded-[3rem] overflow-hidden border p-10 flex flex-col justify-end transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 shadow-sm"
                  style={{
                    borderColor: subtleBorder,
                    backgroundColor: strongSubtleBg,
                  }}
                >
                  {proj.imageUrl && (
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-[3rem]">
                      <img
                        src={proj.imageUrl}
                        alt={proj.name}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t via-black/40 from-black/80 to-transparent opacity-80" />
                    </div>
                  )}

                  <div className="absolute top-8 right-8 flex gap-2 z-10">
                    {proj.link && (
                      <a
                        href={proj.link}
                        className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg border"
                        style={{
                          backgroundColor: secondaryColor,
                          color: primaryColor,
                          borderColor: subtleBorder,
                        }}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  <div className="relative z-10 bg-black/30 p-6 rounded-2xl backdrop-blur-md border border-white/10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(typeof proj.tools === "string"
                        ? proj.tools.split(",")
                        : proj.tools || []
                      )
                        .slice(0, 3)
                        .map((t: string, i: number) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border bg-white/10 text-white border-white/20"
                          >
                            {t.trim()}
                          </span>
                        ))}
                    </div>
                    <h4 className="text-3xl font-bold mb-3 tracking-tight text-white">
                      {proj.name}
                    </h4>
                    <p className="text-sm leading-relaxed max-w-sm text-white/80 line-clamp-2">
                      {proj.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE SECTION */}
        {experience.length > 0 && (
          <section className="mb-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <h3
                  className="text-sm font-bold uppercase tracking-[0.4em] mb-4 opacity-70"
                  style={{ color: textColor }}
                >
                  Trayectoria
                </h3>
                <h2
                  className="text-4xl md:text-6xl font-black tracking-tighter sticky top-32"
                  style={{ color: primaryColor }}
                >
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
                    style={{ borderColor: subtleBorder }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h4
                          className="text-3xl font-bold transition-transform duration-300"
                          style={{ color: primaryColor }}
                        >
                          {exp.role}
                        </h4>
                        <div
                          className="flex items-center gap-2 mt-2 opacity-80"
                          style={{ color: textColor }}
                        >
                          <span className="font-bold">{exp.company}</span>
                          <span style={{ color: primaryColor }}>•</span>
                          <span className="text-sm tracking-wide uppercase font-bold">
                            {exp.period}
                          </span>
                        </div>
                      </div>
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm"
                        style={{
                          borderColor: subtleBorder,
                          color: primaryColor,
                          backgroundColor: strongSubtleBg,
                        }}
                      >
                        <Briefcase className="w-6 h-6" />
                      </div>
                    </div>
                    <p
                      className="text-lg leading-relaxed max-w-3xl"
                      style={{ color: textColor }}
                    >
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SKILLS & EDUCATION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-40">
          {skills.length > 0 && (
            <div
              className="p-10 md:p-12 rounded-[3rem] border shadow-sm"
              style={{
                borderColor: subtleBorder,
                backgroundColor: strongSubtleBg,
              }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  }}
                >
                  <Cpu className="w-6 h-6" />
                </div>
                <h3
                  className="text-3xl font-black tracking-tight"
                  style={{ color: primaryColor }}
                >
                  Stack Tecnológico
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill: PortfolioSkillEntry, idx: number) => {
                  const name = typeof skill === "string" ? skill : skill.name;
                  const level = getSkillLevel(skill);
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="p-5 rounded-2xl border shadow-sm flex flex-col gap-3 transition-colors group"
                      style={{
                        borderColor: subtleBorder,
                        backgroundColor: secondaryColor,
                      }}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-bold text-sm" style={{ color: primaryColor }}>
                          {name}
                        </span>
                        {level !== null && (
                          <span className="text-xs font-bold opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: primaryColor }}>
                            {level}%
                          </span>
                        )}
                      </div>
                      {level !== null && (
                        <div className="h-[2px] w-full rounded-full overflow-hidden" style={{ backgroundColor: strongSubtleBg }}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${level}%` }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="h-full"
                            style={{ backgroundColor: primaryColor }}
                          />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {courses.length > 0 && (
            <div
              className="p-10 md:p-12 rounded-[3rem] border shadow-sm"
              style={{
                borderColor: subtleBorder,
                backgroundColor: strongSubtleBg,
              }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  }}
                >
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3
                  className="text-3xl font-black tracking-tight"
                  style={{ color: primaryColor }}
                >
                  Formación
                </h3>
              </div>
              <div className="space-y-8">
                {courses.map((course: PortfolioCourse, idx: number) => (
                  <div key={idx} className="flex gap-5 items-start">
                    <div
                      className="w-1.5 h-16 rounded-full"
                      style={{ backgroundColor: primaryColor, opacity: 0.2 }}
                    />
                    <div>
                      <h4
                        className="font-bold text-xl leading-tight mb-2"
                        style={{ color: primaryColor }}
                      >
                        {course.name}
                      </h4>
                      <p
                        className="text-sm font-bold uppercase tracking-widest mb-2"
                        style={{ color: textColor }}
                      >
                        {course.institution} —{" "}
                        <span style={{ color: primaryColor }}>
                          {course.year}
                        </span>
                      </p>
                      {course.description && (
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: textColor }}
                        >
                          {course.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* HOBBIES SECTION */}
        {hobbies.length > 0 && (
          <section className="mb-40">
            <div
              className="p-10 md:p-12 rounded-[3rem] border shadow-sm"
              style={{
                borderColor: subtleBorder,
                backgroundColor: strongSubtleBg,
              }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  }}
                >
                  <Heart className="w-6 h-6" />
                </div>
                <h3
                  className="text-3xl font-black tracking-tight"
                  style={{ color: primaryColor }}
                >
                  Pasatiempos
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {hobbies.map((hobby, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="group relative rounded-3xl border shadow-sm flex flex-col overflow-hidden transition-all"
                    style={{
                      borderColor: subtleBorder,
                      backgroundColor: secondaryColor,
                    }}
                  >
                    {hobby.link ? (
                      <a href={hobby.link} target="_blank" rel="noreferrer" className="flex flex-col w-full h-full">
                        {hobby.imageUrl ? (
                          <div className="aspect-square w-full relative overflow-hidden border-b" style={{ borderColor: subtleBorder }}>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                            <img src={hobby.imageUrl} alt={hobby.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                          </div>
                        ) : (
                          <div className="aspect-square w-full flex items-center justify-center border-b" style={{ borderColor: subtleBorder, backgroundColor: strongSubtleBg }}>
                            <ImageIcon className="w-10 h-10 opacity-20" style={{ color: primaryColor }} />
                          </div>
                        )}
                        <div className="p-4 flex items-center justify-between">
                          <span className="font-bold text-xs" style={{ color: primaryColor }}>{hobby.name}</span>
                          <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" style={{ color: primaryColor }} />
                        </div>
                      </a>
                    ) : (
                      <div className="flex flex-col w-full h-full items-center justify-center p-6 gap-3 aspect-square">
                        {hobby.imageUrl ? (
                          <div className="w-16 h-16 rounded-full overflow-hidden shadow-md">
                            <img src={hobby.imageUrl} alt={hobby.name} className="w-full h-full object-cover grayscale" />
                          </div>
                        ) : (
                          <Heart className="w-10 h-10 opacity-30" style={{ color: primaryColor }} />
                        )}
                        <span className="font-bold text-xs text-center" style={{ color: primaryColor }}>{hobby.name}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <PortfolioInquiryForm
          portfolioSlug={portfolio.slug}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          textColor={textColor}
          variant="minimal"
          className="mb-40"
        />

        {/* FOOTER */}
        <footer
          className="relative pt-20 border-t flex flex-col md:flex-row justify-between items-center gap-8 mb-20"
          style={{ borderColor: subtleBorder }}
        >
          <div className="text-center md:text-left">
            <h2
              className="text-2xl font-black mb-2"
              style={{ color: primaryColor }}
            >
              {portfolio.user?.name || portfolio.name || "Portfolio"}
            </h2>
            <p className="text-sm font-bold" style={{ color: textColor }}>
              © {new Date().getFullYear()} Desarrollado por Diolay Todo los
              derechos reservados.
            </p>
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -5, scale: 1.1 }}
            className="w-16 h-16 rounded-full border flex items-center justify-center shadow-md transition-all"
            style={{
              borderColor: subtleBorder,
              color: primaryColor,
              backgroundColor: strongSubtleBg,
            }}
          >
            <ArrowUpRight className="w-6 h-6 -rotate-45" />
          </motion.button>
        </footer>
      </main>
    </div>
  );
}
