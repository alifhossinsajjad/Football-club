"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { showRegistrationError } from "@/lib/registrationErrors";
import DarkInput from "../reuseable/DarkInput";
import StepIndicator from "../reuseable/StepIndicator";
import { useRegisterClubMutation } from "@/redux/features/auth/clubRegistretaionApi";
import { ClubRegisterPayload } from "@/types/club";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface FormData {
  email: string;
  password: string;
  confirm_password: string;

  organization_name: string;
  organization_type: string;
  country: string;
  city: string;
  website: string;
  phone_number: string;
  full_address: string;
  postal_code: string;
  established_year: string;
  registration_number: string;
  tax_id: string;

  contact_full_name: string;
  contact_role_position: string;
  contact_email: string;
  contact_phone_number: string;

  number_of_training_fields: string;
  additional_facilities: string;
  age_groups_work_with: string;
  training_programs: string;

  club_website: string;
  facebook: string;
  instagram: string;
  twitter: string;

  official_verification_documents?: string;
  club_academy_logo?: string;

  legal_terms_accepted: boolean;
}

const splitToArray = (value: string): string[] =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

const ClubRegisterForm = () => {
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

  const [registerClub, { isLoading }] = useRegisterClubMutation();

  const formValues = watch();

  const canProceedStep1 = !!(
    formValues.email &&
    formValues.password &&
    formValues.confirm_password &&
    formValues.organization_name &&
    formValues.organization_type
  );

  const canProceedStep2 = !!(
    formValues.country &&
    formValues.city &&
    formValues.phone_number &&
    formValues.full_address &&
    formValues.postal_code &&
    formValues.established_year &&
    formValues.registration_number &&
    formValues.tax_id
  );

  const canProceedStep3 = !!(
    formValues.contact_full_name &&
    formValues.contact_role_position &&
    formValues.contact_email &&
    formValues.contact_phone_number &&
    formValues.number_of_training_fields &&
    formValues.additional_facilities &&
    formValues.age_groups_work_with &&
    formValues.training_programs
  );

  const canProceedStep4 = !!(
    formValues.club_website &&
    formValues.facebook &&
    formValues.instagram &&
    formValues.twitter &&
    formValues.legal_terms_accepted
  );

  const handleNextStep = async () => {
    if (step === 1) {
      const valid = await trigger([
        "email",
        "password",
        "confirm_password",
        "organization_name",
        "organization_type",
      ]);
      if (valid && canProceedStep1) setStep(2);
    } else if (step === 2) {
      const valid = await trigger([
        "country",
        "city",
        "website",
        "phone_number",
        "full_address",
        "postal_code",
        "established_year",
        "registration_number",
        "tax_id",
      ]);
      if (valid && canProceedStep2) setStep(3);
    } else if (step === 3) {
      const valid = await trigger([
        "contact_full_name",
        "contact_role_position",
        "contact_email",
        "contact_phone_number",
        "number_of_training_fields",
        "additional_facilities",
        "age_groups_work_with",
        "training_programs",
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
    const payload: ClubRegisterPayload = {
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      organization_name: data.organization_name,
      organization_type: data.organization_type,
      country: data.country,
      city: data.city,
      website: data.website,
      phone_number: data.phone_number,
      full_address: data.full_address,
      postal_code: data.postal_code,
      established_year: Number(data.established_year),
      registration_number: data.registration_number,
      tax_id: data.tax_id,
      contact_full_name: data.contact_full_name,
      contact_role_position: data.contact_role_position,
      contact_email: data.contact_email,
      contact_phone_number: data.contact_phone_number,
      number_of_training_fields: Number(data.number_of_training_fields),
      additional_facilities: splitToArray(data.additional_facilities || ""),
      age_groups_work_with: splitToArray(data.age_groups_work_with || ""),
      training_programs: splitToArray(data.training_programs || ""),
      club_website: data.club_website,
      facebook: data.facebook,
      instagram: data.instagram,
      twitter: data.twitter,
      official_verification_documents:
        data.official_verification_documents || null,
      club_academy_logo: data.club_academy_logo || null,
      legal_terms_accepted: data.legal_terms_accepted,
    };

    try {
      await registerClub(payload).unwrap();

      toast.success("Registration successfully");

      reset();
      setStep(1);
      router.push("/club");
    } catch (error: unknown) {
      console.error("Club registration failed:", error);
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
    { num: 1, label: "Account" },
    { num: 2, label: "Organization" },
    { num: 3, label: "Training" },
    { num: 4, label: "Social & Legal" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="bg-[#0b1120] p-8 rounded-3xl w-full max-w-lg shadow-2xl border border-white/10 relative overflow-hidden">
        <StepIndicator step={step} isMinor={false} stepsOverride={stepLabels} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 relative z-10"
        >
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                Club Account Details
              </h2>
              <DarkInput
                label="Email"
                name="email"
                type="email"
                register={register}
                error={errors.email?.message}
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
                label="Organization Name"
                name="organization_name"
                register={register}
                error={errors.organization_name?.message}
              />
              <DarkInput
                label="Organization Type"
                name="organization_type"
                register={register}
                error={errors.organization_type?.message}
                placeholder="e.g. academy, club, school"
              />

              <NextButton disabled={!canProceedStep1} onClick={handleNextStep}>
                Continue
              </NextButton>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                Location & Legal
              </h2>
              <DarkInput
                label="Country"
                name="country"
                register={register}
                error={errors.country?.message}
              />
              <DarkInput
                label="City"
                name="city"
                register={register}
                error={errors.city?.message}
              />
              <DarkInput
                label="Website"
                name="website"
                register={register}
                error={errors.website?.message}
              />
              <DarkInput
                label="Phone Number"
                name="phone_number"
                register={register}
                error={errors.phone_number?.message}
              />
              <DarkInput
                label="Full Address"
                name="full_address"
                register={register}
                error={errors.full_address?.message}
              />
              <DarkInput
                label="Postal Code"
                name="postal_code"
                register={register}
                error={errors.postal_code?.message}
              />
              <DarkInput
                label="Established Year"
                name="established_year"
                type="number"
                register={register}
                error={errors.established_year?.message}
              />
              <DarkInput
                label="Registration Number"
                name="registration_number"
                register={register}
                error={errors.registration_number?.message}
              />
              <DarkInput
                label="Tax ID"
                name="tax_id"
                register={register}
                error={errors.tax_id?.message}
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

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                Contact & Training
              </h2>

              <DarkInput
                label="Contact Full Name"
                name="contact_full_name"
                register={register}
                error={errors.contact_full_name?.message}
              />
              <DarkInput
                label="Contact Role / Position"
                name="contact_role_position"
                register={register}
                error={errors.contact_role_position?.message}
              />
              <DarkInput
                label="Contact Email"
                name="contact_email"
                type="email"
                register={register}
                error={errors.contact_email?.message}
              />
              <DarkInput
                label="Contact Phone Number"
                name="contact_phone_number"
                register={register}
                error={errors.contact_phone_number?.message}
              />

              <DarkInput
                label="Number of Training Fields"
                name="number_of_training_fields"
                type="number"
                register={register}
                error={errors.number_of_training_fields?.message}
              />

              <div className="space-y-1">
                <label className="text-sm text-gray-300 font-medium">
                  Additional Facilities (comma-separated)
                </label>
                <textarea
                  {...register("additional_facilities")}
                  className="w-full bg-[#050B14]/80 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#00E5FF]"
                  placeholder="e.g. indoor_training_facilities, medical_staff_facilities"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300 font-medium">
                  Age Groups You Work With (comma-separated)
                </label>
                <textarea
                  {...register("age_groups_work_with")}
                  className="w-full bg-[#050B14]/80 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#00E5FF]"
                  placeholder="e.g. U-8, U-10, U-12, U-14"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300 font-medium">
                  Training Programs (comma-separated)
                </label>
                <textarea
                  {...register("training_programs")}
                  className="w-full bg-[#050B14]/80 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#00E5FF]"
                  placeholder="e.g. technical_skill, tactical_training, physical_conditioning"
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

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                Online Presence & Legal
              </h2>

              <DarkInput
                label="Club Website"
                name="club_website"
                register={register}
                error={errors.club_website?.message}
              />
              <DarkInput
                label="Facebook"
                name="facebook"
                register={register}
                error={errors.facebook?.message}
              />
              <DarkInput
                label="Instagram"
                name="instagram"
                register={register}
                error={errors.instagram?.message}
              />
              <DarkInput
                label="Twitter / X"
                name="twitter"
                register={register}
                error={errors.twitter?.message}
              />

              <DarkInput
                label="Official Verification Documents (optional URL)"
                name="official_verification_documents"
                register={register}
                error={errors.official_verification_documents?.toString()}
              />
              <DarkInput
                label="Club / Academy Logo (optional URL)"
                name="club_academy_logo"
                register={register}
                error={errors.club_academy_logo?.toString()}
              />

              <div className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <input
                  type="checkbox"
                  {...register("legal_terms_accepted")}
                  className="mt-1 w-4 h-4 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-sm text-gray-300">
                  I confirm that all information provided is accurate and I
                  accept the legal terms and privacy policy.
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
          <Link href="/register" className="text-white hover:underline">
            Back to Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClubRegisterForm;
