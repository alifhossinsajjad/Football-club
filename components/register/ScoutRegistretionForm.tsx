"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { showRegistrationError } from "@/lib/registrationErrors";
import DarkInput from "../reuseable/DarkInput";
import StepIndicator from "../reuseable/StepIndicator";
import { useRegisterScoutMutation } from "@/redux/features/auth/scoutRegistretionApi";
import { ScoutRegisterPayload } from "@/types/scout";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  license_type: string;
  license_number: string;
  agency_name: string;
  agency_affiliation: string;
  specialization: string;
  primary_scouting_regions: string;
  secondary_scouting_regions: string;
  age_group_focus: string;
  position_focus: string;
  languages_spoken: string;
  players_discovered: string;
  contracts_signed: string;
  notable_discoveries: string;
  club_affiliations: string;
  scout_license_document?: string;
  government_issued_id?: string;
  legal_agreement_accepted: boolean;
}

const splitToArray = (value: string): string[] =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

const ScoutRegistretionForm = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

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

  const [registerScout, { isLoading }] = useRegisterScoutMutation();

  const formValues = watch();

  const canProceedStep1 = !!(
    formValues.first_name &&
    formValues.last_name &&
    formValues.email &&
    formValues.phone_number &&
    formValues.password &&
    formValues.confirm_password
  );

  const canProceedStep2 = !!(
    formValues.license_type &&
    formValues.license_number &&
    formValues.agency_name &&
    formValues.agency_affiliation
  );

  const canProceedStep3 = !!(
    formValues.specialization &&
    formValues.primary_scouting_regions &&
    formValues.age_group_focus &&
    formValues.position_focus &&
    formValues.languages_spoken
  );

  const canProceedStep4 = !!(
    formValues.players_discovered &&
    formValues.contracts_signed &&
    formValues.notable_discoveries &&
    formValues.club_affiliations &&
    formValues.legal_agreement_accepted
  );

  const handleNextStep = async () => {
    if (step === 1) {
      const valid = await trigger([
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "password",
        "confirm_password",
      ]);
      if (valid && canProceedStep1) setStep(2);
    } else if (step === 2) {
      const valid = await trigger([
        "license_type",
        "license_number",
        "agency_name",
        "agency_affiliation",
      ]);
      if (valid && canProceedStep2) setStep(3);
    } else if (step === 3) {
      const valid = await trigger([
        "specialization",
        "primary_scouting_regions",
        "secondary_scouting_regions",
        "age_group_focus",
        "position_focus",
        "languages_spoken",
      ]);
      if (valid && canProceedStep3) setStep(4);
    }
  };

  const handleBackStep = () => {
    if (step === 4) setStep(3);
    else if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const onSubmit = async (data: FormData) => {
    const payload: ScoutRegisterPayload = {
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      first_name: data.first_name,
      last_name: data.last_name,
      date_of_birth: data.date_of_birth,
      nationality: data.nationality,
      phone_number: data.phone_number,
      license_type: data.license_type,
      license_number: data.license_number,
      agency_name: data.agency_name,
      agency_affiliation: data.agency_affiliation,
      specialization: splitToArray(data.specialization),
      primary_scouting_regions: splitToArray(
        data.primary_scouting_regions || "",
      ),
      secondary_scouting_regions: splitToArray(
        data.secondary_scouting_regions || "",
      ),
      age_group_focus: splitToArray(data.age_group_focus || ""),
      position_focus: splitToArray(data.position_focus || ""),
      languages_spoken: splitToArray(data.languages_spoken || ""),
      players_discovered: data.players_discovered,
      contracts_signed: data.contracts_signed,
      notable_discoveries: data.notable_discoveries,
      club_affiliations: data.club_affiliations,
      scout_license_document: data.scout_license_document || null,
      government_issued_id: data.government_issued_id || null,
      legal_agreement_accepted: data.legal_agreement_accepted,
    };

    try {
      await registerScout(payload).unwrap();

    
toast.success(
  "Registration successful! Please check your email for verification.",
  {
    duration: 4000,
  }
);

      reset();
      setStep(1);
      router.push("/scout");
    } catch (error: unknown) {
      console.error("Scout registration failed:", error);
      await showRegistrationError(error, {
        onGoToLogin: () => router.push("/login"),
      });
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

  const stepLabels = [
    { num: 1, label: "Basic" },
    { num: 2, label: "Professional" },
    { num: 3, label: "Scouting Focus" },
    { num: 4, label: "Legal" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="bg-[#0b1120] p-8 rounded-3xl w-full max-w-lg shadow-2xl border border-white/10 relative overflow-hidden">
        <StepIndicator step={step} isMinor={false} stepsOverride={stepLabels} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 relative z-10"
        >
          {/* STEP 1 - BASIC INFO */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                Scout Basic Info
              </h2>
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
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                register={register}
                error={errors.date_of_birth?.message}
              />
              <DarkInput
                label="Nationality"
                name="nationality"
                register={register}
                error={errors.nationality?.message}
              />

              <NextButton disabled={!canProceedStep1} onClick={handleNextStep}>
                Continue
              </NextButton>
            </div>
          )}

          {/* STEP 2 - PROFESSIONAL INFO */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                Professional Details
              </h2>
              <DarkInput
                label="License Type"
                name="license_type"
                register={register}
                error={errors.license_type?.message}
              />
              <DarkInput
                label="License Number"
                name="license_number"
                register={register}
                error={errors.license_number?.message}
              />
              <DarkInput
                label="Agency Name"
                name="agency_name"
                register={register}
                error={errors.agency_name?.message}
              />
              <DarkInput
                label="Agency Affiliation"
                name="agency_affiliation"
                register={register}
                error={errors.agency_affiliation?.message}
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
                    Continue
                  </NextButton>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 - SCOUTING FOCUS */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                Scouting Focus & Regions
              </h2>

              <div className="space-y-1">
                <label className="text-sm text-gray-300 font-medium">
                  Specialization (comma-separated)
                </label>
                <textarea
                  {...register("specialization")}
                  className="w-full bg-[#050B14]/80 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#00E5FF]"
                  placeholder="e.g. youth_scouting, international_scouting"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300 font-medium">
                  Primary Scouting Regions (comma-separated)
                </label>
                <textarea
                  {...register("primary_scouting_regions")}
                  className="w-full bg-[#050B14]/80 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#00E5FF]"
                  placeholder="e.g. spain, france, italy"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300 font-medium">
                  Secondary Scouting Regions (comma-separated)
                </label>
                <textarea
                  {...register("secondary_scouting_regions")}
                  className="w-full bg-[#050B14]/80 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#00E5FF]"
                  placeholder="e.g. belgium, portugal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300 font-medium">
                  Age Group Focus (comma-separated)
                </label>
                <textarea
                  {...register("age_group_focus")}
                  className="w-full bg-[#050B14]/80 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#00E5FF]"
                  placeholder="e.g. U-16, U-18, U-21"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300 font-medium">
                  Position Focus (comma-separated)
                </label>
                <textarea
                  {...register("position_focus")}
                  className="w-full bg-[#050B14]/80 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#00E5FF]"
                  placeholder="e.g. forward, midfielder"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300 font-medium">
                  Languages Spoken (comma-separated)
                </label>
                <textarea
                  {...register("languages_spoken")}
                  className="w-full bg-[#050B14]/80 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#00E5FF]"
                  placeholder="e.g. spanish, english, french"
                />
              </div>

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

          {/* STEP 4 - LEGAL & EXPERIENCE */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                Experience & Legal
              </h2>

              <DarkInput
                label="Players Discovered"
                name="players_discovered"
                register={register}
                error={errors.players_discovered?.message}
              />
              <DarkInput
                label="Contracts Signed"
                name="contracts_signed"
                register={register}
                error={errors.contracts_signed?.message}
              />
              <DarkInput
                label="Notable Discoveries"
                name="notable_discoveries"
                register={register}
                error={errors.notable_discoveries?.message}
              />
              <DarkInput
                label="Club Affiliations"
                name="club_affiliations"
                register={register}
                error={errors.club_affiliations?.message}
              />

              <div className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <input
                  type="checkbox"
                  {...register("legal_agreement_accepted")}
                  className="mt-1 w-4 h-4 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-sm text-gray-300">
                  I confirm that all information provided is accurate and I
                  accept the legal terms of engagement as a scout/agent.
                </span>
              </div>

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

        <div className="flex justify-center items-center mt-3 bg-red-500 p-4 rounded-xl">
          <Link href="/register" className="text-white hover:underline hover:transition-all ">
            Back to Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScoutRegistretionForm;
