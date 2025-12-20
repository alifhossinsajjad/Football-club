import { Calendar } from "lucide-react";
import Image from "next/image";

export default function UpcomingEvent({
  title,
  date,
  location,
  academy,
  theme,
  logo,
  time,
}) {
  return (
    <div
      className="flex items-center justify-between p-3 lg:p-4 rounded-lg transition-all cursor-pointer gap-3"
      style={{
        backgroundColor: theme.colors.backgroundDark,
      }}
    >
      {/* Left content */}
      <div className="flex  items-center gap-3 lg:gap-4 flex-1 min-w-0">
        <div className="p-2 lg:p-3 rounded-lg flex-shrink-0">
          <Image src={logo} alt="Logo" width={40} height={40} priority />
        </div>

        <div className="min-w-0 space-y-1">
          <p className="text-base lg:text-lg font-semibold text-white truncate">
            {title}
          </p>
          <p className="text-sm text-gray-400 truncate">{academy}</p>
          <p className="text-xs text-gray-400 truncate">{location}</p>
        </div>
      </div>

      {/* Status badge */}
      <div className="text-end">
        <p className="text-lg text-[#04B5A3]  truncate">{date}</p>
        <p className="text-md text-gray-400 truncate">{time}</p>
      </div>
    </div>
  );
}
