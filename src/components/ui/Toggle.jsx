const Toggle = ({ checked, onChange, theme }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:none focus:none"
    style={{
      backgroundColor: checked ? (theme?.colors?.primaryCyan || "#04B5A3") : "#374151",
    }}
  >
    <span
      aria-hidden="true"
      className={`pointer-events-none mt-0.5  inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        checked ? "translate-x-5 " : "translate-x-0"
      }`}
    />
  </button>
);

export default Toggle;
