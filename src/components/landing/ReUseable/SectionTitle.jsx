"use client";

import { useSelector } from "react-redux";

const SectionTitel = ({
  title,
  subtitle,
  className = "",
  titleClassName = "",
}) => {
  const theme = useSelector((state) => state.theme);

  return (
    <div className={`text-center mb-10 ${className}`}>
      <h2
        className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 inline-block ${titleClassName}`}
        style={{
          backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="text-muted-foreground text-sm md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitel;
