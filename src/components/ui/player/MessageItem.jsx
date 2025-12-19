import Image from "next/image";

export default function MessageItem({
  name,
  message,
  time,
  unread,
  theme,
  logo,
}) {
  return (
    <div
      className="flex items-start gap-3 lg:gap-4 p-3 lg:p-4 rounded-lg transition-all cursor-pointer"
      style={{
        backgroundColor: "transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `${theme.colors.backgroundDark}80`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <Image src={logo} alt="Logo" width={40} height={40} priority />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs lg:text-sm font-semibold text-white truncate pr-2">
            {name}
          </p>
          <span className="text-xs text-gray-400 flex-shrink-0">{time}</span>
        </div>
        <p className="text-xs lg:text-sm text-gray-400 truncate">{message}</p>
      </div>
      {unread && (
        <span
          className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
          style={{
            backgroundColor: theme.colors.primaryMagenta,
          }}
        ></span>
      )}
    </div>
  );
}
