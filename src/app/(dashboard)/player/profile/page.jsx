"use client";

import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Edit2,
  Upload,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Youtube,
  Flag,
  Trophy,
  Eye,
  MessageSquare,
  Calendar,
  Users,
  Plus,
} from "lucide-react";

export default function PlayerProfilePage() {
  const theme = useSelector((state) => state.theme);

  return (
    <div className="space-y-8">
      {/* Cover Photo with Trophies */}
      <div className="relative rounded-xl overflow-hidden">
        <img
          src="https://via.placeholder.com/1920x600/1a1a2e/00E5FF?text=Trophies+Banner"
          alt="Cover"
          className="w-full h-64 lg:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-3">
          <Button
            className="rounded-full"
            variant="outline"
            style={{
              borderColor: theme.colors.primaryCyan,
              color: theme.colors.primaryCyan,
            }}
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button
            className="rounded-full"
            style={{ backgroundColor: theme.colors.primaryCyan }}
          >
            <Upload className="w-4 h-4 mr-2" />
            Boost Profile
          </Button>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="relative -mt-32 lg:-mt-48 px-6 lg:px-0">
        <div
          className="rounded-2xl p-6 lg:p-8 border"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Profile Photo */}
            <div className="relative -mt-20 lg:-mt-24">
              <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full border-4 border-backgroundCard overflow-hidden">
                <img
                  src="https://via.placeholder.com/300/16213F/FFFFFF?text=JD"
                  alt="John Doe"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Main Info */}
            <div className="flex-1 text-white">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl lg:text-5xl font-bold">John Doe</h1>
                  <p className="text-xl text-gray-400">Forward / Striker</p>
                  <p className="text-lg text-gray-500 flex items-center gap-2">
                    <Flag className="w-5 h-5" /> Manchester, United Kingdom
                  </p>
                </div>
                <div
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${theme.colors.primaryCyan}20`,
                    color: theme.colors.primaryCyan,
                  }}
                >
                  Available
                </div>
              </div>

              {/* Personal Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Age</p>
                  <p className="text-2xl font-bold">17 years</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Height</p>
                  <p className="text-2xl font-bold">5'11" (180 cm)</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Weight</p>
                  <p className="text-2xl font-bold">165 lbs (75 kg)</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Nationality</p>
                  <p className="text-2xl font-bold flex items-center justify-center gap-2">
                    <Flag className="w-6 h-6" /> British
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-3 gap-6 mt-8 text-center">
                <div>
                  <p className="text-gray-400 text-sm">Preferred Foot</p>
                  <p className="text-xl font-bold">Right</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Date of Birth</p>
                  <p className="text-xl font-bold">15/03/2008</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Jersey Number</p>
                  <p className="text-xl font-bold">#10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <div
            className="p-6 rounded-xl border"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h2 className="text-xl font-bold text-white mb-4">About</h2>
            <p className="text-gray-300 leading-relaxed">
              Highly skilled and dedicated forward with exceptional technical
              abilities and a strong goal-scoring record. Known for excellent
              ball control, pace, and tactical awareness. Currently playing for
              Manchester United Youth Academy and representing England U-18
              National Team. Passionate about developing my skills and pursuing
              a professional career in football at the highest level.
            </p>
          </div>

          {/* Career Statistics */}
          <div
            className="p-6 rounded-xl border"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h2 className="text-xl font-bold text-white mb-6">
              Career Statistics (2024/25 Season)
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <div
                className="text-center p-4 rounded-lg"
                style={{ backgroundColor: theme.colors.backgroundDark }}
              >
                <div
                  className="text-4xl font-bold"
                  style={{ color: theme.colors.primaryCyan }}
                >
                  28
                </div>
                <p className="text-sm text-gray-400 mt-2">Matches</p>
              </div>
              <div
                className="text-center p-4 rounded-lg"
                style={{ backgroundColor: theme.colors.backgroundDark }}
              >
                <div className="text-4xl font-bold text-white">19</div>
                <p className="text-sm text-gray-400 mt-2">Goals</p>
              </div>
              <div
                className="text-center p-4 rounded-lg"
                style={{ backgroundColor: theme.colors.backgroundDark }}
              >
                <div className="text-4xl font-bold text-white">12</div>
                <p className="text-sm text-gray-400 mt-2">Assists</p>
              </div>
              <div
                className="text-center p-4 rounded-lg"
                style={{ backgroundColor: theme.colors.backgroundDark }}
              >
                <div
                  className="text-4xl font-bold"
                  style={{ color: theme.colors.primaryCyan }}
                >
                  2,340
                </div>
                <p className="text-sm text-gray-400 mt-2">Minutes</p>
              </div>
            </div>
          </div>

          {/* Skills & Attributes */}
          <div
            className="p-6 rounded-xl border"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Skills & Attributes
            </h2>
            <div className="space-y-4">
              {[
                { skill: "Pace", value: 92 },
                { skill: "Shooting", value: 88 },
                { skill: "Dribbling", value: 90 },
                { skill: "Passing", value: 85 },
                { skill: "Physical", value: 82 },
                { skill: "Technical", value: 89 },
              ].map(({ skill, value }) => (
                <div key={skill}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white">{skill}</span>
                    <span className="text-gray-400">{value}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div
                      className="h-3 rounded-full"
                      style={{
                        width: `${value}%`,
                        backgroundColor: theme.colors.primaryCyan,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Playing History */}
          <div
            className="p-6 rounded-xl border"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Playing History
            </h2>
            <div className="space-y-4">
              {[
                {
                  club: "Manchester United Youth Academy",
                  years: "2023 - Present",
                  note: "Forward",
                },
                { club: "FA Youth Cup Runner-Up 2024", years: "", note: "" },
                {
                  club: "England U-18 National Team",
                  years: "2024 - Present",
                  note: "Forward",
                },
                {
                  club: "City Football Academy",
                  years: "2020 - 2023",
                  note: "Regional Champions 2020",
                },
              ].map((item) => (
                <div
                  key={item.club}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                  style={{ borderColor: `${theme.colors.primaryCyan}33` }}
                >
                  <div>
                    <p className="font-medium text-white">{item.club}</p>
                    {item.years && (
                      <p className="text-sm text-gray-400">{item.years}</p>
                    )}
                    {item.note && (
                      <p className="text-sm text-gray-400">{item.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Contact Information */}
          <div
            className="p-6 rounded-xl border"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-lg font-bold text-white mb-4">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">john.doe@email.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">+44 7700 900000</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div
            className="p-6 rounded-xl border"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Social Media</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">@johndoe_10</span>
              </div>
              <div className="flex items-center gap-3">
                <Twitter className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">@johndoe_10</span>
              </div>
              <div className="flex items-center gap-3">
                <Youtube className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">John Doe Football</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div
            className="p-6 rounded-xl border"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Trophy
                className="w-5 h-5"
                style={{ color: theme.colors.primaryCyan }}
              />
              Achievements
            </h3>
            <div className="space-y-3">
              {[
                "Player of the Month - March 2025",
                "Top Scorer U-18 League 2024",
                "England Youth Call-Up 2024",
                "FA Youth Cup Finalist 2024",
                "Academy Player of the Year 2023",
              ].map((ach) => (
                <div key={ach} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-magenta-500 flex-shrink-0" />
                  <p className="text-sm text-gray-300">{ach}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Insights */}
          <div
            className="p-6 rounded-xl border"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-lg font-bold text-white mb-4">
              Profile Insights
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Profile Views</span>
                </div>
                <span className="text-white font-medium">342</span>
              </div>
              <div className="text-sm text-gray-400 ml-8">+124 this week</div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Scout Views</span>
                </div>
                <span className="text-white font-medium">87</span>
              </div>
              <div className="text-sm text-gray-400 ml-8">+35 this week</div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Club Interest</span>
                </div>
                <span className="text-white font-medium">16 clubs</span>
              </div>
              <div className="text-sm text-gray-400 ml-8">
                +8 new this month
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div
            className="p-6 rounded-xl border"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Preferences</h3>
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-gray-400">Preferred League:</span> Premier
                League, Liga Bundesliga
              </p>
              <p>
                <span className="text-gray-400">Contract Status:</span> Open to
                Offers
              </p>
              <p>
                <span className="text-gray-400">Availability:</span> Available
                from Summer 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
