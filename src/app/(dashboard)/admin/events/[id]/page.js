"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, X, Plus, Calendar, MapPin, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function EventDetailsPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();

  const [scheduleItems, setScheduleItems] = useState([
    {
      time: "09:00",
      title: "Registration & Check-In",
      description: "Arrival and participant registration",
    },
    {
      time: "10:00",
      title: "Warm-up Session",
      description: "Group warm-up and preparation",
    },
    {
      time: "11:00",
      title: "Technical Skills Assessment",
      description: "Individual skills evaluation",
    },
    {
      time: "12:30",
      title: "Lunch Break",
      description: "Refreshments provided",
    },
    {
      time: "14:00",
      title: "Practice Match",
      description: "Full game situation evaluation",
    },
    {
      time: "16:00",
      title: "Closing & Feedback",
      description: "Individual feedback sessions",
    },
  ]);

  const [requirements, setRequirements] = useState([
    {
      title: "Age Requirement",
      description: "Players must be between 16-18 years old",
    },
    {
      title: "Experience Level",
      description:
        "Minimum 2 years of competitive football experience required",
    },
    {
      title: "Medical Clearance",
      description:
        "Completed medical clearance form must be submitted before the event",
    },
    {
      title: "Equipment",
      description:
        "Bring your own football boots, shin guards, and training gear",
    },
    {
      title: "Photo ID",
      description: "Valid photo/identification document required for check-in",
    },
  ]);

  const addScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      { time: "", title: "", description: "" },
    ]);
  };

  const removeScheduleItem = (index) => {
    setScheduleItems(scheduleItems.filter((_, i) => i !== index));
  };

  const addRequirement = () => {
    setRequirements([...requirements, { title: "", description: "" }]);
  };

  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <Link href="/admin/events">
          <button
            className="flex items-center gap-2 text-sm mb-4 transition-all hover:scale-105"
            style={{ color: theme.colors.primaryCyan }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Event Details
          </button>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              backgroundColor: "transparent",
              border: `1px solid ${theme.colors.primaryCyan}33`,
              color: "#9CA3AF",
            }}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
            style={{
              backgroundColor: theme.colors.neonAccent,
            }}
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Title, Registration Fee, Location */}
          <div
            className="rounded-lg border p-6"
            style={{
              background: `linear-gradient(180deg, ${theme.colors.primaryCyan}15 0%, ${theme.colors.primaryMagenta}15 100%)`,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Event Title
                </label>
                <Input
                  type="text"
                  value="Elite Youth Trial"
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
                  Registration Fee (€)
                </label>
                <Input
                  type="number"
                  value="50"
                  className="w-full"
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
                Location
              </label>
              <Input
                type="text"
                value="Madrid, Spain"
                className="w-full"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  color: "#FFFFFF",
                }}
              />
            </div>
          </div>

          {/* About This Event */}
          <div
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              About This Event
            </h3>
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Details
              </label>
              <textarea
                defaultValue="An exclusive opportunity for talented young players to showcase their skills in front of professional scouts and coaches. This comprehensive trial day includes technical assessments, tactical evaluations, and competitive match play scenarios."
                rows={4}
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

          {/* Event Schedule */}
          <div
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">
                Event Schedule
              </h3>
              <button
                onClick={addScheduleItem}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: "rgba(0, 229, 255, 0.2)",
                  color: theme.colors.primaryCyan,
                }}
              >
                + Add Item
              </button>
            </div>

            <div className="space-y-3">
              {scheduleItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4 relative"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}1A`,
                  }}
                >
                  <button
                    onClick={() => removeScheduleItem(index)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg transition-colors hover:bg-red-500 hover:bg-opacity-20"
                    style={{ color: "#EF4444" }}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex gap-4 pr-8">
                    <div className="w-24 flex-shrink-0">
                      <label className="block text-gray-400 text-xs mb-1">
                        Time
                      </label>
                      <Input
                        type="text"
                        value={item.time}
                        placeholder="HH:MM"
                        className="w-full text-sm"
                        style={{
                          backgroundColor: theme.colors.backgroundCard,
                          borderColor: `${theme.colors.primaryCyan}33`,
                          color: "#FFFFFF",
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-3">
                        <label className="block text-gray-400 text-xs mb-1">
                          Activity Title
                        </label>
                        <Input
                          type="text"
                          value={item.title}
                          placeholder="Title"
                          className="w-full text-sm"
                          style={{
                            backgroundColor: theme.colors.backgroundCard,
                            borderColor: `${theme.colors.primaryCyan}33`,
                            color: "#FFFFFF",
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-xs mb-1">
                          Description
                        </label>
                        <Input
                          type="text"
                          value={item.description}
                          placeholder="Description"
                          className="w-full text-sm"
                          style={{
                            backgroundColor: theme.colors.backgroundCard,
                            borderColor: `${theme.colors.primaryCyan}33`,
                            color: "#FFFFFF",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Requirements</h3>
              <button
                onClick={addRequirement}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: "rgba(0, 229, 255, 0.2)",
                  color: theme.colors.primaryCyan,
                }}
              >
                + Add Requirement
              </button>
            </div>

            <div className="space-y-3">
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4 relative"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}1A`,
                  }}
                >
                  <button
                    onClick={() => removeRequirement(index)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg transition-colors hover:bg-red-500 hover:bg-opacity-20"
                    style={{ color: "#EF4444" }}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="pr-8 space-y-3">
                    <Input
                      type="text"
                      value={req.title}
                      placeholder="Requirement title"
                      className="w-full text-sm"
                      style={{
                        backgroundColor: theme.colors.backgroundCard,
                        borderColor: `${theme.colors.primaryCyan}33`,
                        color: "#FFFFFF",
                      }}
                    />
                    <Input
                      type="text"
                      value={req.description}
                      placeholder="Requirement description"
                      className="w-full text-sm"
                      style={{
                        backgroundColor: theme.colors.backgroundCard,
                        borderColor: `${theme.colors.primaryCyan}33`,
                        color: "#FFFFFF",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Event Information */}
          <div
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Event Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-xs mb-1">Date</label>
                <Input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className="w-full text-sm"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    color: "#FFFFFF",
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 text-xs mb-1">
                    Start Time
                  </label>
                  <Input
                    type="text"
                    placeholder="HH:MM"
                    className="w-full text-sm"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      color: "#FFFFFF",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1">
                    End Time
                  </label>
                  <Input
                    type="text"
                    placeholder="HH:MM"
                    className="w-full text-sm"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      color: "#FFFFFF",
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-1">
                  Venue
                </label>
                <Input
                  type="text"
                  value="Training Complex Stadium"
                  className="w-full text-sm"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    color: "#FFFFFF",
                  }}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-1">
                  Organiser Name
                </label>
                <Input
                  type="text"
                  value="Elite Football Academy"
                  className="w-full text-sm"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    color: "#FFFFFF",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Availability */}
          <div
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Availability
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 text-xs mb-1">
                    Spots Available
                  </label>
                  <Input
                    type="text"
                    value="48"
                    className="w-full text-sm"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      color: "#FFFFFF",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1">
                    Total Spots
                  </label>
                  <Input
                    type="text"
                    value="100"
                    className="w-full text-sm"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      color: "#FFFFFF",
                    }}
                  />
                </div>
              </div>
              <div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: theme.colors.backgroundDark }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "52%",
                      background: `linear-gradient(90deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-xs mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value="contact@elitefootacademy.com"
                  className="w-full text-sm"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    color: "#FFFFFF",
                  }}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-1">
                  Phone
                </label>
                <Input
                  type="tel"
                  value="+34 123 456 789"
                  className="w-full text-sm"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    color: "#FFFFFF",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
