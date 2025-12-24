// Languages.jsx
"use client";

import { useState } from "react";

export default function ScoutLanguages({
  languages: initialLanguages,
  isEditing,
  onUpdate,
  theme,
}) {
  const [languages, setLanguages] = useState(initialLanguages || []);

  const commonLanguages = [
    "English",
    "Spanish",
    "French",
    "Portuguese",
    "German",
    "Italian",
    "Dutch",
    "Arabic",
    "Mandarin",
  ];

  const toggleLanguage = (lang) => {
    const updated = languages.includes(lang)
      ? languages.filter((l) => l !== lang)
      : [...languages, lang];
    setLanguages(updated);
    if (onUpdate) onUpdate(updated);
  };

  const addCustomLanguage = (value) => {
    if (value && !languages.includes(value)) {
      const updated = [...languages, value];
      setLanguages(updated);
      if (onUpdate) onUpdate(updated);
    }
  };

  return (
    <div
      className="rounded-xl p-8 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Languages</h2>

      <div className="flex flex-wrap gap-3">
        {commonLanguages.map((lang) => (
          <button
            key={lang}
            onClick={() => isEditing && toggleLanguage(lang)}
            disabled={!isEditing}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              isEditing ? "cursor-pointer hover:opacity-90" : "cursor-default"
            }`}
            style={{
              backgroundColor: languages.includes(lang)
                ? theme.colors.primaryCyan
                : `${theme.colors.primaryCyan}20`,
              color: languages.includes(lang)
                ? "white"
                : theme.colors.primaryCyan,
            }}
          >
            {lang}
          </button>
        ))}

        {/* Custom languages (if any not in common list) */}
        {languages
          .filter((lang) => !commonLanguages.includes(lang))
          .map((lang, i) => (
            <span
              key={i}
              className="px-6 py-3 rounded-full font-medium"
              style={{
                backgroundColor: theme.colors.primaryCyan,
                color: "white",
              }}
            >
              {lang}
            </span>
          ))}
      </div>

      {isEditing && (
        <div className="mt-6">
          <input
            type="text"
            placeholder="Add custom language..."
            className="w-full px-5 py-3 rounded-lg text-white placeholder-gray-500"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              border: `1px solid ${theme.colors.primaryCyan}33`,
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addCustomLanguage(e.target.value.trim());
                e.target.value = "";
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
