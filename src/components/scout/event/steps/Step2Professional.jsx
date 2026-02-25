"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/player/select";
import {
  Building2,
  Globe,
  Briefcase,
  BadgeCheck,
  Timer,
  CircleAlert,
} from "lucide-react";

export default function Step2Professional({ theme }) {
  return (
    <div
      className="rounded-xl p-10 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-white mb-8">
        Professional Information
      </h2>

      <div className="space-y-8">
        {/* Organization */}
        <Input
          label="Organization / Agency *"
          placeholder="Enter organization or agency name"
          className="h-14 rounded-xl"
        />

        {/* Region & Specialization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Region / Country *
            </label>
            <Select>
              <SelectTrigger className="h-14 rounded-xl flex items-center gap-2">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="south-america">South America</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Specialization *
            </label>
            <Select>
              <SelectTrigger className="h-14 rounded-xl flex items-center gap-2">
                <SelectValue placeholder="Select specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="youth">Youth Development</SelectItem>
                <SelectItem value="senior">Senior Teams</SelectItem>
                <SelectItem value="goalkeeping">Goalkeeping</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* License & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="License / Certification Number *"
            placeholder="Enter license or certification number"
            className="h-14 rounded-xl"
          />

          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Years of Experience *
            </label>
            <Select>
              <SelectTrigger className="h-14 rounded-xl flex items-center gap-2">
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-3">1-3 years</SelectItem>
                <SelectItem value="4-10">4-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Info box */}
        <div
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: `${theme.colors.backgroundDark}80`,
            borderColor: `${theme.colors.primaryCyan}22`,
          }}
        >
          <div className="text-sm text-gray-300 leading-relaxed flex gap-4">
            <CircleAlert
              className="w-6 h-6 mt-1"
              style={{ color: theme.colors.primaryCyan }}
            />
            <div>
              <div className="font-semibold text-white mb-1">
                Professional Verification
              </div>
              Your professional information helps us verify your credentials and
              connect you with relevant talent opportunities. All information is
              kept confidential.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
