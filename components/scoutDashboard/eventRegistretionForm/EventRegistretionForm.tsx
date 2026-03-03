// "use client";

// import { useState } from "react";

// import { Event } from "@/redux/features/scout/eventsApi";

// import { useRegisterForEventMutation } from "@/redux/features/scout/eventsApi";
// import { RegisterForEventPayload } from "@/types/scout/eventsType";

// // ─── Icons ────────────────────────────────────────────────────────────────────

// const CloseIcon = () => (
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//   >
//     <line x1="18" y1="6" x2="6" y2="18" />
//     <line x1="6" y1="6" x2="18" y2="18" />
//   </svg>
// );
// const CheckIcon = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//   >
//     <polyline points="20 6 9 17 4 12" />
//   </svg>
// );
// const CheckCircleIcon = () => (
//   <svg
//     width="56"
//     height="56"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#2DD4BF"
//     strokeWidth="1.5"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <polyline points="9 12 11 14 15 10" />
//   </svg>
// );
// const ArrowLeft = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//   >
//     <line x1="19" y1="12" x2="5" y2="12" />
//     <polyline points="12 19 5 12 12 5" />
//   </svg>
// );

// // ─── Steps ────────────────────────────────────────────────────────────────────

// const STEPS = [
//   { id: 1, label: "Personal Info" },
//   { id: 2, label: "Professional" },
//   { id: 3, label: "Review" },
// ];

// // ─── Input Field ──────────────────────────────────────────────────────────────

// const Field = ({
//   label,
//   value,
//   onChange,
//   type = "text",
//   placeholder = "",
//   required = false,
//   hint,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   type?: string;
//   placeholder?: string;
//   required?: boolean;
//   hint?: string;
// }) => (
//   <div className="flex flex-col gap-1.5">
//     <label className="text-[11px] font-semibold text-[#4A6480] uppercase tracking-wider">
//       {label} {required && <span className="text-red-400">*</span>}
//     </label>
//     <input
//       type={type}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       className="w-full bg-[#0a1622] border border-[#1d3a55] rounded-lg px-3 py-2.5 text-sm text-[#C8D8E8] placeholder-[#2a4060] focus:outline-none focus:border-[#2DD4BF] transition-colors"
//     />
//     {hint && <p className="text-[10px] text-[#3a5570]">{hint}</p>}
//   </div>
// );

// // ─── Review Row ───────────────────────────────────────────────────────────────

// const ReviewRow = ({
//   label,
//   value,
// }: {
//   label: string;
//   value: string | number;
// }) => (
//   <div className="flex items-start justify-between py-2.5 border-b border-[#162d45] last:border-0">
//     <span className="text-xs text-[#4A6480]">{label}</span>
//     <span className="text-xs font-semibold text-[#C8D8E8] text-right max-w-[60%]">
//       {value || "—"}
//     </span>
//   </div>
// );

// // ─── Step Indicator ───────────────────────────────────────────────────────────

// const StepBar = ({ current }: { current: number }) => (
//   <div className="flex items-center gap-0 mb-6">
//     {STEPS.map((step, i) => {
//       const done = current > step.id;
//       const active = current === step.id;
//       return (
//         <div key={step.id} className="flex items-center flex-1 last:flex-none">
//           <div className="flex flex-col items-center">
//             <div
//               className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
//                 done
//                   ? "bg-[#2DD4BF] text-[#071525]"
//                   : active
//                     ? "bg-[#2DD4BF]/20 border-2 border-[#2DD4BF] text-[#2DD4BF]"
//                     : "bg-[#162d45] border border-[#1d3a55] text-[#4A6480]"
//               }`}
//             >
//               {done ? <CheckIcon /> : step.id}
//             </div>
//             <span
//               className={`text-[10px] mt-1 font-medium whitespace-nowrap ${
//                 active
//                   ? "text-[#2DD4BF]"
//                   : done
//                     ? "text-[#4A6480]"
//                     : "text-[#2a4060]"
//               }`}
//             >
//               {step.label}
//             </span>
//           </div>
//           {i < STEPS.length - 1 && (
//             <div
//               className={`flex-1 h-px mx-2 mb-4 ${current > step.id ? "bg-[#2DD4BF]" : "bg-[#162d45]"}`}
//             />
//           )}
//         </div>
//       );
//     })}
//   </div>
// );

