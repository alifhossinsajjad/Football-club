export default function GradientTitle({
  text,
  as: Tag = "h1",
  className = "",
}) {
  return (
    <Tag
      className={`
        inline-block
        font-poppins
        font-bold
        text-transparent
        bg-clip-text
        [-webkit-background-clip:text]
        text-[22px]
        leading-[28px]
        sm:text-[26px]
        sm:leading-[32px]
        md:text-[30px]
        md:leading-[36px]
        ${className}
      `}
      style={{
        backgroundImage: "linear-gradient(90deg, #00E5FF 0%, #9C27B0 100%)",
      }}
    >
      {text}
    </Tag>
  );
}
