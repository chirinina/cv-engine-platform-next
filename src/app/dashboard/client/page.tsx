"use client";

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import WhatsAppInquiryInbox from "@/components/dashboard/WhatsAppInquiryInbox";
import {
  VisualForm, PerfilForm, ExperienciaForm, ProyectosForm, CursosForm, SkillsForm, RedesForm, HobbiesForm
} from "@/components/dashboard/ClientForms";
import {
  LogOut,
  Laptop,
  UserCircle,
  Edit3,
  Image as ImageIcon,
  Palette,
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
  ExternalLink,
  Save,
  Loader2,
  AlignLeft,
  MessageSquareMore,
  Settings,
  Clock,
  CalendarDays,
  Heart,
} from "lucide-react";
import {
  PortfolioData,
  PortfolioSection,
  SocialLinks,
  PortfolioHobby,
} from "@/types/portfolio";

// ----- Types -----
interface Course {
  name: string;
  institution: string;
  year: string;
  description: string;
}
interface Project {
  name: string;
  description: string;
  link: string;
  tools: string;
  imageUrl?: string;
}
interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}
interface Skill {
  name: string;
  level: number;
}
interface Inquiry {
  id: number;
  senderName: string;
  projectName: string;
  projectDescription: string;
  phone?: string | null;
  createdAt: string;
  portfolio?: { id: number; slug: string; userId: number };
}

const TABS = [
  { id: "visual", label: "Visual", icon: Palette },
  { id: "perfil", label: "Perfil", icon: UserCircle },
  { id: "experiencia", label: "Experiencia", icon: Briefcase },
  { id: "proyectos", label: "Proyectos", icon: FolderKanban },
  { id: "cursos", label: "Educación", icon: GraduationCap },
  { id: "skills", label: "Habilidades", icon: Wrench },
  { id: "redes", label: "Redes Sociales", icon: Globe },
  { id: "pasatiempos", label: "Pasatiempos", icon: Heart },
  { id: "consultas", label: "Mensajes", icon: MessageSquareMore },
];

