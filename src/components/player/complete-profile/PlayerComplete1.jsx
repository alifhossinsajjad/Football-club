"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Hash, Ruler, Weight, MapPin, Globe } from "lucide-react";
import { useSelector } from "react-redux";

export default function PlayerComplete1({ formData, updateFormData }) {
  const theme = useSelector((state) => state.theme);

  return (
    <div>
      <div className="text-center mb-8">
        <div
          className="w-20 h-20 rounded-full  mx-auto flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(180deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
          }}
        >
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Complete Your Profile
        </h2>
        <p className="text-gray-400">Tell us about your football profile</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Hash className="w-4 h-4" />
              Player Position *
            </label>
            <Input
              placeholder="Preferred Position"
              className="h-12"
              value={formData.position || ""}
              onChange={(e) => updateFormData({ position: e.target.value })}
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Ruler className="w-4 h-4" />
              Height (cm) *
            </label>
            <Input
              placeholder="Height"
              className="h-12"
              value={formData.height || ""}
              onChange={(e) => updateFormData({ height: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Weight className="w-4 h-4" />
              Weight (kg) *
            </label>
            <Input
              placeholder="Weight"
              className="h-12"
              value={formData.weight || ""}
              onChange={(e) => updateFormData({ weight: e.target.value })}
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <MapPin className="w-4 h-4" />
              City *
            </label>
            <Input
              placeholder="City"
              className="h-12"
              value={formData.city || ""}
              onChange={(e) => updateFormData({ city: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
            <Globe className="w-4 h-4" />
            Country *
          </label>
          <Input
            placeholder="Country"
            className="h-12"
            value={formData.country || ""}
            onChange={(e) => updateFormData({ country: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
