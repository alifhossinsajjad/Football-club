import React from "react";
import { useSelector } from "react-redux";
import { SquarePen } from "lucide-react";

export default function AboutPlayerProfile({ playerProfileData }) {
  const theme = useSelector((state) => state.theme);
  const { isEditing } = playerProfileData;
  
  return (
    <div
      className="p-6 rounded-xl border relative"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-white">About</h2>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      <p className="text-gray-300 leading-relaxed">
        Highly skilled and dedicated forward with exceptional technical
        abilities and a strong goal-scoring record. Known for excellent ball
        control, pace, and tactical awareness. Currently playing for Manchester
        United Youth Academy and representing England U-18 National Team.
        Passionate about developing my skills and pursuing a professional career
        in football at the highest level.
      </p>
      
      {isEditing && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-opacity">
          <button className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
            <SquarePen className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
