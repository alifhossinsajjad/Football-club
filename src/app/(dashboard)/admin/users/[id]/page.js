"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail, Phone, Edit } from "lucide-react";

export default function UserDetailsPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-lg transition-all hover:scale-110"
          style={{
            backgroundColor: `${theme.colors.primaryCyan}20`,
            color: theme.colors.primaryCyan,
          }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1
            className="text-3xl lg:text-4xl font-bold"
            style={{
              background: `linear-gradient(90deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block",
            }}
          >
            User Details
          </h1>
        </div>
        <Link href="/admin/users/1/edit">
          <button
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
            style={{
              backgroundColor: theme.colors.neonAccent,
            }}
          >
            <Edit className="w-5 h-5" />
            Edit User
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div
          className="rounded-lg border p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <Image
                src="/john-doe.jpg"
                alt="John Doe"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">John Doe</h2>

            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-2"
              style={{
                backgroundColor: `${theme.colors.primaryCyan}33`,
                color: theme.colors.primaryCyan,
              }}
            >
              Player
            </span>

            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: "rgba(0, 201, 80, 0.2)",
                color: "rgba(5, 223, 114, 1)",
              }}
            >
              Active
            </span>
          </div>

          <div
            className="mt-6 pt-6 border-t"
            style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
          >
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-1">Joined Date</p>
              <p className="text-white font-medium">12/01/2025</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">User ID</p>
              <p className="text-white font-medium">#00001</p>
            </div>
          </div>
        </div>

        {/* Right Column - Info Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Email</p>
                <div className="flex items-center gap-2">
                  <Mail
                    className="w-4 h-4"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                  <p className="text-white">john@example.com</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Phone</p>
                <div className="flex items-center gap-2">
                  <Phone
                    className="w-4 h-4"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                  <p className="text-white">+34 612 345 678</p>
                </div>
              </div>
            </div>
          </div>

          {/* Player Information */}
          <div
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Player Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Position</p>
                <p className="text-white font-medium">Midfielder</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Age</p>
                <p className="text-white font-medium">19 years</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Nationality</p>
                <p className="text-white font-medium">Spain</p>
              </div>
            </div>
          </div>

          {/* Account Activity */}
          <div
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Account Activity
            </h3>

            <div className="space-y-4">
              <div
                className="flex items-center justify-between py-3 border-b"
                style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
              >
                <p className="text-gray-400 text-sm">Last Login</p>
                <p className="text-white font-medium">2 hours ago</p>
              </div>
              <div
                className="flex items-center justify-between py-3 border-b"
                style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
              >
                <p className="text-gray-400 text-sm">Profile Views</p>
                <p className="text-white font-medium">156</p>
              </div>
              <div className="flex items-center justify-between py-3">
                <p className="text-gray-400 text-sm">Messages Sent</p>
                <p className="text-white font-medium">42</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
