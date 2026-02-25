"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { showSuccessToast } from "@/components/ui/toast";

export default function EditEventPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();
  const params = useParams();

  // Form state
  const [eventName, setEventName] = useState("Youth Trial - Summer 2025");
  const [eventType, setEventType] = useState("Trial");
  const [status, setStatus] = useState("Active");
  const [date, setDate] = useState("15/09/2025");
  const [time, setTime] = useState("10:00");
  const [location, setLocation] = useState("Barcelona, Spain");
  const [capacity, setCapacity] = useState("100");
  const [registrationFee, setRegistrationFee] = useState("€50");
  const [description, setDescription] = useState(
    "This is a comprehensive trial event for talented young players."
  );
  const [contactEmail, setContactEmail] = useState("events@club.com");
  const [contactPhone, setContactPhone] = useState("+34 XXX XXX XXX");

  const handleSave = () => {
    showSuccessToast("Changes Saved!", "Event has been updated successfully");
    setTimeout(() => {
      router.push(`/club/event-management/${params.id}`);
    }, 1500);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleCancelEvent = () => {
    if (
      confirm(
        "Are you sure you want to cancel this event? This action cannot be undone."
      )
    ) {
      showSuccessToast("Event Cancelled", "The event has been cancelled");
      setTimeout(() => {
        router.push("/club/event-management");
      }, 1500);
    }
  };

  const handleDeleteEvent = () => {
    if (
      confirm(
        "Are you sure you want to delete this event? This action cannot be undone and all registrations will be lost."
      )
    ) {
      showSuccessToast(
        "Event Deleted",
        "The event has been permanently deleted"
      );
      setTimeout(() => {
        router.push("/club/event-management");
      }, 1500);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.backgroundDark }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-30 border-b flex items-center justify-between px-6 py-4 mb-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}1A`,
        }}
      >
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          style={{ color: theme.colors.primaryCyan }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium hidden sm:inline">Back</span>
        </button>

        <div className="flex-1 text-center">
          <h1
            className="text-xl font-bold"
            style={{
              backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Edit Event
          </h1>
          <p className="text-gray-400 text-xs mt-1">Update event information</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg border font-semibold text-sm transition-all hover:opacity-80"
            style={{
              borderColor: `${theme.colors.primaryCyan}40`,
              color: "white",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-90 flex items-center gap-2"
            style={{ backgroundColor: theme.colors.neonAccent, color: "white" }}
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-6">
                Basic Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Event Name
                  </label>
                  <Input
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Event Type
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg h-10 text-sm"
                      style={{
                        backgroundColor: theme.colors.backgroundDark,
                        borderColor: `${theme.colors.primaryCyan}33`,
                        border: `1px solid ${theme.colors.primaryCyan}33`,
                        color: "#FFFFFF",
                      }}
                    >
                      <option value="Trial">Trial</option>
                      <option value="Showcase">Showcase</option>
                      <option value="Tournament">Tournament</option>
                      <option value="Camp">Camp</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg h-10 text-sm"
                      style={{
                        backgroundColor: theme.colors.backgroundDark,
                        borderColor: `${theme.colors.primaryCyan}33`,
                        border: `1px solid ${theme.colors.primaryCyan}33`,
                        color: "#FFFFFF",
                      }}
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Date
                    </label>
                    <Input
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      style={{
                        backgroundColor: theme.colors.backgroundDark,
                        borderColor: `${theme.colors.primaryCyan}33`,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Time
                    </label>
                    <Input
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      style={{
                        backgroundColor: theme.colors.backgroundDark,
                        borderColor: `${theme.colors.primaryCyan}33`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Capacity */}
            <div
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-6">
                Location & Capacity
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Location
                  </label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Capacity
                    </label>
                    <Input
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      type="number"
                      style={{
                        backgroundColor: theme.colors.backgroundDark,
                        borderColor: `${theme.colors.primaryCyan}33`,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Registration Fee
                    </label>
                    <Input
                      value={registrationFee}
                      onChange={(e) => setRegistrationFee(e.target.value)}
                      style={{
                        backgroundColor: theme.colors.backgroundDark,
                        borderColor: `${theme.colors.primaryCyan}33`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-6">
                Event Description
              </h2>

              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    border: `1px solid ${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-6">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Contact Email
                  </label>
                  <Input
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    type="email"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Contact Phone
                  </label>
                  <Input
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Event Statistics */}
            <div
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <h3 className="text-lg font-bold text-white mb-4">
                Event Statistics
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Total Views</p>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: theme.colors.primaryCyan }}
                  >
                    1,234
                  </p>
                </div>

                <div
                  className="pt-4 border-t"
                  style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
                >
                  <p className="text-gray-400 text-sm mb-2">Registrations</p>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: theme.colors.primaryCyan }}
                  >
                    45/100
                  </p>
                </div>

                <div
                  className="pt-4 border-t"
                  style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
                >
                  <p className="text-gray-400 text-sm mb-2">Confirmed</p>
                  <p className="text-white text-xl font-bold">38</p>
                </div>

                <div
                  className="pt-4 border-t"
                  style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
                >
                  <p className="text-gray-400 text-sm mb-2">Pending</p>
                  <p className="text-white text-xl font-bold">7</p>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div
              className="border rounded-lg p-6"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderColor: "rgba(239, 68, 68, 0.3)",
              }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Danger Zone</h3>

              <div className="space-y-3">
                <button
                  onClick={handleCancelEvent}
                  className="w-full py-2.5 rounded-lg border font-semibold text-sm transition-all hover:bg-opacity-10"
                  style={{
                    borderColor: "rgba(239, 68, 68, 0.5)",
                    color: "#EF4444",
                  }}
                >
                  Cancel Event
                </button>

                <button
                  onClick={handleDeleteEvent}
                  className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                  style={{
                    backgroundColor: "#DC2626",
                    color: "white",
                  }}
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-gray-500 text-xs">
          © 2025 NextGen Pros. All rights reserved.
        </p>
      </div>
    </div>
  );
}
