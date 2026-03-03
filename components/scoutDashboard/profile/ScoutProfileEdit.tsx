"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Camera, Plus, X, Trophy, Globe, Twitter, Facebook, Youtube,
  MapPin, Briefcase, Users, ChevronLeft, Save,
} from "lucide-react";
import { Achievement, ScoutProfile } from "@/types/scout/profileType";
import { useUpdateProfileMutation } from "@/redux/features/scout/scoutProfileApi";


// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────

interface FormValues {
  first_name: string;
  last_name: string;
  bio: string;
  about: string;
  location: string;
  experience_years: number | string;
  connections: number | string;
  website: string;
  twitter: string;
  facebook: string;
  youtube: string;
  profile_visibility: string;
  contact_requests: boolean;
  show_online_status: boolean;
  activity_history: boolean;
  preferred_leagues: string;
  contact_status: string;
  availability: string;
  specialization: string; // comma-separated for now
  achievements: {
    id?: number;
    club_name: string;
    achievement: string;
    year: number | string;
    affiliation_type: string;
  }[];
}

interface Props {
  profile: ScoutProfile;
  onCancel: () => void;
}

// ─────────────────────────────────────────────────────────────────
// Styled atoms
// ─────────────────────────────────────────────────────────────────

const inputCls =
  "w-full bg-[#111640] border border-[#1A2160] text-white text-xs rounded-lg px-3 py-2.5 placeholder-[#2D3568] focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF]/20 transition-all duration-200";

const selectCls =
  "w-full bg-[#111640] border border-[#1A2160] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF]/20 transition-all duration-200 appearance-none";

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-[10px] text-[#5B6397] uppercase tracking-wider mb-1 block font-medium">
    {children}
  </label>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl p-4">
    {children}
  </div>
);

const SectionTitle = ({
  children,
  badge,
  onAdd,
}: {
  children: React.ReactNode;
  badge?: number;
  onAdd?: () => void;
}) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5B6397]">
        {children}
      </span>
      {badge !== undefined && (
        <span className="text-[9px] font-bold text-[#00D9FF] bg-[#00D9FF]/10 border border-[#00D9FF]/20 rounded px-1.5 py-0.5">
          {badge}
        </span>
      )}
    </div>
    {onAdd && (
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-1 text-[#00D9FF] text-[10px] hover:brightness-125 transition-all"
      >
        <Plus size={9} /> Add
      </button>
    )}
  </div>
);

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${
      checked ? "bg-[#00D9FF]" : "bg-[#1A2160]"
    }`}
  >
    <span
      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
        checked ? "translate-x-4" : "translate-x-0.5"
      }`}
    />
  </button>
);


