"use client";

import { useState, useRef } from "react";
// adjust import as needed
import { Event } from "@/types/scout/eventsType"; 
import { useRegisterForEventMutation } from "@/redux/features/scout/eventsApi";

// ─── Icons (unchanged) ────────────────────────────────────────────────────────
const CloseIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>);
const CheckIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>);
const CheckCircleIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>);
const ArrowLeft = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>);
const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const STEPS = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Professional" },
  { id: 3, label: "Review" },
];

const Field = ({ label, value, onChange, type = "text", placeholder = "", required = false, hint, accept }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-semibold text-[#4A6480] uppercase tracking-wider">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      accept={accept}
      className="w-full bg-[#0a1622] border border-[#1d3a55] rounded-lg px-3 py-2.5 text-sm text-[#C8D8E8] placeholder-[#2a4060] focus:outline-none focus:border-[#2DD4BF] transition-colors"
    />
    {hint && <p className="text-[10px] text-[#3a5570]">{hint}</p>}
  </div>
);

const SelectField = ({ label, value, onChange, options, required = false }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-semibold text-[#4A6480] uppercase tracking-wider">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-[#0a1622] border border-[#1d3a55] rounded-lg px-3 py-2.5 text-sm text-[#C8D8E8] focus:outline-none focus:border-[#2DD4BF] transition-colors cursor-pointer pr-8"
      >
        <option value="">Select...</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A6480] pointer-events-none">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </div>
  </div>
);

const FileUpload = ({ label, onChange, required = false }: any) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      onChange(null);
      setPreview(null);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold text-[#4A6480] uppercase tracking-wider">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-[#0a1622] border border-[#1d3a55] rounded-lg px-3 py-3 flex items-center gap-3 cursor-pointer hover:border-[#2DD4BF]/40 transition-colors"
      >
        <UploadIcon />
        {preview ? (
          <span className="text-xs text-[#C8D8E8] truncate">Logo selected</span>
        ) : (
          <span className="text-xs text-[#4A6480]">Click to upload logo</span>
        )}
      </div>
      {preview && (
        <div className="mt-2 flex items-center gap-2">
          <img src={preview} alt="Logo preview" className="w-8 h-8 rounded-full object-cover border border-[#1d3a55]" />
          <button
            onClick={() => { onChange(null); setPreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
            className="text-[10px] text-red-400 hover:text-red-300"
          >
            Remove
          </button>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

const ReviewRow = ({ label, value }: { label: string; value: string | number | null | undefined }) => (
  <div className="flex items-start justify-between py-2.5 border-b border-[#162d45] last:border-0">
    <span className="text-xs text-[#4A6480]">{label}</span>
    <span className="text-xs font-semibold text-[#C8D8E8] text-right max-w-[60%] break-words">
      {value || "—"}
    </span>
  </div>
);

const StepBar = ({ current }: { current: number }) => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg> );

// ─── Initial form state ───────────────────────────────────────────────────────
const INIT_PERSONAL = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  date_of_birth: "",           // YYYY-MM-DD
  gender: "",                   // Male/Female/Other
  id_card_type: "",             // e.g., "Passport", "National ID"
  id_card_number: "",
  personal_id_doc_type: "",     // e.g., "Passport", "Driver's License"
  personal_id_doc_number: "",
  personal_id_doc_expiry: "",
  personal_id_doc_validity: "", // could be a text field
  password: "",
  confirm_password: "",
};

const INIT_PROFESSIONAL = {
  agency_name: "",
  agency_logo: null as File | null,
  website_url: "",
  social_media_handle: "",
  professional_email: "",
  professional_phone: "",
  life_insurance_policy_number: "",
  life_insurance_expiry: "",
  life_insurance_validity: "",
  life_insurance_premium_amount: "",
  life_insurance_premium_frequency: "", 
  life_insurance_payment_method: "",   
  life_insurance_due_date: "",
  life_insurance_status: "",            
  life_insurance_notification: "",      
};


const EventRegistrationForm = ({
  event,
  onClose,
  onSuccess,
}: {
  event: Event;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [step, setStep] = useState(1);
  const [personal, setPersonal] = useState(INIT_PERSONAL);
  const [professional, setProfessional] = useState(INIT_PROFESSIONAL);
  const [agreed, setAgreed] = useState(false);
  const [success, setSuccess] = useState(false);

  const [registerForEvent, { isLoading, error }] = useRegisterForEventMutation();

  const updatePersonal = (key: keyof typeof INIT_PERSONAL) => (value: any) =>
    setPersonal((prev) => ({ ...prev, [key]: value }));

  const updateProfessional = (key: keyof typeof INIT_PROFESSIONAL) => (value: any) =>
    setProfessional((prev) => ({ ...prev, [key]: value }));

  // Step validation
  const step1RequiredFields = ["first_name", "last_name", "email", "phone_number"] as const;
  const step1Valid = step1RequiredFields.every((f) => personal[f].trim() !== "") &&
    (personal.password === personal.confirm_password || (!personal.password && !personal.confirm_password));

  const step2RequiredFields = ["agency_name"] as const;
  const step2Valid = step2RequiredFields.every((f) => professional[f]?.toString().trim() !== "");

  const handleSubmit = async () => {
    const formData = new FormData();

    // Append personal fields
    Object.entries(personal).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });

    // Append professional fields (except file)
    Object.entries(professional).forEach(([key, val]) => {
      if (val && key !== 'agency_logo') formData.append(key, val.toString());
    });

    // Append file if exists
    if (professional.agency_logo) {
      formData.append('agency_logo', professional.agency_logo);
    }

    // Append event id
    formData.append('event', event.id.toString());

    try {
      await registerForEvent(formData).unwrap();
      setSuccess(true);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-60 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ zIndex: 60 }}>
        <div className="bg-[#080F19] border border-[#162d45] rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-[#080F19]/95 backdrop-blur-sm border-b border-[#162d45] px-6 py-4 flex items-center justify-between z-10">
            <div>
              <p className="text-sm font-bold text-white">Event Registration</p>
              <p className="text-[11px] text-[#4A6480] mt-0.5 truncate max-w-[280px]">{event.event_name}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-[#162d45] flex items-center justify-center text-[#4A6480] hover:text-white hover:bg-[#1d3a55] transition-all">
              <CloseIcon />
            </button>
          </div>

          <div className="p-6">
            {success ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="w-20 h-20 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 flex items-center justify-center mb-5">
                  <CheckCircleIcon />
                </div>
                <h3 className="text-xl font-black text-white mb-2">Registration Submitted!</h3>
                <p className="text-sm text-[#4A6480] mb-1">You've successfully registered for</p>
                <p className="text-sm font-bold text-[#2DD4BF] mb-6">{event.event_name}</p>
                <p className="text-xs text-[#4A6480] mb-8 max-w-xs">
                  A confirmation email will be sent to <span className="text-[#C8D8E8]">{personal.email}</span>.
                </p>
                <button onClick={onSuccess} className="w-full py-3 rounded-xl font-bold text-sm bg-[#2DD4BF] text-[#071525] hover:bg-[#2DD4BF]/90 transition-colors">
                  Done
                </button>
              </div>
            ) : (
              <>
                <StepBar current={step} />

                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <div className="space-y-4">
                    <p className="text-sm font-bold text-white mb-4">Personal Information</p>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="First Name" value={personal.first_name} onChange={updatePersonal("first_name")} placeholder="John" required />
                      <Field label="Last Name" value={personal.last_name} onChange={updatePersonal("last_name")} placeholder="Doe" required />
                    </div>

                    <Field label="Email Address" value={personal.email} onChange={updatePersonal("email")} type="email" placeholder="john@example.com" required />
                    <Field label="Phone Number" value={personal.phone_number} onChange={updatePersonal("phone_number")} placeholder="+44 7700 900000" required hint="Include country code" />

                    <Field label="Date of Birth (DD/MM/YYYY)" value={personal.date_of_birth} onChange={updatePersonal("date_of_birth")} type="date" placeholder="DD/MM/YYYY" />
                    <SelectField label="Gender" value={personal.gender} onChange={updatePersonal("gender")} options={["Male", "Female", "Other"]} />

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="ID Card Type" value={personal.id_card_type} onChange={updatePersonal("id_card_type")} placeholder="Passport, National ID..." />
                      <Field label="ID Card Number" value={personal.id_card_number} onChange={updatePersonal("id_card_number")} placeholder="A1234567" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Personal ID Document Type" value={personal.personal_id_doc_type} onChange={updatePersonal("personal_id_doc_type")} placeholder="Passport, Driver's License..." />
                      <Field label="Personal ID Document Number" value={personal.personal_id_doc_number} onChange={updatePersonal("personal_id_doc_number")} placeholder="XYZ98765" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="ID Document Expiry Date" value={personal.personal_id_doc_expiry} onChange={updatePersonal("personal_id_doc_expiry")} type="date" />
                      <Field label="ID Document Validity Period" value={personal.personal_id_doc_validity} onChange={updatePersonal("personal_id_doc_validity")} placeholder="e.g., 5 years" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Password" value={personal.password} onChange={updatePersonal("password")} type="password" placeholder="········" />
                      <Field label="Confirm Password" value={personal.confirm_password} onChange={updatePersonal("confirm_password")} type="password" placeholder="········" />
                    </div>
                    {personal.password !== personal.confirm_password && personal.password && personal.confirm_password && (
                      <p className="text-xs text-red-400">Passwords do not match</p>
                    )}

                    <button
                      onClick={() => setStep(2)}
                      disabled={!step1Valid}
                      className="w-full mt-2 py-3 rounded-xl font-bold text-sm bg-[#2DD4BF] text-[#071525] hover:bg-[#2DD4BF]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue →
                    </button>
                  </div>
                )}

                {/* Step 2: Professional Info */}
                {step === 2 && (
                  <div className="space-y-4">
                    <p className="text-sm font-bold text-white mb-4">Professional Information</p>

                    <Field label="Digital Marketing Agency Name" value={professional.agency_name} onChange={updateProfessional("agency_name")} placeholder="My Agency" required />
                    <FileUpload label="Agency Logo" onChange={updateProfessional("agency_logo")} />

                    <Field label="Website URL" value={professional.website_url} onChange={updateProfessional("website_url")} type="url" placeholder="https://example.com" />
                    <Field label="Social Media Handle" value={professional.social_media_handle} onChange={updateProfessional("social_media_handle")} placeholder="@agency" />

                    <Field label="Email Address (Professional)" value={professional.professional_email} onChange={updateProfessional("professional_email")} type="email" placeholder="agency@example.com" />
                    <Field label="Phone Number (Professional)" value={professional.professional_phone} onChange={updateProfessional("professional_phone")} placeholder="+1 234 567 890" />

                    <div className="border-t border-[#162d45] my-2 pt-4">
                      <p className="text-xs font-semibold text-[#2DD4BF] uppercase tracking-wider mb-3">Life Insurance Policy</p>
                    </div>

                    <Field label="Policy Number" value={professional.life_insurance_policy_number} onChange={updateProfessional("life_insurance_policy_number")} placeholder="INS-123456" />
                    <Field label="Policy Expiry Date" value={professional.life_insurance_expiry} onChange={updateProfessional("life_insurance_expiry")} type="date" />
                    <Field label="Policy Validity Period" value={professional.life_insurance_validity} onChange={updateProfessional("life_insurance_validity")} placeholder="e.g., 1 year" />
                    <Field label="Premium Amount" value={professional.life_insurance_premium_amount} onChange={updateProfessional("life_insurance_premium_amount")} type="number" placeholder="1000" />
                    <SelectField label="Premium Frequency" value={professional.life_insurance_premium_frequency} onChange={updateProfessional("life_insurance_premium_frequency")} options={["Monthly", "Quarterly", "Annually"]} />
                    <Field label="Payment Method" value={professional.life_insurance_payment_method} onChange={updateProfessional("life_insurance_payment_method")} placeholder="Credit Card, Bank Transfer..." />
                    <Field label="Payment Due Date" value={professional.life_insurance_due_date} onChange={updateProfessional("life_insurance_due_date")} type="date" />
                    <Field label="Payment Status" value={professional.life_insurance_status} onChange={updateProfessional("life_insurance_status")} placeholder="Active, Pending..." />
                    <Field label="Payment Notification" value={professional.life_insurance_notification} onChange={updateProfessional("life_insurance_notification")} placeholder="Email, SMS..." />

                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => setStep(1)}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#162d45] text-[#4A6480] text-sm font-semibold hover:border-[#2DD4BF]/40 hover:text-white transition-all"
                      >
                        <ArrowLeft /> Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        disabled={!step2Valid}
                        className="flex-1 py-3 rounded-xl font-bold text-sm bg-[#2DD4BF] text-[#071525] hover:bg-[#2DD4BF]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Continue →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Submit */}
                {step === 3 && (
                  <div className="space-y-5">
                    <p className="text-sm font-bold text-white">Review Your Registration</p>

                    {/* Event summary */}
                    <div className="bg-[#2DD4BF]/5 border border-[#2DD4BF]/20 rounded-xl p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#2DD4BF] mb-1">Event</p>
                      <p className="text-sm font-bold text-white">{event.event_name}</p>
                      <p className="text-[11px] text-[#4A6480] mt-0.5">
                        {new Date(event.event_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} · {event.venue_name}
                      </p>
                      <p className="text-xs font-bold text-[#2DD4BF] mt-1">Fee: ${parseFloat(event.registration_fee)}</p>
                    </div>

                    {/* Personal Info Review */}
                    <div className="bg-[#0D1B2A] border border-[#162d45] rounded-xl px-4 pt-1">
                      <p className="text-[10px] uppercase tracking-widest text-[#4A6480] font-semibold pt-3 pb-1">Personal</p>
                      <ReviewRow label="Full Name" value={`${personal.first_name} ${personal.last_name}`} />
                      <ReviewRow label="Email" value={personal.email} />
                      <ReviewRow label="Phone" value={personal.phone_number} />
                      <ReviewRow label="Date of Birth" value={personal.date_of_birth} />
                      <ReviewRow label="Gender" value={personal.gender} />
                      <ReviewRow label="ID Card Type" value={personal.id_card_type} />
                      <ReviewRow label="ID Card Number" value={personal.id_card_number} />
                      <ReviewRow label="Personal ID Type" value={personal.personal_id_doc_type} />
                      <ReviewRow label="Personal ID Number" value={personal.personal_id_doc_number} />
                      <ReviewRow label="ID Expiry" value={personal.personal_id_doc_expiry} />
                      <ReviewRow label="ID Validity" value={personal.personal_id_doc_validity} />
                      {/* Passwords hidden */}
                    </div>

                    {/* Professional Info Review */}
                    <div className="bg-[#0D1B2A] border border-[#162d45] rounded-xl px-4 pt-1">
                      <p className="text-[10px] uppercase tracking-widest text-[#4A6480] font-semibold pt-3 pb-1">Professional</p>
                      <ReviewRow label="Agency Name" value={professional.agency_name} />
                      <ReviewRow label="Website" value={professional.website_url} />
                      <ReviewRow label="Social Media" value={professional.social_media_handle} />
                      <ReviewRow label="Professional Email" value={professional.professional_email} />
                      <ReviewRow label="Professional Phone" value={professional.professional_phone} />
                      <ReviewRow label="Insurance Policy #" value={professional.life_insurance_policy_number} />
                      <ReviewRow label="Insurance Expiry" value={professional.life_insurance_expiry} />
                      <ReviewRow label="Insurance Validity" value={professional.life_insurance_validity} />
                      <ReviewRow label="Premium Amount" value={professional.life_insurance_premium_amount} />
                      <ReviewRow label="Premium Frequency" value={professional.life_insurance_premium_frequency} />
                      <ReviewRow label="Payment Method" value={professional.life_insurance_payment_method} />
                      <ReviewRow label="Due Date" value={professional.life_insurance_due_date} />
                      <ReviewRow label="Payment Status" value={professional.life_insurance_status} />
                      <ReviewRow label="Notification" value={professional.life_insurance_notification} />
                    </div>

                    {/* Agreement */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <button
                        onClick={() => setAgreed(!agreed)}
                        className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                          agreed ? "bg-[#2DD4BF] border-[#2DD4BF]" : "border-[#1d3a55] bg-[#0a1622]"
                        }`}
                      >
                        {agreed && <CheckIcon />}
                      </button>
                      <span className="text-xs text-[#4A6480] leading-relaxed">
                        I confirm all information is accurate and agree to the{" "}
                        <span className="text-[#2DD4BF]">Terms & Conditions</span>.
                      </span>
                    </label>

                    {error && (
                      <div className="bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3">
                        <p className="text-xs text-red-400 font-semibold">Registration failed. Please try again.</p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(2)}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#162d45] text-[#4A6480] text-sm font-semibold hover:border-[#2DD4BF]/40 hover:text-white transition-all"
                      >
                        <ArrowLeft /> Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!agreed || isLoading}
                        className="flex-1 py-3 rounded-xl font-bold text-sm bg-[#2DD4BF] text-[#071525] hover:bg-[#2DD4BF]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {isLoading ? "Submitting..." : "Confirm Registration →"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventRegistrationForm;