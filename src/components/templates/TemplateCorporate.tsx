// ...existing code...
"use client";

import React from "react";
import { motion } from "framer-motion";
import PortfolioInquiryForm from "./PortfolioInquiryForm";
import {
  PortfolioCourse,
  PortfolioData,
  PortfolioExperience,
  PortfolioProject,
  PortfolioSection,
  PortfolioSkillEntry,
} from "@/types/portfolio";

export default function TemplateCorporate({
  portfolio,
  sections,
}: {
  portfolio: PortfolioData;
  sections: PortfolioSection[];
}) {
  const heroSection = sections.find((s) => s.type === "hero");
  const title = heroSection?.content?.title || "Professional Excellence";
  const subtitle =
    heroSection?.content?.subtitle ||
    "Consulting and high-impact strategy tailored for modern enterprises.";
  const primaryColor = portfolio.primaryColor || "#1e3a8a";
  const secondaryColor = portfolio.secondaryColor || "#f8fafc";
  const logoPosition = portfolio.logoPosition || "left";
  const courses = portfolio.courses ?? [];
  const projects = portfolio.projects ?? [];
  const experience = portfolio.experience ?? [];
  const skills = portfolio.skills ?? [];
  const logoStyle: React.CSSProperties = {
    left: logoPosition === "left" ? 0 : undefined,
    right: logoPosition === "right" ? 0 : undefined,
    margin: logoPosition === "center" ? "0 auto" : undefined,
    display: "block",
    position: logoPosition === "top" ? "relative" : "absolute",
    top: logoPosition === "top" ? 0 : undefined,
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-white text-neutral-900"
      style={{
        background: secondaryColor,
        color: primaryColor,
        fontFamily: portfolio.fontFamily,
      }}
    >
      {portfolio.logoUrl && (
        <img
          src={portfolio.logoUrl}
          alt="Logo"
          className="w-24 h-24 rounded-full border-4 border-neutral-900 shadow-lg mb-4 object-cover"
          style={logoStyle}
        />
      )}
      <header className="w-full py-8 px-10 border-b border-neutral-200 flex justify-between items-center">
        <h2
          className="text-2xl font-extrabold uppercase tracking-widest"
          style={{ color: primaryColor }}
        >
          Mi CV
        </h2>
        <nav className="hidden md:flex gap-8 font-medium text-neutral-600">
          <a href="#about" className="hover:text-neutral-900">
            Visitame
          </a>

        </nav>
      </header>
      <main className="w-full max-w-5xl px-10 py-24 flex flex-col md:flex-row gap-16 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 space-y-10"
        >
          <h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
            style={{ color: primaryColor }}
          >
            {title}
          </h1>
          <p
            className="text-lg md:text-2xl font-light leading-relaxed mb-8"
            style={{ color: portfolio.secondaryTextColor || "#555" }}
          >
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <span
              className="px-4 py-2 rounded-lg border text-xs font-semibold"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              {portfolio.profession || "Profesión"}
            </span>
            <span
              className="px-4 py-2 rounded-lg border text-xs font-semibold"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              {portfolio.location || "Ubicación"}
            </span>
          </div>
          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            {portfolio.socialLinks?.linkedin && (
              <a
                href={portfolio.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-bold underline"
              >
                LinkedIn
              </a>
            )}
            {portfolio.socialLinks?.twitter && (
              <a
                href={portfolio.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 font-bold underline"
              >
                Twitter
              </a>
            )}
            {portfolio.socialLinks?.github && (
              <a
                href={portfolio.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 font-bold underline"
              >
                GitHub
              </a>
            )}
          </div>
          {/* Courses */}
          {courses.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Cursos</h3>
              <ul className="list-disc pl-6">
                {courses.map((c: PortfolioCourse, idx: number) => (
                  <li key={idx} className="mb-1">
                    <span className="font-semibold">{c.name}</span> -{" "}
                    {c.institution} ({c.year})
                    {c.description && (
                      <span className="block text-xs text-gray-500">
                        {c.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Proyectos</h3>
              <ul className="list-disc pl-6">
                {projects.map((p: PortfolioProject, idx: number) => (
                  <li key={idx} className="mb-6">
                    <span className="font-semibold">{p.name}</span>:{" "}
                    {p.description}
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-600 underline"
                      >
                        Ver
                      </a>
                    )}
                    {p.imageUrl && (
                      <div className="mt-3">
                        <img src={p.imageUrl} alt={p.name} className="w-full max-w-sm h-48 object-cover rounded-lg shadow-sm border border-neutral-200" />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Experiencia</h3>
              <ul className="list-disc pl-6">
                {experience.map((e: PortfolioExperience, idx: number) => (
                  <li key={idx} className="mb-1">
                    <span className="font-semibold">{e.company}</span> -{" "}
                    {e.role} ({e.period})
                    {e.description && (
                      <span className="block text-xs text-gray-500">
                        {e.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s: PortfolioSkillEntry, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-200 rounded-full text-xs font-semibold"
                  >
                    {typeof s === "string" ? s : s.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* Email */}
          {portfolio.email && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Contacto</h3>
              <a
                href={`mailto:${portfolio.email}`}
                className="text-blue-700 underline"
              >
                {portfolio.email}
              </a>
            </div>
          )}

          <PortfolioInquiryForm
            portfolioSlug={portfolio.slug}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            textColor={portfolio.secondaryTextColor || "#555"}
            variant="corporate"
            className="mt-10"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 flex items-center justify-center"
        >
          <div
            className="w-72 h-72 rounded-2xl border-4 border-dashed opacity-20 flex items-center justify-center"
            style={{ borderColor: primaryColor }}
          >
            <span className="text-6xl font-black opacity-30">
              {portfolio.initials || "PC"}
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
