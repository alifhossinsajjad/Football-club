"use client";

import { useUpdateProfileMutation } from "@/redux/features/playerProfileAndSetting/profileAndSettingApi";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  profile: any;
  onCancel: () => void;
}

interface FormValues {
  first_name: string;
  last_name: string;
  designation: string;
  address: string;
  about: string;
  age: number | string;
  height: string;
  weight: string;
  nationality: string;
  preferred_foot: string;
  date_of_birth: string;
  jersey_number: number | string;
  phone: string;
  email: string;
  instagram: string;
  twitter: string;
  facebook: string;
  youtube: string;
  availability_status: string;
  preferred_leagues: string;
  contract_status: string;
  available_from: string;
  // Career stats
  career_season: string;
  career_matches: number | string;
  career_goals: number | string;
  career_assists: number | string;
  career_minutes: number | string;
  // Skills
  skill_pace: number;
  skill_shooting: number;
  skill_dribbling: number;
  skill_passing: number;
  skill_physical: number;
  skill_technical: number;
  // Dynamic
  playing_history: {
    club_name: string;
    position: string;
    start_year: string;
    end_year: string;
    achievements: string;
  }[];
  achievements: { title: string; description: string; date_achieved: string }[];
  highlight_videos: { title: string; video_url: string; description: string }[];
}

// ────────────── Styled primitives ──────────────
const inp = {
  width: "100%",
  padding: "9px 12px",
  background: "#0A0F2C",
  border: "1px solid #1E2554",
  borderRadius: 8,
  color: "#fff",
  fontSize: 13,
  fontFamily: "inherit",
  outline: "none",
} as const;

const labelStyle = {
  fontSize: 11,
  color: "#6B74A8",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  fontWeight: 600,
  marginBottom: 4,
  display: "block",
};

const sectionTitle = {
  fontSize: 15,
  fontWeight: 700,
  color: "#fff",
  marginBottom: 14,
  letterSpacing: "0.3px",
};

const card = {
  background: "#11163C",
  borderRadius: 12,
  padding: 20,
  marginBottom: 16,
};

