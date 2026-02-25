import { Globe, Mail, Phone } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";

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
    const updated = {
      ...editableContactInfo,
      [field]: value,
    };

    setEditableContactInfo(updated);
    updatePlayerProfileData?.({ contact: updated });
  };

  return (
    <div
      className="p-6 rounded-xl border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">Contact Information</h3>
      </div>

      {/* CONTENT */}
      <div className="space-y-5">
        {/* EMAIL */}
        <div className="flex items-start gap-3">
          {!isEditing && (
            <div
              className="p-3 rounded-full border flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan}33, ${theme.colors.primaryMagenta}33)`,
                borderColor: `${theme.colors.primaryCyan}50`,
              }}
            >
              <Mail
                className="w-5 h-5"
                style={{ color: theme.colors.primaryCyan }}
              />
            </div>
          )}

          {isEditing ? (
            <div className="w-full">
              <label className="text-sm text-gray-400 mb-1 block">Email</label>
              <Input
                type="email"
                value={editableContactInfo.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
              />
            </div>
          ) : (
            <div>
              <div className="text-gray-300">Email</div>
              <div className="text-gray-300">{initialContactInfo.email}</div>
            </div>
          )}
        </div>

        {/* PHONE */}
        <div className="flex items-start gap-3">
          {!isEditing && (
            <div
              className="p-3 rounded-full border flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan}33, ${theme.colors.primaryMagenta}33)`,
                borderColor: `${theme.colors.primaryCyan}50`,
              }}
            >
              <Phone
                className="w-5 h-5"
                style={{ color: theme.colors.primaryCyan }}
              />
            </div>
          )}

          {isEditing ? (
            <div className="w-full">
              <label className="text-sm text-gray-400 mb-1 block">Phone</label>
              <Input
                type="tel"
                value={editableContactInfo.phone}
                onChange={(e) => handleContactChange("phone", e.target.value)}
              />
            </div>
          ) : (
            <div className="text-sm">
              <div className="text-gray-300">Phone</div>
              <div className="text-gray-300">{initialContactInfo.phone}</div>
            </div>
          )}
        </div>

        {/* WEBSITE */}
        <div className="flex items-start gap-3">
          {!isEditing && (
            <div
              className="p-3 rounded-full border flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan}33, ${theme.colors.primaryMagenta}33)`,
                borderColor: `${theme.colors.primaryCyan}50`,
              }}
            >
              <Globe
                className="w-5 h-5"
                style={{ color: theme.colors.primaryCyan }}
              />
            </div>
          )}

          {isEditing ? (
            <div className="w-full">
              <label className="text-sm text-gray-400 mb-1 block">
                Website
              </label>
              <Input
                type="url"
                value={editableContactInfo.website}
                onChange={(e) => handleContactChange("website", e.target.value)}
              />
            </div>
          ) : (
            <div className="text-sm">
              <div className="text-gray-300">Website</div>
              <div
                className="text-gray-300"
                style={{ color: theme.colors.primaryCyan }}
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
