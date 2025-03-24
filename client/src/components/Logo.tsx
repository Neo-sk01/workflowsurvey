import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", className = "" }) => {
  const sizeClasses = {
    small: "h-12 w-auto",
    medium: "h-16 w-auto",
    large: "h-24 w-auto",
  };

  return (
    <div className={`${className}`}>
      <img
        src="/logo.png"
        alt="Carbo Software Logo"
        className={`${sizeClasses[size]}`}
      />
    </div>
  );
};

export default Logo;
