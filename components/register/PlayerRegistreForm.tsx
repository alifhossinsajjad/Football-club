"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import StepIndicator from "../reuseable/StepIndicator";
import DarkInput from "../reuseable/DarkInput";
import DarkSelect from "../reuseable/DarkSelect";
import { useRegisterPlayerMutation } from "@/redux/features/auth/playerRegistraionApi";
import toast from "react-hot-toast";

interface FormData {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: string;
  phone_number: string;
  playing_position: string;
  preferred_foot: string;
  height: string;
  weight: string;
  city: string;
  country: string;
  current_club_academy: string;
  type_of_commitment: string;
  contract_valid_until: string;

  parent_guardian_first_name?: string;
  parent_guardian_last_name?: string;
  parent_id_number?: string;
  parent_guardian_digital_signature?: string | null;
  accept_privacy: boolean;
}

const RegisterPage = () => {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const [registerPlayer, { isLoading }] = useRegisterPlayerMutation();

  const dob = watch("date_of_birth");
  const formValues = watch();

  const isMinor = useMemo(() => {
    if (!dob) return false;
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    return age < 18;
  }, [dob]);

  // Step validations
  const canProceedStep1 = !!(
    formValues.first_name &&
    formValues.last_name &&
    formValues.email &&
    formValues.phone_number
  );
  const canProceedStep2 = !!(
    formValues.date_of_birth &&
    formValues.password &&
    formValues.nationality &&
    formValues.playing_position
  );
  const canProceedStep3 =
    !isMinor ||
    (!!formValues.parent_guardian_first_name &&
      !!formValues.parent_guardian_last_name &&
      !!formValues.parent_id_number);
  const canProceedStep4 = !!formValues.accept_privacy;

  const handleNextStep = async () => {
    if (step === 1) {
      const valid = await trigger([
        "first_name",
        "last_name",
        "email",
        "phone_number",
      ]);
      if (valid && canProceedStep1) setStep(2);
    } else if (step === 2) {
      const valid = await trigger([
        "date_of_birth",
        "password",
        "confirm_password",
        "nationality",
        "playing_position",
        "preferred_foot",
        "height",
        "weight",
        "city",
        "country",
        "current_club_academy",
        "type_of_commitment",
        "contract_valid_until",
      ]);
      if (valid && canProceedStep2) setStep(isMinor ? 3 : 4);
    } else if (step === 3 && isMinor) {
      const valid = await trigger([
        "parent_guardian_first_name",
        "parent_guardian_last_name",
        "parent_guardian_digital_signature",
        "parent_id_number",
      ]);
      if (valid && canProceedStep3) setStep(4);
    }
  };

  const handleBackStep = () => {
    if (step === 4) setStep(isMinor ? 3 : 2);
    else if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const onSubmit = async (data: FormData) => {
    const payload: any = { ...data };

    // Add confirm_password
    payload.confirm_password = data.password;

    // If not minor, remove parent fields
    if (!isMinor) {
      delete payload.parent_guardian_first_name;
      delete payload.parent_guardian_last_name;
      delete payload.parent_guardian_digital_signature;
      delete payload.parent_id_number;
    } else {
      // Make sure digital signature is present even if null
      if (!payload.parent_guardian_digital_signature) {
        payload.parent_guardian_digital_signature = null;
      }
    }

    // Adjust types if needed
    payload.height = parseFloat(payload.height as any);
    payload.weight = parseFloat(payload.weight as any);

    // Capitalize enum fields if backend is case-sensitive
    payload.playing_position =
      payload.playing_position.charAt(0).toUpperCase() +
      payload.playing_position.slice(1);
    payload.preferred_foot =
      payload.preferred_foot.charAt(0).toUpperCase() +
      payload.preferred_foot.slice(1);

    console.log("Payload being sent:", payload);

    try {
      const result = await registerPlayer(payload).unwrap();
      console.log("Server response:", result);

      toast.success(
        "Registration successful! Please check your email for verification."
      );

      // Reset form and step after successful registration
      reset();
      setStep(1);
    } catch (error: any) {
      console.error("Registration failed:", error);
      const message =
        error?.data?.detail ||
        error?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
    }
  };

  const NextButton = ({
    disabled,
    onClick,
    children,
  }: {
    disabled: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 rounded-lg font-semibold relative overflow-hidden transition-all duration-300 ${
        disabled
          ? "bg-gray-700 text-gray-500 cursor-not-allowed opacity-50"
          : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98]"
      }`}
    >
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="bg-[#0b1120] p-8 rounded-3xl w-full max-w-lg shadow-2xl border border-white/10 relative overflow-hidden">
        <StepIndicator step={step} isMinor={isMinor} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 relative z-10"
        >
          {/* STEP 1 - BASIC INFO */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Basic Info</h2>
              <DarkInput
                label="First Name"
                name="first_name"
                register={register}
                error={errors.first_name?.message}
              />
              <DarkInput
                label="Last Name"
                name="last_name"
                register={register}
                error={errors.last_name?.message}
              />
              <DarkInput
                label="Email"
                name="email"
                type="email"
                register={register}
                error={errors.email?.message}
              />
              <DarkInput
                label="Phone Number"
                name="phone_number"
                type="tel"
                register={register}
                error={errors.phone_number?.message}
              />
              <NextButton disabled={!canProceedStep1} onClick={handleNextStep}>
                Continue
              </NextButton>
            </div>
          )}

          {/* STEP 2 - PLAYER INFO */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Player Info</h2>
              <DarkInput
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                register={register}
                error={errors.date_of_birth?.message}
              />
              <DarkInput
                label="Password"
                name="password"
                type="password"
                register={register}
                error={errors.password?.message}
              />
              <DarkInput
                label="Confirm Password"
                name="confirm_password"
                type="password"
                register={register}
                error={errors.confirm_password?.message}
              />
              <DarkInput
                label="Nationality"
                name="nationality"
                register={register}
                error={errors.nationality?.message}
              />
              <DarkSelect
                label="Playing Position"
                name="playing_position"
                register={register}
                error={errors.playing_position?.message}
                options={[
                  { label: "Forward", value: "forward" },
                  { label: "Midfielder", value: "midfielder" },
                  { label: "Defender", value: "defender" },
                  { label: "Goalkeeper", value: "goalkeeper" },
                ]}
              />
              <DarkSelect
                label="Preferred Foot"
                name="preferred_foot"
                register={register}
                error={errors.preferred_foot?.message}
                options={[
                  { label: "Left", value: "left" },
                  { label: "Right", value: "right" },
                  { label: "Both", value: "both" },
                ]}
              />
              <DarkInput
                label="Height (cm)"
                name="height"
                register={register}
                error={errors.height?.message}
              />
              <DarkInput
                label="Weight (kg)"
                name="weight"
                register={register}
                error={errors.weight?.message}
              />
              <DarkInput
                label="City"
                name="city"
                register={register}
                error={errors.city?.message}
              />
              <DarkInput
                label="Country"
                name="country"
                register={register}
                error={errors.country?.message}
              />
              <DarkInput
                label="Current Club / Academy"
                name="current_club_academy"
                register={register}
                error={errors.current_club_academy?.message}
              />
              <DarkSelect
                label="Type of Commitment"
                name="type_of_commitment"
                register={register}
                error={errors.type_of_commitment?.message}
                options={[
                  { label: "Full-time", value: "full_time" },
                  { label: "Part-time", value: "part_time" },
                ]}
              />
              <DarkInput
                label="Contract Valid Until"
                name="contract_valid_until"
                type="date"
                register={register}
                error={errors.contract_valid_until?.message}
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBackStep}
                  className="flex-1 py-3 rounded-lg border border-gray-600 text-gray-300"
                >
                  Back
                </button>
                <div className="flex-1">
                  <NextButton
                    disabled={!canProceedStep2}
                    onClick={handleNextStep}
                  >
                    {isMinor ? "Continue to Parent Info" : "Continue"}
                  </NextButton>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 - PARENT INFO */}
          {step === 3 && isMinor && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Parent Info</h2>
              <DarkInput
                label="First Name"
                name="parent_guardian_first_name"
                register={register}
                error={errors.parent_guardian_first_name?.message}
              />
              <DarkInput
                label="Last Name"
                name="parent_guardian_last_name"
                register={register}
                error={errors.parent_guardian_last_name?.message}
              />
              <DarkInput
                label="Digital Signature (Type Full Name)"
                name="parent_guardian_digital_signature"
                register={register}
                error={errors.parent_guardian_digital_signature?.message}
              />
              <DarkInput
                label="ID Number"
                name="parent_id_number"
                register={register}
                error={errors.parent_id_number?.message}
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBackStep}
                  className="flex-1 py-3 rounded-lg border border-gray-600 text-gray-300"
                >
                  Back
                </button>
                <div className="flex-1">
                  <NextButton
                    disabled={!canProceedStep3}
                    onClick={handleNextStep}
                  >
                    Continue
                  </NextButton>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 - PRIVACY */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                Privacy & Consent
              </h2>
              <div className="bg-gray-900 p-4 rounded-lg text-xs text-gray-400 h-32 overflow-y-auto border border-gray-700">
                <p>
                  By registering, you agree to our privacy policy and terms.
                  Parent consent is required for minors.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <input
                  type="checkbox"
                  {...register("accept_privacy", {
                    required: "You must accept the privacy policy",
                  })}
                  className="mt-1 w-4 h-4 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-sm text-gray-300">
                  I agree to the privacy policy and terms
                </span>
              </div>
              <p className="text-red-400 text-xs">
                {errors.accept_privacy?.message}
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBackStep}
                  className="flex-1 py-3 rounded-lg border border-gray-600 text-gray-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 py-3 rounded-lg font-semibold shadow-lg ${
                    isLoading
                      ? "bg-green-800 text-white opacity-60 cursor-not-allowed"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {isLoading ? "Submitting..." : "Complete Registration"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
