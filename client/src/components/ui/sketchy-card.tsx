import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SketchyCardProps {
  children: ReactNode;
  className?: string;
}

export default function SketchyCard({ children, className }: SketchyCardProps) {
  return (
    <div className={cn("sketchy-border", className)}>
      {children}
    </div>
  );
}
