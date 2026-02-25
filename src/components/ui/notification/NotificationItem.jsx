import Toggle from "../Toggle";

const NotificationItem = ({ title, description, checked, onChange, theme }) => (
  <div
    className="flex items-center justify-between py-4 cursor-pointer p-4 rounded-lg"
    onClick={() => onChange(!checked)}
    style={{
      backgroundColor: theme.colors.backgroundDark,
    }}
  >
    <div className="flex-1">
      <h3 className="text-white font-medium">{title}</h3>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} theme={theme} />
  </div>
);

export default NotificationItem;
