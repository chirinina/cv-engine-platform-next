"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, Trash2, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
  isLoading = false,
}: ConfirmModalProps) {
  const iconMap = {
    danger: <Trash2 className="w-6 h-6 text-red-500" />,
    warning: <AlertTriangle className="w-6 h-6 text-amber-500" />,
    info: <Info className="w-6 h-6 text-blue-500" />,
  };

  const buttonClassMap = {
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-amber-600 hover:bg-amber-700 text-white",
    info: "bg-blue-600 hover:bg-blue-700 text-white",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="relative w-full max-w-md bg-black border border-white/10 shadow-2xl rounded-2xl overflow-hidden z-[111] p-6 text-center"
          >
            <div className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-opacity-10 ${variant === 'danger' ? 'bg-red-500' : variant === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}>
              {iconMap[variant]}
            </div>

            <h3 className="text-xl font-black text-white mb-2 tracking-tight">
              {title}
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {message}
            </p>

            <div className="flex gap-3">
              <button
                disabled={isLoading}
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-gray-300 font-bold text-sm hover:bg-white/5 transition-all active:scale-95 disabled:opacity-50"
              >
                {cancelText}
              </button>
              <button
                disabled={isLoading}
                onClick={onConfirm}
                className={`flex-1 px-4 py-2.5 rounded-lg font-bold text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${buttonClassMap[variant]}`}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  confirmText
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
