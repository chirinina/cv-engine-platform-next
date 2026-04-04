"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import {
  LogOut,
  Laptop,
  UserCircle,
  Edit3,
  Image as ImageIcon,
  Loader2,
  Palette,
  FileText,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Wrench,
  Globe,
  MapPin,
  Mail,
  Link as LinkIcon,
  Plus,
  Trash2,
  Sun,
  Moon,
  ExternalLink,
  ChevronRight,
  Save,
  AlignLeft,
} from "lucide-react";

// ----- Types -----
interface SocialLinks { linkedin?: string; twitter?: string; github?: string; website?: string;[key: string]: string | undefined; }
interface Course { name: string; institution: string; year: string; description: string; }
interface Project { name: string; description: string; link: string; tools: string; }
interface Experience { company: string; role: string; period: string; description: string; }
interface Skill { name: string; level: number; }

const FONTS = ["Inter", "Roboto", "Montserrat", "Lato", "Poppins", "Merriweather", "Oswald", "Playfair Display"];
const LOGO_POSITIONS = ["left", "center", "right", "top"];

const TABS = [
  { id: "visual", label: "Visual", icon: Palette },
  { id: "perfil", label: "Perfil", icon: UserCircle },
  { id: "experiencia", label: "Experiencia", icon: Briefcase },
  { id: "proyectos", label: "Proyectos", icon: FolderKanban },
  { id: "cursos", label: "Educación", icon: GraduationCap },
  { id: "skills", label: "Habilidades", icon: Wrench },
  { id: "redes", label: "Redes", icon: Globe },
];

