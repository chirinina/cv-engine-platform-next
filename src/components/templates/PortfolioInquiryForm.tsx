"use client";

import axios from "axios";
import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Loader2, Phone, Send } from "lucide-react";
import api from "@/lib/api";

type Variant = "minimal" | "cyber" | "corporate" | "glass";

interface PortfolioInquiryFormProps {
  portfolioSlug: string;
  primaryColor: string;
  secondaryColor?: string;
  textColor?: string;
  variant?: Variant;
  className?: string;
}

type InquiryFormState = {
  senderName: string;
  projectName: string;
  projectDescription: string;
  phone: string;
};

const INITIAL_FORM: InquiryFormState = {
  senderName: "",
  projectName: "",
  projectDescription: "",
  phone: "",
};

const variantMap: Record<Variant, Record<string, string>> = {
  minimal: {
    wrapper:
      "",
    description: "text-neutral-600",
    label: "text-neutral-500",
    input:
      " border border-black/10 text-neutral-900 placeholder:text-neutral-400",
    helper: "text-neutral-500",
    buttonText: "text-black",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  cyber: {
    wrapper:
      " border border-cyan-500/20",
    title: "text-white",
    description: "text-gray-400",
    label: "text-cyan-300/80",
    input:
      "bg-black/40 border border-white/10 text-white placeholder:text-gray-500",
    helper: "text-gray-500",
    buttonText: "text-slate-950",
    success: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
  },
  corporate: {
    wrapper:
      "shadow-sm",
    title: "text-neutral-900",
    description: "text-neutral-600",
    label: "text-neutral-500",
    input:
      "border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:border-opacity-50",
    helper: "text-neutral-500",
    buttonText: "text-white",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  glass: {
    wrapper:
      " border border-white/10 bg-white/[0.05] backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.25)]",
    title: "text-white",
    description: "text-slate-400",
    label: "text-slate-300",
    input:
      "bg-white/5 border border-white/10 text-white placeholder:text-slate-500",
    helper: "text-slate-500",
    buttonText: "text-slate-950",
    success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  },
};

export default function PortfolioInquiryForm({
  portfolioSlug,
  primaryColor,
  secondaryColor,
  textColor,
  variant = "minimal",
  className = "",
}: PortfolioInquiryFormProps) {
  const styles = useMemo(() => variantMap[variant], [variant]);
  const [form, setForm] = useState<InquiryFormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field: keyof InquiryFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await api.post(`/portfolios/slug/${portfolioSlug}/inquiries`, {
        senderName: form.senderName.trim(),
        projectName: form.projectName.trim(),
        projectDescription: form.projectDescription.trim(),
        phone: form.phone.trim(),
      });

      setForm(INITIAL_FORM);
      setSuccessMessage("Enviado! Se contactaran contigo pronto.");
    } catch (error: unknown) {
      setErrorMessage(
        axios.isAxiosError(error)
          ? error.response?.data?.message ||
          "No se pudo enviar Intenta nuevamente."
          : "No se pudo enviar Intenta nuevamente.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const baseInputClass =
    "w-full rounded-2xl px-4 py-3 outline-none transition-all focus:ring-2 resize-none";

  return (
    <section className={className}>
      <div className={`p-6 md:p-8 lg:p-10 ${styles.wrapper}`}>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p
              className="text-xs font-black uppercase tracking-[0.35em]"
              style={{ color: primaryColor }}
            >
              Consulta directa
            </p>
            <h3
              className={`mt-3 text-3xl md:text-4xl font-black ${styles.title}`}
            >
              Cuentame tu proyecto
            </h3>
            <p
              className={`mt-3 text-sm md:text-base leading-relaxed ${styles.description}`}
              style={textColor ? { color: textColor } : undefined}
            >
              Puedes dejar el nombre de tu proyecto, una descripcion breve y tu
              telefono si quieres que te contacten rapido.
            </p>
          </div>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                className={`mb-2 block text-xs font-bold uppercase tracking-[0.25em] ${styles.label}`}
              >
                Tu nombre
              </label>
              <input
                type="text"
                value={form.senderName}
                onChange={(event) =>
                  handleChange("senderName", event.target.value)
                }
                className={`${baseInputClass} ${styles.input}`}
                style={{ borderColor: `${primaryColor}22` }}
                placeholder="Ej: Maria Lopez"
                maxLength={120}
                required
              />
            </div>

            <div>
              <label
                className={`mb-2 block text-xs font-bold uppercase tracking-[0.25em] ${styles.label}`}
              >
                Nombre del proyecto
              </label>
              <input
                type="text"
                value={form.projectName}
                onChange={(event) =>
                  handleChange("projectName", event.target.value)
                }
                className={`${baseInputClass} ${styles.input}`}
                style={{ borderColor: `${primaryColor}22` }}
                placeholder="Ej: Sistema para mi empresa"
                maxLength={160}
                required
              />
            </div>
          </div>

          <div>
            <label
              className={`mb-2 block text-xs font-bold uppercase tracking-[0.25em] ${styles.label}`}
            >
              Descripcion breve
            </label>
            <textarea
              value={form.projectDescription}
              onChange={(event) =>
                handleChange("projectDescription", event.target.value)
              }
              className={`${baseInputClass} ${styles.input} min-h-32`}
              style={{ borderColor: `${primaryColor}22` }}
              placeholder="Cuentame que necesitas, objetivo del proyecto y lo mas importante."
              maxLength={2000}
              required
            />
          </div>

          <div>
            <label
              className={`mb-2 block text-xs font-bold uppercase tracking-[0.25em] ${styles.label}`}
            >
              Telefono
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
              className={`${baseInputClass} ${styles.input}`}
              style={{ borderColor: `${primaryColor}22` }}
              placeholder="Opcional"
              maxLength={40}
            />
          </div>

          {(successMessage || errorMessage) && (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm font-medium ${successMessage
                ? styles.success
                : "border-red-200 bg-red-50 text-red-700"
                }`}
            >
              <div className="flex items-center gap-2">
                {successMessage ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className="text-base leading-none">!</span>
                )}
                <span>{successMessage || errorMessage}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end mt-4">
            <button
              type="submit"
              disabled={submitting}
              className={`
                group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-10 py-4 
                font-black uppercase tracking-widest text-sm transition-all duration-300
                hover:scale-[1.03] hover:-translate-y-1 active:scale-95
                disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:translate-y-0
                ${styles.buttonText}
              `}
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 10px 30px -10px ${primaryColor}66`,
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 block h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <span>Enviar</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