// // ─── Initial form state ───────────────────────────────────────────────────────

// const INIT = {
//   first_name: "",
//   last_name: "",
//   email: "",
//   phone_number: "",
//   organization_name: "",
//   region_country: "",
//   specialization: "",
//   license_number: "",
//   years_of_experience: "",
// };

// // ─── Main Form ────────────────────────────────────────────────────────────────

// const EventRegistrationForm = ({
//   event,
//   onClose,
//   onSuccess,
// }: {
//   event: Event;
//   onClose: () => void;
//   onSuccess: () => void;
// }) => {
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState(INIT);
//   const [agreed, setAgreed] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const [registerForEvent, { isLoading, error }] =
//     useRegisterForEventMutation();

//   const set = (key: keyof typeof INIT) => (v: string) =>
//     setForm((f) => ({ ...f, [key]: v }));

//   // Validate step 1
//   const step1Valid =
//     form.first_name && form.last_name && form.email && form.phone_number;
//   // Validate step 2
//   const step2Valid =
//     form.region_country && form.specialization && form.years_of_experience;

//   const handleSubmit = async () => {
//     const payload: RegisterForEventPayload = {
//       event: event.id,
//       first_name: form.first_name,
//       last_name: form.last_name,
//       email: form.email,
//       phone_number: form.phone_number,
//       organization_name: form.organization_name || undefined,
//       region_country: form.region_country,
//       specialization: form.specialization,
//       license_number: form.license_number || undefined,
//       years_of_experience: Number(form.years_of_experience) || 0,
//     };
//     try {
//       await registerForEvent(payload).unwrap();
//       setSuccess(true);
//     } catch (err) {
//       console.error("Registration failed:", err);
//     }
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div
//         className="fixed inset-0 z-60 flex items-end sm:items-center justify-center p-0 sm:p-4"
//         style={{ zIndex: 60 }}
//       >
//         <div className="bg-[#080F19] border border-[#162d45] rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl">
//           {/* Header */}
//           <div className="sticky top-0 bg-[#080F19]/95 backdrop-blur-sm border-b border-[#162d45] px-6 py-4 flex items-center justify-between z-10">
//             <div>
//               <p className="text-sm font-bold text-white">Event Registration</p>
//               <p className="text-[11px] text-[#4A6480] mt-0.5 truncate max-w-[280px]">
//                 {event.event_name}
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="w-8 h-8 rounded-lg bg-[#162d45] flex items-center justify-center text-[#4A6480] hover:text-white hover:bg-[#1d3a55] transition-all"
//             >
//               <CloseIcon />
//             </button>
//           </div>

//           <div className="p-6">
//             {/* Success State */}
//             {success ? (
//               <div className="flex flex-col items-center py-8 text-center">
//                 <div className="w-20 h-20 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 flex items-center justify-center mb-5">
//                   <CheckCircleIcon />
//                 </div>
//                 <h3 className="text-xl font-black text-white mb-2">
//                   Registration Submitted!
//                 </h3>
//                 <p className="text-sm text-[#4A6480] mb-1">
//                   You've successfully registered for
//                 </p>
//                 <p className="text-sm font-bold text-[#2DD4BF] mb-6">
//                   {event.event_name}
//                 </p>
//                 <p className="text-xs text-[#4A6480] mb-8 max-w-xs">
//                   A confirmation email will be sent to{" "}
//                   <span className="text-[#C8D8E8]">{form.email}</span>. Your
//                   registration is pending review.
//                 </p>
//                 <button
//                   onClick={onSuccess}
//                   className="w-full py-3 rounded-xl font-bold text-sm bg-[#2DD4BF] text-[#071525] hover:bg-[#2DD4BF]/90 transition-colors"
//                 >
//                   Done
//                 </button>
//               </div>
//             ) : (
//               <>
//                 {/* Step Bar */}
//                 <StepBar current={step} />