const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
const grid3 = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 };
const grid4 = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: 12,
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function SkillSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 14,
      }}
    >
      <span
        style={{ fontSize: 12, color: "#9BA3C8", width: 72, flexShrink: 0 }}
      >
        {label}
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ flex: 1, accentColor: "#00E5FF", cursor: "pointer" }}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#00E5FF",
          width: 28,
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function ProfileEdit({ profile, onCancel }: Props) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [coverPreview, setCoverPreview] = useState<string>(
    profile?.cover_image || "",
  );
  const [avatarPreview, setAvatarPreview] = useState<string>(
    profile?.profile_image || "",
  );
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { register, handleSubmit, reset, watch, setValue, control } =
    useForm<FormValues>();

  const {
    fields: histFields,
    append: appendHist,
    remove: removeHist,
  } = useFieldArray({ control, name: "playing_history" });
  const {
    fields: achFields,
    append: appendAch,
    remove: removeAch,
  } = useFieldArray({ control, name: "achievements" });
  const {
    fields: vidFields,
    append: appendVid,
    remove: removeVid,
  } = useFieldArray({ control, name: "highlight_videos" });

  const skills = {
    pace: watch("skill_pace") ?? 50,
    shooting: watch("skill_shooting") ?? 50,
    dribbling: watch("skill_dribbling") ?? 50,
    passing: watch("skill_passing") ?? 50,
    physical: watch("skill_physical") ?? 50,
    technical: watch("skill_technical") ?? 50,
  };

  useEffect(() => {
    if (!profile) return;
    reset({
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      designation: profile.designation || "",
      address: profile.address || "",
      about: profile.about || "",
      age: profile.age || "",
      height: profile.height || "",
      weight: profile.weight || "",
      nationality: profile.nationality || "",
      preferred_foot: profile.preferred_foot || "LEFT",
      date_of_birth: profile.date_of_birth || "",
      jersey_number: profile.jersey_number || "",
      phone: profile.phone || "",
      email: profile.email || "",
      instagram: profile.instagram || "",
      twitter: profile.twitter || "",
      facebook: profile.facebook || "",
      youtube: profile.youtube || "",
      availability_status: profile.availability_status || "AVAILABLE",
      preferred_leagues: profile.preferred_leagues || "",
      contract_status: profile.contract_status || "",
      available_from: profile.available_from || "",
      career_season: profile.career_stats?.season || "",
      career_matches: profile.career_stats?.matches || 0,
      career_goals: profile.career_stats?.goals || 0,
      career_assists: profile.career_stats?.assists || 0,
      career_minutes: profile.career_stats?.minutes || 0,
      skill_pace: profile.skills?.pace || 50,
      skill_shooting: profile.skills?.shooting || 50,
      skill_dribbling: profile.skills?.dribbling || 50,
      skill_passing: profile.skills?.passing || 50,
      skill_physical: profile.skills?.physical || 50,
      skill_technical: profile.skills?.technical || 50,
      playing_history:
        profile.playing_history?.map((h: any) => ({
          club_name: h.club_name || "",
          position: h.position || "",
          start_year: String(h.start_year || ""),
          end_year: h.end_year ? String(h.end_year) : "",
          achievements: h.achievements || "",
        })) || [],
      achievements:
        profile.achievements?.map((a: any) => ({
          title: a.title || "",
          description: a.description || "",
          date_achieved: a.date_achieved || "",
        })) || [],
      highlight_videos:
        profile.highlight_videos?.map((v: any) => ({
          title: v.title || "",
          video_url: v.video_url || "",
          description: v.description || "",
        })) || [],
    });
  }, [profile, reset]);

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

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    if (coverFile) formData.append("cover_image", coverFile);
    if (avatarFile) formData.append("profile_image", avatarFile);

    const fields: (keyof FormValues)[] = [
      "first_name",
      "last_name",
      "designation",
      "address",
      "about",
      "age",
      "height",
      "weight",
      "nationality",
      "preferred_foot",
      "date_of_birth",
      "jersey_number",
      "phone",
      "email",
      "instagram",
      "twitter",
      "facebook",
      "youtube",
      "availability_status",
      "preferred_leagues",
      "contract_status",
      "available_from",
    ];
    fields.forEach((k) => {
      const v = data[k];
      if (v !== undefined && v !== null && v !== "")
        formData.append(k, String(v));
    });

    // Career stats & skills - backend may handle separately; append as flat keys
    formData.append("career_season", data.career_season);
    formData.append("career_matches", String(data.career_matches));
    formData.append("career_goals", String(data.career_goals));
    formData.append("career_assists", String(data.career_assists));
    formData.append("career_minutes", String(data.career_minutes));
    formData.append("skill_pace", String(data.skill_pace));
    formData.append("skill_shooting", String(data.skill_shooting));
    formData.append("skill_dribbling", String(data.skill_dribbling));
    formData.append("skill_passing", String(data.skill_passing));
    formData.append("skill_physical", String(data.skill_physical));
    formData.append("skill_technical", String(data.skill_technical));

    // Arrays as JSON string (backend may need adjustment)
    formData.append("playing_history", JSON.stringify(data.playing_history));
    formData.append("achievements", JSON.stringify(data.achievements));
    formData.append("highlight_videos", JSON.stringify(data.highlight_videos));

    try {
      await updateProfile(formData).unwrap();
      
      onCancel();
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const addHistRow = () =>
    appendHist({
      club_name: "",
      position: "",
      start_year: "",
      end_year: "",
      achievements: "",
    });
  const addAchRow = () =>
    appendAch({ title: "", description: "", date_achieved: "" });
  const addVidRow = () =>
    appendVid({ title: "", video_url: "", description: "" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&display=swap');
        .pe-wrap * { box-sizing: border-box; }
        .pe-wrap { font-family: 'Barlow', sans-serif; background: #080D28; min-height: 100vh; padding: 20px; color: #fff; }
        .pe-inner { max-width: 900px; margin: 0 auto; }
        .pe-inp:focus { border-color: #00E5FF !important; }
        .pe-inp::placeholder { color: #3A4270; }
        .pe-inp option { background: #0A0F2C; }
        input[type=range]::-webkit-slider-runnable-track { background: linear-gradient(90deg, #B026FF, #00E5FF); border-radius: 4px; }
        .add-btn { display: flex; align-items: center; gap: 6px; background: rgba(0,229,255,0.08); border: 1px dashed #00E5FF; color: #00E5FF; font-size: 12px; font-weight: 600; border-radius: 8px; padding: 8px 14px; cursor: pointer; font-family: 'Barlow', sans-serif; margin-top: 12px; }
        .remove-btn { background: rgba(255,59,48,0.1); border: 1px solid rgba(255,59,48,0.3); color: #FF3B30; border-radius: 6px; padding: 6px 10px; font-size: 11px; cursor: pointer; font-family: 'Barlow', sans-serif; font-weight: 600; }
        .dynamic-row { background: #0A0F2C; border: 1px solid #1E2554; border-radius: 10px; padding: 14px; margin-bottom: 10px; }
        .header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .section-badge { background: rgba(0,229,255,0.1); border: 1px solid rgba(0,229,255,0.2); color: #00E5FF; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 6px; }
        .save-bar { display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px; }
        .btn-save { background: linear-gradient(135deg, #B026FF, #00BCD4); border: none; border-radius: 10px; color: #fff; font-size: 14px; font-weight: 700; padding: 11px 28px; cursor: pointer; font-family: 'Barlow', sans-serif; }
        .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-cancel { background: #1E2554; border: none; border-radius: 10px; color: #9BA3C8; font-size: 14px; font-weight: 600; padding: 11px 24px; cursor: pointer; font-family: 'Barlow', sans-serif; }
      `}</style>

      <div className="pe-wrap">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pe-inner">
            {/* ── Cover & Avatar Upload ── */}
            <div
              style={{
                ...card,
                padding: 0,
                overflow: "hidden",
                marginBottom: 16,
              }}
            >
              {/* Cover */}
              <div
                style={{
                  height: 140,
                  backgroundImage: coverPreview
                    ? `url(${coverPreview})`
                    : "linear-gradient(135deg,#B026FF,#00E5FF)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => coverInputRef.current?.click()}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "rgba(0,0,0,0.6)",
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#fff",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  📷 Upload Cover Photo
                </div>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleCoverChange}
                />
              </div>

              {/* Avatar */}
              <div style={{ padding: "0 20px 20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 14,
                    marginTop: -40,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      cursor: "pointer",
                      zIndex: 1,
                    }}
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          border: "3px solid #11163C",
                          objectFit: "cover",
                        }}
                        alt="avatar"
                      />
                    ) : (
                      <div
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          border: "3px solid #11163C",
                          background: "linear-gradient(135deg,#B026FF,#00E5FF)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 24,
                          fontWeight: 800,
                        }}
                      >
                        {profile?.first_name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 2,
                        right: 2,
                        background: "#00E5FF",
                        borderRadius: "50%",
                        width: 20,
                        height: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                      }}
                    >
                      📷
                    </div>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleAvatarChange}
                    />
                  </div>
                  <div style={{ paddingBottom: 4 }}>
                    <span style={{ fontSize: 13, color: "#6B74A8" }}>
                      Click avatar or cover to upload new image
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Basic Info ── */}
            <div style={card}>
              <div style={sectionTitle}>Basic Information</div>
              <div style={{ ...grid2, marginBottom: 12 }}>
                <Field label="First Name">
                  <input
                    {...register("first_name")}
                    className="pe-inp"
                    style={inp}
                    placeholder="First Name"
                  />
                </Field>
                <Field label="Last Name">
                  <input
                    {...register("last_name")}
                    className="pe-inp"
                    style={inp}
                    placeholder="Last Name"
                  />
                </Field>
              </div>
              <div style={{ ...grid2, marginBottom: 12 }}>
                <Field label="Position / Designation">
                  <input
                    {...register("designation")}
                    className="pe-inp"
                    style={inp}
                    placeholder="e.g. Forward / Striker"
                  />
                </Field>
                <Field label="Location / Address">
                  <input
                    {...register("address")}
                    className="pe-inp"
                    style={inp}
                    placeholder="City, Country"
                  />
                </Field>
              </div>
              <div style={{ ...grid4, marginBottom: 12 }}>
                <Field label="Age">
                  <input
                    {...register("age")}
                    className="pe-inp"
                    style={inp}
                    type="number"
                    placeholder="23"
                  />
                </Field>
                <Field label="Height (m)">
                  <input
                    {...register("height")}
                    className="pe-inp"
                    style={inp}
                    placeholder="1.80"
                  />
                </Field>
                <Field label="Weight (kg)">
                  <input
                    {...register("weight")}
                    className="pe-inp"
                    style={inp}
                    placeholder="75"
                  />
                </Field>
                <Field label="Nationality">
                  <input
                    {...register("nationality")}
                    className="pe-inp"
                    style={inp}
                    placeholder="e.g. England"
                  />
                </Field>
              </div>
              <div style={{ ...grid3, marginBottom: 12 }}>
                <Field label="Preferred Foot">
                  <select
                    {...register("preferred_foot")}
                    className="pe-inp"
                    style={inp}
                  >
                    <option value="LEFT">Left</option>
                    <option value="RIGHT">Right</option>
                    <option value="BOTH">Both</option>
                  </select>
                </Field>
                <Field label="Date of Birth">
                  <input
                    {...register("date_of_birth")}
                    className="pe-inp"
                    style={inp}
                    type="date"
                  />
                </Field>
                <Field label="Jersey Number">
                  <input
                    {...register("jersey_number")}
                    className="pe-inp"
                    style={inp}
                    type="number"
                    placeholder="10"
                  />
                </Field>
              </div>
              <div style={{ ...grid2, marginBottom: 12 }}>
                <Field label="Availability Status">
                  <select
                    {...register("availability_status")}
                    className="pe-inp"
                    style={inp}
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="UNAVAILABLE">Unavailable</option>
                    <option value="OPEN_TO_OFFERS">Open to Offers</option>
                  </select>
                </Field>
                <Field label="Available From">
                  <input
                    {...register("available_from")}
                    className="pe-inp"
                    style={inp}
                    type="date"
                  />
                </Field>
              </div>
              <Field label="About">
                <textarea
                  {...register("about")}
                  className="pe-inp"
                  style={{ ...inp, minHeight: 90, resize: "vertical" }}
                  placeholder="Tell scouts about yourself..."
                />
              </Field>
            </div>

            {/* ── Contact & Social ── */}
            <div style={card}>
              <div style={sectionTitle}>Contact &amp; Social Media</div>
              <div style={{ ...grid2, marginBottom: 12 }}>
                <Field label="Email">
                  <input
                    {...register("email")}
                    className="pe-inp"
                    style={inp}
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    {...register("phone")}
                    className="pe-inp"
                    style={inp}
                    placeholder="+44 ..."
                  />
                </Field>
                <Field label="Instagram URL">
                  <input
                    {...register("instagram")}
                    className="pe-inp"
                    style={inp}
                    placeholder="https://instagram.com/..."
                  />
                </Field>
              </div>
              <div style={{ ...grid3, marginBottom: 0 }}>
                <Field label="Twitter / X URL">
                  <input
                    {...register("twitter")}
                    className="pe-inp"
                    style={inp}
                    placeholder="https://twitter.com/..."
                  />
                </Field>
                <Field label="Facebook URL">
                  <input
                    {...register("facebook")}
                    className="pe-inp"
                    style={inp}
                    placeholder="https://facebook.com/..."
                  />
                </Field>
                <Field label="YouTube URL">
                  <input
                    {...register("youtube")}
                    className="pe-inp"
                    style={inp}
                    placeholder="https://youtube.com/..."
                  />
                </Field>
              </div>
            </div>

            {/* ── Career Stats ── */}
            <div style={card}>
              <div style={sectionTitle}>Career Statistics</div>
              <div style={{ ...grid4, gridTemplateColumns: "repeat(5,1fr)" }}>
                <Field label="Season">
                  <input
                    {...register("career_season")}
                    className="pe-inp"
                    style={inp}
                    placeholder="2024/25"
                  />
                </Field>
                <Field label="Matches">
                  <input
                    {...register("career_matches")}
                    className="pe-inp"
                    style={inp}
                    type="number"
                    min={0}
                  />
                </Field>
                <Field label="Goals">
                  <input
                    {...register("career_goals")}
                    className="pe-inp"
                    style={inp}
                    type="number"
                    min={0}
                  />
                </Field>
                <Field label="Assists">
                  <input
                    {...register("career_assists")}
                    className="pe-inp"
                    style={inp}
                    type="number"
                    min={0}
                  />
                </Field>
                <Field label="Minutes">
                  <input
                    {...register("career_minutes")}
                    className="pe-inp"
                    style={inp}
                    type="number"
                    min={0}
                  />
                </Field>
              </div>
            </div>

            {/* ── Skills ── */}
            <div style={card}>
              <div style={sectionTitle}>Skills &amp; Attributes</div>
              {(
                [
                  "pace",
                  "shooting",
                  "dribbling",
                  "passing",
                  "physical",
                  "technical",
                ] as const
              ).map((sk) => (
                <SkillSlider
                  key={sk}
                  label={sk.charAt(0).toUpperCase() + sk.slice(1)}
                  value={skills[sk]}
                  onChange={(v) => setValue(`skill_${sk}` as any, v)}
                />
              ))}
            </div>

            {/* ── Playing History ── */}
            <div style={card}>
              <div className="header-row">
                <div style={sectionTitle as any}>Playing History</div>
                <span className="section-badge">
                  {histFields.length} entries
                </span>
              </div>
              {histFields.map((field, i) => (
                <div key={field.id} className="dynamic-row">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#00E5FF",
                      }}
                    >
                      Entry {i + 1}
                    </span>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeHist(i)}
                    >
                      ✕ Remove
                    </button>
                  </div>
                  <div style={{ ...grid2, marginBottom: 10 }}>
                    <Field label="Club Name">
                      <input
                        {...register(`playing_history.${i}.club_name`)}
                        className="pe-inp"
                        style={inp}
                        placeholder="Club / Academy"
                      />
                    </Field>
                    <Field label="Position">
                      <input
                        {...register(`playing_history.${i}.position`)}
                        className="pe-inp"
                        style={inp}
                        placeholder="Forward"
                      />
                    </Field>
                  </div>
                  <div style={{ ...grid3, marginBottom: 10 }}>
                    <Field label="Start Year">
                      <input
                        {...register(`playing_history.${i}.start_year`)}
                        className="pe-inp"
                        style={inp}
                        type="number"
                        placeholder="2020"
                      />
                    </Field>
                    <Field label="End Year">
                      <input
                        {...register(`playing_history.${i}.end_year`)}
                        className="pe-inp"
                        style={inp}
                        type="number"
                        placeholder="Present"
                      />
                    </Field>
                    <Field label="Achievements">
                      <input
                        {...register(`playing_history.${i}.achievements`)}
                        className="pe-inp"
                        style={inp}
                        placeholder="Top scorer..."
                      />
                    </Field>
                  </div>
                </div>
              ))}
              <button type="button" className="add-btn" onClick={addHistRow}>
                + Add History Entry
              </button>
            </div>

            {/* ── Achievements ── */}
            <div style={card}>
              <div className="header-row">
                <div style={sectionTitle as any}>Achievements</div>
                <span className="section-badge">
                  {achFields.length} entries
                </span>
              </div>
              {achFields.map((field, i) => (
                <div key={field.id} className="dynamic-row">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#00E5FF",
                      }}
                    >
                      Achievement {i + 1}
                    </span>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeAch(i)}
                    >
                      ✕ Remove
                    </button>
                  </div>
                  <div style={{ ...grid2, marginBottom: 10 }}>
                    <Field label="Title">
                      <input
                        {...register(`achievements.${i}.title`)}
                        className="pe-inp"
                        style={inp}
                        placeholder="Player of the Month"
                      />
                    </Field>
                    <Field label="Date Achieved">
                      <input
                        {...register(`achievements.${i}.date_achieved`)}
                        className="pe-inp"
                        style={inp}
                        type="date"
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <input
                      {...register(`achievements.${i}.description`)}
                      className="pe-inp"
                      style={inp}
                      placeholder="Brief description..."
                    />
                  </Field>
                </div>
              ))}
              <button type="button" className="add-btn" onClick={addAchRow}>
                + Add Achievement
              </button>
            </div>

            {/* ── Preferences ── */}
            <div style={card}>
              <div style={sectionTitle}>Preferences</div>
              <div style={{ ...grid3, marginBottom: 0 }}>
                <Field label="Preferred Leagues">
                  <input
                    {...register("preferred_leagues")}
                    className="pe-inp"
                    style={inp}
                    placeholder="Premier League, La Liga..."
                  />
                </Field>
                <Field label="Contract Status">
                  <input
                    {...register("contract_status")}
                    className="pe-inp"
                    style={inp}
                    placeholder="Free agent / Under contract..."
                  />
                </Field>
                <Field label="Available From">
                  <input
                    {...register("available_from")}
                    className="pe-inp"
                    style={inp}
                    type="date"
                  />
                </Field>
              </div>
            </div>

            {/* ── Highlight Videos ── */}
            <div style={card}>
              <div className="header-row">
                <div style={sectionTitle as any}>Highlight Videos</div>
                <span className="section-badge">{vidFields.length} videos</span>
              </div>
              {vidFields.map((field, i) => (
                <div key={field.id} className="dynamic-row">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#00E5FF",
                      }}
                    >
                      Video {i + 1}
                    </span>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeVid(i)}
                    >
                      ✕ Remove
                    </button>
                  </div>
                  <div style={{ ...grid2, marginBottom: 10 }}>
                    <Field label="Title">
                      <input
                        {...register(`highlight_videos.${i}.title`)}
                        className="pe-inp"
                        style={inp}
                        placeholder="Season Highlights 2024/25"
                      />
                    </Field>
                    <Field label="Video URL">
                      <input
                        {...register(`highlight_videos.${i}.video_url`)}
                        className="pe-inp"
                        style={inp}
                        placeholder="https://youtube.com/..."
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <input
                      {...register(`highlight_videos.${i}.description`)}
                      className="pe-inp"
                      style={inp}
                      placeholder="Short description..."
                    />
                  </Field>
                </div>
              ))}
              <button type="button" className="add-btn" onClick={addVidRow}>
                + Add Video
              </button>
            </div>

            {/* ── Save Bar ── */}
            <div className="save-bar">
              <button type="button" className="btn-cancel" onClick={onCancel}>
                Cancel
              </button>
              <button type="submit" className="btn-save" disabled={isLoading}>
                {isLoading ? "Saving..." : "💾 Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
