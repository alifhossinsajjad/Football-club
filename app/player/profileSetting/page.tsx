"use client";

import { useChangePasswordMutation, useDeleteAccountMutation, useDownloadDataMutation, useGetAllSettingsQuery, useUpdateAccountSettingsMutation, useUpdateNotificationSettingsMutation, useUpdatePrivacySettingsMutation } from "@/redux/features/player/setting/settingApi";
import { AccountSettings, NotificationSettings, PrivacySettings } from "@/types/setting";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";


// ─── Icons ────────────────────────────────────────────────────────────────────

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const KeyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="8" cy="15" r="5" />
    <path d="M17.657 6.343l-4.95 4.95" />
    <path d="M21 3l-3.343 3.343" />
    <path d="M19.071 4.929l-1.414 1.414" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4h6v2" />
  </svg>
);

const MonitorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

// ─── Toggle ───────────────────────────────────────────────────────────────────

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-300 focus:outline-none flex-shrink-0 ${
      checked ? "bg-[#00C4A0]" : "bg-[#1E3048]"
    }`}
    role="switch"
    aria-checked={checked}
  >
    <span
      className={`inline-block h-3.5 w-3.5 transform rounded-full shadow transition-transform duration-300 ${
        checked ? "translate-x-4 bg-white" : "translate-x-1 bg-[#4A6480]"
      }`}
    />
  </button>
);

// ─── Checkbox ─────────────────────────────────────────────────────────────────

const Checkbox = ({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) => (
  <div
    className="flex items-start justify-between py-2 cursor-pointer"
    onClick={() => onChange(!checked)}
  >
    <div className="flex-1 pr-4">
      <p className="text-sm text-[#C8D8E8] font-medium">{label}</p>
      {description && <p className="text-xs text-[#4A6480] mt-0.5">{description}</p>}
    </div>
    <div
      className={`w-4 h-4 rounded flex-shrink-0 mt-0.5 border flex items-center justify-center transition-colors ${
        checked ? "bg-[#00C4A0] border-[#00C4A0]" : "border-[#2A4060] bg-transparent"
      }`}
    >
      {checked && (
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0B1623" strokeWidth="3.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  </div>
);

// ─── Section Label ─────────────────────────────────────────────────────────────

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-semibold text-[#4A6480] uppercase tracking-[0.12em] mb-2 mt-5 first:mt-0">
    {children}
  </p>
);

// ─── Divider ──────────────────────────────────────────────────────────────────

const Divider = () => <div className="border-b border-[#162435]" />;

// ─── Action Row ───────────────────────────────────────────────────────────────

const ActionRow = ({
  icon,
  label,
  description,
  onClick,
  rightText,
  rightColor = "text-[#4A6480]",
}: {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  rightText?: string;
  rightColor?: string;
}) => (
  <>
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-3 group hover:bg-white/[0.02] transition-colors text-left"
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-[#4A6480] group-hover:text-[#7A9AB8] transition-colors">{icon}</span>}
        <div>
          <p className="text-sm text-[#C8D8E8] font-medium group-hover:text-white transition-colors">
            {label}
          </p>
          {description && <p className="text-xs text-[#4A6480] mt-0.5">{description}</p>}
        </div>
      </div>
      {rightText ? (
        <span className={`text-xs font-medium ${rightColor}`}>{rightText}</span>
      ) : (
        <span className="text-[#2A4060] group-hover:text-[#4A6480] transition-colors">
          <ChevronRight />
        </span>
      )}
    </button>
    <Divider />
  </>
);

// ─── Toggle Row ───────────────────────────────────────────────────────────────

const ToggleRow = ({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <>
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 pr-4">
        <p className="text-sm text-[#C8D8E8] font-medium">{label}</p>
        {description && <p className="text-xs text-[#4A6480] mt-0.5">{description}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
    <Divider />
  </>
);

// ─── Save Button ──────────────────────────────────────────────────────────────

const SaveButton = ({
  onClick,
  loading,
  label = "Save Settings",
}: {
  onClick: () => void;
  loading?: boolean;
  label?: string;
}) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="w-full mt-6 py-2.5 rounded bg-[#00C4A0] hover:bg-[#00D4AD] text-[#0B1623] font-semibold text-sm tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {loading ? "Saving..." : label}
  </button>
);

// ─── Password Input ───────────────────────────────────────────────────────────

const PasswordInput = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="text-xs text-[#4A6480] block mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "••••••••"}
          className="w-full bg-[#0D1B2A] border border-[#1E3048] rounded px-3 py-2.5 text-sm text-[#C8D8E8] placeholder-[#2A4060] focus:outline-none focus:border-[#00C4A0] transition-colors pr-10"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A6480] hover:text-[#7A9AB8] transition-colors"
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
};

// ─── Modal ────────────────────────────────────────────────────────────────────

const Modal = ({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0E1B2A] border border-[#1E3048] rounded-lg p-6 w-full max-w-sm mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold text-base">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#4A6480] hover:text-white transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = ["Account", "Privacy", "Notifications", "Preferences"] as const;
type Tab = (typeof TABS)[number];

// ─── Main Settings Page ───────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Account");

  // API hooks
  const { data, isLoading } = useGetAllSettingsQuery();
  const [updateNotifications, { isLoading: savingNotif }] = useUpdateNotificationSettingsMutation();
  const [updatePrivacy, { isLoading: savingPrivacy }] = useUpdatePrivacySettingsMutation();
  const [updateAccount, { isLoading: savingAccount }] = useUpdateAccountSettingsMutation();
  const [changePassword, { isLoading: changingPwd }] = useChangePasswordMutation();
  const [downloadData, { isLoading: downloading }] = useDownloadDataMutation();
  const [deleteAccount] = useDeleteAccountMutation();

  // Local state — notifications
  const [notif, setNotif] = useState<Omit<NotificationSettings, "id">>({
    email_new_messages: true,
    email_event_reminders: true,
    email_profile_views: true,
    email_news_updates: true,
    push_enabled: true,
    push_sound: true,
  });

  // Local state — privacy
  const [privacy, setPrivacy] = useState<Omit<PrivacySettings, "id">>({
    visible_to_clubs: true,
    visible_to_scouts: true,
    show_age_publicly: true,
    show_contact_publicly: false,
    allow_direct_messages: true,
  });

  // Local state — account/preferences
  const [account, setAccount] = useState<Omit<AccountSettings, "id">>({
    language: "English",
    timezone: "GMT+1 (Madrid)",
    save_search_history: true,
    show_event_recommendations: true,
  });

  // Password modal
  const [pwdModal, setPwdModal] = useState(false);
  const [pwdForm, setPwdForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState(false);

  // Delete modal
  const [deleteModal, setDeleteModal] = useState(false);

  // Download feedback
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Sync API → local state
  useEffect(() => {
    if (!data) return;
    const n = data.notification_settings;
    setNotif({
      email_new_messages: n.email_new_messages,
      email_event_reminders: n.email_event_reminders,
      email_profile_views: n.email_profile_views,
      email_news_updates: n.email_news_updates,
      push_enabled: n.push_enabled,
      push_sound: n.push_sound,
    });
    const p = data.privacy_settings;
    setPrivacy({
      visible_to_clubs: p.visible_to_clubs,
      visible_to_scouts: p.visible_to_scouts,
      show_age_publicly: p.show_age_publicly,
      show_contact_publicly: p.show_contact_publicly,
      allow_direct_messages: p.allow_direct_messages,
    });
    const a = data.account_settings;
    setAccount({
      language: a.language,
      timezone: a.timezone,
      save_search_history: a.save_search_history,
      show_event_recommendations: a.show_event_recommendations,
    });
  }, [data]);

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleSaveNotifications = async () => {
    await updateNotifications({ id: data?.notification_settings.id, ...notif });
  };

  const handleSavePrivacy = async () => {
    await updatePrivacy({ id: data?.privacy_settings.id, ...privacy });
  };

  const handleSaveAccount = async () => {
    await updateAccount({ id: data?.account_settings.id, ...account });
  };

  const handleChangePassword = async () => {
    setPwdError("");
    setPwdSuccess(false);
    if (!pwdForm.old_password || !pwdForm.new_password || !pwdForm.confirm_password) {
      setPwdError("All fields are required.");
      return;
    }
    if (pwdForm.new_password !== pwdForm.confirm_password) {
      setPwdError("New passwords do not match.");
      return;
    }
    if (pwdForm.new_password.length < 8) {
      setPwdError("Password must be at least 8 characters.");
      return;
    }
    try {
      await changePassword(pwdForm).unwrap();
      setPwdSuccess(true);
      setPwdForm({ old_password: "", new_password: "", confirm_password: "" });
      setTimeout(() => {
        setPwdModal(false);
        setPwdSuccess(false);
      }, 1500);
    } catch {
      setPwdError("Incorrect current password. Please try again.");
    }
  };

  // Download data — POST API → convert to multi-sheet Excel (.xlsx) file
  const handleDownloadData = async () => {
    try {
      const res = await downloadData().unwrap();
      const p = res.profile;

      const wb = XLSX.utils.book_new();

      // ── Sheet 1: Profile Info ──────────────────────────────────────────────
      const profileRows = [
        ["Field", "Value"],
        ["Full Name",           p.full_name],
        ["First Name",          p.first_name],
        ["Last Name",           p.last_name],
        ["Designation",         p.designation],
        ["Age",                 p.age],
        ["Date of Birth",       p.date_of_birth],
        ["Nationality",         p.nationality],
        ["Address",             p.address],
        ["Phone",               p.phone],
        ["Height (m)",          p.height],
        ["Weight (kg)",         p.weight],
        ["Jersey Number",       p.jersey_number],
        ["Preferred Foot",      p.preferred_foot],
        ["Availability Status", p.availability_status],
        ["Contract Status",     p.contract_status],
        ["Available From",      p.available_from],
        ["Preferred Leagues",   p.preferred_leagues],
        ["Profile Completeness",`${p.profile_completeness}%`],
        ["About",               p.about],
        ["Instagram",           p.instagram],
        ["Twitter",             p.twitter],
        ["Facebook",            p.facebook],
        ["YouTube",             p.youtube],
        ["Profile Created",     p.created_at],
        ["Last Updated",        p.updated_at],
        ["Exported At",         new Date().toISOString()],
      ];
      const wsProfile = XLSX.utils.aoa_to_sheet(profileRows);
      wsProfile["!cols"] = [{ wch: 22 }, { wch: 45 }];
      XLSX.utils.book_append_sheet(wb, wsProfile, "Profile Info");

      // ── Sheet 2: Career Stats ──────────────────────────────────────────────
      const cs = p.career_stats;
      const careerRows = [
        ["Field",   "Value"],
        ["Season",  cs.season],
        ["Matches", cs.matches],
        ["Goals",   cs.goals],
        ["Assists", cs.assists],
        ["Minutes", cs.minutes],
      ];
      const wsCareer = XLSX.utils.aoa_to_sheet(careerRows);
      wsCareer["!cols"] = [{ wch: 18 }, { wch: 18 }];
      XLSX.utils.book_append_sheet(wb, wsCareer, "Career Stats");

      // ── Sheet 3: Skills ────────────────────────────────────────────────────
      const sk = p.skills;
      const skillRows = [
        ["Skill",     "Rating (0–100)"],
        ["Pace",      sk.pace],
        ["Shooting",  sk.shooting],
        ["Dribbling", sk.dribbling],
        ["Passing",   sk.passing],
        ["Physical",  sk.physical],
        ["Technical", sk.technical],
      ];
      const wsSkills = XLSX.utils.aoa_to_sheet(skillRows);
      wsSkills["!cols"] = [{ wch: 18 }, { wch: 18 }];
      XLSX.utils.book_append_sheet(wb, wsSkills, "Skills");

      // ── Sheet 4: Playing History ───────────────────────────────────────────
      const historyHeader = ["Club Name", "Position", "Start Year", "End Year", "Achievements"];
      const historyData = p.playing_history.map((h) => [
        h.club_name, h.position, h.start_year, h.end_year, h.achievements,
      ]);
      const wsHistory = XLSX.utils.aoa_to_sheet([historyHeader, ...historyData]);
      wsHistory["!cols"] = [{ wch: 22 }, { wch: 16 }, { wch: 12 }, { wch: 12 }, { wch: 35 }];
      XLSX.utils.book_append_sheet(wb, wsHistory, "Playing History");

      // ── Sheet 5: Achievements ──────────────────────────────────────────────
      const achHeader = ["Title", "Description", "Date Achieved"];
      const achData = p.achievements.map((a) => [a.title, a.description, a.date_achieved]);
      const wsAch = XLSX.utils.aoa_to_sheet([achHeader, ...achData]);
      wsAch["!cols"] = [{ wch: 22 }, { wch: 40 }, { wch: 16 }];
      XLSX.utils.book_append_sheet(wb, wsAch, "Achievements");

      // ── Sheet 6: Highlight Videos ──────────────────────────────────────────
      const vidHeader = ["Title", "Video URL", "Description"];
      const vidData = p.highlight_videos.map((v) => [v.title, v.video_url, v.description]);
      const wsVid = XLSX.utils.aoa_to_sheet([vidHeader, ...vidData]);
      wsVid["!cols"] = [{ wch: 22 }, { wch: 45 }, { wch: 35 }];
      XLSX.utils.book_append_sheet(wb, wsVid, "Highlight Videos");

      // ── Sheet 7: Profile Insights ──────────────────────────────────────────
      const ins = p.insights;
      const insightRows = [
        ["Metric",                   "Value"],
        ["Profile Views (Total)",    ins.profile_views],
        ["Profile Views (This Week)", ins.profile_views_this_week],
        ["Scout Views (Total)",      ins.scout_views],
        ["Scout Views (This Week)",  ins.scout_views_this_week],
        ["Club Interest (Total)",    ins.club_interest],
        ["Club Interest (This Month)", ins.club_interest_this_month],
      ];
      const wsInsights = XLSX.utils.aoa_to_sheet(insightRows);
      wsInsights["!cols"] = [{ wch: 28 }, { wch: 18 }];
      XLSX.utils.book_append_sheet(wb, wsInsights, "Insights");

      // ── Trigger download ───────────────────────────────────────────────────
      const fileName = `player-data-${new Date().toISOString().split("T")[0]}.xlsx`;
      XLSX.writeFile(wb, fileName);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error("Excel export failed:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount().unwrap();
      setDeleteModal(false);
      // Redirect to login or home
    } catch {
      // handle error
    }
  };

  // ─── Tab Content: Account ────────────────────────────────────────────────────

  const AccountTab = () => (
    <div>
      <SectionLabel>Account Actions</SectionLabel>
      <Divider />
      <ActionRow
        icon={<KeyIcon />}
        label="Change Password"
        description="Update your login credentials"
        onClick={() => setPwdModal(true)}
      />
      <ActionRow
        icon={<PencilIcon />}
        label="Email Preferences"
        description="Manage notification email settings"
        onClick={() => setActiveTab("Notifications")}
      />
      <ActionRow
        icon={<StarIcon />}
        label="Subscription"
        description="Manage your plan and billing"
        onClick={() => {}}
      />

      <SectionLabel>Active Sessions</SectionLabel>
      <Divider />
      {data?.active_sessions && data.active_sessions.length > 0 ? (
        data.active_sessions.map((s, i) => (
          <div key={s.id}>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="text-[#4A6480]">
                  {i === 0 ? <PhoneIcon /> : <MonitorIcon />}
                </span>
                <div>
                  <p className="text-sm text-[#C8D8E8] font-medium">{s.device}</p>
                  <p className="text-xs text-[#4A6480]">
                    {s.location} · {s.last_active}
                  </p>
                </div>
              </div>
              <button className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors">
                Remove
              </button>
            </div>
            <Divider />
          </div>
        ))
      ) : (
        <>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <span className="text-[#4A6480]"><PhoneIcon /></span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-[#C8D8E8] font-medium">Chrome · Windows</p>
                  <span className="text-[10px] text-[#00C4A0] bg-[#00C4A0]/10 px-1.5 py-0.5 rounded">
                    Current
                  </span>
                </div>
                <p className="text-xs text-[#4A6480]">Dhaka, BD · Just now</p>
              </div>
            </div>
            <button className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors">
              Remove
            </button>
          </div>
          <Divider />
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <span className="text-[#4A6480]"><MonitorIcon /></span>
              <div>
                <p className="text-sm text-[#C8D8E8] font-medium">Valid on iPhone</p>
                <p className="text-xs text-[#4A6480]">iOS · 3 hours ago</p>
              </div>
            </div>
            <button className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors">
              Remove
            </button>
          </div>
          <Divider />
        </>
      )}

      <SectionLabel>Delete Account</SectionLabel>
      <Divider />
      <div className="py-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-red-400"><TrashIcon /></span>
            <div>
              <p className="text-sm text-red-400 font-medium">Delete account</p>
              <p className="text-xs text-[#4A6480] mt-0.5">
                Permanently delete your account and all associated data
              </p>
            </div>
          </div>
          <button
            onClick={() => setDeleteModal(true)}
            className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors ml-4 flex-shrink-0"
          >
            Delete
          </button>
        </div>
      </div>
      <Divider />

      <SaveButton onClick={handleSaveAccount} loading={savingAccount} label="Save Account Settings" />
    </div>
  );

  // ─── Tab Content: Privacy ────────────────────────────────────────────────────

  const PrivacyTab = () => (
    <div>
      <SectionLabel>Profile Visibility</SectionLabel>
      <Divider />
      <ToggleRow
        label="Make my profile visible to clubs"
        description="Football clubs can discover and view your profile"
        checked={privacy.visible_to_clubs}
        onChange={(v) => setPrivacy({ ...privacy, visible_to_clubs: v })}
      />
      <ToggleRow
        label="Make my profile visible to scouts"
        description="Allow talent scouts to find your profile"
        checked={privacy.visible_to_scouts}
        onChange={(v) => setPrivacy({ ...privacy, visible_to_scouts: v })}
      />
      <ToggleRow
        label="Show age publicly"
        description="Display your age on your public profile"
        checked={privacy.show_age_publicly}
        onChange={(v) => setPrivacy({ ...privacy, show_age_publicly: v })}
      />

      <SectionLabel>Contact Privacy</SectionLabel>
      <Divider />
      <ToggleRow
        label="Show contact publicly"
        description="Display contact information on your profile"
        checked={privacy.show_contact_publicly}
        onChange={(v) => setPrivacy({ ...privacy, show_contact_publicly: v })}
      />
      <ToggleRow
        label="Allow direct messages"
        description="Let other users message you directly"
        checked={privacy.allow_direct_messages}
        onChange={(v) => setPrivacy({ ...privacy, allow_direct_messages: v })}
      />

      <SectionLabel>Data & Privacy</SectionLabel>
      <Divider />
      <div className="flex items-center justify-between py-3">
        <div>
          <p className="text-sm text-[#C8D8E8] font-medium">Download My Data</p>
          <p className="text-xs text-[#4A6480] mt-0.5">
            Export a copy of all your personal data as JSON
          </p>
        </div>
        <button
          onClick={handleDownloadData}
          disabled={downloading}
          className={`flex items-center gap-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
            downloadSuccess ? "text-[#00C4A0]" : "text-[#4A6480] hover:text-[#00C4A0]"
          }`}
        >
          <DownloadIcon />
          {downloading ? "Exporting..." : downloadSuccess ? "✓ Downloaded!" : "Export Excel"}
        </button>
      </div>
      <Divider />

      <SaveButton onClick={handleSavePrivacy} loading={savingPrivacy} label="Save Privacy Settings" />
    </div>
  );

  // ─── Tab Content: Notifications ──────────────────────────────────────────────

  const NotificationsTab = () => (
    <div>
      <SectionLabel>Email Notifications</SectionLabel>
      <Divider />
      <ToggleRow
        label="New message notifications"
        description="Get emailed when you receive new messages"
        checked={notif.email_new_messages}
        onChange={(v) => setNotif({ ...notif, email_new_messages: v })}
      />
      <ToggleRow
        label="Event reminders"
        description="Receive email reminders for upcoming events"
        checked={notif.email_event_reminders}
        onChange={(v) => setNotif({ ...notif, email_event_reminders: v })}
      />
      <ToggleRow
        label="Profile views"
        description="Get notified when someone views your profile"
        checked={notif.email_profile_views}
        onChange={(v) => setNotif({ ...notif, email_profile_views: v })}
      />
      <ToggleRow
        label="News & updates"
        description="Stay informed about platform news"
        checked={notif.email_news_updates}
        onChange={(v) => setNotif({ ...notif, email_news_updates: v })}
      />

      <SectionLabel>Push Notifications</SectionLabel>
      <Divider />
      <ToggleRow
        label="Enable push notifications"
        description="Receive real-time push notifications"
        checked={notif.push_enabled}
        onChange={(v) => setNotif({ ...notif, push_enabled: v })}
      />
      <ToggleRow
        label="Sound for notifications"
        description="Play a sound with each notification"
        checked={notif.push_sound}
        onChange={(v) => setNotif({ ...notif, push_sound: v })}
      />

      <SaveButton
        onClick={handleSaveNotifications}
        loading={savingNotif}
        label="Save Notification Settings"
      />
    </div>
  );

  // ─── Tab Content: Preferences ────────────────────────────────────────────────

  const PreferencesTab = () => (
    <div>
      <SectionLabel>Language & Region</SectionLabel>
      <Divider />
      <div className="py-3 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-[#4A6480] mb-1.5">Language</p>
          <select
            value={account.language}
            onChange={(e) => setAccount({ ...account, language: e.target.value })}
            className="w-full bg-[#0D1B2A] border border-[#1E3048] rounded px-3 py-2 text-sm text-[#C8D8E8] focus:outline-none focus:border-[#00C4A0] transition-colors cursor-pointer appearance-none"
          >
            {["English", "Spanish", "French", "German", "Portuguese", "Arabic"].map((l) => (
              <option key={l} value={l} className="bg-[#0D1B2A]">{l}</option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-xs text-[#4A6480] mb-1.5">Timezone</p>
          <select
            value={account.timezone}
            onChange={(e) => setAccount({ ...account, timezone: e.target.value })}
            className="w-full bg-[#0D1B2A] border border-[#1E3048] rounded px-3 py-2 text-sm text-[#C8D8E8] focus:outline-none focus:border-[#00C4A0] transition-colors cursor-pointer appearance-none"
          >
            {[
              "GMT+0 (London)",
              "GMT+1 (Madrid)",
              "GMT+2 (Cairo)",
              "GMT+3 (Riyadh)",
              "GMT+6 (Dhaka)",
              "GMT-5 (New York)",
              "GMT-8 (Los Angeles)",
            ].map((tz) => (
              <option key={tz} value={tz} className="bg-[#0D1B2A]">{tz}</option>
            ))}
          </select>
        </div>
      </div>
      <Divider />

      <SectionLabel>Search Preferences</SectionLabel>
      <Divider />
      <Checkbox
        checked={account.save_search_history}
        onChange={(v) => setAccount({ ...account, save_search_history: v })}
        label="Save search history"
        description="Store your recent searches for quick access"
      />
      <Divider />
      <Checkbox
        checked={account.show_event_recommendations}
        onChange={(v) => setAccount({ ...account, show_event_recommendations: v })}
        label="Show event recommendations"
        description="Get personalized event suggestions based on your profile"
      />
      <Divider />

      <SaveButton onClick={handleSaveAccount} loading={savingAccount} label="Save Preferences" />
    </div>
  );

  // ─── Loading ───────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-[#00C4A0] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="text-white">
      {/* Page Title */}
      <h1 className="text-xl font-bold text-white mb-4">Settings</h1>

      {/* Tab Bar */}
      <div className="flex items-center border-b border-[#162435] mb-0">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-semibold transition-all duration-200 border-b-2 -mb-px ${
              activeTab === tab
                ? "text-white border-[#00C4A0]"
                : "text-[#4A6480] border-transparent hover:text-[#7A9AB8]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div className="bg-[#0E1B2A] border border-[#162435] border-t-0 rounded-b-lg p-5">
        {activeTab === "Account" && <AccountTab />}
        {activeTab === "Privacy" && <PrivacyTab />}
        {activeTab === "Notifications" && <NotificationsTab />}
        {activeTab === "Preferences" && <PreferencesTab />}
      </div>

      {/* ── Change Password Modal ──────────────────────────────────────────── */}
      <Modal
        open={pwdModal}
        onClose={() => { setPwdModal(false); setPwdError(""); setPwdSuccess(false); }}
        title="Change Password"
      >
        <div className="space-y-4">
          <PasswordInput
            label="Current Password"
            value={pwdForm.old_password}
            onChange={(v) => setPwdForm({ ...pwdForm, old_password: v })}
          />
          <PasswordInput
            label="New Password"
            value={pwdForm.new_password}
            onChange={(v) => setPwdForm({ ...pwdForm, new_password: v })}
          />
          <PasswordInput
            label="Confirm New Password"
            value={pwdForm.confirm_password}
            onChange={(v) => setPwdForm({ ...pwdForm, confirm_password: v })}
          />

          {pwdError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded px-3 py-2">
              <p className="text-xs text-red-400">{pwdError}</p>
            </div>
          )}
          {pwdSuccess && (
            <div className="bg-[#00C4A0]/10 border border-[#00C4A0]/20 rounded px-3 py-2">
              <p className="text-xs text-[#00C4A0]">Password updated successfully!</p>
            </div>
          )}

          <button
            onClick={handleChangePassword}
            disabled={changingPwd}
            className="w-full py-2.5 rounded bg-[#00C4A0] hover:bg-[#00D4AD] text-[#0B1623] font-semibold text-sm transition-all disabled:opacity-60"
          >
            {changingPwd ? "Updating..." : "Update Password"}
          </button>
        </div>
      </Modal>

      {/* ── Delete Account Modal ───────────────────────────────────────────── */}
      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Account"
      >
        <div className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded p-4">
            <p className="text-sm text-red-300 font-semibold mb-1">⚠️ This action cannot be undone</p>
            <p className="text-xs text-red-400/80">
              All your data, matches, profile and history will be permanently
              deleted and cannot be recovered.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteModal(false)}
              className="flex-1 py-2.5 rounded border border-[#1E3048] text-[#7A9AB8] hover:text-white text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              className="flex-1 py-2.5 rounded bg-red-500 hover:bg-red-400 text-white font-semibold text-sm transition-all"
            >
              Delete Account
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}