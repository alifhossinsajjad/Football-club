"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePlatformName,
  updateTagline,
  updateColor,
} from "@/store/slices/themeSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { showSuccessToast } from "@/components/ui/toast";

export default function GeneralSettingsPage() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const [localPlatformName, setLocalPlatformName] = useState(
    theme.platformName
  );
  const [localTagline, setLocalTagline] = useState(theme.tagline);
  const [localColors, setLocalColors] = useState(theme.colors);

  useEffect(() => {
    setLocalPlatformName(theme.platformName);
    setLocalTagline(theme.tagline);
    setLocalColors(theme.colors);
  }, [theme]);

  const handleSave = () => {
    dispatch(updatePlatformName(localPlatformName));
    dispatch(updateTagline(localTagline));
    Object.entries(localColors).forEach(([key, value]) => {
      dispatch(updateColor({ colorKey: key, value }));
    });
    showSuccessToast();
  };

  const handleCancel = () => {
    setLocalPlatformName(theme.platformName);
    setLocalTagline(theme.tagline);
    setLocalColors(theme.colors);
  };

  return (
    <div
      className="border rounded-lg p-4 lg:p-8"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="space-y-6 lg:space-y-8">
        {/* Platform Information */}
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">
            Platform Information
          </h2>

          <div className="space-y-4 lg:space-y-6">
            {/* Platform Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Platform Name
              </label>
              <Input
                value={localPlatformName}
                onChange={(e) => setLocalPlatformName(e.target.value)}
                placeholder="Enter platform name"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>

            {/* Tagline */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tagline
              </label>
              <Input
                value={localTagline}
                onChange={(e) => setLocalTagline(e.target.value)}
                placeholder="Enter platform tagline"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>

            {/* Platform Logo */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Platform Logo
              </label>
              <p className="text-xs text-gray-400 mb-3">
                Recommended size: 200x60px (PNG/SVG)
              </p>
              <div
                className="border-2 border-dashed rounded-lg p-6 lg:p-8 hover:opacity-80 transition-all cursor-pointer"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}4D`,
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <Upload
                    className="w-10 h-10 lg:w-12 lg:h-12 mb-3"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                  <p className="text-xs lg:text-sm text-white mb-1 text-center">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 text-center">
                    PNG, SVG up to 2MB
                  </p>
                </div>
              </div>
            </div>

            {/* Favicon */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Favicon
              </label>
              <p className="text-xs text-gray-400 mb-3">32x32px (ICO/PNG)</p>
              <div
                className="border-2 border-dashed rounded-lg p-6 lg:p-8 hover:opacity-80 transition-all cursor-pointer"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}4D`,
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <Upload
                    className="w-10 h-10 lg:w-12 lg:h-12 mb-3"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                  <p className="text-xs lg:text-sm text-white mb-1 text-center">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 text-center">
                    ICO, PNG up to 1MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Colors */}
        <div
          className="pt-6 lg:pt-8 border-t"
          style={{ borderColor: `${theme.colors.primaryCyan}33` }}
        >
          <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">
            Brand Colors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* Primary Cyan */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Primary Cyan
              </label>
              <div className="flex gap-3">
                <div
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg border-2 cursor-pointer transition-all flex-shrink-0"
                  style={{
                    backgroundColor: localColors.primaryCyan,
                    borderColor: `${theme.colors.primaryCyan}4D`,
                  }}
                />
                <Input
                  value={localColors.primaryCyan}
                  onChange={(e) =>
                    setLocalColors({
                      ...localColors,
                      primaryCyan: e.target.value,
                    })
                  }
                  placeholder="#04B5A3"
                  className="flex-1 text-sm"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>
            </div>

            {/* Primary Magenta */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Primary Magenta
              </label>
              <div className="flex gap-3">
                <div
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg border-2 cursor-pointer transition-all flex-shrink-0"
                  style={{
                    backgroundColor: localColors.primaryMagenta,
                    borderColor: `${theme.colors.primaryCyan}4D`,
                  }}
                />
                <Input
                  value={localColors.primaryMagenta}
                  onChange={(e) =>
                    setLocalColors({
                      ...localColors,
                      primaryMagenta: e.target.value,
                    })
                  }
                  placeholder="#9C27B0"
                  className="flex-1 text-sm"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>
            </div>

            {/* Background Dark */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Background Dark
              </label>
              <div className="flex gap-3">
                <div
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg border-2 cursor-pointer transition-all flex-shrink-0"
                  style={{
                    backgroundColor: localColors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}4D`,
                  }}
                />
                <Input
                  value={localColors.backgroundDark}
                  onChange={(e) =>
                    setLocalColors({
                      ...localColors,
                      backgroundDark: e.target.value,
                    })
                  }
                  placeholder="#0B0D2C"
                  className="flex-1 text-sm"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>
            </div>

            {/* Background Card */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Background Card
              </label>
              <div className="flex gap-3">
                <div
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg border-2 cursor-pointer transition-all flex-shrink-0"
                  style={{
                    backgroundColor: localColors.backgroundCard,
                    borderColor: `${theme.colors.primaryCyan}4D`,
                  }}
                />
                <Input
                  value={localColors.backgroundCard}
                  onChange={(e) =>
                    setLocalColors({
                      ...localColors,
                      backgroundCard: e.target.value,
                    })
                  }
                  placeholder="#12143A"
                  className="flex-1 text-sm"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row justify-end gap-3 lg:gap-4 pt-6 border-t"
          style={{ borderColor: `${theme.colors.primaryCyan}33` }}
        >
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full sm:w-auto px-6"
            style={{
              borderColor: `${theme.colors.primaryCyan}4D`,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="w-full sm:w-auto px-6"
            style={{
              backgroundColor: "#04B5A3",
              backgroundImage: "none",
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
