"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import WhatsAppInquiryInbox from "@/components/dashboard/WhatsAppInquiryInbox";
import {
  Plus, Users, LayoutTemplate, LogOut, Settings2, ExternalLink,
  Moon, Sun, Eye, X, Mail, MapPin, Briefcase, Layers, Palette,
  Link as LinkIcon, BookOpen, GraduationCap, Wrench, Globe,
  TrendingUp, Activity, Shield, ChevronRight, Zap, Search,
  BarChart2, Clock, UserCheck, AlertCircle, Terminal, Pencil,
  MessageSquareMore, Menu, PanelLeftClose, PanelLeftOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TEMPLATE_NAMES: Record<number, string> = {
  1: "Minimal",
  2: "Cyber",
  3: "Corporate",
  4: "Glass",
};

const TEMPLATE_COLORS: Record<number, string> = {
  1: "from-black/20 to-white/50",
  2: "from-white/10 to-black/10",
  3: "from-white/10 to-white/10",
  4: "from-black to-black/10",
};

type Client = { id: number; name: string; email: string; role: string; createdAt?: string; isActive?: boolean };
type Experience = { company?: string; role?: string; period?: string; description?: string };
type Project = { name?: string; description?: string; link?: string; tools?: string | string[]; imageUrl?: string };
type Course = { name?: string; institution?: string; year?: string; description?: string };
type Skill = { name?: string; level?: number };
type Portfolio = {
  id: number;
  userId: number;
  templateId: number;
  slug: string;
  primaryColor?: string;
  secondaryColor?: string;
  secondaryTextColor?: string;
  fontFamily?: string;
  logoUrl?: string;
  logoPosition?: string;
  profession?: string;
  location?: string;
  email?: string;
  socialLinks?: Record<string, string>;
  courses?: Course[];
  projects?: Project[];
  experience?: Experience[];
  skills?: Skill[];
};
type Inquiry = {
  id: number;
  portfolioId: number;
  senderName: string;
  projectName?: string | null;
  projectDescription: string;
  phone?: string | null;
  createdAt?: string;
  portfolio?: { id: number; userId: number; slug: string };
};
type ClientForm = { name: string; email: string; password: string };
type EditClientPayload = { name: string; email: string; password?: string };
type ClientField = {
  label: string;
  type: string;
  key: keyof ClientForm;
  placeholder: string;
};

const getErrorMessage = (error: unknown, fallback: string) =>
  axios.isAxiosError<{ message?: string }>(error)
    ? error.response?.data?.message || fallback
    : fallback;

const CLIENT_FIELDS: ClientField[] = [
  { label: "Nombre Completo", type: "text", key: "name", placeholder: "Carlos Pérez" },
  { label: "Correo Electrónico", type: "email", key: "email", placeholder: "carlos@empresa.com" },
  { label: "Contraseña", type: "password", key: "password", placeholder: "••••••••" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout, checkAuth, isLoading } = useAuthStore();
  const [clients, setClients] = useState<Client[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState<ClientForm>({ name: "", email: "", password: "" });
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [detailsTab, setDetailsTab] = useState("overview");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editClient, setEditClient] = useState({ id: 0, name: "", email: "", password: "" });
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState("Dashboard");

  // NUEVO ESTADO PARA EL SIDEBAR
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("admin-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved === "dark" || (!saved && prefersDark);
    setIsDarkMode(dark);
    document.documentElement.classList.toggle("dark", dark);

    // Auto-cerrar sidebar en pantallas pequeñas al inicio
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("admin-theme", next ? "dark" : "light");
      return next;
    });
  };

  useEffect(() => { checkAuth(); }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== "ADMIN") router.push("/login");
      else { fetchClients(); fetchPortfolios(); fetchInquiries(); }
    }
  }, [user, isLoading]);

  const fetchClients = async () => {
    try { const res = await api.get("/users"); setClients(res.data); }
    catch { toast.error("Error cargando clientes"); }
  };

  const fetchPortfolios = async () => {
    try { const res = await api.get("/portfolios"); setPortfolios(res.data); }
    catch { console.error("Error loading portfolios"); }
  };

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await api.get("/portfolios/inquiries");
      setInquiries(res.data || []);
    } catch {
      toast.error("Error cargando consultas");
    } finally {
      setLoadingInquiries(false);
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users", newClient);
      toast.success("Cliente creado exitosamente");
      setShowCreateModal(false);
      setNewClient({ name: "", email: "", password: "" });
      fetchClients();
    } catch (error: unknown) { toast.error(getErrorMessage(error, "Error al crear")); }
  };

  const handleAssignTemplate = async (clientId: number, templateId: number) => {
    try {
      const slug = `portfolio-${clientId}-${Date.now().toString().slice(-4)}`;
      await api.post("/portfolios", { userId: clientId, templateId, slug });
      toast.success(`Template "${TEMPLATE_NAMES[templateId]}" asignado`);
      fetchPortfolios();
    } catch (error: unknown) { toast.error(getErrorMessage(error, "Error asignando")); }
  };

  const handleChangeTemplate = async (portfolioId: number, templateId: number) => {
    try {
      await api.put(`/portfolios/${portfolioId}`, { templateId });
      toast.success(`Cambiado a template "${TEMPLATE_NAMES[templateId]}"`);
      setActiveDropdown(null);
      fetchPortfolios();
    } catch (error: unknown) { toast.error(getErrorMessage(error, "Error")); }
  };

  const openDetails = (client: Client, portfolio: Portfolio) => {
    setSelectedClient(client);
    setSelectedPortfolio(portfolio);
    setDetailsTab("overview");
    setShowDetailsModal(true);
  };

  const openEditModal = (client: Client) => {
    setEditClient({ id: client.id, name: client.name, email: client.email, password: "" });
    setShowEditModal(true);
  };

  const handleEditClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editClient.name.trim() || !editClient.email.trim()) {
      toast.error("Nombre y correo son requeridos");
      return;
    }
    try {
      const payload: EditClientPayload = { name: editClient.name, email: editClient.email };
      if (editClient.password) payload.password = editClient.password;
      await api.put(`/users/${editClient.id}`, payload);
      toast.success("Cliente actualizado correctamente");
      setShowEditModal(false);
      fetchClients();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Error al actualizar"));
    }
  };

  const handleToggleClientStatus = async (client: Client) => {
    try {
      const payload = { isActive: client.isActive === false ? true : false };
      await api.put(`/users/${client.id}`, payload);
      toast.success(`Cliente ${client.isActive === false ? "activado" : "inactivado"} correctamente`);
      fetchClients();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Error al cambiar estado"));
    }
  };

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePortfolios = portfolios.length;
  const clientsWithPortfolio = clients.filter(c => portfolios.some(p => p.userId === c.id)).length;
  const clientsWithoutPortfolio = clients.length - clientsWithPortfolio;
  const selectedClientInquiries = selectedPortfolio
    ? inquiries.filter((inquiry) =>
      inquiry.portfolioId === selectedPortfolio.id ||
      inquiry.portfolio?.id === selectedPortfolio.id,
    )
    : [];

  if (isLoading || !user) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm uppercase tracking-widest font-medium">Cargando...</p>
      </div>
    </div>
  );

  const inp = "w-full bg-black border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm font-medium placeholder-gray-400";

  return (
    <div className="min-h-screen bg-black font-sans transition-colors duration-300 overflow-x-hidden">

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed left-0 top-0 h-full bg-black border-r border-gray-200/70 dark:border-gray-800 flex flex-col z-50 shadow-xl transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-64 translate-x-0" : "w-0 md:w-20 -translate-x-full md:translate-x-0"}`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between px-4 py-6 border-b border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className={`flex items-center gap-2 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "md:opacity-0 w-0"}`}>
            <div className="w-5 h-5 bg-white/15 rounded-sm flex items-center justify-center shrink-0">
              <Terminal className="w-3 h-3 text-white" />
            </div>
            <span className="text-[11px] font-black tracking-[0.3em] uppercase whitespace-nowrap">
              <span className="text-white">Dio</span>
              <span className="text-blue-500">play</span>
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
          {[
            { icon: BarChart2, label: "Dashboard" },
            { icon: Users, label: "Clientes" },
            { icon: LayoutTemplate, label: "Plantillas" },
          ].map(({ icon: Icon, label }) => {
            const active = activeMainTab === label;
            return (
              <div
                key={label}
                onClick={() => setActiveMainTab(label)}
                title={!isSidebarOpen ? label : ""}
                className={`flex items-center gap-3 px-3 py-3 cursor-pointer transition-all group relative ${active ? "bg-white text-black" : "text-gray-500 dark:text-gray-400 hover:bg-white hover:text-black"}`}>
                <Icon className="w-5 h-5 shrink-0" />
                <span className={`text-sm font-bold transition-all duration-300 whitespace-nowrap ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}>
                  {label}
                </span>
                {!isSidebarOpen && active && (
                  <div className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full" />
                )}
              </div>
            );
          })}
        </nav>

        {/* User info */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 transition-all border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          >
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Cerrar sesión</span>
          </button>
        </div>
        <div className="p-3 border-t border-gray-100 dark:border-gray-800 overflow-hidden">

          <div className="flex items-center gap-3 p-3 bg-black/50">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black font-black text-sm shrink-0">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className={`transition-all duration-300 min-w-0 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}>
              <p className="text-sm font-black text-gray-900 dark:text-white truncate">{user.name}</p>
              <p className="text-[10px] text-gray-400 font-medium tracking-wider">Administrador</p>
            </div>
          </div>

        </div>
      </aside>

      {/* Overlay para móvil cuando el sidebar está abierto */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ===== MAIN AREA ===== */}
      <div
        className={`min-h-screen flex flex-col transition-all duration-300 
          ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}`}
      >

        {/* TOP BAR */}
        <header className="sticky top-0 z-30 bg-black backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Botón para abrir sidebar en móvil (solo visible si está cerrado) */}
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 mr-2 text-white bg-white/10 rounded-md md:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {activeMainTab === "Clientes" && (
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar cliente..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-black border border-transparent focus:border-violet-500 text-sm text-gray-900 dark:text-white outline-none transition-all placeholder-gray-400 font-medium"
                />
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 xl:p-8 space-y-6">

          {/* PAGE TITLE */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                {activeMainTab === "Dashboard" && "Dashboard de Análisis"}
                {activeMainTab === "Clientes" && "Gestión de Clientes"}
                {activeMainTab === "Plantillas" && "Distribución de Plantillas"}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">
                {activeMainTab === "Dashboard" && "Métricas generales del sistema"}
                {activeMainTab === "Clientes" && "Registro y directorio de clientes"}
                {activeMainTab === "Plantillas" && "Listado y uso de plantillas"}
              </p>
            </div>
            {activeMainTab === "Clientes" && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 border border-white text-white font-bold px-5 py-3 transition-all text-sm hover:bg-white hover:text-black"
              >
                <Plus className="w-5 h-5" /> Nuevo Cliente
              </button>
            )}
          </div>

          {/* KPI STATS */}
          {activeMainTab === "Dashboard" && (
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              {[
                { label: "Total Clientes", value: clients.length, icon: Users, color: "text-violet-600", bg: "bg-white/20", border: "border-white dark:border-white" },
                { label: "Portfolios Activos", value: activePortfolios, icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-white" },
                { label: "Con Portfolio", value: clientsWithPortfolio, icon: UserCheck, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-white" },
                { label: "Sin Asignar", value: clientsWithoutPortfolio, icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-white" },
              ].map(({ label, value, icon: Icon, color, bg, border }) => (
                <div key={label} className={`bg-black border ${border} p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow`}>
                  <div className={`w-12 h-12 ${bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 leading-tight">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CLIENTS TABLE / LIST */}
          {activeMainTab === "Clientes" && (
            <div className="bg-black border border-gray-200/70 dark:border-gray-800 shadow-sm overflow-visible">
              <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <h2 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-violet-500" /> Directorio de Clientes
                </h2>
                <span className="text-xs font-bold bg-black text-gray-500 dark:text-gray-400 px-3 py-1 rounded-lg">
                  {filteredClients.length} registros
                </span>
              </div>

              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 px-6 py-3 text-xs font-black uppercase tracking-widest text-gray-400">
                <div className="col-span-4">Cliente</div>
                <div className="col-span-3">Estado Portfolio</div>
                <div className="col-span-2">Plantilla</div>
                <div className="col-span-3 text-right">Acciones</div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <AnimatePresence>
                  {filteredClients.map((client) => {
                    const clientPortfolios = portfolios.filter(p => p.userId === client.id);
                    const hasPortfolio = clientPortfolios.length > 0;
                    const pf = hasPortfolio ? clientPortfolios[0] : null;

                    return (
                      <motion.div
                        key={client.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="px-6 py-4 hover:bg-white/10 transition-colors"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                          {/* Client Info */}
                          <div className="md:col-span-4 flex items-center gap-3">
                            <div className="w-10 h-10 overflow-hidden bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                              {pf?.logoUrl
                                ? <img src={pf.logoUrl} alt="" className="w-full h-full object-cover" />
                                : <span className="text-white font-black text-sm">{client.name.charAt(0)}</span>}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-gray-900 dark:text-white text-sm truncate flex items-center gap-2">
                                {client.name}
                                {client.isActive === false && (
                                  <span className="bg-red-500/20 text-red-500 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-black">
                                    Inactivo
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <Mail className="w-3 h-3" /> {client.email}
                              </p>
                            </div>
                          </div>

                          {/* Portfolio status */}
                          <div className="md:col-span-3">
                            {hasPortfolio && pf ? (
                              <div className="flex flex-col gap-1">
                                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Activo
                                </span>
                                <span className="text-xs text-gray-400 font-mono truncate">/p/{pf.slug}</span>
                              </div>
                            ) : (
                              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                                <AlertCircle className="w-3.5 h-3.5" /> Sin asignar
                              </span>
                            )}
                          </div>

                          {/* Template */}
                          <div className="md:col-span-2">
                            {hasPortfolio && pf ? (
                              <span className={`text-xs font-black px-3 py-1 rounded-lg bg-gradient-to-r ${TEMPLATE_COLORS[pf.templateId] || "from-gray-400 to-gray-600"} text-white`}>
                                {TEMPLATE_NAMES[pf.templateId] || `T${pf.templateId}`}
                              </span>
                            ) : (
                              <div className="flex gap-1.5 flex-wrap">
                                {[1, 2, 3, 4].map(num => (
                                  <button key={num} onClick={() => handleAssignTemplate(client.id, num)}
                                    className="text-[10px] font-black px-2.5 py-1 rounded-lg border border-white text-white hover:bg-white hover:text-black transition-colors">
                                    T{num}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="md:col-span-3 flex items-center justify-end gap-2 text-right">
                            <button
                              onClick={() => handleToggleClientStatus(client)}
                              title={client.isActive === false ? "Activar cliente" : "Inactivar cliente"}
                              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 border transition-all ${client.isActive === false
                                ? "border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white"
                                : "border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                                }`}
                            >
                              {client.isActive === false ? (
                                <><Shield className="w-3.5 h-3.5" /></>
                              ) : (
                                <><Shield className="w-3.5 h-3.5" /></>
                              )}
                            </button>

                            <button
                              onClick={() => openEditModal(client)}
                              title="Editar nombre y correo"
                              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 border border-white text-white hover:bg-white hover:text-black transition-all"
                            >
                              <Pencil className="w-3.5 h-3.5" /> Editar
                            </button>

                            {hasPortfolio && pf && (
                              <>
                                <button
                                  onClick={() => openDetails(client, pf)}
                                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 border border-white text-white hover:bg-white hover:text-black transition-all"
                                >
                                  <Eye className="w-3.5 h-3.5" /> Ver
                                </button>

                                <div className="relative">
                                  <button
                                    onClick={() => setActiveDropdown(activeDropdown === pf.id ? null : pf.id)}
                                    className="p-2 text-white bg-transparent border border-white transition-all hover:bg-white hover:text-black"
                                  >
                                    <Settings2 className="w-4 h-4" />
                                  </button>

                                  {activeDropdown === pf.id && (
                                    <div className="absolute right-0 bottom-full mb-2 w-52 bg-black border border-white shadow-2xl z-50 overflow-hidden">
                                      <div className="px-4 py-3 bg-black border-b border-white">
                                        <p className="text-xs font-black tracking-widest text-gray-400">
                                          Cambiar Plantilla
                                        </p>
                                      </div>

                                      <div className="p-2 space-y-1">
                                        {[1, 2, 3, 4].map(num => (
                                          <button
                                            key={num}
                                            onClick={() => handleChangeTemplate(pf.id, num)}
                                            className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-all flex items-center justify-between ${pf.templateId === num
                                              ? "bg-white text-black"
                                              : "text-white border border-white hover:bg-white hover:text-black"
                                              }`}
                                          >
                                            <span>{TEMPLATE_NAMES[num]}</span>
                                            {pf.templateId === num && <Zap className="w-4 h-4" />}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <a
                                  href={`/p/${pf.slug}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-2 border border-white text-white transition-all hover:bg-white hover:text-black"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {filteredClients.length === 0 && (
                  <div className="flex flex-col items-center py-20 gap-4">
                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                    </div>
                    <p className="text-gray-400 font-bold">{searchQuery ? "Sin resultados para tu búsqueda" : "Aún no hay clientes"}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TEMPLATE DISTRIBUTION */}
          {activeMainTab === "Plantillas" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(num => {
                const count = portfolios.filter(p => p.templateId === num).length;
                return (
                  <div key={num} className={`bg-gradient-to-br ${TEMPLATE_COLORS[num]} p-5 text-white shadow-lg`}>
                    <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Template</p>
                    <p className="text-2xl font-black">{TEMPLATE_NAMES[num]}</p>
                    <p className="text-4xl font-black mt-2">{count}</p>
                    <p className="text-xs opacity-70 font-bold mt-1">{count === 1 ? "uso" : "usos"}</p>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* ===== CREATE CLIENT MODAL ===== */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-[100]">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-black p-8 max-w-md w-full shadow-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">Nuevo Cliente</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Crea acceso para un nuevo usuario</p>
                </div>
                <button onClick={() => setShowCreateModal(false)} className="p-2 text-gray-500 hover:bg-red-100 hover:text-red-500 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateClient} className="space-y-4">
                {CLIENT_FIELDS.map(({ label, type, key, placeholder }) => (
                  <div key={key}>
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1.5 block">{label}</label>
                    <input required type={type} value={newClient[key]} onChange={e => setNewClient({ ...newClient, [key]: e.target.value })}
                      placeholder={placeholder} className={inp} />
                  </div>
                ))}
                <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-5 py-2.5 font-bold transition-all text-sm border border-white text-white hover:bg-white hover:text-black"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 font-bold transition-all text-sm flex items-center gap-2 border border-white text-white hover:bg-white hover:text-black"
                  >
                    <Plus className="w-4 h-4" /> Registrar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== FULL DETAILS MODAL ===== */}
      <AnimatePresence>
        {showDetailsModal && selectedPortfolio && selectedClient && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-[100]">
            <motion.div initial={{ scale: 0.96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 20 }}
              className="bg-black rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">

              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between sticky top-0 bg-black backdrop-blur-md z-10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 overflow-hidden bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shrink-0">
                    {selectedPortfolio.logoUrl
                      ? <img src={selectedPortfolio.logoUrl} alt="" className="w-full h-full object-cover" />
                      : <span className="text-white font-black text-2xl">{selectedClient.name.charAt(0)}</span>}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">{selectedClient.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      {selectedPortfolio.profession && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5" /> {selectedPortfolio.profession}
                        </span>
                      )}
                      {selectedPortfolio.location && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {selectedPortfolio.location}
                        </span>
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" /> {selectedPortfolio.email || selectedClient.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`/p/${selectedPortfolio.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 border border-white text-white transition-all hover:bg-white hover:text-black"
                  >
                    <ExternalLink className="w-4 h-4" /> Ver Portfolio
                  </a>
                  <button onClick={() => setShowDetailsModal(false)} className="p-2.5 bg-black text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors ml-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-black overflow-x-auto">
                {[
                  { id: "overview", label: "General", icon: BarChart2 },
                  { id: "experience", label: "Experiencia", icon: Briefcase },
                  { id: "projects", label: "Proyectos", icon: Layers },
                  { id: "courses", label: "Educación", icon: GraduationCap },
                  { id: "skills", label: "Skills", icon: Wrench },
                  { id: "inquiries", label: "Consultas", icon: MessageSquareMore },
                  { id: "social", label: "Redes", icon: Globe },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setDetailsTab(id)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-black whitespace-nowrap transition-all border ${detailsTab === id
                      ? "border-white bg-white text-black"
                      : "border-white text-white hover:bg-white hover:text-black"
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </button>
                ))}
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50/30 dark:bg-gray-950/30">

                {/* OVERVIEW TAB */}
                {detailsTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-black border border-gray-100 dark:border-gray-800 p-5">
                        <p className="text-xs text-gray-400 font-bold mb-2">Plantilla</p>
                        <span className={`text-sm font-black px-3 py-1 rounded-lg bg-gradient-to-r ${TEMPLATE_COLORS[selectedPortfolio.templateId] || "from-gray-400 to-gray-600"} text-white`}>
                          {TEMPLATE_NAMES[selectedPortfolio.templateId] || `T${selectedPortfolio.templateId}`}
                        </span>
                      </div>
                      <div className="bg-black border border-gray-100 dark:border-gray-800 p-5">
                        <p className="text-xs text-gray-400 font-bold mb-2">Tipografía</p>
                        <p className="font-black text-gray-900 dark:text-white text-sm">{selectedPortfolio.fontFamily || "Inter"}</p>
                      </div>
                      <div className="bg-black border border-gray-100 dark:border-gray-800 p-5">
                        <p className="text-xs text-gray-400 font-bold mb-2">Logo Posición</p>
                        <p className="font-black text-gray-900 dark:text-white text-sm capitalize">{selectedPortfolio.logoPosition || "center"}</p>
                      </div>
                      <div className="bg-black border border-gray-100 dark:border-gray-800 p-5">
                        <p className="text-xs text-gray-400 font-bold mb-2">Colores</p>
                        <div className="flex items-center gap-2">
                          {[selectedPortfolio.primaryColor, selectedPortfolio.secondaryColor, selectedPortfolio.secondaryTextColor].filter(Boolean).map((c, i) => (
                            <div key={i} className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-700" style={{ backgroundColor: c as string }} title={c as string} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Experiencias", count: selectedPortfolio.experience?.length || 0, icon: Briefcase, color: "text-blue-500" },
                        { label: "Proyectos", count: selectedPortfolio.projects?.length || 0, icon: Layers, color: "text-purple-500" },
                        { label: "Cursos", count: selectedPortfolio.courses?.length || 0, icon: GraduationCap, color: "text-emerald-500" },
                        { label: "Habilidades", count: selectedPortfolio.skills?.length || 0, icon: Wrench, color: "text-amber-500" },
                      ].map(({ label, count, icon: Icon, color }) => (
                        <div key={label} className="bg-black border border-gray-100 dark:border-gray-800 p-5 text-center">
                          <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
                          <p className="text-3xl font-black text-gray-900 dark:text-white">{count}</p>
                          <p className="text-xs font-bold text-gray-400 mt-1">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* EXPERIENCE TAB */}
                {detailsTab === "experience" && (
                  <div className="space-y-4">
                    {(selectedPortfolio.experience?.length ?? 0) > 0 ? selectedPortfolio.experience?.map((exp, i) => (
                      <div key={i} className="bg-black border border-gray-100 dark:border-gray-800 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-black text-gray-900 dark:text-white text-lg">{exp.role}</h4>
                            <p className="text-violet-600 dark:text-violet-400 font-bold text-sm">{exp.company}</p>
                          </div>
                          <span className="text-xs font-bold bg-gray-100 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-lg flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {exp.period}
                          </span>
                        </div>
                        {exp.description && <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{exp.description}</p>}
                      </div>
                    )) : <div className="text-center py-16 text-gray-400"><Briefcase className="w-12 h-12 mx-auto mb-4 opacity-30" /><p className="font-bold">Sin experiencia registrada</p></div>}
                  </div>
                )}

                {/* PROJECTS TAB */}
                {detailsTab === "projects" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(selectedPortfolio.projects?.length ?? 0) > 0 ? selectedPortfolio.projects?.map((proj, i) => (
                      <div key={i} className="bg-black border border-gray-100 dark:border-gray-800 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-black text-gray-900 dark:text-white">{proj.name}</h4>
                          {proj.link && (
                            <a href={proj.link} target="_blank" rel="noreferrer" className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        {proj.imageUrl && (
                          <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3 border border-gray-200 dark:border-gray-700">
                            <img src={proj.imageUrl} alt={proj.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        {proj.description && <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">{proj.description}</p>}
                        {proj.tools && (
                          <div className="flex flex-wrap gap-1">
                            {(typeof proj.tools === "string" ? proj.tools.split(",") : proj.tools).map((t: string, j: number) => (
                              <span key={j} className="text-[10px] font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-md">{t.trim()}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    )) : <div className="col-span-2 text-center py-16 text-gray-400"><Layers className="w-12 h-12 mx-auto mb-4 opacity-30" /><p className="font-bold">Sin proyectos</p></div>}
                  </div>
                )}

                {/* COURSES TAB */}
                {detailsTab === "courses" && (
                  <div className="space-y-4">
                    {(selectedPortfolio.courses?.length ?? 0) > 0 ? selectedPortfolio.courses?.map((course, i) => (
                      <div key={i} className="bg-black border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                          <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900 dark:text-white">{course.name}</h4>
                          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">{course.institution} • {course.year}</p>
                          {course.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{course.description}</p>}
                        </div>
                      </div>
                    )) : <div className="text-center py-16 text-gray-400"><GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-30" /><p className="font-bold">Sin cursos</p></div>}
                  </div>
                )}

                {/* SKILLS TAB */}
                {detailsTab === "skills" && (
                  <div className="space-y-3">
                    {(selectedPortfolio.skills?.length ?? 0) > 0 ? selectedPortfolio.skills?.map((skill, i) => (
                      <div key={i} className="bg-black border border-gray-100 dark:border-gray-800 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-black text-gray-900 dark:text-white text-sm">{skill.name || "Skill"}</span>
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{skill.level ?? 80}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: `${skill.level ?? 80}%` }} />
                        </div>
                      </div>
                    )) : <div className="text-center py-16 text-gray-400"><Wrench className="w-12 h-12 mx-auto mb-4 opacity-30" /><p className="font-bold">Sin habilidades</p></div>}
                  </div>
                )}

                {/* INQUIRIES TAB */}
                {detailsTab === "inquiries" && (
                  <div className="space-y-4">
                    <WhatsAppInquiryInbox
                      title="Consultas del cliente"
                      subtitle="La bandeja de mensajes ahora replica una conversación de WhatsApp para revisar cada contacto de forma más real y clara."
                      ownerLabel={user?.name?.trim() || "Admin"}
                      inquiries={selectedClientInquiries}
                      loading={loadingInquiries}
                      emptyMessage="Este cliente aun no tiene consultas."
                      emptyHint="Cuando alguien escriba desde su portafolio, la conversación aparecerá aquí."
                    />
                  </div>
                )}

                {/* SOCIAL TAB */}
                {detailsTab === "social" && (
                  <div className="p-6">
                    {selectedPortfolio.socialLinks && Object.keys(selectedPortfolio.socialLinks).length > 0 ? (
                      <div className="space-y-3">
                        {Object.entries(selectedPortfolio.socialLinks).filter(([, v]) => v).map(([key, val]) => (
                          <a key={key} href={val as string} target="_blank" rel="noreferrer"
                            className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-800">
                            <span className="capitalize font-black text-gray-700 dark:text-gray-200">{key}</span>
                            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium truncate max-w-[250px] flex items-center gap-1">
                              {val as string} <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                            </span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-gray-400">
                        <Globe className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="font-bold text-sm">Sin redes configuradas</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close dropdown on outside click */}
      {activeDropdown !== null && (
        <div className="fixed inset-0 z-[39]" onClick={() => setActiveDropdown(null)} />
      )}

      {/* ===== EDIT CLIENT MODAL ===== */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-[100]">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-black p-8 max-w-md w-full shadow-2xl border border-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-white flex items-center gap-2">
                    <Pencil className="w-5 h-5 text-violet-400" /> Editar Cliente
                  </h3>
                  <p className="text-sm text-gray-400 mt-0.5">Modifica el nombre y correo del cliente</p>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 text-gray-500 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditClient} className="space-y-5">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5 block">
                    Nombre Completo
                  </label>
                  <input
                    required
                    type="text"
                    value={editClient.name}
                    onChange={e => setEditClient({ ...editClient, name: e.target.value })}
                    placeholder="Nombre del cliente"
                    className={inp}
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5 block">
                    Correo Electrónico
                  </label>
                  <input
                    required
                    type="email"
                    value={editClient.email}
                    onChange={e => setEditClient({ ...editClient, email: e.target.value })}
                    placeholder="correo@ejemplo.com"
                    className={inp}
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5 block">
                    Nueva Contraseña (Opcional)
                  </label>
                  <input
                    type="password"
                    value={editClient.password || ""}
                    onChange={e => setEditClient({ ...editClient, password: e.target.value })}
                    placeholder="••••••••"
                    className={inp}
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-5 py-2.5 font-bold text-sm border border-white text-white hover:bg-white hover:text-black transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 font-bold text-sm flex items-center gap-2 border border-white text-white hover:bg-white hover:text-black transition-all"
                  >
                    <Pencil className="w-4 h-4" /> Guardar Cambios
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}