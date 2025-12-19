import { Mail, Phone, SquarePen } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ContactInformation({ playerProfileData }) {
  const theme = useSelector((state) => state.theme);
  const { isEditing } = playerProfileData;
  
  // Local state for editable contact info
  const [contactInfo, setContactInfo] = useState({
    email: "john.doe@email.com",
    phone: "+44 7700 900000"
  });
  
  // Handler for updating contact info
  const handleContactChange = (field, value) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
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
          {isEditing ? (
            <input
              type="email"
              className="text-gray-300 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
              value={contactInfo.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
            />
          ) : (
            <span className="text-gray-300">{contactInfo.email}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Phone
            className="w-5 h-5 text-gray-400"
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          {isEditing ? (
            <input
              type="tel"
              className="text-gray-300 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
              value={contactInfo.phone}
              onChange={(e) => handleContactChange('phone', e.target.value)}
            />
          ) : (
            <span className="text-gray-300">{contactInfo.phone}</span>
          )}
        </div>
      </div>
    </div>
  );
}
