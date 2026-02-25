"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Mail,
  Phone,
  Globe,
  Upload,
  Info,
  Lightbulb,
  Check,
  FileText,
  Euro,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { showSuccessToast } from "@/components/ui/toast";

export default function CreateEventPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Basic Info
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("Trial");
  const [ageGroup, setAgeGroup] = useState("");
  const [minAge, setMinAge] = useState("16");
  const [maxAge, setMaxAge] = useState("21");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Step 2: Location
  const [venueName, setVenueName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Spain");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [registrationFee, setRegistrationFee] = useState("");

  // Step 3: Details
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [bannerImage, setBannerImage] = useState(null);

  const steps = [
    { number: 1, label: "Basic Info", icon: Calendar },
    { number: 2, label: "Location", icon: MapPin },
    { number: 3, label: "Details", icon: FileText },
    { number: 4, label: "Review", icon: Check },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      showSuccessToast(
        "Event Published!",
        "Your event has been created successfully"
      );
      setTimeout(() => {
        router.push("/club/event-management");
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepIcon = ({ step, isActive, isCompleted }) => {
    const Icon = step.icon;

    return (
      <div className="flex flex-col items-center">
        <div
          className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all"
          style={{
            background:
              isActive || isCompleted
                ? `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`
                : theme.colors.backgroundDark,
            border: isActive ? `2px solid ${theme.colors.primaryCyan}` : "none",
          }}
        >
          {isCompleted ? (
            <Check className="w-5 h-5 text-white" />
          ) : (
            <Icon className="w-5 h-5 text-white" />
          )}
        </div>
        <span
          className="text-xs mt-2 font-medium hidden sm:block"
          style={{ color: isActive || isCompleted ? "white" : "#6B7280" }}
        >
          {step.label}
        </span>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.backgroundDark }}
    >
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-4 transition-opacity hover:opacity-80"
          style={{ color: theme.colors.primaryCyan }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        <h1
          className="text-2xl lg:text-3xl font-bold mb-2"
          style={{
            backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            display: "inline-block",
          }}
        >
          Create New Event
        </h1>
        <p className="text-gray-400 text-sm">
          Step {currentStep} of 4 - Fill in all the details
        </p>
      </div>

      {/* Progress Steps */}
      <div
        className="border rounded-lg p-6 mb-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <StepIcon
                step={step}
                isActive={currentStep === step.number}
                isCompleted={currentStep > step.number}
              />
              {index < steps.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-4"
                  style={{
                    background:
                      currentStep > step.number
                        ? `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`
                        : theme.colors.backgroundDark,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <Step1
          theme={theme}
          eventName={eventName}
          setEventName={setEventName}
          eventType={eventType}
          setEventType={setEventType}
          ageGroup={ageGroup}
          setAgeGroup={setAgeGroup}
          minAge={minAge}
          setMinAge={setMinAge}
          maxAge={maxAge}
          setMaxAge={setMaxAge}
          eventDate={eventDate}
          setEventDate={setEventDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
      )}

      {currentStep === 2 && (
        <Step2
          theme={theme}
          venueName={venueName}
          setVenueName={setVenueName}
          streetAddress={streetAddress}
          setStreetAddress={setStreetAddress}
          city={city}
          setCity={setCity}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          country={country}
          setCountry={setCountry}
          maxCapacity={maxCapacity}
          setMaxCapacity={setMaxCapacity}
          registrationFee={registrationFee}
          setRegistrationFee={setRegistrationFee}
        />
      )}

      {currentStep === 3 && (
        <Step3
          theme={theme}
          description={description}
          setDescription={setDescription}
          requirements={requirements}
          setRequirements={setRequirements}
          contactEmail={contactEmail}
          setContactEmail={setContactEmail}
          contactPhone={contactPhone}
          setContactPhone={setContactPhone}
          website={website}
          setWebsite={setWebsite}
          bannerImage={bannerImage}
          setBannerImage={setBannerImage}
        />
      )}

      {currentStep === 4 && (
        <Step4
          theme={theme}
          eventName={eventName}
          eventType={eventType}
          ageGroup={ageGroup}
          minAge={minAge}
          maxAge={maxAge}
          eventDate={eventDate}
          startTime={startTime}
          endTime={endTime}
          venueName={venueName}
          streetAddress={streetAddress}
          city={city}
          postalCode={postalCode}
          country={country}
          maxCapacity={maxCapacity}
          registrationFee={registrationFee}
          description={description}
          requirements={requirements}
          contactEmail={contactEmail}
          contactPhone={contactPhone}
          website={website}
        />
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <button
            onClick={handlePrevious}
            className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90 border"
            style={{
              borderColor: `${theme.colors.primaryCyan}40`,
              color: "white",
            }}
          >
            Previous Step
          </button>
        )}
        <button
          onClick={handleNext}
          className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90 ml-auto"
          style={{ backgroundColor: theme.colors.neonAccent, color: "white" }}
        >
          {currentStep === 4 ? "Publish Event" : "Next Step"}
        </button>
      </div>
    </div>
  );
}

// Step 1 Component
function Step1({
  theme,
  eventName,
  setEventName,
  eventType,
  setEventType,
  ageGroup,
  setAgeGroup,
  minAge,
  setMinAge,
  maxAge,
  setMaxAge,
  eventDate,
  setEventDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Event Information */}
        <div
          className="border rounded-lg p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              }}
            >
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Event Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Event Name{" "}
                <span style={{ color: theme.colors.primaryMagenta }}>*</span>
              </label>
              <Input
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g., Youth Summer Trial 2025"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Event Type{" "}
                  <span style={{ color: theme.colors.primaryMagenta }}>*</span>
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
                  Age Group{" "}
                  <span style={{ color: theme.colors.primaryMagenta }}>*</span>
                </label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg h-10 text-sm"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    border: `1px solid ${theme.colors.primaryCyan}33`,
                    color: "#FFFFFF",
                  }}
                >
                  <option value="">Select age group</option>
                  <option value="U-10">U-10</option>
                  <option value="U-12">U-12</option>
                  <option value="U-14">U-14</option>
                  <option value="U-16">U-16</option>
                  <option value="U-18">U-18</option>
                  <option value="U-21">U-21</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Minimum Age
                </label>
                <Input
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                  placeholder="16"
                  type="number"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Maximum Age
                </label>
                <Input
                  value={maxAge}
                  onChange={(e) => setMaxAge(e.target.value)}
                  placeholder="21"
                  type="number"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div
          className="border rounded-lg p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              }}
            >
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Date & Time</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Event Date{" "}
                <span style={{ color: theme.colors.primaryMagenta }}>*</span>
              </label>
              <Input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Start Time{" "}
                <span style={{ color: theme.colors.primaryMagenta }}>*</span>
              </label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                End Time
              </label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Quick Tips */}
        <div
          className="border rounded-lg p-6"
          style={{
            background: `linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(156, 39, 176, 0.2) 100%)`,
            borderColor: `${theme.colors.primaryCyan}40`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              }}
            >
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Quick Tips</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span style={{ color: theme.colors.primaryCyan }}>•</span>
              <span>Use a clear, descriptive event name</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: theme.colors.primaryCyan }}>•</span>
              <span>Choose the most specific age group</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: theme.colors.primaryCyan }}>•</span>
              <span>Set realistic date and time</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: theme.colors.primaryCyan }}>•</span>
              <span>Popular times: weekends 9AM-5PM</span>
            </li>
          </ul>
        </div>

        {/* Event Preview */}
        <div
          className="border rounded-lg p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <h3 className="text-lg font-bold text-white mb-4">Event Preview</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Event Name</p>
              <p className="text-white font-medium">{eventName || "Not set"}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Type</p>
              <p className="text-white font-medium">{eventType}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Age Group</p>
              <p className="text-white font-medium">{ageGroup || "Not set"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 2 Component
function Step2({
  theme,
  venueName,
  setVenueName,
  streetAddress,
  setStreetAddress,
  city,
  setCity,
  postalCode,
  setPostalCode,
  country,
  setCountry,
  maxCapacity,
  setMaxCapacity,
  registrationFee,
  setRegistrationFee,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Venue Location */}
        <div
          className="border rounded-lg p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              }}
            >
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Venue Location</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Venue Name{" "}
                <span style={{ color: theme.colors.primaryMagenta }}>*</span>
              </label>
              <Input
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                placeholder="e.g., Company Training Facilities"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Street Address{" "}
                <span style={{ color: theme.colors.primaryMagenta }}>*</span>
              </label>
              <Input
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="123 Stadium Road"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  City{" "}
                  <span style={{ color: theme.colors.primaryMagenta }}>*</span>
                </label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Barcelona"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Postal Code
                </label>
                <Input
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="08028"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Country{" "}
                  <span style={{ color: theme.colors.primaryMagenta }}>*</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg h-10 text-sm"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    border: `1px solid ${theme.colors.primaryCyan}33`,
                    color: "#FFFFFF",
                  }}
                >
                  <option value="Spain">Spain</option>
                  <option value="Portugal">Portugal</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Capacity & Pricing */}
        <div
          className="border rounded-lg p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              }}
            >
              <Users className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Capacity & Pricing</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Maximum Capacity{" "}
                <span style={{ color: theme.colors.primaryMagenta }}>*</span>
              </label>
              <Input
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                placeholder="100"
                type="number"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
              <p className="text-xs text-gray-400 mt-1">
                Maximum number of participants
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Registration Fee{" "}
                <span style={{ color: theme.colors.primaryMagenta }}>*</span>
              </label>
              <Input
                value={registrationFee}
                onChange={(e) => setRegistrationFee(e.target.value)}
                placeholder="50.00"
                type="number"
                step="0.01"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
              <p className="text-xs text-gray-400 mt-1">
                Use 0 for free events
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Location Tips */}
        <div
          className="border rounded-lg p-6"
          style={{
            background: `linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(156, 39, 176, 0.2) 100%)`,
            borderColor: `${theme.colors.primaryCyan}40`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              }}
            >
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Location Tips</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span style={{ color: theme.colors.primaryCyan }}>•</span>
              <span>Provide exact venue address</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: theme.colors.primaryCyan }}>•</span>
              <span>Ensure venue is easily accessible</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: theme.colors.primaryCyan }}>•</span>
              <span>Consider parking availability</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: theme.colors.primaryCyan }}>•</span>
              <span>Mention public transport options</span>
            </li>
          </ul>
        </div>

        {/* Pricing Guide */}
        <div
          className="border rounded-lg p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <h3 className="text-lg font-bold text-white mb-4">Pricing Guide</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Trial Events:</span>
              <span className="text-white font-semibold">€30-€70</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Showcases:</span>
              <span className="text-white font-semibold">€50-€100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tournaments:</span>
              <span className="text-white font-semibold">€80-€150</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Camps:</span>
              <span className="text-white font-semibold">€200-€500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 3 Component
