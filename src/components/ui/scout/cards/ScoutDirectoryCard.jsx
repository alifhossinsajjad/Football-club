"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, MessageSquare, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ScoutDirectoryCard({ scout, theme }) {
  const {
    image,
    name,
    role,
    countries,
    specializations,
    experience,
    connections,
  } = scout;

  const router = useRouter();

  return (
    <div
      className="rounded-2xl p-8 border space-y-6 transition-all hover:shadow-2xl"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Header: Image, Name, Role */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full overflow-hidden ">
            <Image
              src={image}
              alt={name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-gray-300 text-sm">{role}</p>
            {/* Countries */}
            <div
              className="flex items-center gap-3 "
              style={{
                color: theme.colors.primaryCyan,
              }}
            >
              <MapPin className="w-5 h-5 text-primaryCyan" />
              <p className="text-sm">{countries}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div>
        <p className="text-gray-400 text-sm mb-2">Specializations</p>
        <div className="flex flex-wrap gap-2">
          {specializations.map((spec, i) => (
            <span
              key={i}
              className="px-4 py-1.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${theme.colors.primaryCyan}20`,
                color: theme.colors.primaryCyan,
              }}
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Experience & Connections */}
      <div className="grid grid-cols-2 gap-6 border-t pt-4">
        <div>
          <p className="text-gray-400 text-sm">Experience</p>
          <p className="text-white font-bold text-lg">{experience} years</p>
        </div>
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-primaryCyan" />
          <div>
            <p className="text-gray-400 text-sm">Connections</p>
            <p className="text-white font-bold text-lg">{connections}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          onClick={() => router.push(`/scout/scout-directory/${scout.id}`)}
          variant="outline"
          className="flex-1  py-3 font-medium"
          style={{ backgroundColor: theme.colors.primaryCyan }}
        >
          View Profile
        </Button>
        <Button
          variant="outline"
          className="p-3 rounded-md"
          style={{ borderColor: `${theme.colors.primaryCyan}33` }}
        >
          <MessageSquare
            className="w-5 h-5"
            style={{ color: theme.colors.primaryCyan }}
          />
        </Button>
      </div>
    </div>
  );
}
