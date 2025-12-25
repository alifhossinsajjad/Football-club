"use client";

import { useSelector } from "react-redux";
import { Upload, Camera, Mail, Phone, Globe, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ClubForm({ currentStep, formData, setFormData }) {
  const theme = useSelector((state) => state.theme);

  return (
    <div
      className="rounded-lg border p-6"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">
            Basic Information
          </h3>

          {/* Profile Picture */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-3">
              Club Logo
            </label>
            <div className="flex items-center gap-4">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  border: `2px dashed ${theme.colors.primaryCyan}33`,
                }}
              >
                <Camera
                  className="w-8 h-8"
                  style={{ color: theme.colors.primaryCyan }}
                />
              </div>
              <button
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  backgroundColor: "rgba(0, 229, 255, 0.2)",
                  color: theme.colors.primaryCyan,
                }}
              >
                <Upload className="w-4 h-4" />
                Upload Logo
              </button>
            </div>
          </div>

          {/* Club Name */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Club/Academy Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="e.g., FC Barcelona Youth Academy"
              value={formData.clubName}
              onChange={(e) =>
                setFormData({ ...formData, clubName: e.target.value })
              }
              className="w-full"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                color: "#FFFFFF",
              }}
            />
          </div>

          {/* Established Year and Stadium */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Established Year <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="e.g., 1899"
                value={formData.establishedYear}
                onChange={(e) =>
                  setFormData({ ...formData, establishedYear: e.target.value })
                }
                className="w-full"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  color: "#FFFFFF",
                }}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Stadium/Venue
              </label>
              <Input
                type="text"
                placeholder="e.g., Camp Nou"
                value={formData.stadium}
                onChange={(e) =>
                  setFormData({ ...formData, stadium: e.target.value })
                }
                className="w-full"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  color: "#FFFFFF",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Contact Details */}
      {currentStep === 2 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">
            Contact Details
          </h3>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: theme.colors.primaryCyan }}
              />
              <Input
                type="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-11"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  color: "#FFFFFF",
                }}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: theme.colors.primaryCyan }}
              />
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full pl-11"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  color: "#FFFFFF",
                }}
              />
            </div>
          </div>

          {/* Country and City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Globe
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: theme.colors.primaryCyan }}
                />
                <Input
                  type="text"
                  placeholder="e.g., Spain"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="w-full pl-11"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    color: "#FFFFFF",
                  }}
                />
              </div>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: theme.colors.primaryCyan }}
                />
                <Input
                  type="text"
                  placeholder="e.g., Barcelona"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full pl-11"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    color: "#FFFFFF",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Full Address */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Full Address
            </label>
            <textarea
              placeholder="Enter complete address"
              value={formData.fullAddress}
              onChange={(e) =>
                setFormData({ ...formData, fullAddress: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-3 rounded-lg resize-none text-sm"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                border: `1px solid ${theme.colors.primaryCyan}33`,
                color: "#FFFFFF",
              }}
            />
          </div>

          {/* Website URL */}
          <div className="mt-6">
            <label className="block text-white text-sm font-medium mb-2">
              Website URL
            </label>
            <div className="relative">
              <Globe
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: theme.colors.primaryCyan }}
              />
              <Input
                type="url"
                placeholder="https://www.example.com"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="w-full pl-11"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  color: "#FFFFFF",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Club Details */}
      {currentStep === 3 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">
            Club Details
          </h3>

          {/* Stadium Capacity */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Stadium Capacity
            </label>
            <Input
              type="text"
              placeholder="e.g., 50000"
              value={formData.stadiumCapacity}
              onChange={(e) =>
                setFormData({ ...formData, stadiumCapacity: e.target.value })
              }
              className="w-full"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                color: "#FFFFFF",
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              placeholder="Brief description of the club..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={5}
              className="w-full px-4 py-3 rounded-lg resize-none text-sm"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                border: `1px solid ${theme.colors.primaryCyan}33`,
                color: "#FFFFFF",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}