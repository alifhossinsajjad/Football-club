import React from "react";

interface HomeButtonProps {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  disabled?: boolean;
  className?: string;
  theme: {
    colors: {
      primaryMagenta: string;
    };
  };
}

const HomeButton: React.FC<HomeButtonProps> = ({
  text,
  onClick,
  icon,
  variant = "primary",
  disabled = false,
  className = "",
  theme,
}) => {
  const baseStyle =
    "px-10 py-4 rounded-full font-medium transition-all flex items-center gap-3 hover:scale-105";

  const variants = {
    primary: {
      backgroundColor: theme.colors.primaryMagenta,
      color: "#fff",
      border: "2px solid transparent",
    },
    outline: {
      backgroundColor: `${theme.colors.primaryMagenta}20`,
      color: "#fff",
      border: `2px solid ${theme.colors.primaryMagenta}`,
    },
    ghost: {
      backgroundColor: "transparent",
      color: theme.colors.primaryMagenta,
      border: "2px solid transparent",
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={variants[variant]}
      onMouseEnter={(e) => {
        if (variant !== "ghost") {
          e.currentTarget.style.backgroundColor = theme.colors.primaryMagenta;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor =
          variants[variant].backgroundColor;
      }}
    >
      {text}
      {icon && icon}
    </button>
  );
};

export default HomeButton;
