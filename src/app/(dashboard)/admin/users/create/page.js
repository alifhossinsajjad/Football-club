"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Building2,
  Target,
  Upload,
  Camera,
  Check,
  CheckCircle,
  Mail,
  Phone,
  Globe,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { showSuccessToast } from "@/components/ui/toast";

export default function AddNewUserPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();
  const [selectedUserType, setSelectedUserType] = useState("player");
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Basic Info
    profilePicture: null,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    position: "",

    // Contact Details
    email: "",
    phone: "",
    country: "",
    city: "",
    fullAddress: "",

    // Player Details
    height: "",
    weight: "",
    currentClub: "",
  });

  const userTypes = [
    {
      id: "player",
      icon: User,
      title: "Player",
      description: "Young talent looking for opportunities",
    },
    {
      id: "club",
      icon: Building2,
      title: "Club/Academy",
      description: "Football club or training academy",
    },
    {
      id: "scout",
      icon: Target,
      title: "Scout/Agent",
      description: "Talent scout or player agent",
    },
  ];

  const accountFeatures = [
    "Access to scout network",
    "Profile showcase",
    "Event registration",
    "Direct messaging",
    "Training content",
  ];

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCreateUser = () => {
    showSuccessToast("User Created!", "New user has been added successfully");
    setTimeout(() => {
      router.push("/admin/users");
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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div>
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
              Add New User
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Create a new user account for the platform
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2"
              style={{
                backgroundColor: "transparent",
                border: `1px solid ${theme.colors.primaryCyan}33`,
                color: "#9CA3AF",
              }}
            >
              Cancel
            </button>
            <button
              onClick={currentStep === 3 ? handleCreateUser : nextStep}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
              style={{
                backgroundColor: theme.colors.neonAccent,
              }}
            >
              {currentStep === 3 ? "Create User" : "Create User"}
            </button>
          </div>
        </div>
      </div>

      {/* User Type Selection */}
      <div
        className="rounded-lg border p-6 mb-8"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <h3 className="text-xl font-semibold text-white mb-6">
          Select User Type
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedUserType === type.id;

            return (
              <button
                key={type.id}
                onClick={() => setSelectedUserType(type.id)}
                className="rounded-lg border p-6 text-left transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: isSelected
                    ? theme.colors.primaryCyan
                    : `${theme.colors.primaryCyan}33`,
                }}
              >
                <Icon
                  className="w-8 h-8 mb-3"
                  style={{ color: theme.colors.primaryCyan }}
                />
                <h4 className="text-lg font-semibold text-white mb-1">
                  {type.title}
                </h4>
                <p className="text-gray-400 text-sm mb-3">{type.description}</p>
                {isSelected && (
                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: theme.colors.primaryCyan }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Selected</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Steps */}
      <div
        className="rounded-lg border p-6 mb-8"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((step, index) => {
            const isCompleted = currentStep > step;
            const isActive = currentStep === step;

            return (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
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
                        {step}
                      </span>
                    )}
                  </div>
                  <div>
                    <p
                      className="text-xs font-medium text-center"
                      style={{
                        color: isActive || isCompleted ? "#FFFFFF" : "#6B7280",
                      }}
                    >
                      Step {step}
                    </p>
                    <p
                      className="text-xs text-center"
                      style={{ color: "#6B7280" }}
                    >
                      {step === 1
                        ? "Basic Info"
                        : step === 2
                        ? "Contact Details"
                        : "Additional Info"}
                    </p>
                  </div>
                </div>
                {index < 2 && (
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-2">
          <div
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">
                  Basic Information
                </h3>

                {/* Profile Picture */}
                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-3">
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: theme.colors.backgroundDark,
                        border: `2px dashed ${theme.colors.primaryCyan}33`,
                      }}
                    >
                      <Camera
                        className="w-8 h-8"
                        style={{ color: theme.colors.primaryCyan }}
                      />
                    </div>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 flex items-center gap-2"
                      style={{
                        backgroundColor: "rgba(0, 229, 255, 0.2)",
                        color: theme.colors.primaryCyan,
                      }}
                    >
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </button>
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
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
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full"
                      style={{
                        backgroundColor: theme.colors.backgroundDark,
                        borderColor: `${theme.colors.primaryCyan}33`,
                        color: "#FFFFFF",
                      }}
                    />
                  </div>
                </div>

                {/* Date of Birth and Position */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dateOfBirth: e.target.value,
                        })
                      }
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
                      Position <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Midfielder"
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
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
            )}

            {/* Step 2: Contact Details */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">
                  Contact Details
                </h3>

                {/* Email and Phone */}
                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                      style={{ color: theme.colors.primaryCyan }}
                    />
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-11"
                      style={{
                        backgroundColor: theme.colors.backgroundDark,
                        borderColor: `${theme.colors.primaryCyan}33`,
                        color: "#FFFFFF",
                      }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                      style={{ color: theme.colors.primaryCyan }}
                    />
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-11"
                      style={{
                        backgroundColor: theme.colors.backgroundDark,
                        borderColor: `${theme.colors.primaryCyan}33`,
                        color: "#FFFFFF",
                      }}
                    />
                  </div>
                </div>

                {/* Country and City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Globe
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                        style={{ color: theme.colors.primaryCyan }}
                      />
                      <Input
                        type="text"
                        placeholder="e.g., Spain"
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        className="w-full pl-11"
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
                      City <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                        style={{ color: theme.colors.primaryCyan }}
                      />
                      <Input
                        type="text"
                        placeholder="e.g., Barcelona"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full pl-11"
                        style={{
                          backgroundColor: theme.colors.backgroundDark,
                          borderColor: `${theme.colors.primaryCyan}33`,
                          color: "#FFFFFF",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Full Address
                  </label>
                  <textarea
                    placeholder="Enter complete address"
                    value={formData.fullAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, fullAddress: e.target.value })
                    }
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
            )}

            {/* Step 3: Player Details */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">
                  Player Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Height (cm)
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., 180"
                      value={formData.height}
                      onChange={(e) =>
                        setFormData({ ...formData, height: e.target.value })
                      }
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
                      Weight (kg)
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., 75"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
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
                    Current Club
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Barcelona B"
                    value={formData.currentClub}
                    onChange={(e) =>
                      setFormData({ ...formData, currentClub: e.target.value })
                    }
                    className="w-full"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      color: "#FFFFFF",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Account Features */}
        <div className="lg:col-span-1">
          <div
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Player Account Features
            </h3>

            <div className="space-y-3">
              {accountFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: "rgba(5, 223, 114, 1)" }}
                  />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          style={{
            backgroundColor: "transparent",
            border: `1px solid ${theme.colors.primaryCyan}33`,
            color: "#9CA3AF",
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={currentStep === 3 ? handleCreateUser : nextStep}
          className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
          style={{ backgroundColor: theme.colors.neonAccent }}
        >
          {currentStep === 3 ? "Add" : "Next"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