function Step3({
  theme,
  description,
  setDescription,
  requirements,
  setRequirements,
  contactEmail,
  setContactEmail,
  contactPhone,
  setContactPhone,
  website,
  setWebsite,
  bannerImage,
  setBannerImage,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Event Description */}
        <div
          className="border rounded-lg p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              }}
            >
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Event Description</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Description{" "}
                <span style={{ color: theme.colors.primaryMagenta }}>*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="Provide detailed information about your event, what participants can expect, what they'll learn..."
                className="w-full rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  border: `1px solid ${theme.colors.primaryCyan}33`,
                }}
              />
              <p className="text-xs text-gray-400 mt-1">
                Minimum 100 characters recommended
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Requirements & What to Bring
              </label>
              <Input
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="E.g., Football boots, shin guards, water bottle, medical certificate, etc."
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>
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
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              }}
            >
              <Mail className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Contact Information
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Contact Email{" "}
                <span style={{ color: theme.colors.primaryMagenta }}>*</span>
              </label>
              <Input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="events@club.com"
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
                placeholder="+34 XXX XXX XXX"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Website (Optional)
              </label>
              <Input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://www.yourclub.com/event"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Event Media */}
        <div
          className="border rounded-lg p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              }}
            >
              <Upload className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Event Media</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Event Banner Image
            </label>
            <div
              className="relative h-48 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer group transition-all hover:border-opacity-60"
              style={{
                borderColor: `${theme.colors.primaryCyan}33`,
                backgroundColor: `${theme.colors.backgroundDark}80`,
              }}
            >
              <div className="text-center">
                <Upload
                  className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform"
                  style={{ color: theme.colors.primaryCyan }}
                />
                <p className="text-white text-sm font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Recommended: 1920x1080px, PNG or JPG (max 5MB)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Featured Event */}
        <div
          className="border rounded-lg p-6"
          style={{
            background: `linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(156, 39, 176, 0.2) 100%)`,
            borderColor: `${theme.colors.primaryCyan}40`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              }}
            >
              <Star className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Featured Event</h3>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            Get 3x more visibility with featured placement at the top of search
            results.
          </p>
          <div
            className="text-center py-3 rounded-lg font-bold text-xl mb-4"
            style={{ color: theme.colors.primaryCyan }}
          >
            +€49.99
          </div>
          <p className="text-xs text-gray-400 mb-3">One-time promotional fee</p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <Check
                className="w-4 h-4"
                style={{ color: theme.colors.primaryCyan }}
              />
              <span>Priority placement</span>
            </li>
            <li className="flex items-center gap-2">
              <Check
                className="w-4 h-4"
                style={{ color: theme.colors.primaryCyan }}
              />
              <span>Highlighted badge</span>
            </li>
            <li className="flex items-center gap-2">
              <Check
                className="w-4 h-4"
                style={{ color: theme.colors.primaryCyan }}
              />
              <span>3x more views</span>
            </li>
            <li className="flex items-center gap-2">
              <Check
                className="w-4 h-4"
                style={{ color: theme.colors.primaryCyan }}
              />
              <span>Email promotion</span>
            </li>
          </ul>
        </div>

        {/* Description Tips */}
        <div
          className="border rounded-lg p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              }}
            >
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Description Tips</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span style={{ color: theme.colors.primaryCyan }}>•</span>
              <span>Be clear and specific</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: theme.colors.primaryCyan }}>•</span>
              <span>Highlight unique features</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: theme.colors.primaryCyan }}>•</span>
              <span>Mention coaching staff</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: theme.colors.primaryCyan }}>•</span>
              <span>Include success stories</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: theme.colors.primaryCyan }}>•</span>
              <span>Add requirements clearly</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Step 4 Component
