const NotificationSection = ({ icon: Icon, title, children , theme }) => (
  <div
    className="rounded-2xl p-6 space-y-6"
    style={{
      backgroundColor: theme.colors?.backgroundCard,
      border: `1px solid ${theme?.colors?.primaryCyan}33`,
    }}
  >
    <div className="flex items-center gap-3">
      <Icon className="w-6 h-6" style={{ color: theme?.colors?.primaryCyan }} />
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    {children}
  </div>
);

export default NotificationSection;