//                 {/* ── Step 1: Personal Info ── */}
//                 {step === 1 && (
//                   <div className="space-y-4">
//                     <p className="text-sm font-bold text-white mb-4">
//                       Personal Information
//                     </p>
//                     <div className="grid grid-cols-2 gap-3">
//                       <Field
//                         label="First Name"
//                         value={form.first_name}
//                         onChange={set("first_name")}
//                         placeholder="John"
//                         required
//                       />
//                       <Field
//                         label="Last Name"
//                         value={form.last_name}
//                         onChange={set("last_name")}
//                         placeholder="Doe"
//                         required
//                       />
//                     </div>
//                     <Field
//                       label="Email Address"
//                       value={form.email}
//                       onChange={set("email")}
//                       type="email"
//                       placeholder="john@example.com"
//                       required
//                     />
//                     <Field
//                       label="Phone Number"
//                       value={form.phone_number}
//                       onChange={set("phone_number")}
//                       placeholder="+44 7700 900000"
//                       required
//                       hint="Include country code"
//                     />

//                     <button
//                       onClick={() => setStep(2)}
//                       disabled={!step1Valid}
//                       className="w-full mt-2 py-3 rounded-xl font-bold text-sm bg-[#2DD4BF] text-[#071525] hover:bg-[#2DD4BF]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
//                     >
//                       Continue →
//                     </button>
//                   </div>
//                 )}

//                 {/* ── Step 2: Professional Info ── */}
//                 {step === 2 && (
//                   <div className="space-y-4">
//                     <p className="text-sm font-bold text-white mb-4">
//                       Professional Information
//                     </p>
//                     <Field
//                       label="Organization / Club"
//                       value={form.organization_name}
//                       onChange={set("organization_name")}
//                       placeholder="FC Barcelona"
//                       hint="Optional"
//                     />
//                     <Field
//                       label="Region / Country"
//                       value={form.region_country}
//                       onChange={set("region_country")}
//                       placeholder="London, UK"
//                       required
//                     />
//                     <Field
//                       label="Specialization"
//                       value={form.specialization}
//                       onChange={set("specialization")}
//                       placeholder="Youth Development, Talent Scouting..."
//                       required
//                     />
//                     <Field
//                       label="License Number"
//                       value={form.license_number}
//                       onChange={set("license_number")}
//                       placeholder="UEFA A-123456"
//                       hint="Optional"
//                     />
//                     <Field
//                       label="Years of Experience"
//                       value={form.years_of_experience}
//                       onChange={set("years_of_experience")}
//                       type="number"
//                       placeholder="5"
//                       required
//                     />

//                     <div className="flex gap-3 mt-2">
//                       <button
//                         onClick={() => setStep(1)}
//                         className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#162d45] text-[#4A6480] text-sm font-semibold hover:border-[#2DD4BF]/40 hover:text-white transition-all"
//                       >
//                         <ArrowLeft /> Back
//                       </button>
//                       <button
//                         onClick={() => setStep(3)}
//                         disabled={!step2Valid}
//                         className="flex-1 py-3 rounded-xl font-bold text-sm bg-[#2DD4BF] text-[#071525] hover:bg-[#2DD4BF]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
//                       >
//                         Continue →
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* ── Step 3: Review & Submit ── */}
//                 {step === 3 && (
//                   <div className="space-y-5">
//                     <p className="text-sm font-bold text-white">
//                       Review Your Registration
//                     </p>

