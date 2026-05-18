import React, { memo } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

interface BackButtonProps {
  className?: string;
}

const BackButton = memo(({ className }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05, x: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/")}
      className={cn(
        "group flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/40 backdrop-blur-md border border-white/20 shadow-sm hover:bg-white/60 transition-colors z-20 sticky top-24 ml-4 md:ml-0 mb-6",
        className
      )}
    >
      <ArrowLeft className="w-4 h-4 text-primary group-hover:-translate-x-0.5 transition-transform" />
      <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">Home</span>
    </motion.button>
  );
});

export default BackButton;