export default function ClientDashboard() {
  const router = useRouter();
  const { user, logout, checkAuth, isLoading } = useAuthStore();
  const [portfolio, setPortfolio] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("visual");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // === Visual ===
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");
  const [secondaryTextColor, setSecondaryTextColor] = useState("#555555");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoPosition, setLogoPosition] = useState("left");
  const [slug, setSlug] = useState("");

  // === Perfil ===
  const [heroTitle, setHeroTitle] = useState("Hola Bienvenido");
  const [heroSubtitle, setHeroSubtitle] = useState("Este espacio está diseñado para presentar de manera clara y profesional mi trabajo y logros en cualquier área. Aquí encontrarás proyectos destacados, colaboraciones y experiencias que reflejan mi enfoque, creatividad y compromiso con la excelencia. Cada sección puede ser personalizada para mostrar la información más relevante de manera concisa y atractiva, permitiendo que visitantes y potenciales clientes conozcan de forma directa mi perfil profesional.");
  const [heroAvatarUrl, setHeroAvatarUrl] = useState("");
  const [heroSectionId, setHeroSectionId] = useState<number | null>(null);
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");

  // === Experience ===
  const [experience, setExperience] = useState<Experience[]>([]);

  // === Projects ===
  const [projects, setProjects] = useState<Project[]>([]);

  // === Courses ===
  const [courses, setCourses] = useState<Course[]>([]);

  // === Skills ===
  const [skills, setSkills] = useState<Skill[]>([]);

  // === Social Links ===
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({ linkedin: "", twitter: "", github: "", website: "" });

  // === UI state ===
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // === Dark Mode ===
  useEffect(() => {
    const saved = localStorage.getItem("client-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved === "dark" || (!saved && prefersDark);
    setIsDarkMode(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("client-theme", next ? "dark" : "light");
      return next;
    });
  };

  useEffect(() => { checkAuth(); }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== "CLIENT") router.push("/login");
      else fetchMyPortfolio();
    }
  }, [user, isLoading]);

  const fetchMyPortfolio = async () => {
    try {
      const res = await api.get("/portfolios");
      if (res.data.length > 0) {
        const p = res.data[0];
        setPortfolio(p);
        setPrimaryColor(p.primaryColor || "#000000");
        setSecondaryColor(p.secondaryColor || "#ffffff");
        setSecondaryTextColor(p.secondaryTextColor || "#555555");
        setFontFamily(p.fontFamily || "Inter");
        setLogoUrl(p.logoUrl || "");
        setLogoPosition(p.logoPosition || "left");
        setSlug(p.slug || "");
        setProfession(p.profession || "");
        setLocation(p.location || "");
        setEmail(p.email || user?.email || "");
        setSocialLinks(p.socialLinks || { linkedin: "", twitter: "", github: "", website: "" });
        setExperience(p.experience || []);
        setProjects(p.projects || []);
        setCourses(p.courses || []);
        setSkills(p.skills || []);
        fetchSections(p.slug);
      }
    } catch { toast.error("Error al cargar portafolio"); }
  };

  const fetchSections = async (pSlug: string) => {
    try {
      const res = await api.get(`/portfolios/slug/${pSlug}`);
      const sec = res.data.sections.find((s: any) => s.type === "hero");
      if (sec) {
        setHeroSectionId(sec.id);
        setHeroTitle(sec.content?.title || user?.name || "");
        setHeroSubtitle(sec.content?.subtitle || "");
        setHeroAvatarUrl(sec.content?.avatarUrl || "");
      }
    } catch { toast.error("Error al cargar secciones"); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await api.post("/portfolios/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
      const finalUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}${res.data.url}`;
      setHeroAvatarUrl(finalUrl);
      setLogoUrl(finalUrl);
      toast.success("Imagen subida. Guarda los cambios para fijarla.");
    } catch { toast.error("Fallo al subir imagen."); }
    finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSaveAll = async () => {
    if (!portfolio) return;
    setSaving(true);
    try {
      // 1. Save portfolio meta + json fields
      await api.put(`/portfolios/${portfolio.id}`, {
        primaryColor, secondaryColor, secondaryTextColor, fontFamily,
        logoUrl, logoPosition, profession, location, email,
        socialLinks, experience, projects, courses, skills,
      });

      // 2. Save hero section
      const body: any = {
        type: "hero",
        content: { title: heroTitle, subtitle: heroSubtitle, avatarUrl: heroAvatarUrl, logoPosition, profession, location, email, socialLinks, courses, projects, experience, skills },
        order: 1,
        isVisible: true,
      };
      if (heroSectionId) body.id = heroSectionId;
      const secRes = await api.post(`/portfolios/${portfolio.id}/sections`, body);
      setHeroSectionId(secRes.data.id);

      toast.success("¡Todo guardado correctamente! 🎉");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error al guardar");
    } finally { setSaving(false); }
  };

  // === Array helpers ===
  const addExp = () => setExperience([...experience, { company: "", role: "", period: "", description: "" }]);
  const removeExp = (i: number) => setExperience(experience.filter((_, idx) => idx !== i));
  const updateExp = (i: number, field: keyof Experience, val: string) => {
    const updated = [...experience]; updated[i] = { ...updated[i], [field]: val }; setExperience(updated);
  };

  const addProject = () => setProjects([...projects, { name: "", description: "", link: "", tools: "" }]);
  const removeProject = (i: number) => setProjects(projects.filter((_, idx) => idx !== i));
  const updateProject = (i: number, field: keyof Project, val: string) => {
    const updated = [...projects]; updated[i] = { ...updated[i], [field]: val }; setProjects(updated);
  };

  const addCourse = () => setCourses([...courses, { name: "", institution: "", year: "", description: "" }]);
  const removeCourse = (i: number) => setCourses(courses.filter((_, idx) => idx !== i));
  const updateCourse = (i: number, field: keyof Course, val: string) => {
    const updated = [...courses]; updated[i] = { ...updated[i], [field]: val }; setCourses(updated);
  };

  const addSkill = () => setSkills([...skills, { name: "", level: 80 }]);
  const removeSkill = (i: number) => setSkills(skills.filter((_, idx) => idx !== i));
  const updateSkill = (i: number, field: keyof Skill, val: string | number) => {
    const updated = [...skills]; updated[i] = { ...updated[i], [field]: val }; setSkills(updated);
  };

  // === Loading ===
  if (isLoading || !user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 font-medium text-sm uppercase tracking-widest">Cargando...</p>
      </div>
    </div>
  );

  // === Base input classes ===
  const inp = "w-full bg-black border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500 text-sm font-medium";
  const label = "text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1.5 block";
  const card = "p-6 mb-4 shadow-sm";

  return (
    <div className="min-h-screen font-sans transition-colors duration-300">

      {/* TOP NAV */}
      <header className="sticky top-0 z-50 bg-black backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/60 px-4 md:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
              {heroAvatarUrl
                ? <img src={heroAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                : <UserCircle className="w-6 h-6 text-white" />}
            </div>
            <div>
              <p className="font-black text-gray-900 dark:text-white leading-tight">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Admin Cliente</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {portfolio && (
              <a
                href={`/p/${portfolio.slug}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-2 text-sm font-bold px-4 py-2 bg-black text-white rounded-xl hover:bg-white hover:text-black transition-all border border-white"
              >
                <ExternalLink className="w-4 h-4" /> Ver Portafolio
              </a>
            )}

            <button onClick={logout} className="flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-2.5 rounded-xl hover:bg-red-100 dark:hover:bg-red-800/30 transition-all">
              <LogOut className="w-4 h-4" /> Salir
            </button>
          </div>
        </div>
      </header>

      {portfolio ? (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          {/* TAB BAR */}
          <div className="flex gap-1 overflow-x-auto pb-1 mb-8 p-1.5">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2.5 font-bold text-sm whitespace-nowrap transition-all border ${activeTab === id
                  ? "bg-white text-black "
                  : " text-gray-400 hover:bg-white hover:text-black hover:border-white"
                  }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-0">

              {/* ========== TAB: VISUAL ========== */}
              {activeTab === "visual" && (
                <div className="bg-black space-y-4">
                  <div className={card}>
                    <h3 className="font-black text-gray-900 dark:text-white mb-5 flex items-center gap-2">
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
                          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-2 overflow-hidden">
                            <input type="color" value={value} onChange={e => set(e.target.value)}
                              className="w-12 h-12 rounded-lg border-0 cursor-pointer bg-transparent p-0.5 shrink-0" />
                            <span className="font-mono text-sm font-bold text-gray-800 dark:text-gray-100">{value.toUpperCase()}</span>
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
                        <select value={fontFamily} onChange={e => setFontFamily(e.target.value)}
                          className={inp + " cursor-pointer"}>
                          {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                      </div>
                      <div>
                        <p className={label}>Posición del Logo</p>
                        <select value={logoPosition} onChange={e => setLogoPosition(e.target.value)}
                          className={inp + " cursor-pointer capitalize"}>
                          {LOGO_POSITIONS.map(pos => <option key={pos} value={pos} className="capitalize">{pos}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className={card}>
                    <h3 className="font-black text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-emerald-500" /> Enlace Público
                    </h3>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                      <span className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm font-mono border-r border-gray-200 dark:border-gray-700">/p/</span>
                      <input type="text" value={slug} readOnly className="flex-1 bg-transparent px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 outline-none cursor-not-allowed" />
                      {portfolio && (
                        <a href={`/p/${portfolio.slug}`} target="_blank" rel="noreferrer"
                          className="px-4 py-3 text-blue-500 hover:text-blue-700 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ========== TAB: PERFIL ========== */}
              {activeTab === "perfil" && (
                <div className="bg-black space-y-4">
                  <div className={card}>
                    <h3 className="font-black text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-pink-500" /> Foto / Logo de Perfil
                    </h3>
                    <div onClick={() => fileInputRef.current?.click()}
                      className="relative min-h-[180px] flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-all group overflow-hidden bg-black">
                      {heroAvatarUrl && !uploadingImage && (
                        <img src={heroAvatarUrl} alt="Avatar" className="absolute inset-0 w-full h-full object-contain p-3 opacity-40 group-hover:opacity-30 transition-all" />
                      )}
                      {uploadingImage
                        ? <div className="z-10 flex flex-col items-center gap-2"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /><span className="text-sm font-bold text-gray-600 dark:text-gray-300">Cargando...</span></div>
                        : <div className="z-10 flex flex-col items-center gap-2 bg-white/10 px-6 py-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                          <ImageIcon className="w-7 h-7 text-blue-500" />
                          <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                            {heroAvatarUrl ? "Cambiar Imagen" : "Subir Foto / Logo"}
                          </p>
                        </div>}
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </div>
                  </div>

                  <div className={card}>
                    <h3 className="font-black text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                      <Edit3 className="w-5 h-5 text-blue-500" /> Información Personal
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className={label}>Título Principal / Nombre</p>
                        <input type="text" value={heroTitle} onChange={e => setHeroTitle(e.target.value)}
                          placeholder="Ej: Juan Pérez — Diseñador UX" className={inp} />
                      </div>
                      <div>
                        <p className={label}>Biografía / Descripción</p>
                        <textarea value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)}
                          placeholder="Escribe tu presentación personal..." rows={4}
                          className={inp + " resize-none h-32"} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <p className={label}><Briefcase className="inline w-3 h-3 mr-1" />Profesión</p>
                          <input type="text" value={profession} onChange={e => setProfession(e.target.value)}
                            placeholder="Diseñador UI/UX" className={inp} />
                        </div>
                        <div>
                          <p className={label}><MapPin className="inline w-3 h-3 mr-1" />Ubicación</p>
                          <input type="text" value={location} onChange={e => setLocation(e.target.value)}
                            placeholder="Ciudad, País" className={inp} />
                        </div>
                        <div>
                          <p className={label}><Mail className="inline w-3 h-3 mr-1" />Email de Contacto</p>
                          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="tu@email.com" className={inp} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========== TAB: EXPERIENCIA ========== */}
              {activeTab === "experiencia" && (
                <div>
                  <div className={card}>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-500" /> Experiencia Laboral
                      </h3>
                      <button onClick={addExp} className="flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-all border border-blue-200 dark:border-blue-800">
                        <Plus className="w-4 h-4" /> Añadir
                      </button>
                    </div>
                    {experience.length === 0 && (
                      <div className="text-center py-10 text-gray-400 dark:text-gray-600">
                        <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm font-medium">Sin experiencia registrada. Añade la primera.</p>
                      </div>
                    )}
                    {experience.map((exp, i) => (
                      <div key={i} className="bg-black border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-4 relative group">
                        <button onClick={() => removeExp(i)} className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <p className="text-xs font-black uppercase text-white/80 mb-4">Experiencia #{i + 1}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                          <div>
                            <p className={label}>Empresa</p>
                            <input type="text" value={exp.company} onChange={e => updateExp(i, "company", e.target.value)} placeholder="Nombre de la empresa" className={inp} />
                          </div>
                          <div>
                            <p className={label}>Cargo / Rol</p>
                            <input type="text" value={exp.role} onChange={e => updateExp(i, "role", e.target.value)} placeholder="Diseñador Senior" className={inp} />
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className={label}>Período</p>
                          <input type="text" value={exp.period} onChange={e => updateExp(i, "period", e.target.value)} placeholder="Ene 2022 – Dic 2023" className={inp} />
                        </div>
                        <div>
                          <p className={label}>Descripción</p>
                          <textarea value={exp.description} onChange={e => updateExp(i, "description", e.target.value)} placeholder="Describe tus responsabilidades y logros..." rows={3} className={inp + " resize-none"} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========== TAB: PROYECTOS ========== */}
              {activeTab === "proyectos" && (
                <div>
                  <div className={card}>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <FolderKanban className="w-5 h-5 text-purple-500" /> Proyectos
                      </h3>
                      <button onClick={addProject} className="flex items-center gap-1.5 text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-all border border-purple-200 dark:border-purple-800">
                        <Plus className="w-4 h-4" /> Añadir
                      </button>
                    </div>
                    {projects.length === 0 && (
                      <div className="text-center py-10 text-gray-400 dark:text-gray-600">
                        <FolderKanban className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm font-medium">Sin proyectos. Añade el primero.</p>
                      </div>
                    )}
                    {projects.map((proj, i) => (
                      <div key={i} className="bg-black border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-4 relative group">
                        <button onClick={() => removeProject(i)} className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <p className="text-xs font-black uppercase text-white/80 mb-4">Proyecto #{i + 1}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                          <div>
                            <p className={label}>Nombre</p>
                            <input type="text" value={proj.name} onChange={e => updateProject(i, "name", e.target.value)} placeholder="Mi Proyecto Increíble" className={inp} />
                          </div>
                          <div>
                            <p className={label}>Enlace (URL)</p>
                            <input type="text" value={proj.link} onChange={e => updateProject(i, "link", e.target.value)} placeholder="https://miproyecto.com" className={inp} />
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className={label}>Tecnologías / Herramientas</p>
                          <input type="text" value={proj.tools} onChange={e => updateProject(i, "tools", e.target.value)} placeholder="React, Node.js, Figma..." className={inp} />
                        </div>
                        <div>
                          <p className={label}>Descripción</p>
                          <textarea value={proj.description} onChange={e => updateProject(i, "description", e.target.value)} placeholder="Describe el proyecto..." rows={3} className={inp + " resize-none"} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========== TAB: CURSOS / EDUCACIÓN ========== */}
              {activeTab === "cursos" && (
                <div>
                  <div className={card}>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-emerald-500" /> Cursos y Educación
                      </h3>
                      <button onClick={addCourse} className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-800/30 transition-all border border-emerald-200 dark:border-emerald-800">
                        <Plus className="w-4 h-4" /> Añadir
                      </button>
                    </div>
                    {courses.length === 0 && (
                      <div className="text-center py-10 text-gray-400 dark:text-gray-600">
                        <GraduationCap className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm font-medium">Sin cursos o estudios. Añade el primero.</p>
                      </div>
                    )}
                    {courses.map((course, i) => (
                      <div key={i} className="bg-black border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-4 relative group">
                        <button onClick={() => removeCourse(i)} className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <p className="text-xs font-black uppercase text-white/80 mb-4">Formación #{i + 1}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                          <div>
                            <p className={label}>Nombre del Curso</p>
                            <input type="text" value={course.name} onChange={e => updateCourse(i, "name", e.target.value)} placeholder="Diseño UX" className={inp} />
                          </div>
                          <div>
                            <p className={label}>Institución</p>
                            <input type="text" value={course.institution} onChange={e => updateCourse(i, "institution", e.target.value)} placeholder="Coursera / UTEC" className={inp} />
                          </div>
                          <div>
                            <p className={label}>Año</p>
                            <input type="text" value={course.year} onChange={e => updateCourse(i, "year", e.target.value)} placeholder="2023" className={inp} />
                          </div>
                        </div>
                        <div>
                          <p className={label}>Descripción Breve</p>
                          <input type="text" value={course.description} onChange={e => updateCourse(i, "description", e.target.value)} placeholder="Temas vistos, logros..." className={inp} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========== TAB: SKILLS ========== */}
              {activeTab === "skills" && (
                <div>
                  <div className={card}>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-amber-500" /> Habilidades Técnicas
                      </h3>
                      <button onClick={addSkill} className="flex items-center gap-1.5 text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-all border border-amber-200 dark:border-amber-800">
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
                      {skills.map((skill, i) => (
                        <div key={i} className="bg-black border border-gray-200 dark:border-gray-700 rounded-xl p-4 relative group">
                          <button onClick={() => removeSkill(i)} className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end pr-8">
                            <div className="sm:col-span-2">
                              <p className={label}>Habilidad</p>
                              <input type="text" value={skill.name} onChange={e => updateSkill(i, "name", e.target.value)} placeholder="React, Figma, Python..." className={inp} />
                            </div>
                            <div>
                              <p className={label}>Nivel ({skill.level}%)</p>
                              <input type="range" min={0} max={100} value={skill.level} onChange={e => updateSkill(i, "level", Number(e.target.value))}
                                className="w-full mt-1 accent-amber-500" />
                            </div>
                          </div>
                          <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300" style={{ width: `${skill.level}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ========== TAB: REDES SOCIALES ========== */}
              {activeTab === "redes" && (
                <div>
                  <div className={card}>
                    <h3 className="font-black text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-pink-500" /> Redes Sociales y Contacto
                    </h3>
                    <div className="space-y-4">
                      {[
                        { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/tu-perfil" },
                        { key: "github", label: "GitHub", placeholder: "https://github.com/tu-usuario" },
                        { key: "twitter", label: "Twitter / X", placeholder: "https://twitter.com/tu-usuario" },
                        { key: "website", label: "Sitio Web Personal", placeholder: "https://tu-web.com" },
                      ].map(({ key, label: l, placeholder }) => (
                        <div key={key}>
                          <p className={label}>{l}</p>
                          <div className="flex items-center gap-2">
                            <input type="url" value={(socialLinks as any)[key] || ""} onChange={e => setSocialLinks({ ...socialLinks, [key]: e.target.value })}
                              placeholder={placeholder} className={inp} />
                            {(socialLinks as any)[key] && (
                              <a href={(socialLinks as any)[key]} target="_blank" rel="noreferrer"
                                className="p-3 text-white/10 hover:bg-white rounded-xl border border-gray-200 dark:border-gray-700 transition-all shrink-0">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR: Preview + Save */}
            <div className="space-y-4">
              {/* Avatar preview */}
              <div className="bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center shadow-sm">
                <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 mb-4 flex items-center justify-center">
                  {heroAvatarUrl
                    ? <img src={heroAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    : <UserCircle className="w-12 h-12 text-white opacity-70" />}
                </div>
                <p className="font-black text-gray-900 dark:text-white text-lg leading-tight">{heroTitle || user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{profession || "Tu profesión"}</p>
                {location && <p className="text-xs text-white/80 mt-1 flex items-center justify-center gap-1"><MapPin className="w-3 h-3" />{location}</p>}
                {email && <p className="text-xs text-white/80 mt-1 flex items-center justify-center gap-1"><Mail className="w-3 h-3" />{email}</p>}
              </div>

              {/* Theme preview */}
              <div className="bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-white/80 mb-4">Vista Previa de Tema</p>
                <div className="rounded-xl p-4 mb-3 flex items-center gap-3" style={{ background: secondaryColor }}>
                  <div className="w-10 h-10 rounded-full border-2" style={{ backgroundColor: primaryColor, borderColor: primaryColor }}></div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: primaryColor, fontFamily }}>Tu Nombre</p>
                    <p className="text-xs" style={{ color: secondaryTextColor, fontFamily }}>Tu profesión</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[primaryColor, secondaryColor, secondaryTextColor].map((c, i) => (
                    <div key={i} className="h-8 rounded-lg border border-gray-100 dark:border-gray-700" style={{ background: c }} title={c} />
                  ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-2 font-mono">{fontFamily}</p>
              </div>

              {/* Stats */}
              <div className="bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-white/80">Resumen de Datos</p>
                {[
                  { label: "Experiencias", count: experience.length, color: "bg-blue-500" },
                  { label: "Proyectos", count: projects.length, color: "bg-purple-500" },
                  { label: "Cursos", count: courses.length, color: "bg-emerald-500" },
                  { label: "Habilidades", count: skills.length, color: "bg-amber-500" },
                ].map(({ label: l, count, color }) => (
                  <div key={l} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                      <span className={`w-2 h-2 rounded-full ${color}`} />{l}
                    </span>
                    <span className="font-black text-gray-900 dark:text-white text-sm">{count}</span>
                  </div>
                ))}
              </div>

              {/* SAVE BUTTON */}
              <button
                onClick={handleSaveAll}
                disabled={saving || uploadingImage}
                className="w-full py-4 border border-white text-white font-black rounded-2xl transition-all hover:bg-white hover:text-black disabled:opacity-60 flex items-center justify-center gap-3 text-base"
              >
                {saving
                  ? <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</>
                  : <><Save className="w-5 h-5" /> Guardar Todo</>}
              </button>

              {portfolio && (
                <a href={`/p/${portfolio.slug}`} target="_blank" rel="noreferrer"
                  className="w-full py-3.5 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm">
                  <ExternalLink className="w-4 h-4" /> Ver Portafolio Público
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* No portfolio assigned */
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          <div className="bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-12 max-w-md w-full text-center shadow-xl">
            <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Laptop className="w-10 h-10 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Portafolio pendiente</h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">El administrador configurará tu portafolio con una plantilla profesional pronto.</p>
          </div>
        </div>
      )}
    </div>
  );
}