//                     {/* Event summary */}
//                     <div className="bg-[#2DD4BF]/5 border border-[#2DD4BF]/20 rounded-xl p-4">
//                       <p className="text-[10px] font-semibold uppercase tracking-wider text-[#2DD4BF] mb-1">
//                         Event
//                       </p>
//                       <p className="text-sm font-bold text-white">
//                         {event.event_name}
//                       </p>
//                       <p className="text-[11px] text-[#4A6480] mt-0.5">
//                         {new Date(event.event_date).toLocaleDateString(
//                           "en-GB",
//                           { day: "2-digit", month: "short", year: "numeric" },
//                         )}
//                         {" · "}
//                         {event.venue_name}
//                       </p>
//                       <p className="text-xs font-bold text-[#2DD4BF] mt-1">
//                         Fee: ${parseFloat(event.registration_fee)}
//                       </p>
//                     </div>

//                     {/* Personal */}
//                     <div className="bg-[#0D1B2A] border border-[#162d45] rounded-xl px-4 pt-1">
//                       <p className="text-[10px] uppercase tracking-widest text-[#4A6480] font-semibold pt-3 pb-1">
//                         Personal
//                       </p>
//                       <ReviewRow
//                         label="Full Name"
//                         value={`${form.first_name} ${form.last_name}`}
//                       />
//                       <ReviewRow label="Email" value={form.email} />
//                       <ReviewRow label="Phone" value={form.phone_number} />
//                     </div>

//                     {/* Professional */}
//                     <div className="bg-[#0D1B2A] border border-[#162d45] rounded-xl px-4 pt-1">
//                       <p className="text-[10px] uppercase tracking-widest text-[#4A6480] font-semibold pt-3 pb-1">
//                         Professional
//                       </p>
//                       <ReviewRow
//                         label="Organization"
//                         value={form.organization_name || "—"}
//                       />
//                       <ReviewRow label="Region" value={form.region_country} />
//                       <ReviewRow
//                         label="Specialization"
//                         value={form.specialization}
//                       />
//                       <ReviewRow
//                         label="License #"
//                         value={form.license_number || "—"}
//                       />
//                       <ReviewRow
//                         label="Experience"
//                         value={`${form.years_of_experience} years`}
//                       />
//                     </div>

//                     {/* Agreement */}
//                     <label className="flex items-start gap-3 cursor-pointer">
//                       <button
//                         onClick={() => setAgreed(!agreed)}
//                         className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
//                           agreed
//                             ? "bg-[#2DD4BF] border-[#2DD4BF]"
//                             : "border-[#1d3a55] bg-[#0a1622]"
//                         }`}
//                       >
//                         {agreed && (
//                           <svg
//                             width="10"
//                             height="10"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="#071525"
//                             strokeWidth="3"
//                           >
//                             <polyline points="20 6 9 17 4 12" />
//                           </svg>
//                         )}
//                       </button>
//                       <span className="text-xs text-[#4A6480] leading-relaxed">
//                         I confirm all information is accurate and agree to the{" "}
//                         <span className="text-[#2DD4BF]">
//                           Terms & Conditions
//                         </span>{" "}
//                         of this event registration.
//                       </span>
//                     </label>

//                     {/* Error */}
//                     {error && (
//                       <div className="bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3">
//                         <p className="text-xs text-red-400 font-semibold">
//                           Registration failed. Please try again.
//                         </p>
//                       </div>
//                     )}

//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => setStep(2)}
//                         className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#162d45] text-[#4A6480] text-sm font-semibold hover:border-[#2DD4BF]/40 hover:text-white transition-all"
//                       >
//                         <ArrowLeft /> Back
//                       </button>
//                       <button
//                         onClick={handleSubmit}
//                         disabled={!agreed || isLoading}
//                         className="flex-1 py-3 rounded-xl font-bold text-sm bg-[#2DD4BF] text-[#071525] hover:bg-[#2DD4BF]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
//                       >
//                         {isLoading ? "Submitting..." : "Confirm Registration →"}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EventRegistrationForm;