function Step4({
  theme,
  eventName,
  eventType,
  ageGroup,
  minAge,
  maxAge,
  eventDate,
  startTime,
  endTime,
  venueName,
  streetAddress,
  city,
  postalCode,
  country,
  maxCapacity,
  registrationFee,
  description,
  requirements,
  contactEmail,
  contactPhone,
  website,
}) {
  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden">
        <img
          src="/youth-summer-trial-cover.jpg"
          alt="Event Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: theme.colors.primaryCyan,
              color: "white",
            }}
          >
            {eventType}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: theme.colors.primaryMagenta,
              color: "white",
            }}
          >
            {ageGroup || `Age ${minAge}-${maxAge}`}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <h1 className="absolute bottom-4 left-4 text-3xl lg:text-4xl font-bold text-white">
          {eventName || "Youth Summer Trial 2025"}
        </h1>
      </div>

      {/* Basic Information */}
      <div
        className="border rounded-lg p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              }}
            >
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Basic Information</h2>
          </div>
          <button
            className="text-sm font-medium"
            style={{ color: theme.colors.primaryCyan }}
          >
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Event Name</p>
            <p className="text-white font-semibold">{eventName || "Not set"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Event Type</p>
            <p className="text-white font-semibold">{eventType}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Age Group</p>
            <p className="text-white font-semibold">
              {ageGroup || `${minAge}-${maxAge} years`}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Event Date</p>
            <p className="text-white font-semibold">{eventDate || "Not set"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Start Time</p>
            <p className="text-white font-semibold">{startTime || "Not set"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">End Time</p>
            <p className="text-white font-semibold">{endTime || "Not set"}</p>
          </div>
        </div>
      </div>

      {/* Venue & Location */}
      <div
        className="border rounded-lg p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              }}
            >
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Venue & Location</h2>
          </div>
          <button
            className="text-sm font-medium"
            style={{ color: theme.colors.primaryCyan }}
          >
            Edit
          </button>
        </div>

        <div
          className="flex items-start gap-4 p-4 rounded-lg mb-6"
          style={{ backgroundColor: theme.colors.backgroundDark }}
        >
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
            }}
          >
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">
              {venueName || "Company Training Facilities"}
            </h3>
            <p className="text-gray-300 text-sm">
              {streetAddress || "123 Stadium Road"}
            </p>
            <p className="text-gray-300 text-sm">
              {city || "Barcelona"}, {postalCode || "08028"} {country}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm mb-2">Maximum Capacity</p>
            <p
              className="text-2xl font-bold"
              style={{ color: theme.colors.primaryCyan }}
            >
              {maxCapacity || "100"}
            </p>
            <p className="text-gray-400 text-xs">participants</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2">Registration Fee</p>
            <p
              className="text-2xl font-bold"
              style={{ color: theme.colors.primaryCyan }}
            >
              €{registrationFee || "50.00"}
            </p>
            <p className="text-gray-400 text-xs">per participant</p>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div
        className="border rounded-lg p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              }}
            >
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Event Details</h2>
          </div>
          <button
            className="text-sm font-medium"
            style={{ color: theme.colors.primaryCyan }}
          >
            Edit
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm mb-2">Event Description</p>
            <p className="text-white text-sm leading-relaxed">
              {description ||
                "Join us for an exciting youth summer trial where talented players will have the opportunity to showcase their skills. Our experienced coaching staff will evaluate participants across multiple sessions, focusing on technical ability, tactical awareness, and physical conditioning. This is a fantastic opportunity for young players looking to take their game to the next level."}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-2">
              Requirements & What to Bring
            </p>
            <p className="text-white text-sm">
              {requirements ||
                "Football boots, shin guards, water bottle, medical certificate, etc."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center gap-3">
              <Mail
                className="w-5 h-5"
                style={{ color: theme.colors.primaryCyan }}
              />
              <div>
                <p className="text-gray-400 text-xs">Email</p>
                <p className="text-white text-sm font-medium">
                  {contactEmail || "events@club.com"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone
                className="w-5 h-5"
                style={{ color: theme.colors.primaryCyan }}
              />
              <div>
                <p className="text-gray-400 text-xs">Phone</p>
                <p className="text-white text-sm font-medium">
                  {contactPhone || "+34 XXX XXX XXX"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe
                className="w-5 h-5"
                style={{ color: theme.colors.primaryCyan }}
              />
              <div>
                <p className="text-gray-400 text-xs">Website</p>
                <p className="text-white text-sm font-medium truncate">
                  {website || "https://www.yourclub.com/event"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
