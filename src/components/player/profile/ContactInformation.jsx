import { Mail, Phone, SquarePen } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function ContactInformation({ playerProfileData }) {
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
        <h3 className="text-lg font-bold text-white">Contact Information</h3>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail
            className="w-5 h-5 text-gray-400"
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          <span className="text-gray-300">john.doe@email.com</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone
            className="w-5 h-5 text-gray-400"
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          <span className="text-gray-300">+44 7700 900000</span>
        </div>
      </div>
      
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