export default function ScoutProfileEdit({ profile, onCancel }: Props) {
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();

  // Image state
  const coverRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [coverPreview, setCoverPreview] = useState(profile.cover_image ?? "");
  const [avatarPreview, setAvatarPreview] = useState(profile.profile_image ?? "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { register, handleSubmit, reset, watch, setValue, control } =
    useForm<FormValues>();

  const {
    fields: achFields,
    append: appendAch,
    remove: removeAch,
  } = useFieldArray({ control, name: "achievements" });

  // Populate form from profile
  useEffect(() => {
    if (!profile) return;
    reset({
      first_name: profile.first_name ?? "",
      last_name: profile.last_name ?? "",
      bio: profile.bio ?? "",
      about: profile.about ?? "",
      location: profile.location ?? "",
      experience_years: profile.experience_years ?? "",
      connections: profile.connections ?? "",
      website: profile.website ?? "",
      twitter: profile.twitter ?? "",
      facebook: profile.facebook ?? "",
      youtube: profile.youtube ?? "",
      profile_visibility: profile.profile_visibility ?? "public",
      contact_requests: profile.contact_requests ?? false,
      show_online_status: profile.show_online_status ?? false,
      activity_history: profile.activity_history ?? false,
      preferred_leagues: profile.preferred_leagues ?? "",
      contact_status: profile.contact_status ?? "",
      availability: profile.availability ?? "",
      specialization: profile.specialization?.join(", ") ?? "",
      achievements: (profile.achievements ?? []).map((a) => ({
        id: a.id,
        club_name: a.club_name ?? "",
        achievement: a.achievement ?? "",
        year: a.year ?? new Date().getFullYear(),
        affiliation_type: a.affiliation_type ?? "",
      })),
    });
  }, [profile, reset]);

  // Image handlers
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // Submit
  const onSubmit = async (data: FormValues) => {
    try {
      // Build payload — use FormData if images changed, otherwise plain JSON
      if (coverFile || avatarFile) {
        const fd = new FormData();
        if (coverFile) fd.append("cover_image", coverFile);
        if (avatarFile) fd.append("profile_image", avatarFile);

        // Scalar fields
        const scalar: (keyof Omit<FormValues, "achievements">)[] = [
          "first_name", "last_name", "bio", "about", "location",
          "experience_years", "connections", "website", "twitter",
          "facebook", "youtube", "profile_visibility", "preferred_leagues",
          "contact_status", "availability", "specialization",
        ];
        scalar.forEach((k) => {
          const v = data[k];
          if (v !== undefined && v !== null && v !== "")
            fd.append(k, String(v));
        });
        fd.append("contact_requests", String(data.contact_requests));
        fd.append("show_online_status", String(data.show_online_status));
        fd.append("activity_history", String(data.activity_history));

        // Achievements as JSON string (backend may differ — adjust if needed)
        fd.append("achievements", JSON.stringify(data.achievements));

        await updateProfile({ id: profile.id, data: fd }).unwrap();
      } else {
        // No new images → plain JSON patch
        const payload: Partial<ScoutProfile> = {
          first_name: data.first_name,
          last_name: data.last_name,
          bio: data.bio,
          about: data.about,
          location: data.location,
          experience_years: Number(data.experience_years),
          connections: Number(data.connections),
          website: data.website,
          twitter: data.twitter,
          facebook: data.facebook,
          youtube: data.youtube,
          profile_visibility: data.profile_visibility,
          contact_requests: data.contact_requests,
          show_online_status: data.show_online_status,
          activity_history: data.activity_history,
          preferred_leagues: data.preferred_leagues,
          contact_status: data.contact_status,
          availability: data.availability,
          specialization: data.specialization
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          achievements: data.achievements.map((a) => ({
            ...(a.id ? { id: a.id } : {}),
            club_name: a.club_name,
            achievement: a.achievement,
            year: Number(a.year),
            affiliation_type: a.affiliation_type,
          })) as Achievement[],
        };
        await updateProfile({ id: profile.id, data: payload }).unwrap();
      }

      toast.success("Profile updated successfully!");
      onCancel();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  // Watch toggles so UI stays in sync
  const contactRequests = watch("contact_requests");
  const showOnline = watch("show_online_status");
  const activityHistory = watch("activity_history");

  return (
    <div className="min-h-screen bg-[#070B24] text-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex min-h-screen">

          {/* ══════════════════════════════════════
              LEFT COLUMN — Image preview sidebar
          ══════════════════════════════════════ */}
          <div
            className="w-[290px] min-w-[290px] bg-[#08092F] border-r border-[#1A2160] overflow-y-auto flex-shrink-0 flex flex-col"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="p-3 flex-1">

              {/* Cover image picker */}
              <div className="relative h-[120px] rounded-xl overflow-hidden mb-0 cursor-pointer group"
                onClick={() => coverRef.current?.click()}>
                {coverPreview ? (
                  <img src={coverPreview} alt="cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0B2040] to-[#070B24]" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-1.5 text-white text-xs font-medium">
                    <Camera size={13} /> Upload Cover
                  </div>
                </div>
              </div>
              <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />

              {/* Avatar picker */}
              <div className="bg-[#0C1033] rounded-xl px-4 pb-4 -mt-1">
                <div className="flex items-end gap-3 -mt-8 mb-3">
                  <div
                    className="relative w-[60px] h-[60px] rounded-full border-[3px] border-[#08092F] bg-[#111640] overflow-hidden cursor-pointer group flex-shrink-0"
                    onClick={() => avatarRef.current?.click()}
                  >
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#2D3568]">
                        <Users size={22} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera size={14} className="text-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#00D9FF] rounded-full flex items-center justify-center">
                      <Camera size={9} className="text-[#070B24]" />
                    </div>
                  </div>
                  <div className="pb-1">
                    <p className="text-white text-xs font-bold">
                      {watch("first_name") || profile.first_name}{" "}
                      {watch("last_name") || profile.last_name}
                    </p>
                    <p className="text-[#5B6397] text-[9px] mt-0.5">
                      Click to upload new images
                    </p>
                  </div>
                </div>
                <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />

                <div className="h-px bg-[#1A2160] my-3" />

                {/* Live preview of key info */}
                <div className="flex flex-col gap-2">
                  {[
                    { icon: <MapPin size={9} />, val: watch("location") || profile.location || "Location" },
                    { icon: <Briefcase size={9} />, val: `${watch("experience_years") ?? profile.experience_years ?? 0} years experience` },
                    { icon: <Users size={9} />, val: `${watch("connections") ?? profile.connections ?? 0} connections` },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-[#00D9FF]">{r.icon}</span>
                      <span className="text-[#5B6397] text-[9px]">{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview of achievements count */}
              <div className="mt-3 bg-[#0C1033] border border-[#1A2160] rounded-xl p-3">
                <p className="text-[9px] uppercase tracking-widest text-[#5B6397] mb-2">
                  Achievements
                </p>
                <p className="text-[#00D9FF] text-xl font-bold">{achFields.length}</p>
                <p className="text-[#5B6397] text-[9px]">entries</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-3 border-t border-[#1A2160] flex flex-col gap-2">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#7B2FFF] to-[#00D9FF] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                {isSaving ? (
                  <>
                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Save size={12} /> Save Changes
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="w-full py-2 rounded-xl text-xs font-semibold text-[#5B6397] bg-[#111640] border border-[#1A2160] hover:border-[#2D3568] transition-colors flex items-center justify-center gap-1.5"
              >
                <ChevronLeft size={12} /> Cancel
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════════
              RIGHT COLUMN — Edit Form
          ══════════════════════════════════════ */}
          <div
            className="flex-1 overflow-y-auto"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#1A2160 transparent" }}
          >
            <div className="max-w-[680px] mx-auto px-5 py-5 flex flex-col gap-3">

              {/* ── Basic Information ── */}
              <Card>
                <SectionTitle>Basic Information</SectionTitle>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>First Name</Label>
                    <input {...register("first_name")} className={inputCls} placeholder="First name" />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <input {...register("last_name")} className={inputCls} placeholder="Last name" />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <div className="relative">
                      <MapPin size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D3568]" />
                      <input {...register("location")} className={`${inputCls} pl-8`} placeholder="City, Country" />
                    </div>
                  </div>
                  <div>
                    <Label>Experience (years)</Label>
                    <input {...register("experience_years")} type="number" className={inputCls} placeholder="0" />
                  </div>
                  <div>
                    <Label>Availability</Label>
                    <input {...register("availability")} className={inputCls} placeholder="e.g. Full-time" />
                  </div>
                  <div>
                    <Label>Contact Status</Label>
                    <input {...register("contact_status")} className={inputCls} placeholder="e.g. Available" />
                  </div>
                  <div className="col-span-2">
                    <Label>Specialization (comma-separated)</Label>
                    <input
                      {...register("specialization")}
                      className={inputCls}
                      placeholder="e.g. youth_scouting, international_scouting"
                    />
                  </div>
                </div>
              </Card>

              {/* ── About ── */}
              <Card>
                <SectionTitle>About</SectionTitle>
                <div className="flex flex-col gap-3">
                  <div>
                    <Label>Short Bio</Label>
                    <textarea
                      {...register("bio")}
                      rows={2}
                      className={`${inputCls} resize-none`}
                      placeholder="A short bio…"
                    />
                  </div>
                  <div>
                    <Label>Detailed About</Label>
                    <textarea
                      {...register("about")}
                      rows={4}
                      className={`${inputCls} resize-none`}
                      placeholder="Tell scouts more about your background, philosophy, and approach…"
                    />
                  </div>
                </div>
              </Card>

              {/* ── Contact Information ── */}
              <Card>
                <SectionTitle>Contact Information</SectionTitle>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Website", name: "website" as const, icon: <Globe size={11} />, placeholder: "https://…" },
                    { label: "Twitter / X", name: "twitter" as const, icon: <Twitter size={11} />, placeholder: "@handle" },
                    { label: "Facebook", name: "facebook" as const, icon: <Facebook size={11} />, placeholder: "Facebook URL" },
                    { label: "YouTube", name: "youtube" as const, icon: <Youtube size={11} />, placeholder: "YouTube URL" },
                  ].map((f) => (
                    <div key={f.name}>
                      <Label>{f.label}</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D3568]">{f.icon}</span>
                        <input {...register(f.name)} className={`${inputCls} pl-8`} placeholder={f.placeholder} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* ── Scouting Options ── */}
              <Card>
                <SectionTitle>Scouting Options</SectionTitle>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Preferred Leagues / Regions</Label>
                    <input {...register("preferred_leagues")} className={inputCls} placeholder="e.g. Premier League, La Liga" />
                  </div>
                  <div>
                    <Label>Profile Visibility</Label>
                    <select {...register("profile_visibility")} className={selectCls}>
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="connections_only">Connections Only</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* ── Privacy Settings ── */}
              <Card>
                <SectionTitle>Privacy Settings</SectionTitle>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      label: "Contact Requests",
                      sub: "Allow others to send you requests",
                      checked: contactRequests,
                      field: "contact_requests" as const,
                    },
                    {
                      label: "Show Online Status",
                      sub: "Display when you're active",
                      checked: showOnline,
                      field: "show_online_status" as const,
                    },
                    {
                      label: "Activity History",
                      sub: "Track your scouting activity",
                      checked: activityHistory,
                      field: "activity_history" as const,
                    },
                  ].map((item) => (
                    <div key={item.field} className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[#8891BB] text-xs font-medium">{item.label}</p>
                        <p className="text-[#5B6397] text-[9px]">{item.sub}</p>
                      </div>
                      <Toggle
                        checked={!!item.checked}
                        onChange={() => setValue(item.field, !item.checked)}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* ── Professional History / Achievements ── */}
              <Card>
                <SectionTitle
                  badge={achFields.length}
                  onAdd={() =>
                    appendAch({
                      club_name: "",
                      achievement: "",
                      year: new Date().getFullYear(),
                      affiliation_type: "",
                    })
                  }
                >
                  Professional History
                </SectionTitle>

                {achFields.length === 0 ? (
                  <div className="border border-dashed border-[#1A2160] rounded-lg py-8 flex flex-col items-center justify-center">
                    <Trophy size={18} className="text-[#2D3568] mb-2" />
                    <p className="text-[#2D3568] text-[10px]">No history added yet</p>
                    <button
                      type="button"
                      onClick={() =>
                        appendAch({
                          club_name: "",
                          achievement: "",
                          year: new Date().getFullYear(),
                          affiliation_type: "",
                        })
                      }
                      className="mt-2 flex items-center gap-1 text-[#00D9FF] text-[10px] hover:brightness-125"
                    >
                      <Plus size={10} /> Add Entry
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {achFields.map((field, i) => (
                      <div
                        key={field.id}
                        className="bg-[#111640] border border-[#1A2160] rounded-lg p-3"
                      >
                        {/* Entry header */}
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-1.5">
                            <Trophy size={10} className="text-[#00D9FF]" />
                            <span className="text-[#00D9FF] text-[10px] font-semibold">
                              Entry {i + 1}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAch(i)}
                            className="text-[#2D3568] hover:text-red-400 transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>Club / Organization</Label>
                            <input
                              {...register(`achievements.${i}.club_name`)}
                              className={inputCls}
                              placeholder="Club name"
                            />
                          </div>
                          <div>
                            <Label>Year</Label>
                            <input
                              {...register(`achievements.${i}.year`)}
                              type="number"
                              className={inputCls}
                              placeholder="2024"
                            />
                          </div>
                          <div>
                            <Label>Achievement</Label>
                            <input
                              {...register(`achievements.${i}.achievement`)}
                              className={inputCls}
                              placeholder="e.g. Top Scout Award"
                            />
                          </div>
                          <div>
                            <Label>Affiliation Type</Label>
                            <input
                              {...register(`achievements.${i}.affiliation_type`)}
                              className={inputCls}
                              placeholder="e.g. Club, Federation"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* ── Ranking Stats (read-only) ── */}
              <Card>
                <SectionTitle>Ranking Stats</SectionTitle>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Players Viewed", value: profile.dashboard_stats?.players_viewed ?? 0 },
                    { label: "Shortlisted", value: profile.dashboard_stats?.shortlisted_players ?? 0 },
                    { label: "Upcoming Events", value: profile.dashboard_stats?.upcoming_events ?? 0 },
                    { label: "Active Chats", value: profile.dashboard_stats?.active_conversations ?? 0 },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-[#111640] border border-[#1A2160] rounded-lg px-3 py-2.5 flex items-center justify-between"
                    >
                      <span className="text-[#5B6397] text-[10px]">{s.label}</span>
                      <span className="text-[#00D9FF] text-sm font-bold">{s.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[#2D3568] text-[9px] mt-2 text-center italic">
                  Stats are read-only — updated automatically by the platform.
                </p>
              </Card>

              {/* ── Bottom save bar ── */}
              <div className="flex gap-2 pt-1 pb-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-[#5B6397] bg-[#111640] border border-[#1A2160] hover:border-[#2D3568] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-2 flex-grow py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#7B2FFF] to-[#00D9FF] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <Save size={12} /> Save Changes
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
}