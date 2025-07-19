import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpeechBubbleProps {
  children: ReactNode;
  className?: string;
}

export default function SpeechBubble({ children, className }: SpeechBubbleProps) {
  return (
    <div className={cn("relative bg-white border-3 border-ink rounded-[20px] p-4", className)}>
      {children}
      <div className="absolute bottom-[-15px] left-[30px] w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-white z-20"></div>
      <div className="absolute bottom-[-18px] left-[27px] w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[18px] border-t-ink z-10"></div>
    </div>
  );
}
