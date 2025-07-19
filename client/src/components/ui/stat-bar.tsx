import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  emoji: string;
  color: string;
  bgColor: string;
  className?: string;
  showValue?: boolean;
  animated?: boolean;
}

export default function StatBar({ 
  label, 
  value, 
  maxValue = 100, 
  emoji, 
  color, 
  bgColor, 
  className,
  showValue = true,
  animated = true
}: StatBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center justify-between mb-1">
        <span className="font-caveat text-sm text-ink flex items-center gap-1">
          <span className="text-lg">{emoji}</span>
          {label}
        </span>
        {showValue && (
          <span className={cn("font-bangers text-sm", color)}>
            {Math.round(value)}{maxValue !== 100 && `/${maxValue}`}
          </span>
        )}
      </div>
      
      <div className="relative h-3 bg-notebook-lines rounded-full overflow-hidden sketchy-border">
        <motion.div
          className={cn("h-full rounded-full", bgColor)}
          initial={{ width: animated ? 0 : `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 1 : 0, ease: "easeOut" }}
        />
        
        {/* animated sparkles for high values */}
        {percentage > 80 && (
          <motion.div
            className="absolute top-0 right-1 text-xs"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            ✨
          </motion.div>
        )}
        
        {/* warning indicator for stress */}
        {label.toLowerCase().includes('stress') && percentage > 70 && (
          <motion.div
            className="absolute top-0 right-1 text-xs"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ 
              duration: 0.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            ⚠️
          </motion.div>
        )}
      </div>
    </div>
  );
}