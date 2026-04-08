"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CheckCheck,
  MessageSquareMore,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Smile,
  Video,
} from "lucide-react";

export type WhatsAppInquiry = {
  id: number;
  senderName: string;
  projectName?: string | null;
  projectDescription: string;
  phone?: string | null;
  createdAt?: string | null;
};

type WhatsAppInquiryInboxProps = {
  title: string;
  subtitle: string;
  ownerLabel: string;
  inquiries: WhatsAppInquiry[];
  loading?: boolean;
  emptyMessage: string;
  emptyHint: string;
};

type SidebarMode = "chats" | "portfolio";

const wallpaperStyle = {
  backgroundColor: "#efeae2",
  backgroundImage: `
    radial-gradient(circle at 24px 24px, rgba(0, 168, 132, 0.08) 1.5px, transparent 0),
    radial-gradient(circle at 88px 60px, rgba(17, 27, 33, 0.05) 1.5px, transparent 0),
    linear-gradient(135deg, rgba(255,255,255,0.56), rgba(239,234,226,0.9))
  `,
  backgroundSize: "120px 120px, 150px 150px, 100% 100%",
};

const isValidDate = (value?: string | null) => {
  if (!value) return false;
  return !Number.isNaN(new Date(value).getTime());
};

const formatSidebarDate = (value?: string | null) => {
  if (!isValidDate(value)) return "";

  const date = new Date(value as string);
  const today = new Date();
  const sameDay = date.toDateString() === today.toDateString();

  return new Intl.DateTimeFormat(
    "es-BO",
    sameDay
      ? { hour: "2-digit", minute: "2-digit" }
      : { day: "2-digit", month: "2-digit", year: "2-digit" },
  ).format(date);
};

const formatBubbleTime = (value?: string | null) => {
  if (!isValidDate(value)) return "Ahora";

  return new Intl.DateTimeFormat("es-BO", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value as string));
};