const YearCalendar = ({ isRounded, primaryColor }: { isRounded: boolean; primaryColor: string }) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();
  const year = now.getFullYear();

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  return (
    <div className={`p-4 md:p-6 bg-zinc-900/40 border border-white/5 backdrop-blur-md shadow-2xl ${isRounded ? 'rounded-[2rem]' : 'rounded-none'} overflow-hidden`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <CalendarDays className="w-4 h-4" style={{ color: primaryColor || '#ef4444' }} />
          Calendario {year}
        </h3>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
        {months.map((monthName, mIdx) => {
          const days = getDaysInMonth(mIdx, year);
          const firstDay = getFirstDayOfMonth(mIdx, year);
          const isCurrentMonth = mIdx === currentMonth;

          return (
            <div key={mIdx} className={`p-3 rounded-2xl transition-all duration-500 ${isCurrentMonth
              ? 'bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] scale-[1.02] z-10'
              : 'opacity-40 hover:opacity-100 hover:bg-white/5 group border border-transparent hover:border-white/5'}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${isCurrentMonth ? '' : 'text-zinc-500 group-hover:text-white'}`} style={{ color: isCurrentMonth ? (primaryColor || '#ef4444') : undefined }}>
                {monthName.substring(0, 3)}
              </p>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="w-1.5 h-1.5" />
                ))}
                {Array.from({ length: days }).map((_, dIdx) => {
                  const day = dIdx + 1;
                  const isToday = isCurrentMonth && day === currentDay;
                  const date = new Date(year, mIdx, day);
                  const weekday = date.toLocaleDateString("es-ES", { weekday: "long" });
                  const month = date.toLocaleDateString("es-ES", { month: "long" });
                  const formattedDate = `${weekday.charAt(0).toUpperCase() + weekday.slice(1)} ${day} de ${month.charAt(0).toUpperCase() + month.slice(1)} de ${year}`;

                  return (
                    <div
                      key={day}
                      title={formattedDate}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-help ${isToday
                        ? 'shadow-[0_0_12px_rgba(255,255,255,0.3)] scale-150 z-20'
                        : 'bg-white/10 group-hover:bg-white/20 hover:scale-150 hover:bg-white/50'
                        }`}
                      style={{
                        backgroundColor: isToday ? (primaryColor || '#ef4444') : undefined,
                        boxShadow: isToday ? `0 0 10px ${primaryColor || '#ef4444'}` : undefined
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default function ClientDashboard() {
  const router = useRouter();
  const { user, logout, checkAuth, isLoading } = useAuthStore();
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("visual");

  // === Visual ===
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");
  const [secondaryTextColor, setSecondaryTextColor] = useState("#555555");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoPosition, setLogoPosition] = useState("left");
  const [slug, setSlug] = useState("");

  // === Perfil ===
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Este espacio está diseñado para presentar de manera clara y profesional mi trabajo y logros en cualquier área. Aquí encontrarás proyectos destacados, colaboraciones y experiencias que reflejan mi enfoque, creatividad y compromiso con la excelencia. Cada sección puede ser personalizada para mostrar la información más relevante de manera concisa y atractiva, permitiendo que visitantes y potenciales clientes conozcan de forma directa mi perfil profesional.",
  );
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

  // === Hobbies ===
  const [hobbies, setHobbies] = useState<PortfolioHobby[]>([]);

  // === Social Links ===
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    linkedin: "",
    twitter: "",
    github: "",
    website: "",
  });

  // === Inquiries ===
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // === UI state ===
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [viewMode, setViewMode] = useState<"dashboard" | "profile">("dashboard");
  const [isRounded, setIsRounded] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [country, setCountry] = useState("");

  // === Dark Mode & Time ===
  useEffect(() => {
    const savedTheme = localStorage.getItem("client-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const dark = savedTheme === "dark" || (!savedTheme && prefersDark);
    document.documentElement.classList.toggle("dark", dark);

    const savedRounded = localStorage.getItem("client-rounded");
    if (savedRounded) setIsRounded(savedRounded === "true");

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    setCountry(Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1]?.replace(/_/g, ' ') || "Local");

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

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
        setSocialLinks(
          p.socialLinks || {
            linkedin: "",
            twitter: "",
            github: "",
            website: "",
          },
        );
        setExperience(p.experience || []);
        setProjects(p.projects || []);
        setCourses(p.courses || []);
        setSkills(p.skills || []);
        setHobbies(p.hobbies || []);
        fetchSections(p.slug);
        fetchInquiries();
      } else {
        setInquiries([]);
        setLoadingInquiries(false);
      }
    } catch {
      toast.error("Error al cargar portafolio");
    }
  };

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await api.get("/portfolios/inquiries");
      setInquiries(res.data || []);
    } catch {
      toast.error("Error al cargar consultas");
    } finally {
      setLoadingInquiries(false);
    }
  };

  const fetchSections = async (pSlug: string) => {
    try {
      const res = await api.get(`/portfolios/slug/${pSlug}`);
      const sec = (res.data.sections as PortfolioSection[]).find(
        (s) => s.type === "hero",
      );
      if (sec) {
        setHeroSectionId(sec.id ?? null);
        let finalTitle = sec.content?.title || "";
        if (!finalTitle || finalTitle.trim() === "Hola Bienvenido Soy") {
          finalTitle = `Hola Bienvenido Soy ${user?.name || ""}`;
        }
        setHeroTitle(finalTitle);
        setHeroSubtitle(sec.content?.subtitle || "");
        setHeroAvatarUrl(sec.content?.avatarUrl || "");
      } else {
        setHeroTitle(`Hola Bienvenido Soy ${user?.name || ""}`);
      }
    } catch {
      toast.error("Error al cargar secciones");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await api.post("/portfolios/upload?folder=profiles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const finalUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}${res.data.url}`;
      setHeroAvatarUrl(finalUrl);
      setLogoUrl(finalUrl);
      toast.success("Imagen subida. Guarda los cambios para fijarla.");
    } catch {
      toast.error("Fallo al subir imagen.");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleProjectImageUpload = async (i: number, file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const loadingToast = toast.loading("Subiendo imagen...");
    try {
      const res = await api.post("/portfolios/upload?folder=projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const finalUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}${res.data.url}`;
      updateProject(i, "imageUrl", finalUrl);
      toast.success("Imagen de proyecto lista", { id: loadingToast });
    } catch {
      toast.error("Fallo al subir imagen del proyecto.", { id: loadingToast });
    }
  };

  const handleSaveAll = async () => {
    if (!portfolio) return;
    setSaving(true);
    try {
      // 1. Save portfolio meta + json fields
      await api.put(`/portfolios/${portfolio.id}`, {
        primaryColor,
        secondaryColor,
        secondaryTextColor,
        fontFamily,
        logoUrl,
        logoPosition,
        profession,
        location,
        email,
        socialLinks,
        experience,
        projects,
        courses,
        skills,
        hobbies,
      });

      // 2. Save hero section
      const body: {
        id?: number;
        type: string;
        content: Record<string, unknown>;
        order: number;
        isVisible: boolean;
      } = {
        type: "hero",
        content: {
          title: heroTitle,
          subtitle: heroSubtitle,
          avatarUrl: heroAvatarUrl,
          logoPosition,
          profession,
          location,
          email,
          socialLinks,
          courses,
          projects,
          experience,
          skills,
          hobbies,
        },
        order: 1,
        isVisible: true,
      };
      if (heroSectionId) body.id = heroSectionId;
      const secRes = await api.post(
        `/portfolios/${portfolio.id}/sections`,
        body,
      );
      setHeroSectionId(secRes.data.id);

      toast.success("¡Todo guardado correctamente! 🎉");
    } catch (err: unknown) {
      toast.error(
        axios.isAxiosError(err)
          ? err.response?.data?.message || "Error al guardar"
          : "Error al guardar",
      );
    } finally {
      setSaving(false);
    }
  };

  // === Array helpers ===
  const addExp = () =>
    setExperience([
      ...experience,
      { company: "", role: "", period: "", description: "" },
    ]);
  const removeExp = (i: number) =>
    setExperience(experience.filter((_, idx) => idx !== i));
  const updateExp = (i: number, field: keyof Experience, val: string) => {
    const updated = [...experience];
    updated[i] = { ...updated[i], [field]: val };
    setExperience(updated);
  };

  const addProject = () =>
    setProjects([
      ...projects,
      { name: "", description: "", link: "", tools: "", imageUrl: "" },
    ]);
  const removeProject = (i: number) =>
    setProjects(projects.filter((_, idx) => idx !== i));
  const updateProject = (i: number, field: keyof Project, val: string) => {
    const updated = [...projects];
    updated[i] = { ...updated[i], [field]: val };
    setProjects(updated);
  };

  const addCourse = () =>
    setCourses([
      ...courses,
      { name: "", institution: "", year: "", description: "" },
    ]);
  const removeCourse = (i: number) =>
    setCourses(courses.filter((_, idx) => idx !== i));
  const updateCourse = (i: number, field: keyof Course, val: string) => {
    const updated = [...courses];
    updated[i] = { ...updated[i], [field]: val };
    setCourses(updated);
  };

  const addSkill = () => setSkills([...skills, { name: "", level: 80 }]);
  const removeSkill = (i: number) =>
    setSkills(skills.filter((_, idx) => idx !== i));
  const updateSkill = (i: number, field: keyof Skill, val: string | number) => {
    const updated = [...skills];
    updated[i] = { ...updated[i], [field]: val };
    setSkills(updated);
  };

  const addHobby = () => setHobbies([...hobbies, { name: "", link: "", imageUrl: "", icon: "" }]);
  const removeHobby = (i: number) => setHobbies(hobbies.filter((_, idx) => idx !== i));
  const updateHobby = (i: number, field: keyof PortfolioHobby, val: string) => {
    const updated = [...hobbies];
    updated[i] = { ...updated[i], [field]: val };
    setHobbies(updated);
  };
  const fetchLinkPreview = async (i: number, url: string) => {
    if (!url) return;
    const loadingToast = toast.loading("Obteniendo imagen del enlace...");
    try {
      const res = await api.get(`/portfolios/link-preview?url=${encodeURIComponent(url)}`);
      if (res.data && res.data.images && res.data.images.length > 0) {
        updateHobby(i, "imageUrl", res.data.images[0]);
        toast.success("Imagen obtenida con éxito", { id: loadingToast });
      } else {
        toast.error("No se encontró imagen en el enlace", { id: loadingToast });
      }
    } catch {
      toast.error("Error al obtener la imagen del enlace", { id: loadingToast });
    }
  };

  // === Loading ===
  if (isLoading || !user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm uppercase tracking-widest">
            Cargando...
          </p>
        </div>
      </div>
    );

  // === Base input classes ===
  const inp =
    `w-full bg-black border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500 text-sm font-medium ${isRounded ? "rounded-xl" : "rounded-none"}`;
  const label =
    "text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1.5 block";
  const card = `p-6 mb-4 shadow-sm bg-black border border-gray-100 dark:border-gray-800/50 ${isRounded ? "rounded-2xl" : "rounded-none"}`;

  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
      {/* TOP NAV */}
      <header className="sticky top-0 z-50 bg-black backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/60 px-2 md:px-4 py-3">
        <div className="w-full max-w-[98%] mx-auto flex items-center justify-between">
          <button
            onClick={() => setViewMode(viewMode === "dashboard" ? "profile" : "dashboard")}
            className="flex items-center gap-4 text-left p-2 -ml-2 rounded-xl transition-all group"
            title="Ver Perfil y Resumen de Datos"
          >
            <div className="w-10 h-10 flex bg-white/10 rounded-2xl items-center justify-center overflow-hidden border border-transparent group-hover:border-white/30 transition-all">
              {heroAvatarUrl ? (
                <img
                  src={heroAvatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircle className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <p className="font-black text-white transition-colors">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium transition-colors">
                Ver mi perfil
              </p>
            </div>
          </button>

          <div className="flex items-center gap-2 md:gap-3">
            {currentTime && (
              <div className="hidden md:flex items-center gap-2 px-3 py-2" style={{ borderRadius: isRounded ? "0.5rem" : "0px" }}>
                <span className="text-xs font-bold tracking-wider">{currentTime}</span>
                <span className="text-xs text-gray-400 tracking-widest">{country}</span>
              </div>
            )}

            {portfolio && (
              <a
                href={`/p/${portfolio.slug}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-2 text-sm font-bold px-4 py-2 bg-black text-white hover:bg-white hover:text-black transition-all border border-white"
                style={{ borderRadius: isRounded ? "0.5rem" : "0px" }}
              >
                <ExternalLink className="w-4 h-4" /> Ir a Portafolio
              </a>
            )}

            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm font-bold text-red-600 border border-red-600 px-4 py-2 hover:bg-red-600 hover:text-white transition-all"
              style={{ borderRadius: isRounded ? "0.5rem" : "0px" }}
            >
              <LogOut className="w-4 h-4" /> Salir
            </button>
          </div>
        </div>
      </header>

      {portfolio ? (
        viewMode === "profile" ? (
          <div className="w-full max-w-[1400px] mx-auto px-2 sm:px-4 py-4 md:py-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
            <button
              onClick={() => setViewMode("dashboard")}
              className="mb-6 font-bold flex items-center gap-3 text-gray-400 hover:text-white transition-all w-fit text-[10px] uppercase tracking-[0.2em] group"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                ←
              </div>
              Volver al Panel
            </button>

            <div className={`relative overflow-hidden bg-[#050505] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] ${isRounded ? "rounded-[2.5rem]" : "rounded-none"}`}>
              {/* Premium Background Elements */}
              <div className="absolute top-0 left-0 w-full h-[300px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-purple-600/10 to-transparent"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-20 -right-24 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
              </div>

              <div className="relative p-6 sm:p-10 md:p-14 lg:p-16">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-end">
                  {/* Photo Profile */}
                  <div className="relative group shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-[6px] border-[#050505] bg-black relative z-10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                      {heroAvatarUrl ? (
                        <img src={heroAvatarUrl} className="w-full h-full object-cover" alt="Perfil" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                          <UserCircle className="w-24 h-24 text-zinc-700" />
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-[#050505] z-20 shadow-lg"></div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 text-center lg:text-left space-y-4">
                    <div className="space-y-1">

                      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none drop-shadow-sm">
                        {user.name}
                      </h2>
                      <p className="text-lg md:text-xl text-zinc-400 font-medium">
                        {profession || "Especialista en Portafolios"}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm">
                      <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span className="text-zinc-200 font-semibold">{user.email || email}</span>
                      </div>
                      {location && (
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                          <MapPin className="w-4 h-4 text-purple-400" />
                          <span className="text-zinc-200 font-semibold">{location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span className="text-zinc-200 font-semibold">{currentTime} Local</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden xl:flex flex-col gap-2 shrink-0">
                    <div className="p-4 text-center">
                      <p className="text-2xl font-black text-white">{inquiries.length}</p>
                    </div>
                    <div className="p-4 text-center transition-all hover:bg-white/10 cursor-pointer">
                      <Settings className="w-5 h-5 text-zinc-400 mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="mt-12 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                  {/* Left: Summary Cards (8 cols) */}
                  <div className="lg:col-span-8 space-y-12">
                    <section>
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black text-white flex items-center gap-3">
                          <FolderKanban className="w-6 h-6 text-blue-500" />
                          Resumen General
                        </h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-6"></div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[
                          { label: "Experiencias", count: experience.length, icon: Briefcase, color: "text-blue-400", bg: "from-blue-500/20 to-transparent", border: "border-blue-500/20" },
                          { label: "Proyectos", count: projects.length, icon: FolderKanban, color: "text-purple-400", bg: "from-purple-500/20 to-transparent", border: "border-purple-500/20" },
                          { label: "Educación", count: courses.length, icon: GraduationCap, color: "text-emerald-400", bg: "from-emerald-500/20 to-transparent", border: "border-emerald-500/20" },
                          { label: "Habilidades", count: skills.length, icon: Wrench, color: "text-amber-400", bg: "from-amber-500/20 to-transparent", border: "border-amber-500/20" },
                        ].map((stat, i) => (
                          <div key={i} className={`p-6 rounded-[2rem] bg-zinc-900/40 border ${stat.border} hover:bg-zinc-800/60 transition-all duration-500 group relative overflow-hidden`}>
                            <div className={`absolute -right-4 -bottom-4 w-20 h-20 bg-gradient-to-br ${stat.bg} opacity-20 blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
                            <div className={`p-3 rounded-2xl bg-white/5 w-fit ${stat.color} mb-4 relative z-10`}>
                              <stat.icon className="w-5 h-5" />
                            </div>
                            <p className="text-4xl font-black text-white mb-1 relative z-10">{stat.count}</p>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] relative z-10">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="from-blue-900/10 p-6 md:p-10 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="space-y-3 text-center md:text-left">
                          <div className="p-4 w-fit mx-auto md:mx-0 text-white">
                            <MessageSquareMore className="w-8 h-8" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-black text-white">Mensajería Directa</h4>
                            <p className="text-zinc-400 text-sm max-w-md mt-2">Tienes una bandeja de entrada interactiva para gestionar todas las consultas de tus clientes potenciales.</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-7xl font-black text-white drop-shadow-2xl">{inquiries.length}</span>
                          <span className="text-xs font-bold text-white tracking-[0.3em] mt-2">Consultas Totales</span>
                        </div>
                      </div>
                      {/* Decorative pattern */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                    </section>
                  </div>

                  {/* Right: Year Calendar (4 cols) */}
                  <div className="lg:col-span-4 space-y-8">
                    <YearCalendar isRounded={isRounded} primaryColor={primaryColor} />

                    {/* Secondary Info Card */}
                    <div className={`p-8 ${isRounded ? 'rounded-[2.5rem]' : 'rounded-none'} space-y-6`}>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-zinc-500 font-bold">Fecha actual</span>
                          <span className="text-zinc-200 font-bold">{new Date().toLocaleDateString('es-ES')}</span>
                        </div>
                        <div className="pt-4 border-t border-white/5">
                          <p className="text-[10px] text-zinc-500 leading-relaxed font-medium italic text-center">
                            "Tu portafolio es tu carta de presentación digital. Mantén tus datos actualizados para mejores resultados."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[98%] mx-auto px-2 md:px-4 py-4 animate-in fade-in duration-300">
            {/* TAB BAR */}
            <div className="flex gap-1 overflow-x-auto pb-1 mb-8 p-1.5">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2.5 font-bold text-sm whitespace-nowrap transition-all border ${activeTab === id
                    ? "bg-white text-black label-active"
                    : " text-gray-400 hover:bg-white hover:text-black hover:border-white"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                  {id === "consultas" && inquiries.length > 0 && (
                    <span className={`flex items-center justify-center min-w-[22px] h-[22px] px-1.5 ml-1 text-[11px] font-black rounded-full transition-all ${activeTab === id
                      ? "bg-black text-white"
                      : "bg-red-500 text-white border border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse"
                      }`}>
                      {inquiries.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-0">
                {/* ========== TAB: VISUAL ========== */}
                {activeTab === "visual" && (
                  <VisualForm
                    primaryColor={primaryColor} setPrimaryColor={setPrimaryColor}
                    secondaryColor={secondaryColor} setSecondaryColor={setSecondaryColor}
                    secondaryTextColor={secondaryTextColor} setSecondaryTextColor={setSecondaryTextColor}
                    fontFamily={fontFamily} setFontFamily={setFontFamily}
                    logoPosition={logoPosition} setLogoPosition={setLogoPosition}
                    slug={slug} portfolio={portfolio}
                    inp={inp} label={label} card={card}
                  />
                )}

                {/* ========== TAB: PERFIL ========== */}
                {activeTab === "perfil" && (
                  <PerfilForm
                    heroAvatarUrl={heroAvatarUrl}
                    fileInputRef={fileInputRef}
                    uploadingImage={uploadingImage}
                    handleImageUpload={handleImageUpload}
                    heroTitle={heroTitle} setHeroTitle={setHeroTitle}
                    heroSubtitle={heroSubtitle} setHeroSubtitle={setHeroSubtitle}
                    profession={profession} setProfession={setProfession}
                    location={location} setLocation={setLocation}
                    email={email} setEmail={setEmail}
                    inp={inp} label={label} card={card}
                  />
                )}

                {/* ========== TAB: EXPERIENCIA ========== */}
                {activeTab === "experiencia" && (
                  <ExperienciaForm
                    experience={experience} addExp={addExp} removeExp={removeExp} updateExp={updateExp}
                    inp={inp} label={label} card={card}
                  />
                )}

                {/* ========== TAB: PROYECTOS ========== */}
                {activeTab === "proyectos" && (
                  <ProyectosForm
                    projects={projects} addProject={addProject} removeProject={removeProject}
                    updateProject={updateProject} handleProjectImageUpload={handleProjectImageUpload}
                    inp={inp} label={label} card={card}
                  />
                )}

                {/* ========== TAB: CURSOS / EDUCACIÓN ========== */}
                {activeTab === "cursos" && (
                  <CursosForm
                    courses={courses} addCourse={addCourse} removeCourse={removeCourse} updateCourse={updateCourse}
                    inp={inp} label={label} card={card}
                  />
                )}

                {/* ========== TAB: SKILLS ========== */}
                {activeTab === "skills" && (
                  <SkillsForm
                    skills={skills} addSkill={addSkill} removeSkill={removeSkill} updateSkill={updateSkill}
                    inp={inp} label={label} card={card}
                  />
                )}

                {/* ========== TAB: REDES SOCIALES ========== */}
                {activeTab === "redes" && (
                  <RedesForm
                    socialLinks={socialLinks} setSocialLinks={setSocialLinks}
                    inp={inp} label={label} card={card}
                  />
                )}

                {/* ========== TAB: PASATIEMPOS ========== */}
                {activeTab === "pasatiempos" && (
                  <HobbiesForm
                    hobbies={hobbies} addHobby={addHobby} removeHobby={removeHobby}
                    updateHobby={updateHobby} fetchLinkPreview={fetchLinkPreview}
                    inp={inp} label={label} card={card}
                  />
                )}

                {/* ========== TAB: CONSULTAS ========== */}
                {activeTab === "consultas" && (
                  <div>
                    <div className={card}>
                      <WhatsAppInquiryInbox
                        title="Consultas recibidas"
                        subtitle="Ahora tus mensajes del formulario se ven como una bandeja de chat"
                        ownerLabel={user?.name?.trim() || "Mi portafolio"}
                        inquiries={inquiries}
                        loading={loadingInquiries}
                        emptyMessage="Aun no recibiste mensajes."
                        emptyHint="Cuando alguien te escriba desde tus plantillas, aparecerá aquí."
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT SIDEBAR: Preview + Save */}
              <div className="space-y-4">
                {/* Avatar preview */}
                <div className="bg-black p-6 text-center shadow-sm">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden bg-white/10 from-blue-500 to-purple-600 mb-4 flex items-center justify-center">
                    {heroAvatarUrl ? (
                      <img
                        src={heroAvatarUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle className="w-12 h-12 text-white opacity-70" />
                    )}
                  </div>
                  <p className="font-black text-gray-900 dark:text-white text-lg leading-tight">
                    {heroTitle || user.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {profession || "Tu profesión"}
                  </p>
                  {location && (
                    <p className="text-xs text-white/80 mt-1 flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {location}
                    </p>
                  )}
                  {email && (
                    <p className="text-xs text-white/80 mt-1 flex items-center justify-center gap-1">
                      <Mail className="w-3 h-3" />
                      {email}
                    </p>
                  )}
                </div>

                {/* Theme preview */}
                <div className="bg-black p-6 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-widest text-white/80 mb-4">
                    Vista Previa de Tema
                  </p>
                  <div
                    className="p-4 mb-3 flex items-center gap-3"
                    style={{ background: secondaryColor }}
                  >
                    <div
                      className="w-10 h-10 rounded-full border-2"
                      style={{
                        backgroundColor: primaryColor,
                        borderColor: primaryColor,
                      }}
                    ></div>
                    <div>
                      <p
                        className="text-sm font-bold"
                        style={{ color: primaryColor, fontFamily }}
                      >
                        Tu Nombre
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: secondaryTextColor, fontFamily }}
                      >
                        Tu profesión
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[primaryColor, secondaryColor, secondaryTextColor].map(
                      (c, i) => (
                        <div
                          key={i}
                          className="h-8 border border-gray-100 "
                          style={{ background: c }}
                          title={c}
                        />
                      ),
                    )}
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-2 font-mono">
                    {fontFamily}
                  </p>
                </div>


                {/* SAVE BUTTON */}
                <button
                  onClick={handleSaveAll}
                  disabled={saving || uploadingImage}
                  className="w-full py-2 border border-white text-white font-black transition-all hover:bg-white hover:text-black disabled:opacity-60 flex items-center justify-center gap-3 text-base"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" /> Guardar
                    </>
                  )}
                </button>


              </div>
            </div>
          </div>
        )
      ) : (

        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          <div className="bg-black p-12 max-w-md w-full text-center shadow-xl">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Laptop className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
              Portafolio pendiente
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              El administrador aun no ha asignado una plantilla para tu portafolio
            </p>
          </div>
        </div>
      )}

      {/* FLOATING CONFIG TOGGLE */}
      <div className="fixed bottom-6 right-6 z-[100] group">
        <button
          onClick={() => {
            const next = !isRounded;
            setIsRounded(next);
            localStorage.setItem("client-rounded", String(next));
          }}
          className={`flex items-center justify-center border border-white text-white p-4 transition-all bg-black hover:bg-white hover:text-black ${isRounded ? "rounded-full" : "rounded-none"}`}
          title="Cambiar Diseño"
        >
          <Settings className="w-6 h-6 animate-[spin_4s_linear_infinite]" />
        </button>
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold px-3 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none border border-white/20">
          Diseño {isRounded ? "Redondeado" : "Cuadrado"}
        </span>
      </div>
    </div>
  );
}
