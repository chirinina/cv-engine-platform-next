import React from "react";
import {
  Palette,
  AlignLeft,
  Link as LinkIcon,
  ExternalLink,
  Image as ImageIcon,
  Loader2,
  Edit3,
  Briefcase,
  MapPin,
  Mail,
  Plus,
  Trash2,
  FolderKanban,
  GraduationCap,
  Wrench,
  Globe
} from "lucide-react";
import { PortfolioData, SocialLinks } from "@/types/portfolio";

export const FONTS = [
  "Inter",
  "Roboto",
  "Montserrat",
  "Lato",
  "Poppins",
  "Merriweather",
  "Oswald",
  "Playfair Display",
];

export const LOGO_POSITIONS = ["left", "center", "right", "top"];

// ============================================
// VISUAL
// ============================================
export const VisualForm = ({
  primaryColor, setPrimaryColor,
  secondaryColor, setSecondaryColor,
  secondaryTextColor, setSecondaryTextColor,
  fontFamily, setFontFamily,
  logoPosition, setLogoPosition,
  slug, portfolio, inp, label, card
}: any) => (
  <div className="bg-black space-y-4">
    <div className={card}>
      <h3 className="font-black text-white mb-5 flex items-center gap-2">
        <Palette className="w-5 h-5 text-blue-500" /> Colores del Tema
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: "Color Primario", value: primaryColor, set: setPrimaryColor },
          { label: "Color de Fondo", value: secondaryColor, set: setSecondaryColor },
          { label: "Texto Secundario", value: secondaryTextColor, set: setSecondaryTextColor },
        ].map(({ label: l, value, set }) => (
          <div key={l}>
            <p className={label}>{l}</p>
            <div className="flex items-center gap-3 p-2 overflow-hidden">
              <input
                type="color"
                value={value}
                onChange={(e) => set(e.target.value)}
                className="w-12 h-12 rounded-lg border-0 cursor-pointer bg-transparent p-0.5 shrink-0"
              />
              <span className="font-mono text-sm font-bold text-gray-800 dark:text-gray-100">
                {value.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className={card}>
      <h3 className="font-black text-gray-900 dark:text-white mb-5 flex items-center gap-2">
        <AlignLeft className="w-5 h-5 text-purple-500" /> Tipografía y Logo
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <p className={label}>Tipografía</p>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className={inp + " cursor-pointer"}
          >
            {FONTS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <div>
          <p className={label}>Posición del Logo</p>
          <select
            value={logoPosition}
            onChange={(e) => setLogoPosition(e.target.value)}
            className={inp + " cursor-pointer capitalize"}
          >
            {LOGO_POSITIONS.map((pos) => (
              <option key={pos} value={pos} className="capitalize">
                {pos}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>

    <div className={card}>
      <h3 className="font-black text-gray-900 dark:text-white mb-5 flex items-center gap-2">
        <LinkIcon className="w-5 h-5 text-emerald-500" /> Enlace Público
      </h3>
      <div className="flex items-center overflow-hidden">
        <span className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm font-mono border-r border-gray-200 dark:border-gray-700">
          /p/
        </span>
        <input
          type="text"
          value={slug}
          readOnly
          className="flex-1 bg-transparent px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 outline-none cursor-not-allowed"
        />
        {portfolio && (
          <a
            href={`/p/${portfolio.slug}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-3 text-blue-500 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  </div>
);

// ============================================
// PERFIL
// ============================================
export const PerfilForm = ({
  heroAvatarUrl, fileInputRef, uploadingImage, handleImageUpload,
  heroTitle, setHeroTitle, heroSubtitle, setHeroSubtitle,
  profession, setProfession, location, setLocation, email, setEmail,
  inp, label, card
}: any) => (
  <div className="bg-black space-y-4">
    <div className={card}>
      <h3 className="font-black text-gray-900 dark:text-white mb-5 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-pink-500" /> Foto de Perfil
      </h3>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative min-h-[180px] flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-all group overflow-hidden bg-black"
      >
        {heroAvatarUrl && !uploadingImage && (
          <img
            src={heroAvatarUrl}
            alt="Avatar"
            className="absolute inset-0 w-full h-full object-contain p-3 opacity-40 group-hover:opacity-30 transition-all"
          />
        )}
        {uploadingImage ? (
          <div className="z-10 flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
              Cargando...
            </span>
          </div>
        ) : (
          <div className="z-10 flex flex-col items-center gap-2 bg-white/10 px-6 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
            <ImageIcon className="w-7 h-7 text-white" />
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
              {heroAvatarUrl ? "Cambiar Imagen" : "Subir Foto / Logo"}
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>

    <div className={card}>
      <h3 className="font-black text-gray-900 dark:text-white mb-5 flex items-center gap-2">
        <Edit3 className="w-5 h-5 text-blue-500" /> Información Personal
      </h3>
      <div className="space-y-4">
        <div>
          <p className={label}>Título Principal / Nombre</p>
          <input
            type="text"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            placeholder="Ej: Juan Pérez — Diseñador UX"
            className={inp}
          />
        </div>
        <div>
          <p className={label}>Biografía / Descripción</p>
          <textarea
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            placeholder="Escribe tu presentación personal..."
            rows={4}
            className={inp + " resize-none h-32"}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className={label}>
              <Briefcase className="inline w-3 h-3 mr-1" /> Profesión
            </p>
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="Diseñador UI/UX"
              className={inp}
            />
          </div>
          <div>
            <p className={label}>
              <MapPin className="inline w-3 h-3 mr-1" /> Ubicación
            </p>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ciudad, País"
              className={inp}
            />
          </div>
          <div>
            <p className={label}>
              <Mail className="inline w-3 h-3 mr-1" /> Email de Contacto
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className={inp}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================
// EXPERIENCIA
// ============================================
export const ExperienciaForm = ({ experience, addExp, removeExp, updateExp, inp, label, card }: any) => (
  <div>
    <div className={card}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-500" /> Experiencia Laboral
        </h3>
        <button
          onClick={addExp}
          className="flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-all border border-blue-200 dark:border-blue-800"
        >
          <Plus className="w-4 h-4" /> Añadir
        </button>
      </div>
      {experience.length === 0 && (
        <div className="text-center py-10 text-gray-400 dark:text-gray-600">
          <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">Sin experiencia registrada. Añade la primera.</p>
        </div>
      )}
      {experience.map((exp: any, i: number) => (
        <div key={i} className="bg-black p-5 mb-4 relative group">
          <button
            onClick={() => removeExp(i)}
            className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <p className="text-xs font-black uppercase text-white/80 mb-4">
            Experiencia #{i + 1}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <p className={label}>Empresa</p>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExp(i, "company", e.target.value)}
                placeholder="Nombre de la empresa"
                className={inp}
              />
            </div>
            <div>
              <p className={label}>Cargo / Rol</p>
              <input
                type="text"
                value={exp.role}
                onChange={(e) => updateExp(i, "role", e.target.value)}
                placeholder="Diseñador Senior"
                className={inp}
              />
            </div>
          </div>
          <div className="mb-3">
            <p className={label}>Período</p>
            <input
              type="text"
              value={exp.period}
              onChange={(e) => updateExp(i, "period", e.target.value)}
              placeholder="Ene 2022 – Dic 2023"
              className={inp}
            />
          </div>
          <div>
            <p className={label}>Descripción</p>
            <textarea
              value={exp.description}
              onChange={(e) => updateExp(i, "description", e.target.value)}
              placeholder="Describe tus responsabilidades y logros..."
              rows={3}
              className={inp + " resize-none"}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================
// PROYECTOS
// ============================================
export const ProyectosForm = ({ projects, addProject, removeProject, updateProject, handleProjectImageUpload, inp, label, card }: any) => (
  <div>
    <div className={card}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
          <FolderKanban className="w-5 h-5 text-purple-500" /> Proyectos
        </h3>
        <button
          onClick={addProject}
          className="flex items-center gap-1.5 text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-2 hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-all border border-purple-200 dark:border-purple-800"
        >
          <Plus className="w-4 h-4" /> Añadir
        </button>
      </div>
      {projects.length === 0 && (
        <div className="text-center py-10 text-gray-400 dark:text-gray-600">
          <FolderKanban className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">Sin proyectos. Añade el primero.</p>
        </div>
      )}
      {projects.map((proj: any, i: number) => (
        <div key={i} className="bg-black p-5 mb-4 relative group">
          <button
            onClick={() => removeProject(i)}
            className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <p className="text-xs font-black uppercase text-white/80 mb-4">
            Proyecto #{i + 1}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <p className={label}>Nombre</p>
              <input
                type="text"
                value={proj.name}
                onChange={(e) => updateProject(i, "name", e.target.value)}
                placeholder="Mi Ultimo Pro"
                className={inp}
              />
            </div>
            <div>
              <p className={label}>Enlace (URL)</p>
              <input
                type="text"
                value={proj.link}
                onChange={(e) => updateProject(i, "link", e.target.value)}
                placeholder="https://miproyecto.com"
                className={inp}
              />
            </div>
          </div>
          <div className="mb-3">
            <p className={label}>Herramientas</p>
            <input
              type="text"
              value={proj.tools}
              onChange={(e) => updateProject(i, "tools", e.target.value)}
              placeholder="React, Node.js, Figma..."
              className={inp}
            />
          </div>
          <div>
            <p className={label}>Descripción</p>
            <textarea
              value={proj.description}
              onChange={(e) => updateProject(i, "description", e.target.value)}
              placeholder="Describe el proyecto..."
              rows={3}
              className={inp + " resize-none mb-4"}
            />
          </div>
          <div>
            <p className={label}>Imagen (Opcional)</p>
            <div className="flex items-center gap-4 mt-2 p-3">
              {proj.imageUrl ? (
                <img src={proj.imageUrl} alt="preview" className="w-16 h-16 object-cover shadow-sm bg-white" />
              ) : (
                <div className="w-16 h-16 bg-gray-100 dark:bg-black flex items-center justify-center shadow-sm shrink-0">
                  <ImageIcon className="w-6 h-6 text-gray-400 dark:text-gray-600" />
                </div>
              )}
              <div className="flex-1 overflow-hidden">
                <input type="file" accept="image/*" onChange={(e) => {
                  if (e.target.files?.[0]) handleProjectImageUpload(i, e.target.files[0]);
                }} className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-black file:uppercase cursor-pointer" />
                {proj.imageUrl && (
                  <button onClick={() => updateProject(i, "imageUrl", "")} className="text-xs font-bold text-red-500 mt-2 hover:text-red-400 transition-colors flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Quitar imagen
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================
// CURSOS
// ============================================
export const CursosForm = ({ courses, addCourse, removeCourse, updateCourse, inp, label, card }: any) => (
  <div>
    <div className={card}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-emerald-500" /> Cursos y Educación
        </h3>
        <button
          onClick={addCourse}
          className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-800/30 transition-all border border-emerald-200 dark:border-emerald-800"
        >
          <Plus className="w-4 h-4" /> Añadir
        </button>
      </div>
      {courses.length === 0 && (
        <div className="text-center py-10 text-gray-400 dark:text-gray-600">
          <GraduationCap className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">Sin cursos o estudios. Añade el primero.</p>
        </div>
      )}
      {courses.map((course: any, i: number) => (
        <div key={i} className="bg-black p-5 mb-4 relative group">
          <button
            onClick={() => removeCourse(i)}
            className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <p className="text-xs font-black uppercase text-white/80 mb-4">
            Formación #{i + 1}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div>
              <p className={label}>Nombre del Curso</p>
              <input
                type="text"
                value={course.name}
                onChange={(e) => updateCourse(i, "name", e.target.value)}
                placeholder="Diseño UX"
                className={inp}
              />
            </div>
            <div>
              <p className={label}>Institución</p>
              <input
                type="text"
                value={course.institution}
                onChange={(e) => updateCourse(i, "institution", e.target.value)}
                placeholder="Coursera / UTEC"
                className={inp}
              />
            </div>
            <div>
              <p className={label}>Año</p>
              <input
                type="text"
                value={course.year}
                onChange={(e) => updateCourse(i, "year", e.target.value)}
                placeholder="2023"
                className={inp}
              />
            </div>
          </div>
          <div>
            <p className={label}>Descripción Breve</p>
            <input
              type="text"
              value={course.description}
              onChange={(e) => updateCourse(i, "description", e.target.value)}
              placeholder="Temas vistos, logros..."
              className={inp}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================
// SKILLS
// ============================================
export const SkillsForm = ({ skills, addSkill, removeSkill, updateSkill, inp, label, card }: any) => (
  <div>
    <div className={card}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
          <Wrench className="w-5 h-5 text-amber-500" /> Habilidades Técnicas
        </h3>
        <button
          onClick={addSkill}
          className="flex items-center gap-1.5 text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-all border border-amber-200 dark:border-amber-800"
        >
          <Plus className="w-4 h-4" /> Añadir
        </button>
      </div>
      {skills.length === 0 && (
        <div className="text-center py-10 text-gray-400 dark:text-gray-600">
          <Wrench className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">Sin habilidades. Añade la primera.</p>
        </div>
      )}
      <div className="space-y-3">
        {skills.map((skill: any, i: number) => (
          <div key={i} className="bg-black p-4 relative group">
            <button
              onClick={() => removeSkill(i)}
              className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end pr-8">
              <div className="sm:col-span-2">
                <p className={label}>Habilidad</p>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(i, "name", e.target.value)}
                  placeholder="React, Figma, Python..."
                  className={inp}
                />
              </div>
              <div>
                <p className={label}>Nivel ({skill.level}%)</p>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={skill.level}
                  onChange={(e) => updateSkill(i, "level", Number(e.target.value))}
                  className="w-full mt-1 accent-amber-500"
                />
              </div>
            </div>
            <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ============================================
// REDES SOCIALES
// ============================================
export const RedesForm = ({ socialLinks, setSocialLinks, inp, label, card }: any) => (
  <div>
    <div className={card}>
      <h3 className="font-black text-white mb-5 flex items-center gap-2">
        <Globe className="w-5 h-5" /> Redes Sociales y Contacto
      </h3>
      <div className="bg-black p-4 space-y-4">
        {[
          { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/tu-perfil" },
          { key: "github", label: "GitHub", placeholder: "https://github.com/tu-usuario" },
          { key: "twitter", label: "Twitter / X", placeholder: "https://twitter.com/tu-usuario" },
          { key: "website", label: "Sitio Web Personal", placeholder: "https://tu-web.com" },
        ].map(({ key, label: l, placeholder }: { key: keyof SocialLinks; label: string; placeholder: string }) => (
          <div key={key}>
            <p className={label}>{l}</p>
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={socialLinks[key] || ""}
                onChange={(e) => setSocialLinks({ ...socialLinks, [key]: e.target.value })}
                placeholder={placeholder}
                className={inp}
              />
              {socialLinks[key] && (
                <a
                  href={socialLinks[key] as string}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-white text-white p-3 text-black hover:bg-white hover:text-black transition-all shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

