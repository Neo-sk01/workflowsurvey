import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const sizeMap = {
  small: "h-4 w-4",
  medium: "h-6 w-6",
  large: "h-10 w-10",
};

const Spinner: React.FC<SpinnerProps> = ({ 
  size = "medium", 
  className 
}) => {
  return (
    <Loader2 
      className={cn(
        "animate-spin text-primary", 
        sizeMap[size],
        className
      )} 
    />
  );
};

export default Spinner; 