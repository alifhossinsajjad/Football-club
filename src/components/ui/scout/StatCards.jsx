export default function StatCards({
  icon: Icon,
  title,
  value,
  change,
  changeType,
  theme,
  status,
}) {
  return (
    <div
      className=" border rounded-lg p-4 lg:p-6 hover:opacity-80 transition-all"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="flex space-y-2 items-center justify-between mb-3 lg:mb-4">
        <div
          className=" rounded-lg text-[#00E5FF]"
          // style={{
          //   background: `linear-gradient(to bottom right, ${theme.colors.primaryCyan}33, ${theme.colors.primaryMagenta}33)`,
          // }}
        >
          <Icon
            className="w-5 h-5 lg:w-8 lg:h-8"
            // style={{ color: theme.colors.primaryCyan }}
          />
        </div>

        {change && (
          <span
            className={`text-xs lg:text-sm font-medium ${
              changeType === "up" ? "text-green-400" : "text-red-400"
            }`}
          >
            {changeType === "up" ? "+" : ""}
            {change}%
          </span>
        )}
      </div>
      <p className="text-xs lg:text-sm text-gray-400">{title}</p>
      <h3 className="text-xl lg:text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-xs lg:text-sm text-[#05DF72]">{status}</p>
    </div>
  );
}
