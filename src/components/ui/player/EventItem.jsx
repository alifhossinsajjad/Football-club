import { Calendar } from "lucide-react";
import Image from "next/image";

export default function EventItem({
  title,
  date,
  location,
  status,
  theme,
  logo,
  time,
}) {
  return (
    <div
      className="flex items-center justify-between p-3 lg:p-4 rounded-lg transition-all cursor-pointer gap-3"
      style={{
        backgroundColor: "transparent",
        color: theme.colors.primaryCyan,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `${theme.colors.backgroundDark}80`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {/* Left content */}
      <div className="flex items-center gap-3 lg:gap-4 flex-1 min-w-0">
        <div
          className="p-2 lg:p-3 rounded-lg flex-shrink-0"
          style={{
            backgroundColor: `${theme.colors.primaryCyan}1A`,
          }}
        >
          <Image src={logo} alt="Logo" width={40} height={40} priority />
        </div>

        <div className="min-w-0">
          <p className="text-md lg:text-lg font-semibold text-white mb-0.5 lg:mb-1 truncate">
            {title}
          </p>
          <p className="text-md text-gray-400 truncate">{location}</p>
        </div>
      </div>

      {/* Status badge */}
      <div className="text-end">
        <p
          className="text-lg  truncate"
          style={{
            color: theme.colors.primaryCyan,
          }}
        >
          {date}
        </p>
        <p className="text-md text-gray-400 truncate">{time}</p>
      </div>
    </div>
  );
}
