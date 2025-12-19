import React from "react";
import { useSelector } from "react-redux";

export default function AboutPlayerProfile() {
  const theme = useSelector((state) => state.theme);
  return (
    <div
      className="p-6 rounded-xl border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h2 className="text-xl font-bold text-white mb-4">About</h2>
      <p className="text-gray-300 leading-relaxed">
        Highly skilled and dedicated forward with exceptional technical
        abilities and a strong goal-scoring record. Known for excellent ball
        control, pace, and tactical awareness. Currently playing for Manchester
        United Youth Academy and representing England U-18 National Team.
        Passionate about developing my skills and pursuing a professional career
        in football at the highest level.
      </p>
    </div>
  );
}
