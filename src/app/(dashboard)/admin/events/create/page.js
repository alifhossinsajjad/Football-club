"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  MapPin,
  FileCheck,
  Check,
  Upload,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { showSuccessToast } from "@/components/ui/toast";

export default function CreateEventPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    category: "",
    targetAudience: [],
    locationType: "Physical venue",
    venueName: "",
    streetAddress: "",
    city: "",
    country: "",
    postalCode: "",
    fullDescription: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    maxParticipants: "",
    registrationDeadline: "",
    entryFee: "0.00",
    currency: "EUR",
    ageRestriction: "No Restriction",
    skillLevel: "All Level",
    accommodationProvided: false,
    mealsProvided: false,
    additionalNotes: "",
  });

  const steps = [
    { number: 1, title: "Basic Info", icon: FileText },
    { number: 2, title: "Location", icon: MapPin },
    { number: 3, title: "Details", icon: FileCheck },
    { number: 4, title: "Review", icon: FileCheck },
  ];

  const targetAudienceOptions = [
    "Players",
    "Clubs",
    "Scouts/Agents",
    "Coaches",
    "Parents",
    "Fans",
  ];

  const toggleTargetAudience = (option) => {
    if (formData.targetAudience.includes(option)) {
      setFormData({
        ...formData,
        targetAudience: formData.targetAudience.filter(
          (item) => item !== option
        ),
      });
    } else {
      setFormData({
        ...formData,
        targetAudience: [...formData.targetAudience, option],
      });
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCreateEvent = () => {
    showSuccessToast(
      "Event Created!",
      "Your event has been created successfully"
    );
    setTimeout(() => {
      router.push("/admin/events");
    }, 500);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-lg transition-all hover:scale-110 mb-6"
          style={{
            backgroundColor: `${theme.colors.primaryCyan}20`,
            color: theme.colors.primaryCyan,
          }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="mb-2">
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
            Create New Event
          </h1>
        </div>
        <p className="text-gray-400 text-sm">
          Step {currentStep} of 4 - Fill in all the details
        </p>
      </div>

      {/* Progress Stepper */}
      <div
        className="rounded-lg border p-6 mb-8"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.number;
            const isActive = currentStep === step.number;

            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all"
                    style={{
                      background:
                        isCompleted || isActive
                          ? `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`
                          : theme.colors.backgroundDark,
                      border:
                        !isCompleted && !isActive
                          ? `1px solid ${theme.colors.primaryCyan}33`
                          : "none",
                    }}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <span
                        className="text-lg font-bold"
                        style={{ color: isActive ? "#FFFFFF" : "#6B7280" }}
                      >
                        {step.number}
                      </span>
                    )}
                  </div>
                  <span
                    className="text-xs font-medium text-center"
                    style={{
                      color: isActive || isCompleted ? "#FFFFFF" : "#6B7280",
                    }}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className="flex-1 h-1 mx-4"
                    style={{
                      background: isCompleted
                        ? theme.colors.primaryCyan
                        : theme.colors.backgroundDark,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div
          className="h-1 rounded-full overflow-hidden"
          style={{ backgroundColor: theme.colors.backgroundDark }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(currentStep / 4) * 100}%`,
              background: theme.colors.primaryCyan,
            }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div
        className="rounded-lg border p-6 mb-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        {currentStep === 1 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FileText
                className="w-5 h-5"
                style={{ color: theme.colors.primaryCyan }}
              />
              <h2 className="text-xl font-semibold text-white">
                Event Basic Information
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Event Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.eventName}
                  onChange={(e) =>
                    setFormData({ ...formData, eventName: e.target.value })
                  }
                  placeholder="e.g., International Youth Football Tournament 2025"
                  className="w-full"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    color: "#FFFFFF",
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Event Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) =>
                      setFormData({ ...formData, eventType: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg h-10 text-sm"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      border: `1px solid ${theme.colors.primaryCyan}33`,
                      color: "#9CA3AF",
                    }}
                  >
                    <option value="">Select Type</option>
                    <option value="trial">Trial</option>
                    <option value="showcase">Showcase</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg h-10 text-sm"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      border: `1px solid ${theme.colors.primaryCyan}33`,
                      color: "#9CA3AF",
                    }}
                  >
                    <option value="">Select Category</option>
                    <option value="youth">Youth</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-3">
                  Target Audience <span className="text-red-500">*</span>{" "}
                  (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {targetAudienceOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleTargetAudience(option)}
                      className="px-4 py-3 rounded-lg text-sm font-medium transition-all text-center"
                      style={
                        formData.targetAudience.includes(option)
                          ? {
                              backgroundColor: theme.colors.backgroundDark,
                              color: "#FFFFFF",
                              border: `1px solid ${theme.colors.primaryCyan}`,
                            }
                          : {
                              backgroundColor: theme.colors.backgroundDark,
                              color: "#9CA3AF",
                              border: `1px solid ${theme.colors.primaryCyan}33`,
                            }
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MapPin
                className="w-5 h-5"
                style={{ color: theme.colors.primaryCyan }}
              />
              <h2 className="text-xl font-semibold text-white">
                Event Location
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Location Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.locationType}
                  onChange={(e) =>
                    setFormData({ ...formData, locationType: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg h-10 text-sm"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    border: `1px solid ${theme.colors.primaryCyan}33`,
                    color: "#FFFFFF",
                  }}
                >
                  <option value="Physical venue">Physical venue</option>
                  <option value="Virtual">Virtual</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Venue Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) =>
                    setFormData({ ...formData, venueName: e.target.value })
                  }
                  placeholder="e.g., Camp Nou Stadium"
                  className="w-full"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    color: "#FFFFFF",
                  }}
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Street Address
                </label>
                <Input
                  type="text"
                  value={formData.streetAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, streetAddress: e.target.value })
                  }
                  placeholder="Street address"
                  className="w-full"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    color: "#FFFFFF",
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="Barcelona"
                    className="w-full"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      color: "#FFFFFF",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg h-10 text-sm"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      border: `1px solid ${theme.colors.primaryCyan}33`,
                      color: "#9CA3AF",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="Spain">Spain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Postal Code
                  </label>
                  <Input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) =>
                      setFormData({ ...formData, postalCode: e.target.value })
                    }
                    placeholder="08028"
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
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FileCheck
                className="w-5 h-5"
                style={{ color: theme.colors.primaryCyan }}
              />
              <h2 className="text-xl font-semibold text-white">
                Event Details
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Full Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullDescription: e.target.value,
                    })
                  }
                  placeholder="Provide a detailed description of the event..."
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="dd/mm/YY"
                    className="w-full"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      color: "#FFFFFF",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="dd/mm/YY"
                    className="w-full"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      color: "#FFFFFF",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="dd/mm/YY"
                    className="w-full"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      color: "#FFFFFF",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="dd/mm/YY"
                    className="w-full"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      color: "#FFFFFF",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Max Participants
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., 200"
                    className="w-full"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      color: "#FFFFFF",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    Registration Deadline
                  </label>
                  <Input
                    type="text"
                    placeholder="dd/mm/YY"
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
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FileCheck
                className="w-5 h-5"
                style={{ color: theme.colors.primaryCyan }}
              />
              <h2 className="text-xl font-semibold text-white">
                Additional Information
              </h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Entry Fee
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={formData.entryFee}
                      className="flex-1"
                      style={{
                        backgroundColor: theme.colors.backgroundDark,
                        borderColor: `${theme.colors.primaryCyan}33`,
                        color: "#FFFFFF",
                      }}
                    />
                    <select
                      className="px-4 py-2 rounded-lg text-sm"
                      style={{
                        backgroundColor: theme.colors.backgroundDark,
                        borderColor: `${theme.colors.primaryCyan}33`,
                        border: `1px solid ${theme.colors.primaryCyan}33`,
                        color: "#FFFFFF",
                        width: "80px",
                      }}
                    >
                      <option>EUR</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty for free events
                  </p>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Age Restriction
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg h-10 text-sm"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      border: `1px solid ${theme.colors.primaryCyan}33`,
                      color: "#FFFFFF",
                    }}
                  >
                    <option>No Restriction</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Skill Level
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg h-10 text-sm"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    border: `1px solid ${theme.colors.primaryCyan}33`,
                    color: "#FFFFFF",
                  }}
                >
                  <option>All Level</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-3">
                  Event Includes
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="rounded-lg border p-4 cursor-pointer transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: formData.accommodationProvided
                        ? theme.colors.primaryCyan
                        : `${theme.colors.primaryCyan}33`,
                    }}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        accommodationProvided: !formData.accommodationProvided,
                      })
                    }
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          borderColor: formData.accommodationProvided
                            ? theme.colors.primaryCyan
                            : "#4B5563",
                          backgroundColor: theme.colors.backgroundDark,
                        }}
                      >
                        {formData.accommodationProvided && (
                          <div
                            className="w-3 h-3 rounded-sm"
                            style={{
                              backgroundColor: theme.colors.primaryCyan,
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">
                          Accommodation Provided
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div
                    className="rounded-lg border p-4 cursor-pointer transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: formData.mealsProvided
                        ? theme.colors.primaryCyan
                        : `${theme.colors.primaryCyan}33`,
                    }}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        mealsProvided: !formData.mealsProvided,
                      })
                    }
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          borderColor: formData.mealsProvided
                            ? theme.colors.primaryCyan
                            : "#4B5563",
                          backgroundColor: theme.colors.backgroundDark,
                        }}
                      >
                        {formData.mealsProvided && (
                          <div
                            className="w-3 h-3 rounded-sm"
                            style={{
                              backgroundColor: theme.colors.primaryCyan,
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">
                          Meals Provided
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Event Image
                </label>
                <div
                  className="rounded-lg p-8 border-2 border-dashed cursor-pointer"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                >
                  <div className="text-center">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0, 229, 255, 0.2) 0%, rgba(156, 39, 176, 0.2) 100%)",
                      }}
                    >
                      <Upload
                        className="w-6 h-6"
                        style={{ color: theme.colors.primaryCyan }}
                      />
                    </div>
                    <p className="text-white font-medium mb-1 text-sm">
                      Upload Event Banner
                    </p>
                    <p className="text-gray-400 text-xs mb-1">
                      Recommended: 1920x1080px
                    </p>
                    <button
                      className="mt-3 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                      style={{ backgroundColor: theme.colors.neonAccent }}
                    >
                      Choose File
                    </button>
                    <p className="text-gray-500 text-xs mt-2">
                      JPG, PNG (Max 10MB)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Additional Notes
                </label>
                <textarea
                  placeholder="Any other important information..."
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
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 disabled:opacity-50 flex items-center gap-2"
          style={{
            backgroundColor: "transparent",
            border: `1px solid ${theme.colors.primaryCyan}33`,
            color: "#9CA3AF",
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <button
          onClick={currentStep === 4 ? handleCreateEvent : nextStep}
          className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
          style={{ backgroundColor: theme.colors.neonAccent }}
        >
          {currentStep === 4 ? "Continue" : "Continue"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
