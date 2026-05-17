import React, { memo } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  key?: React.Key;
}

export const GlassCard = memo(({ children, className, id }: GlassCardProps) => (
  <div 
    id={id}
    className={cn(
      "bg-white/70 backdrop-blur-xl border border-primary/10 rounded-[24px] shadow-xl shadow-primary/5 w-full overflow-hidden",
      className
    )}
  >
    {children}
  </div>
));

export const Button = memo(({ 
  children, 
  onClick, 
  variant = 'primary', 
  className,
  disabled,
  type = 'button'
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-lg shadow-primary/10",
    secondary: "bg-[#111827] text-white hover:bg-gray-800",
    outline: "border-2 border-primary/10 text-primary hover:bg-primary/5",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-100",
    danger: "bg-red-50 text-red-500 hover:bg-red-100"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cn(
        "px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base cursor-pointer",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
});

export const Input = memo(({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-1.5 w-full min-w-0">
    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1">{label}</label>
    <input 
      {...props}
      className="bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-gray-200 w-full min-w-0"
    />
  </div>
));
