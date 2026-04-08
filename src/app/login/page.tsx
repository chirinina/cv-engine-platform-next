"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Mail, Lock, Loader2, Eye, EyeOff, LogIn } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";

/* ================= BACKGROUND LINES ================= */
const KineticLines = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-90">
      <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none">
        {[...Array(6)].map((_, i) => (
          <motion.path
            key={i}
            d={`M-100 ${200 + i * 100}C200 ${100 + i * 50} 400 ${600 - i * 50} 800 ${300 + i * 20}C1200 ${100 + i * 100} 1500 ${400} 1700 ${200}`}
            stroke={`url(#grad${i})`}
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 0.8, 0],
              pathOffset: [0, 1]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3
            }}
          />
        ))}
        <defs>
          {[...Array(6)].map((_, i) => (
            <linearGradient key={i} id={`grad${i}`}>
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor={i % 2 === 0 ? "#3b82f6" : "#6366f1"} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
};

/* ================= FLOATING BRAND ================= */
const FloatingBrand = () => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const generated = [...Array(3)].map(() => ({
      x: Math.random() * 1000,
      y: Math.random() * 800
    }));
    setPositions(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.05] flex items-center gap-4"
          initial={{
            x: positions[i]?.x || 0,
            y: positions[i]?.y || 0
          }}
          animate={{ y: [0, -40, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 12 + i * 2, repeat: Infinity }}
          style={{ left: `${i * 30}%`, top: `${20 + i * 20}%` }}
        >
          {/* NEXT */}
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="90" fill="white" />
            <path d="M149.5 157.5L69 54H54V126H66V69L140 165Z" fill="black" />
          </svg>

          {/* GITHUB */}
          <svg width="100" height="100" viewBox="0 0 24 24" fill="white">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.4 9.8 8.2 11.3.6.1.8-.2.8-.5v-2
            c-3.3.7-4-1.5-4-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 
            1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.7.4-1.2.7-1.5-2.6-.3-5.4-1.3-5.4-5.9 
            0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 2-.4 
            3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.7.9 
            1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.3.8 1 .8 2v3c0 .3.2.6.8.5
            C20.6 21.8 24 17.3 24 12c0-6.6-5.4-12-12-12z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

/* ================= CLOCK ================= */
const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-4 right-6 text-[10px] text-gray-500 font-mono">
      {time} Bolivia
    </div>
  );
};

/* ================= LOGIN ================= */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
      toast.success("Login Exitoso");

      if (res.data.user.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/client");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to login");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#030303]">
      <KineticLines />
      <FloatingBrand />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full p-8 border border-white/20"
      >
        <div className="text-center mb-10">
          <div className="mb-4">
            <span className="text-[11px] font-black tracking-[0.3em] uppercase">
              <span className="text-white">Dio</span>
              <span className="text-blue-500">play</span>
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white">Bienvenido</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Inicie sesión para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo Electronico"
              className="w-full text-white py-3 pl-11 pr-4 bg-transparent border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full text-white py-3 pl-11 pr-12 bg-transparent border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-2 hover:bg-white hover:text-black transition-all rounded-md flex justify-center items-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Acceder
              </>
            )}
          </button>
        </form>
      </motion.div>

      <Clock />
    </div>
  );
}