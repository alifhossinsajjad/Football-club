"use client";

import { AccountSettings, NotificationSettings, PrivacySettings, useChangePasswordMutation, useDeleteAccountMutation, useDownloadDataMutation, useGetAllSettingsQuery, useUpdateAccountSettingsMutation, useUpdateNotificationSettingsMutation, useUpdatePrivacySettingsMutation } from "@/redux/features/setting/settingApi";
import { useState, useEffect } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ─── Toggle Switch ─────────────────────────────────────────────────────────────

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
      checked ? "bg-teal-400" : "bg-gray-600"
    }`}
    role="switch"
    aria-checked={checked}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

// ─── Checkbox ─────────────────────────────────────────────────────────────────

const Checkbox = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div
      onClick={() => onChange(!checked)}
      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
        checked
          ? "bg-teal-400 border-teal-400"
          : "border-gray-500 bg-transparent"
      }`}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
      {label}
    </span>
  </label>
);

// ─── Section Card ─────────────────────────────────────────────────────────────

const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-5">
    <h3 className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-3">
      {title}
    </h3>
    <div className="space-y-0">{children}</div>
  </div>
);

// ─── Setting Row ──────────────────────────────────────────────────────────────

const SettingRow = ({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-between py-3 border-b border-white/5">
    <div>
      <p className="text-sm text-white font-medium">{label}</p>
      {description && (
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      )}
    </div>
    {children}
  </div>
);

// ─── Action Button ────────────────────────────────────────────────────────────

const ActionRow = ({
  icon,
  label,
  description,
  onClick,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  danger?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between py-3 border-b border-white/5 group transition-colors ${
      danger ? "hover:bg-red-500/5" : "hover:bg-white/5"
    }`}
  >
    <div className="flex items-center gap-3">
      <span
        className={`p-2 rounded-lg ${
          danger
            ? "bg-red-500/10 text-red-400"
            : "bg-teal-400/10 text-teal-400"
        }`}
      >
        {icon}
      </span>
      <div className="text-left">
        <p
          className={`text-sm font-medium ${
            danger ? "text-red-400" : "text-white"
          }`}
        >
          {label}
        </p>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
    </div>
    <ChevronIcon />
  </button>
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
    className="w-full mt-6 py-3 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold text-sm tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {loading ? "Saving..." : label}
  </button>
);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0f1f35] border border-white/10 rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
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

  // API
  const { data, isLoading } = useGetAllSettingsQuery();
  const [updateNotifications, { isLoading: savingNotif }] =
    useUpdateNotificationSettingsMutation();
  const [updatePrivacy, { isLoading: savingPrivacy }] =
    useUpdatePrivacySettingsMutation();
  const [updateAccount, { isLoading: savingAccount }] =
    useUpdateAccountSettingsMutation();
  const [changePassword, { isLoading: changingPwd }] =
    useChangePasswordMutation();
  const [downloadData, { isLoading: downloading }] = useDownloadDataMutation();
  const [deleteAccount] = useDeleteAccountMutation();

  // Local state
  const [notif, setNotif] = useState<Omit<NotificationSettings, "id">>({
    email_new_messages: true,
    email_event_reminders: true,
    email_profile_views: true,
    email_news_updates: true,
    push_enabled: true,
    push_sound: true,
  });

  const [privacy, setPrivacy] = useState<Omit<PrivacySettings, "id">>({
    visible_to_clubs: true,
    visible_to_scouts: true,
    show_age_publicly: true,
    show_contact_publicly: false,
    allow_direct_messages: true,
  });

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

  // Delete modal
  const [deleteModal, setDeleteModal] = useState(false);

  // Sync API data → local state
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

  // Handlers
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
    if (pwdForm.new_password !== pwdForm.confirm_password) {
      setPwdError("New passwords do not match.");
      return;
    }
    try {
      await changePassword(pwdForm).unwrap();
      setPwdModal(false);
      setPwdForm({ old_password: "", new_password: "", confirm_password: "" });
    } catch {
      setPwdError("Failed to change password. Please check your current password.");
    }
  };

  const handleDownloadData = async () => {
    try {
      const res = await downloadData().unwrap();
      if (res.download_url) window.open(res.download_url, "_blank");
    } catch {
      // handle error
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount().unwrap();
      setDeleteModal(false);
      // redirect after deletion
    } catch {
      // handle error
    }
  };

  // ─── Tab Content ──────────────────────────────────────────────────────────

  const AccountTab = () => (
    <div>
      <SectionCard title="Account Actions">
        <ActionRow
          icon={<LockIcon />}
          label="Change Password"
          description="Update your login credentials"
          onClick={() => setPwdModal(true)}
        />
        <ActionRow
          icon={<UserIcon />}
          label="Edit Preferences"
          description="Manage your profile settings"
          onClick={() => setActiveTab("Preferences")}
        />
      </SectionCard>

      <SectionCard title="Active Sessions">
        {data?.active_sessions && data.active_sessions.length > 0 ? (
          data.active_sessions.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between py-3 border-b border-white/5"
            >
              <div>
                <p className="text-sm text-white font-medium">{s.device}</p>
                <p className="text-xs text-gray-400">
                  {s.location} · {s.last_active}
                </p>
              </div>
              <span className="text-xs text-teal-400 font-medium px-2 py-1 bg-teal-400/10 rounded-full">
                Active
              </span>
            </div>
          ))
        ) : (
          <div className="py-4 text-center">
            <p className="text-sm text-gray-400">No active sessions</p>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Danger Zone">
        <ActionRow
          icon={<TrashIcon />}
          label="Delete Account"
          description="Permanently remove your account and data"
          onClick={() => setDeleteModal(true)}
          danger
        />
      </SectionCard>

      <SaveButton onClick={handleSaveAccount} loading={savingAccount} label="Save Account Settings" />
    </div>
  );

  const PrivacyTab = () => (
    <div>
      <SectionCard title="Profile Visibility">
        <SettingRow
          label="Visible to clubs"
          description="Make your profile visible to football clubs"
        >
          <Toggle
            checked={privacy.visible_to_clubs}
            onChange={(v) => setPrivacy({ ...privacy, visible_to_clubs: v })}
          />
        </SettingRow>
        <SettingRow
          label="Visible to scouts"
          description="Allow scouts to discover your profile"
        >
          <Toggle
            checked={privacy.visible_to_scouts}
            onChange={(v) => setPrivacy({ ...privacy, visible_to_scouts: v })}
          />
        </SettingRow>
        <SettingRow
          label="Show age publicly"
          description="Display your age on your profile"
        >
          <Toggle
            checked={privacy.show_age_publicly}
            onChange={(v) => setPrivacy({ ...privacy, show_age_publicly: v })}
          />
        </SettingRow>
      </SectionCard>

      <SectionCard title="Contact Privacy">
        <SettingRow
          label="Show contact publicly"
          description="Display your contact information to everyone"
        >
          <Toggle
            checked={privacy.show_contact_publicly}
            onChange={(v) =>
              setPrivacy({ ...privacy, show_contact_publicly: v })
            }
          />
        </SettingRow>
        <SettingRow
          label="Allow direct messages"
          description="Let other users message you directly"
        >
          <Toggle
            checked={privacy.allow_direct_messages}
            onChange={(v) =>
              setPrivacy({ ...privacy, allow_direct_messages: v })
            }
          />
        </SettingRow>
      </SectionCard>

      <SectionCard title="Data & Privacy">
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm text-white font-medium">Download My Data</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Export all your personal data
            </p>
          </div>
          <button
            onClick={handleDownloadData}
            disabled={downloading}
            className="flex items-center gap-2 text-xs text-teal-400 hover:text-teal-300 font-medium transition-colors disabled:opacity-50"
          >
            <DownloadIcon />
            {downloading ? "Exporting..." : "Export Data"}
          </button>
        </div>
      </SectionCard>

      <SaveButton onClick={handleSavePrivacy} loading={savingPrivacy} label="Save Privacy Settings" />
    </div>
  );

  const NotificationsTab = () => (
    <div>
      <SectionCard title="Email Notifications">
        <SettingRow
          label="New message notifications"
          description="Get emailed when you receive new messages"
        >
          <Toggle
            checked={notif.email_new_messages}
            onChange={(v) => setNotif({ ...notif, email_new_messages: v })}
          />
        </SettingRow>
        <SettingRow
          label="Event reminders"
          description="Receive email reminders for upcoming events"
        >
          <Toggle
            checked={notif.email_event_reminders}
            onChange={(v) => setNotif({ ...notif, email_event_reminders: v })}
          />
        </SettingRow>
        <SettingRow
          label="Profile views"
          description="Know when someone views your profile"
        >
          <Toggle
            checked={notif.email_profile_views}
            onChange={(v) => setNotif({ ...notif, email_profile_views: v })}
          />
        </SettingRow>
        <SettingRow
          label="News & updates"
          description="Stay informed about platform news"
        >
          <Toggle
            checked={notif.email_news_updates}
            onChange={(v) => setNotif({ ...notif, email_news_updates: v })}
          />
        </SettingRow>
      </SectionCard>

      <SectionCard title="Push Notifications">
        <SettingRow
          label="Enable push notifications"
          description="Receive real-time push notifications"
        >
          <Toggle
            checked={notif.push_enabled}
            onChange={(v) => setNotif({ ...notif, push_enabled: v })}
          />
        </SettingRow>
        <SettingRow
          label="Sound for notifications"
          description="Play a sound with each notification"
        >
          <Toggle
            checked={notif.push_sound}
            onChange={(v) => setNotif({ ...notif, push_sound: v })}
          />
        </SettingRow>
      </SectionCard>

      <SaveButton
        onClick={handleSaveNotifications}
        loading={savingNotif}
        label="Save Notification Settings"
      />
    </div>
  );

  const PreferencesTab = () => (
    <div>
      <SectionCard title="Language & Region">
        <div className="py-3 border-b border-white/5">
          <p className="text-xs text-gray-400 mb-2">Language</p>
          <select
            value={account.language}
            onChange={(e) => setAccount({ ...account, language: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400 transition-colors appearance-none cursor-pointer"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Arabic">Arabic</option>
          </select>
        </div>
        <div className="py-3 border-b border-white/5">
          <p className="text-xs text-gray-400 mb-2">Timezone</p>
          <select
            value={account.timezone}
            onChange={(e) => setAccount({ ...account, timezone: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400 transition-colors appearance-none cursor-pointer"
          >
            <option value="GMT+0 (London)">GMT+0 (London)</option>
            <option value="GMT+1 (Madrid)">GMT+1 (Madrid)</option>
            <option value="GMT+2 (Cairo)">GMT+2 (Cairo)</option>
            <option value="GMT+3 (Riyadh)">GMT+3 (Riyadh)</option>
            <option value="GMT-5 (New York)">GMT-5 (New York)</option>
            <option value="GMT-8 (Los Angeles)">GMT-8 (Los Angeles)</option>
          </select>
        </div>
      </SectionCard>

      <SectionCard title="Search Preferences">
        <div className="py-3 border-b border-white/5 space-y-4">
          <Checkbox
            checked={account.save_search_history}
            onChange={(v) => setAccount({ ...account, save_search_history: v })}
            label="Save search history"
          />
          <Checkbox
            checked={account.show_event_recommendations}
            onChange={(v) =>
              setAccount({ ...account, show_event_recommendations: v })
            }
            label="Show event recommendations"
          />
        </div>
      </SectionCard>

      <SaveButton onClick={handleSaveAccount} loading={savingAccount} label="Save Preferences" />
    </div>
  );

  // ─── Render ────────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your account and preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-6 border border-white/10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-teal-400 text-slate-900 shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-[#0f1f35] rounded-xl border border-white/10 p-6">
          {activeTab === "Account" && <AccountTab />}
          {activeTab === "Privacy" && <PrivacyTab />}
          {activeTab === "Notifications" && <NotificationsTab />}
          {activeTab === "Preferences" && <PreferencesTab />}
        </div>
      </div>

      {/* ── Change Password Modal ─────────────────────────────────────────── */}
      <Modal
        open={pwdModal}
        onClose={() => {
          setPwdModal(false);
          setPwdError("");
        }}
        title="Change Password"
      >
        <div className="space-y-4">
          {["old_password", "new_password", "confirm_password"].map((field) => (
            <div key={field}>
              <label className="text-xs text-gray-400 block mb-1.5">
                {field === "old_password"
                  ? "Current Password"
                  : field === "new_password"
                  ? "New Password"
                  : "Confirm New Password"}
              </label>
              <input
                type="password"
                value={pwdForm[field as keyof typeof pwdForm]}
                onChange={(e) =>
                  setPwdForm({ ...pwdForm, [field]: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 transition-colors"
                placeholder="••••••••"
              />
            </div>
          ))}
          {pwdError && (
            <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
              {pwdError}
            </p>
          )}
          <button
            onClick={handleChangePassword}
            disabled={changingPwd}
            className="w-full py-2.5 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold text-sm transition-all disabled:opacity-60"
          >
            {changingPwd ? "Updating..." : "Update Password"}
          </button>
        </div>
      </Modal>

      {/* ── Delete Account Modal ──────────────────────────────────────────── */}
      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Account"
      >
        <div className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-sm text-red-300 font-medium">
              ⚠️ This action is irreversible
            </p>
            <p className="text-xs text-red-400/80 mt-1">
              All your data, matches, and profile information will be permanently
              deleted and cannot be recovered.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteModal(false)}
              className="flex-1 py-2.5 rounded-lg border border-white/10 text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-400 text-white font-bold text-sm transition-all"
            >
              Delete Account
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}