"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { showSuccessToast } from "@/components/ui/toast";

// Import components
import UserTypeSelector from "./components/UserTypeSelector";
import StepIndicator from "./components/StepIndicator";
import AccountFeatures from "./components/AccountFeatures";
import PlayerForm from "./components/forms/PlayerForm";
import ClubForm from "./components/forms/ClubForm";
import ScoutForm from "./components/forms/ScoutForm";

export default function AddNewUserPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();
  const [selectedUserType, setSelectedUserType] = useState("player");
  const [currentStep, setCurrentStep] = useState(1);

  // Form data states for each user type
  const [playerData, setPlayerData] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    position: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    fullAddress: "",
    height: "",
    weight: "",
    currentClub: "",
  });

  const [clubData, setClubData] = useState({
    logo: null,
    clubName: "",
    establishedYear: "",
    stadium: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    fullAddress: "",
    website: "",
    stadiumCapacity: "",
    description: "",
  });

  const [scoutData, setScoutData] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    agency: "",
    yearsExperience: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    fullAddress: "",
    specialization: "",
    licenseNumber: "",
    certifications: "",
  });

  const steps = {
    player: ["Basic Info", "Contact Details", "Player Details"],
    club: ["Basic Info", "Contact Details", "Club Details"],
    scout: ["Basic Info", "Contact Details", "Scout Details"],
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleUserTypeChange = (type) => {
    setSelectedUserType(type);
    setCurrentStep(1); // Reset to step 1 when changing user type
  };

  const handleCreateUser = () => {
    showSuccessToast("User Created!", "New user has been added successfully");
    setTimeout(() => {
      router.push("/admin/users");
    }, 500);
  };

  // Get current form data and setter based on user type
  const getCurrentFormData = () => {
    switch (selectedUserType) {
      case "player":
        return playerData;
      case "club":
        return clubData;
      case "scout":
        return scoutData;
      default:
        return playerData;
    }
  };

  const getCurrentFormSetter = () => {
    switch (selectedUserType) {
      case "player":
        return setPlayerData;
      case "club":
        return setClubData;
      case "scout":
        return setScoutData;
      default:
        return setPlayerData;
    }
  };

  const renderForm = () => {
    const formData = getCurrentFormData();
    const setFormData = getCurrentFormSetter();

    switch (selectedUserType) {
      case "player":
        return (
          <PlayerForm
            currentStep={currentStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "club":
        return (
          <ClubForm
            currentStep={currentStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "scout":
        return (
          <ScoutForm
            currentStep={currentStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      default:
        return null;
    }
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
      <UserTypeSelector
        selectedType={selectedUserType}
        onTypeChange={handleUserTypeChange}
      />

      {/* Progress Steps */}
      <StepIndicator
        currentStep={currentStep}
        steps={steps[selectedUserType]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-2">{renderForm()}</div>

        {/* Right Column - Account Features */}
        <div className="lg:col-span-1">
          <AccountFeatures userType={selectedUserType} />
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
          {currentStep === 3 ? "Create User" : "Next"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}