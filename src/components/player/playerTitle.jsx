import { useSelector } from "react-redux";

export default function PlayerTitle({ title }) {
  const theme = useSelector((state) => state.theme);
  return (
    <h1
      className="text-2xl lg:text-3xl font-bold mb-2 inline-block"
      style={{
        backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {title}
    </h1>
  );
}