const formatDayLabel = (value?: string | null) => {
  if (!isValidDate(value)) return "Hoy";

  const date = new Date(value as string);
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const diff = Math.round(
    (startOfToday.getTime() - startOfDate.getTime()) / 86400000,
  );

  if (diff === 0) return "Hoy";
  if (diff === 1) return "Ayer";

  return new Intl.DateTimeFormat("es-BO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const getInitials = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "WA";

const getSnippet = (value: string) => value.replace(/\s+/g, " ").trim();

const getContactLine = (inquiry: WhatsAppInquiry) => {
  if (inquiry.phone) return inquiry.phone;
  if (inquiry.projectName) return inquiry.projectName;
  return "Consulta del portafolio";
};

const getProjectLabel = (inquiry: WhatsAppInquiry) =>
  inquiry.projectName?.trim() || "Consultas generales";

const getSortValue = (value?: string | null, fallback = 0) => {
  if (!isValidDate(value)) return fallback;
  return new Date(value as string).getTime();
};

export default function WhatsAppInquiryInbox({
  title,
  subtitle,
  ownerLabel,
  inquiries,
  loading = false,
  emptyMessage,
  emptyHint,
}: WhatsAppInquiryInboxProps) {
  const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(
    inquiries[0]?.id ?? null,
  );
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("chats");
  const [selectedPortfolioName, setSelectedPortfolioName] = useState<
    string | null
  >(null);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredInquiries = inquiries.filter((inquiry) => {
    if (!normalizedSearch) return true;

    return [
      inquiry.senderName,
      inquiry.projectName || "",
      inquiry.projectDescription,
      inquiry.phone || "",
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch);
  });

  const portfolioGroupMap = new Map<
    string,
    {
      name: string;
      count: number;
      lastInquiry: WhatsAppInquiry;
      contacts: Set<string>;
      searchIndex: string;
    }
  >();

  for (const inquiry of inquiries) {
    const groupName = getProjectLabel(inquiry);
    const existing = portfolioGroupMap.get(groupName);

    if (!existing) {
      portfolioGroupMap.set(groupName, {
        name: groupName,
        count: 1,
        lastInquiry: inquiry,
        contacts: new Set([`${inquiry.senderName}-${inquiry.phone || ""}`]),
        searchIndex: [
          groupName,
          inquiry.senderName,
          inquiry.phone || "",
          inquiry.projectDescription,
        ]
          .join(" ")
          .toLowerCase(),
      });
      continue;
    }

    existing.count += 1;
    existing.contacts.add(`${inquiry.senderName}-${inquiry.phone || ""}`);
    existing.searchIndex += ` ${[
      inquiry.senderName,
      inquiry.phone || "",
      inquiry.projectDescription,
    ]
      .join(" ")
      .toLowerCase()}`;

    if (
      getSortValue(inquiry.createdAt, inquiry.id) >
      getSortValue(existing.lastInquiry.createdAt, existing.lastInquiry.id)
    ) {
      existing.lastInquiry = inquiry;
    }
  }

  const portfolioGroups = Array.from(portfolioGroupMap.values())
    .map((group) => ({
      name: group.name,
      count: group.count,
      contacts: group.contacts.size,
      lastInquiry: group.lastInquiry,
      searchIndex: group.searchIndex,
    }))
    .sort(
      (a, b) =>
        getSortValue(b.lastInquiry.createdAt, b.lastInquiry.id) -
        getSortValue(a.lastInquiry.createdAt, a.lastInquiry.id),
    );

  const filteredPortfolioGroups = portfolioGroups.filter((group) => {
    if (!normalizedSearch) return true;
    return group.searchIndex.includes(normalizedSearch);
  });

  const activePortfolioGroup =
    filteredPortfolioGroups.find(
      (group) => group.name === selectedPortfolioName,
    ) ||
    filteredPortfolioGroups[0] ||
    null;

  const inquiriesForCurrentView =
    sidebarMode === "portfolio"
      ? activePortfolioGroup
        ? inquiries.filter(
          (inquiry) => getProjectLabel(inquiry) === activePortfolioGroup.name,
        )
        : []
      : filteredInquiries;

  const activeInquiry =
    inquiriesForCurrentView.find(
      (inquiry) => inquiry.id === selectedInquiryId,
    ) ||
    inquiriesForCurrentView[0] ||
    null;
  const currentMobileView =
    mobileView === "chat" && (loading || activeInquiry) ? "chat" : "list";

  const handleSelectInquiry = (inquiryId: number) => {
    setSelectedInquiryId(inquiryId);
    setMobileView("chat");
  };

  const handlePortfolioSelect = (portfolioName: string, inquiryId: number) => {
    setSelectedPortfolioName(portfolioName);
    setSelectedInquiryId(inquiryId);
    setMobileView("chat");
  };

  const showEmptySearch =
    !loading &&
    inquiries.length > 0 &&
    ((sidebarMode === "chats" && filteredInquiries.length === 0) ||
      (sidebarMode === "portfolio" && filteredPortfolioGroups.length === 0));

  const counterLabel = sidebarMode === "portfolio" ? "Portafolio" : "Chats";
  const counterValue =
    sidebarMode === "portfolio" ? portfolioGroups.length : inquiries.length;
  const searchPlaceholder =
    sidebarMode === "portfolio" ? "Buscar..........." : "Buscar...............";

  return (
    <div className="space-y-4">
      <div className=" bg-black px-5 py-5 text-white sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold tracking-[0.35em] text-[#25d366]">
              Chat Diolay
            </p>
            <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
              {title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-white/68">{subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/45">
                {counterLabel}
              </p>
              <p className="mt-1 text-2xl font-black text-white">
                {counterValue}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[36px] bg-[#0b141a] p-1.5 shadow-[0_34px_100px_rgba(11,20,26,0.32)]">
        <div className="absolute inset-x-0 top-0 h-32 bg-[#0300a8]" />

        <div className="relative overflow-hidden rounded-[30px] border border-black/10 bg-[#e9edef]">
          <div className="grid min-h-[640px] grid-cols-1 md:grid-cols-[360px_minmax(0,1fr)]">
            <aside
              className={`${currentMobileView === "chat" ? "hidden md:flex" : "flex"
                } flex-col border-b border-[#d1d7db] bg-white md:border-b-0 md:border-r`}
            >
              <div className="flex items-center justify-between bg-[#f0f2f5] px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f8f665] text-sm font-black text-[#04003b]">
                    {getInitials(ownerLabel)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#111b21]">
                      {ownerLabel}
                    </p>
                    <p className="truncate text-xs text-[#667781]">
                      Bendaja recibidas
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#54656f]">
                  <button
                    type="button"
                    className="rounded-full p-2 transition-colors hover:bg-black/5"
                    aria-label="Buscar conversaciones"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full p-2 transition-colors hover:bg-black/5"
                    aria-label="Mas opciones"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="border-b border-[#e9edef] bg-white px-3 py-3">
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#f0f2f5] p-1">
                  <button
                    type="button"
                    onClick={() => setSidebarMode("chats")}
                    className={`rounded-[12px] px-3 py-2 text-center text-xs transition-colors ${sidebarMode === "chats"
                        ? "bg-white font-bold text-[#111b21] shadow-sm"
                        : "font-semibold text-[#667781] hover:bg-white/70"
                      }`}
                  >
                    Chats
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSidebarMode("portfolio");
                      setSelectedPortfolioName(
                        activePortfolioGroup?.name ||
                        filteredPortfolioGroups[0]?.name ||
                        portfolioGroups[0]?.name ||
                        null,
                      );
                    }}
                    className={`rounded-[12px] px-3 py-2 text-center text-xs transition-colors ${sidebarMode === "portfolio"
                        ? "bg-white font-bold text-[#111b21] shadow-sm"
                        : "font-semibold text-[#667781] hover:bg-white/70"
                      }`}
                  >
                    Portafolio
                  </button>
                </div>

                <label className="mt-3 flex items-center gap-3 rounded-2xl bg-[#f0f2f5] px-4 py-3 text-sm text-[#667781]">
                  <Search className="h-4 w-4 shrink-0" />
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full bg-transparent text-sm text-[#111b21] outline-none placeholder:text-[#667781]"
                  />
                </label>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto bg-white">
                {loading ? (
                  <div className="space-y-3 p-4">
                    {[0, 1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="flex animate-pulse items-center gap-3 rounded-2xl px-2 py-2"
                      >
                        <div className="h-12 w-12 rounded-full bg-[#f0f2f5]" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-2/3 rounded-full bg-[#f0f2f5]" />
                          <div className="h-3 w-full rounded-full bg-[#f0f2f5]" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center text-[#667781]">
                    <div className="mb-4 rounded-full bg-[#f0f2f5] p-4">
                      <MessageSquareMore className="h-10 w-10 text-[#8696a0]" />
                    </div>
                    <p className="text-base font-semibold text-[#111b21]">
                      Sin chats por ahora
                    </p>
                  </div>
                ) : showEmptySearch ? (
                  <div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center text-[#667781]">
                    <div className="mb-4 rounded-full bg-[#f0f2f5] p-4">
                      <Search className="h-10 w-10 text-[#8696a0]" />
                    </div>
                    <p className="text-base font-semibold text-[#111b21]">
                      {sidebarMode === "portfolio"
                        ? "No encontramos proyectos"
                        : "No encontramos chats"}
                    </p>
                    <p className="mt-2 text-sm">
                      {sidebarMode === "portfolio"
                        ? "Prueba con otro proyecto, remitente o palabra clave."
                        : "Prueba con otro nombre, telefono o proyecto."}
                    </p>
                  </div>
                ) : sidebarMode === "portfolio" ? (
                  <div className="space-y-3 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-2xl bg-[#f0f2f5] px-3 py-3">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#667781]">
                          Proyectos
                        </p>
                        <p className="mt-1 text-xl font-black text-[#111b21]">
                          {portfolioGroups.length}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#f0f2f5] px-3 py-3">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#667781]">
                          Consultas
                        </p>
                        <p className="mt-1 text-xl font-black text-[#111b21]">
                          {inquiries.length}
                        </p>
                      </div>
                    </div>

                    {filteredPortfolioGroups.map((group) => {
                      const isActive =
                        group.name === activePortfolioGroup?.name;

                      return (
                        <button
                          key={group.name}
                          type="button"
                          onClick={() =>
                            handlePortfolioSelect(
                              group.name,
                              group.lastInquiry.id,
                            )
                          }
                          className={`w-full rounded-[22px] border px-4 py-4 text-left transition-colors ${isActive
                              ? "border-[#b3e6da] bg-[#e7f7f1]"
                              : "border-[#eef1f3] bg-white hover:bg-[#f7f9fa]"
                            }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-black text-[#111b21]">
                                {group.name}
                              </p>
                              <p className="mt-1 text-xs text-[#667781]">
                                {group.contacts} contacto
                                {group.contacts === 1 ? "" : "s"} activos
                              </p>
                            </div>
                            <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#075e54] shadow-sm">
                              {group.count}
                            </span>
                          </div>

                          <div className="mt-3 rounded-2xl bg-white/80 px-3 py-3 text-xs text-[#54656f] shadow-sm">
                            <p className="truncate font-semibold text-[#111b21]">
                              Ultimo mensaje: {group.lastInquiry.senderName}
                            </p>
                            <p className="mt-1 truncate">
                              {getSnippet(group.lastInquiry.projectDescription)}
                            </p>
                            <p className="mt-2 text-[11px] text-[#667781]">
                              {formatSidebarDate(group.lastInquiry.createdAt)}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  filteredInquiries.map((inquiry) => {
                    const isActive = inquiry.id === activeInquiry?.id;

                    return (
                      <button
                        key={inquiry.id}
                        type="button"
                        onClick={() => handleSelectInquiry(inquiry.id)}
                        className={`flex w-full items-start gap-3 border-b border-[#f5f6f6] px-4 py-3 text-left transition-colors ${isActive ? "bg-[#f0f2f5]" : "hover:bg-[#f5f6f6]"
                          }`}
                      >
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#d9fdd3] text-sm font-black text-[#075e54]">
                          {getInitials(inquiry.senderName)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-semibold text-[#111b21]">
                              {inquiry.senderName}
                            </p>
                            <span className="shrink-0 text-[11px] text-[#667781]">
                              {formatSidebarDate(inquiry.createdAt)}
                            </span>
                          </div>

                          <div className="mt-0.5 flex items-center gap-2">
                            <span className="truncate text-xs font-semibold text-[#00a884]">
                              {inquiry.projectName ||
                                "Consulta desde el portafolio"}
                            </span>
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#25d366]" />
                          </div>

                          <p className="mt-1 truncate text-sm text-[#667781]">
                            {getSnippet(inquiry.projectDescription)}
                          </p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </aside>

            <section
              className={`${currentMobileView === "list" ? "hidden md:flex" : "flex"
                } min-h-[640px] flex-col`}
            >
              <div className="flex items-center justify-between border-b border-[#d1d7db] bg-[#f0f2f5] px-3 py-3 sm:px-4">
                {activeInquiry ? (
                  <>
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={() => setMobileView("list")}
                        className="rounded-full p-2 text-[#54656f] transition-colors hover:bg-black/5 md:hidden"
                        aria-label="Volver a los chats"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>

                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#d9fdd3] text-sm font-black text-[#075e54]">
                        {getInitials(activeInquiry.senderName)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#111b21]">
                          {activeInquiry.senderName}
                        </p>
                        <p className="truncate text-xs text-[#667781]">
                          {getContactLine(activeInquiry)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[#54656f]">
                      {activeInquiry.phone ? (
                        <a
                          href={`tel:${activeInquiry.phone}`}
                          className="rounded-full p-2 transition-colors hover:bg-black/5"
                          aria-label="Llamar al contacto"
                        >
                          <Phone className="h-5 w-5" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="rounded-full p-2 text-[#8696a0]"
                          aria-label="Llamadas no disponibles"
                        >
                          <Phone className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        type="button"
                        className="rounded-full p-2 transition-colors hover:bg-black/5"
                        aria-label="Videollamada"
                      >
                        <Video className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        className="rounded-full p-2 transition-colors hover:bg-black/5"
                        aria-label="Mas opciones"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMobileView("list")}
                      className="rounded-full p-2 text-[#54656f] transition-colors hover:bg-black/5 md:hidden"
                      aria-label="Volver a los chats"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                      <p className="text-sm font-semibold text-[#111b21]">
                        Conversacion
                      </p>
                      <p className="text-xs text-[#667781]">Elija un mensaje</p>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="min-h-0 flex-1 px-3 py-4 sm:px-6 sm:py-6"
                style={wallpaperStyle}
              >
                {loading ? (
                  <div className="mx-auto flex h-full max-w-3xl flex-col justify-center gap-4">
                    <div className="mx-auto h-8 w-28 animate-pulse rounded-full bg-white/60" />
                    <div className="h-28 w-[82%] animate-pulse rounded-[18px] rounded-tl-md bg-white/80 shadow-sm" />
                    <div className="ml-auto h-16 w-52 animate-pulse rounded-[18px] rounded-tr-md bg-[#d9fdd3]/80 shadow-sm" />
                  </div>
                ) : activeInquiry ? (
                  <div className="mx-auto flex h-full max-w-4xl flex-col gap-5">
                    <div className="space-y-4">
                      <div className="mx-auto w-fit rounded-lg bg-[rgba(17,27,33,0.08)] px-3 py-1 text-[11px] font-medium text-[#54656f] shadow-sm">
                        {formatDayLabel(activeInquiry.createdAt)}
                      </div>

                      <div className="mx-auto w-fit rounded-lg bg-[rgba(255,255,255,0.78)] px-3 py-1 text-[11px] text-[#54656f] shadow-sm backdrop-blur-sm">
                        Consulta enviada desde el formulario del portafolio
                      </div>

                      <div className="relative mr-auto max-w-[92%] sm:max-w-[80%]">
                        <span className="absolute left-[-6px] top-2 h-4 w-4 rotate-45 rounded-[4px] bg-white shadow-[0_4px_10px_rgba(17,27,33,0.08)]" />
                        <div className="relative rounded-[20px] rounded-tl-md bg-white px-4 py-3 text-[#111b21] shadow-[0_2px_10px_rgba(17,27,33,0.12)]">
                          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#00a884]">
                            {activeInquiry.projectName || "Mensaje"}
                          </p>
                          <p className="mt-2 whitespace-pre-wrap text-[15px] leading-6 text-[#111b21]">
                            {activeInquiry.projectDescription}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            {activeInquiry.phone && (
                              <a
                                href={`tel:${activeInquiry.phone}`}
                                className="inline-flex items-center gap-1 rounded-full bg-[#f0f2f5] px-3 py-1 text-xs font-semibold text-[#075e54] transition-colors hover:bg-[#e2e8eb]"
                              >
                                <Phone className="h-3.5 w-3.5" />
                                {activeInquiry.phone}
                              </a>
                            )}

                            <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-[#667781]">
                              {formatBubbleTime(activeInquiry.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="relative ml-auto max-w-[88%] sm:max-w-[72%]">
                        <span className="absolute right-[-6px] top-2 h-4 w-4 rotate-45 rounded-[4px] bg-[#d9fdd3] shadow-[0_4px_10px_rgba(17,27,33,0.08)]" />
                        <div className="relative rounded-[20px] rounded-tr-md bg-[#d9fdd3] px-4 py-3 text-[#111b21] shadow-[0_2px_10px_rgba(17,27,33,0.1)]">
                          <p className="text-sm leading-6">
                            Revisa cada consulta con mucha mas claridad.
                          </p>
                          <div className="mt-2 flex items-center justify-end gap-1 text-[11px] text-[#667781]">
                            <span>
                              {formatBubbleTime(activeInquiry.createdAt)}
                            </span>
                            <CheckCheck className="h-4 w-4 text-[#53bdeb]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto rounded-[22px] bg-[#f0f2f5]/95 p-2 shadow-[0_-1px_2px_rgba(11,20,26,0.04)] backdrop-blur-sm">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          type="button"
                          className="rounded-full p-2 text-[#54656f] transition-colors hover:bg-black/5"
                          aria-label="Emojis"
                        >
                          <Smile className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="rounded-full p-2 text-[#54656f] transition-colors hover:bg-black/5"
                          aria-label="Adjuntar"
                        >
                          <Paperclip className="h-5 w-5" />
                        </button>
                        <div className="flex-1 rounded-full bg-white px-4 py-3 text-sm text-[#667781] shadow-sm">
                          Desarrollo.
                        </div>
                        <button
                          type="button"
                          className="rounded-full bg-[#00a884] p-3 text-white shadow-sm transition-transform hover:scale-[1.03]"
                          aria-label="Microfono"
                        >
                          <Mic className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center text-[#54656f]">
                    <div className="mb-4 rounded-full bg-white/70 p-5 shadow-sm">
                      <MessageSquareMore className="h-12 w-12 text-[#8696a0]" />
                    </div>
                    <p className="text-lg font-semibold text-[#111b21]">
                      {emptyMessage}
                    </p>
                    <p className="mt-2 max-w-md text-sm">{emptyHint}</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
