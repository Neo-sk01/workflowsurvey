import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large" | "footer";
  className?: string;
  variant?: "default" | "negative";
}

const Logo: React.FC<LogoProps> = ({ 
  size = "medium", 
  className = "", 
  variant = "default" 
}) => {
  const sizeClasses = {
    small: "h-28 w-auto",
    medium: "h-24 w-auto",
    large: "h-16 w-auto",
    footer: "h-[120px] w-auto"
  };

  const logoSrc = variant === "negative" ? "/csd negative.png" : "/logo.png";
  const altText = "CSD Logo";

  return (
    <div className={`${className}`}>
      <img
        src={logoSrc}
        alt={altText}
        className={`${sizeClasses[size]}`}
      />
    </div>
  );
};

export default Logo;
