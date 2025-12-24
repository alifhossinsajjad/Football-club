import { Globe, Mail, Phone, SquarePen } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input"; // Custom Input

export default function ContactInformation({
  playerProfileData,
  isEditing,
  updatePlayerProfileData,
}) {
  const theme = useSelector((state) => state.theme);

  const initialContactInfo = playerProfileData.contact || {
    email: "sourav.debnath@email.com",
    phone: "+44 7700 900000",
    website: "www.souravdebnath.com",
  };

  const [editableContactInfo, setEditableContactInfo] =
    useState(initialContactInfo);

  const handleContactChange = (field, value) => {
    const updatedContactInfo = {
      ...editableContactInfo,
      [field]: value,
    };

    setEditableContactInfo(updatedContactInfo);

    if (updatePlayerProfileData) {
      updatePlayerProfileData({ contact: updatedContactInfo });
    }
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
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          Contact Information
        </h3>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div
            style={{
              color: theme.colors.primaryCyan,
              background: `linear-gradient(180deg, ${theme.colors.primaryCyan}33, ${theme.colors.primaryMagenta}33)`,
              borderColor: `${theme.colors.primaryCyan}50`,
            }}
            className="p-3 rounded-full border flex items-center justify-center"
          >
            <Mail
              className="w-5 h-5 "
              style={{
                color: theme.colors.primaryCyan,
              }}
            />
          </div>
          {isEditing ? (
            <Input
              value={editableContactInfo.email}
              onChange={(e) => handleContactChange("email", e.target.value)}
              type="email"
            />
          ) : (
            <span className="text-gray-300">{initialContactInfo.email}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div
            style={{
              color: theme.colors.primaryCyan,
              background: `linear-gradient(180deg, ${theme.colors.primaryCyan}33, ${theme.colors.primaryMagenta}33)`,
              borderColor: `${theme.colors.primaryCyan}50`,
            }}
            className="p-3 rounded-full border flex items-center justify-center"
          >
            <Phone
              className="w-5 h-5 "
              style={{
                color: theme.colors.primaryCyan,
              }}
            />
          </div>
          {isEditing ? (
            <Input
              value={editableContactInfo.phone}
              onChange={(e) => handleContactChange("phone", e.target.value)}
              type="tel"
            />
          ) : (
            <div className="text-sm">
              <div className="text-gray-300">Phone</div>
              <div className="text-gray-300">{initialContactInfo.phone}</div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div
            style={{
              color: theme.colors.primaryCyan,
              background: `linear-gradient(180deg, ${theme.colors.primaryCyan}33, ${theme.colors.primaryMagenta}33)`,
              borderColor: `${theme.colors.primaryCyan}50`,
            }}
            className="p-3 rounded-full border flex items-center justify-center"
          >
            <Globe
              className="w-5 h-5 "
              style={{
                color: theme.colors.primaryCyan,
              }}
            />
          </div>
          {isEditing ? (
            <Input
              value={editableContactInfo.website}
              onChange={(e) => handleContactChange("website", e.target.value)}
              type="url"
            />
          ) : (
            <div className="text-sm">
              <div className="text-gray-300">Website</div>
              <div
                className="text-gray-300"
                style={{
                  color: theme.colors.primaryCyan,
                }}
              >
                {initialContactInfo.website}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
