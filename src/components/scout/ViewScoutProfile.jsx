// ScoutProfilePage.jsx (Scout Profile View)
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ScoutProfilePage({ params }) {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();

  // Mock scout data
  const scout = {
    id: params.id || "1",
    name: "Roberto Martinez",
    role: "Senior Scout - Youth Development",
    image: "/scouts/roberto.jpg",
    coverImage: "/stadium/stadium-banner.jpg",
    location: "Madrid, Spain",
    joined: "January 2020",
    connections: 334,
    experience: 15,
    viewedPlayers: 342,
    viewedChange: "+48 this week",
    shortlistedPlayers: 28,
    activeShortlisted: 12,
    upcomingEvents: 6,
    nextEvent: "Sep 15",
    conversations: 15,
    unread: 5,
    about:
      "Highly experienced and dedicated professional football scout with over 20 years in talent identification and player development. Specialized in youth scouting, technical analysis, and international talent discovery. Successfully identified and recommended numerous players who have gone on to play at the highest levels of European football. Known for meticulous attention to detail, strong networking capabilities, and an exceptional eye for raw talent.",
    specializations: [
      "Youth Scouting",
      "Technical Analysis",
      "Player Development",
      "International Scouting",
    ],
    contact: {
      email: "r.martinez@footballpros.com",
      phone: "+34 7700 900000",
      website: "www.robertomscout.com",
    },
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Back Button */}
      <div className="px-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primaryCyan hover:underline"
        >
          ← Back to Directory
        </button>
      </div>

      {/* Header with Cover Image */}
      <div className="relative h-96 rounded-2xl overflow-hidden">
        <Image
          src={scout.coverImage}
          alt="Stadium"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-backgroundDark via-transparent to-transparent" />

        {/* Profile Card Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div
            className="rounded-2xl p-8 border max-w-4xl mx-auto"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              {/* Profile Image */}
              <div className="relative -mt-20 md:-mt-24">
                <div className="w-40 h-40 rounded-full overflow-hidden border-8 border-backgroundCard">
                  <Image
                    src={scout.image}
                    alt={scout.name}
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Info & Actions */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {scout.name}
                </h1>
                <p className="text-xl text-gray-300 mb-4">{scout.role}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-primaryCyan" />
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="font-medium">{scout.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-primaryCyan" />
                    <div>
                      <p className="text-sm text-gray-400">Joined</p>
                      <p className="font-medium">{scout.joined}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users className="w-5 h-5 text-primaryCyan" />
                    <div>
                      <p className="text-sm text-gray-400">Connections</p>
                      <p className="font-medium">{scout.connections}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Trophy className="w-5 h-5 text-primaryCyan" />
                    <div>
                      <p className="text-sm text-gray-400">Experience</p>
                      <p className="font-medium">{scout.experience} years</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center md:justify-start">
                  <Button
                    className="px-8 py-3 rounded-full font-medium"
                    style={{ backgroundColor: theme.colors.primaryCyan }}
                  >
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    className="px-8 py-3 rounded-full"
                    style={{
                      borderColor: `${theme.colors.primaryCyan}33`,
                      color: theme.colors.primaryCyan,
                    }}
                  >
                    Add to Network
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        <div
          className="rounded-xl p-6 border text-center"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <p className="text-4xl font-bold text-white">{scout.viewedPlayers}</p>
          <p className="text-gray-400 text-sm mt-2">Players Viewed</p>
          <p className="text-primaryCyan text-sm">+48 this week</p>
        </div>
        <div
          className="rounded-xl p-6 border text-center"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <p className="text-4xl font-bold text-white">
            {scout.shortlistedPlayers}
          </p>
          <p className="text-gray-400 text-sm mt-2">Shortlisted Players</p>
          <p className="text-primaryCyan text-sm">
            {scout.activeShortlisted} active
          </p>
        </div>
        <div
          className="rounded-xl p-6 border text-center"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <p className="text-4xl font-bold text-white">
            {scout.upcomingEvents}
          </p>
          <p className="text-gray-400 text-sm mt-2">Upcoming Events</p>
          <p className="text-primaryCyan text-sm">Next: {scout.nextEvent}</p>
        </div>
        <div
          className="rounded-xl p-6 border text-center"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <p className="text-4xl font-bold text-white">{scout.conversations}</p>
          <p className="text-gray-400 text-sm mt-2">Active Conversations</p>
          <p className="text-primaryCyan text-sm">{scout.unread} unread</p>
        </div>
      </div>

      {/* About & Contact Grid */}
      <div className="grid lg:grid-cols-3 gap-8 px-6">
        {/* About */}
        <div className="lg:col-span-2">
          <div
            className="rounded-xl p-8 border"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">About</h2>
            <p className="text-gray-300 leading-relaxed mb-8">{scout.about}</p>

            <div>
              <p className="text-gray-400 text-sm mb-4">Specializations</p>
              <div className="flex flex-wrap gap-3">
                {scout.specializations.map((spec, i) => (
                  <span
                    key={i}
                    className="px-5 py-2 rounded-full font-medium"
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
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <div
            className="rounded-xl p-8 border"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Contact Information
            </h2>
            <div className="space-y-5 text-gray-300">
              <a
                href={`mailto:${scout.contact.email}`}
                className="flex items-center gap-4 hover:text-primaryCyan"
              >
                <Mail className="w-5 h-5 text-primaryCyan" />
                {scout.contact.email}
              </a>
              <a
                href={`tel:${scout.contact.phone}`}
                className="flex items-center gap-4 hover:text-primaryCyan"
              >
                <Phone className="w-5 h-5 text-primaryCyan" />
                {scout.contact.phone}
              </a>
              <a
                href={scout.contact.website}
                className="flex items-center gap-4 hover:text-primaryCyan"
              >
                <Globe className="w-5 h-5 text-primaryCyan" />
                {scout.contact.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
