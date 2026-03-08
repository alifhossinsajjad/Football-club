"use client";

import { useState, useEffect } from "react";
import {
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useDownloadDataMutation,
  useGetAllSettingsQuery,
  useUpdateAccountSettingsMutation,
  useUpdateNotificationSettingsMutation,
  useUpdatePrivacySettingsMutation,
} from "@/redux/features/player/setting/settingApi";
import {
  AccountSettings,
  NotificationSettings,
  PrivacySettings,
} from "@/types/setting";
import * as XLSX from "xlsx";
import { CiLock, CiUser } from "react-icons/ci";
import { FaRegBell, FaRegBellSlash } from "react-icons/fa";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { GoShieldLock } from "react-icons/go";

// ─── Icons (emoji fallback — you can replace with lucide-react) ──────────────

const Lock = () => <span className="text-[#00E5FF] text-xl">🔒</span>;
const Mail = () => <span className="text-[#00E5FF] text-xl">✉️</span>;
const Star = () => <span className="text-[#00E5FF] text-xl">⭐</span>;
const Trash = () => <span className="text-red-400 text-xl">🗑️</span>;
const Globe = () => <span className="text-[#00E5FF] text-xl">🌐</span>;
const Clock = () => <span className="text-[#00E5FF] text-xl">🕒</span>;
const ChevronRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ─── Reusable Components ──────────────────────────────────────────────────────

// ✅ UPDATED TAB COMPONENT: icon, gradient background, bottom active underline
const Tab = ({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`
        relative flex items-center  px-6 py-3 text-sm font-medium transition-all duration-300
         overflow-hidden group
        ${
          active
            ? "text-white shadow-lg shadow-cyan-500/20"
            : "text-[#A0AEC0] hover:text-white"
        }
      `}
  >
    {/* Gradient background (only visible when active) */}
    <span
      className={`
          absolute inset-0 bg-gradient-to-r from-[#00E5FF]/70  to-[#9C27B0]/70 
          opacity-0 group-hover:opacity-10 transition-opacity duration-300
          ${active ? "opacity-30" : ""}
        `}
    />
 <div className="flex items-center gap-2">
     <span >{icon}</span>

    {/* Content */}
    <span className="relative z-10">{children}</span>
 </div>

    {/* Bottom gradient underline (active state) */}
    <span
      className={`
          absolute bottom-0 left-0 right-0 h-[3px] bg-[#00E5FF]
          transform scale-x-0 transition-transform duration-300 origin-left
          ${active ? "scale-x-100" : "group-hover:scale-x-100"}
        `}
    />
  </button>
);

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-white  text-xl font-bold mb-6">{children}</h3>
);

const Row = ({
  icon,
  title,
  description,
  control,
  onClick,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  control: React.ReactNode;
  onClick?: () => void;
}) => (
  <div
    className={`flex items-center justify-between space-y-6 bg-[#0B0D2C] p-2 mb-2
       transition-colors rounded-lg ${onClick ? "cursor-pointer" : ""}`}
    onClick={onClick}
  >
    <div className="flex items-start gap-3.5 flex-1 ">
      {icon && <div className="mt-0.5 text-xl">{icon}</div>}
      <div>
        <p className="text-white text-sm font-medium">{title}</p>
        {description && (
          <p className="text-xs text-[#8A9ABF] mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
    <div className="flex-shrink-0 pl-3">{control}</div>
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
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
      checked ? "bg-[#FFFFFF]" : "bg-[#2A3555]"
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
        checked ? "translate-x-5" : "translate-x-0.5"
      }`}
    />
  </button>
);

const SaveBtn = ({
  onClick,
  loading = false,
  label = "Save Settings",
}: {
  onClick: () => void;
  loading?: boolean;
  label?: string;
}) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="w-full mt-8 py-3.5 bg-[#04B5A3]  text-white font-semibold rounded-xl transition-all  disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {loading ? "Saving..." : label}
  </button>
);

// ─── Main Settings Page ───────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "Account" | "Privacy" | "Notifications" | "Preferences"
  >("Account");

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

  // ── Your original form states ───────────────────────────────────────────────

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
  const [pwdSuccess, setPwdSuccess] = useState(false);

  // Delete modal
  const [deleteModal, setDeleteModal] = useState(false);

  // Download feedback
  const [downloadSuccess, setDownloadSuccess] = useState(false);

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

  // ── Your original handlers (unchanged) ─────────────────────────────────────

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
    if (
      !pwdForm.old_password ||
      !pwdForm.new_password ||
      !pwdForm.confirm_password
    ) {
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

  const handleDownloadData = async () => {
    try {
      const res = await downloadData().unwrap();
      const p = res.profile;

      const wb = XLSX.utils.book_new();

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
    } catch {}
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#00E5FF]/30 border-t-[#00E5FF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080D28] text-white pb-12">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-6 inline-block pb-2 bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
        Settings
      </h1>

      <div className="bg-[#12143A] p-3 rounded-xl border border-[#1E2554] ">
        {/* ✅ UPDATED TABS: icons + gradient background + bottom underline */}
        <div className="flex flex-wrap gap-2.5 mb-6  border-b-[#1E2554] ">
          {[
            { key: "Account", icon: <CiUser  size={20}/> , label: "Account" },
            { key: "Privacy", icon: <GoShieldLock size={20}/>, label: "Privacy" },
            {
              key: "Notifications",
              icon: <IoNotificationsOutline size={20}/>,
              label: "Notifications",
            },
            {
              key: "Preferences",
              icon: <IoSettingsOutline size={20}/>,
              label: "Preferences",
            },
          ].map((tab) => (
            <Tab
              key={tab.key}
              active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              icon={tab.icon}
            >
              {tab.label}
            </Tab>
          ))}
        </div>

        {/* Main Content Card */}
        <div className="rounded-2xl p-6 shadow-xl shadow-black/30">
          {activeTab === "Account" && (
            <>
              <SectionHeader>Account Actions</SectionHeader>

              <Row
                icon={<Lock />}
                title="Change Password"
                description="Update your account password"
                control={<ChevronRight />}
                onClick={() => setPwdModal(true)}
              />

              <Row
                icon={<Mail />}
                title="Email Preferences"
                description="Manage your email settings"
                control={<ChevronRight />}
              />

              <Row
                icon={<Star />}
                title="Subscription"
                description="Manage your plan and billing"
                control={<ChevronRight />}
              />

              <SectionHeader>Delete Account</SectionHeader>

              <Row
                icon={<Trash />}
                title="Delete Account"
                description="Permanently delete your account and data"
                control={<ChevronRight />}
                onClick={() => setDeleteModal(true)}
              />

              <SaveBtn onClick={handleSaveAccount} loading={savingAccount} />
            </>
          )}

          {activeTab === "Privacy" && (
            <>
              <SectionHeader>Profile Visibility</SectionHeader>

              <Row
                title="Make my profile visible to clubs"
                description="Allow clubs to view complete profile"
                control={
                  <Toggle
                    checked={privacy.visible_to_clubs}
                    onChange={() =>
                      setPrivacy((p) => ({
                        ...p,
                        visible_to_clubs: !p.visible_to_clubs,
                      }))
                    }
                  />
                }
              />

              <Row
                title="Make my profile visible to scouts"
                description="Allow scouts to discover your profile"
                control={
                  <Toggle
                    checked={privacy.visible_to_scouts}
                    onChange={() =>
                      setPrivacy((p) => ({
                        ...p,
                        visible_to_scouts: !p.visible_to_scouts,
                      }))
                    }
                  />
                }
              />

              <Row
                title="Show my age publicly"
                description="Display your age on your profile"
                control={
                  <Toggle
                    checked={privacy.show_age_publicly}
                    onChange={() =>
                      setPrivacy((p) => ({
                        ...p,
                        show_age_publicly: !p.show_age_publicly,
                      }))
                    }
                  />
                }
              />

              <SectionHeader>Contact Privacy</SectionHeader>

              <Row
                title="Show contact details publicly"
                description="Display email and phone on your profile"
                control={
                  <Toggle
                    checked={privacy.show_contact_publicly}
                    onChange={() =>
                      setPrivacy((p) => ({
                        ...p,
                        show_contact_publicly: !p.show_contact_publicly,
                      }))
                    }
                  />
                }
              />

              <Row
                title="Allow direct messages"
                description="Receive messages from clubs and scouts"
                control={
                  <Toggle
                    checked={privacy.allow_direct_messages}
                    onChange={() =>
                      setPrivacy((p) => ({
                        ...p,
                        allow_direct_messages: !p.allow_direct_messages,
                      }))
                    }
                  />
                }
              />

              <SaveBtn onClick={handleSavePrivacy} loading={savingPrivacy} />
            </>
          )}

          {activeTab === "Notifications" && (
            <>
              <SectionHeader>Email Notifications</SectionHeader>

              <Row
                title="New message notifications"
                description="Get notified when you receive new messages"
                control={
                  <Toggle
                    checked={notif.email_new_messages}
                    onChange={() =>
                      setNotif((n) => ({
                        ...n,
                        email_new_messages: !n.email_new_messages,
                      }))
                    }
                  />
                }
              />

              <Row
                title="Event reminders"
                description="Receive reminders for upcoming events"
                control={
                  <Toggle
                    checked={notif.email_event_reminders}
                    onChange={() =>
                      setNotif((n) => ({
                        ...n,
                        email_event_reminders: !n.email_event_reminders,
                      }))
                    }
                  />
                }
              />

              <Row
                title="Profile views"
                description="Know when clubs or scouts view your profile"
                control={
                  <Toggle
                    checked={notif.email_profile_views}
                    onChange={() =>
                      setNotif((n) => ({
                        ...n,
                        email_profile_views: !n.email_profile_views,
                      }))
                    }
                  />
                }
              />

              <Row
                title="News & updates"
                description="Receive platform news and training content"
                control={
                  <Toggle
                    checked={notif.email_news_updates}
                    onChange={() =>
                      setNotif((n) => ({
                        ...n,
                        email_news_updates: !n.email_news_updates,
                      }))
                    }
                  />
                }
              />

              <SectionHeader>Push Notifications</SectionHeader>

              <Row
                title="Enable push notifications"
                description="Receive real-time notifications"
                control={
                  <Toggle
                    checked={notif.push_enabled}
                    onChange={() =>
                      setNotif((n) => ({ ...n, push_enabled: !n.push_enabled }))
                    }
                  />
                }
              />

              <Row
                title="Sound for notifications"
                description="Play sound when notifications arrive"
                control={
                  <Toggle
                    checked={notif.push_sound}
                    onChange={() =>
                      setNotif((n) => ({ ...n, push_sound: !n.push_sound }))
                    }
                  />
                }
              />

              <SaveBtn
                onClick={handleSaveNotifications}
                loading={savingNotif}
              />
            </>
          )}

          {activeTab === "Preferences" && (
            <>
              <SectionHeader>Language & Region</SectionHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-xs text-[#6B74A8] mb-2">
                    Language
                  </label>
                  <select
                    value={account.language}
                    onChange={(e) =>
                      setAccount((a) => ({ ...a, language: e.target.value }))
                    }
                    className="w-full bg-[#0A0F2C] border border-[#1E2554] rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] outline-none appearance-none"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#6B74A8] mb-2">
                    Timezone
                  </label>
                  <select
                    value={account.timezone}
                    onChange={(e) =>
                      setAccount((a) => ({ ...a, timezone: e.target.value }))
                    }
                    className="w-full bg-[#0A0F2C] border border-[#1E2554] rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] outline-none appearance-none"
                  >
                    <option>GMT+1 (Madrid)</option>
                    <option>UTC</option>
                    <option>GMT+6 (Dhaka)</option>
                  </select>
                </div>
              </div>

              <SectionHeader>Search Preferences</SectionHeader>

              <Row
                title="Save search history"
                description="Remember your recent searches"
                control={
                  <input
                    type="checkbox"
                    checked={account.save_search_history}
                    onChange={() =>
                      setAccount((a) => ({
                        ...a,
                        save_search_history: !a.save_search_history,
                      }))
                    }
                    className="w-5 h-5 accent-[#00E5FF] rounded border-[#1E2554]"
                  />
                }
              />

              <Row
                title="Show event recommendations"
                description="Get personalized event suggestions"
                control={
                  <input
                    type="checkbox"
                    checked={account.show_event_recommendations}
                    onChange={() =>
                      setAccount((a) => ({
                        ...a,
                        show_event_recommendations:
                          !a.show_event_recommendations,
                      }))
                    }
                    className="w-5 h-5 accent-[#00E5FF] rounded border-[#1E2554]"
                  />
                }
              />

              <SaveBtn onClick={handleSaveAccount} loading={savingAccount} />
            </>
          )}
        </div>
      </div>

      {/* ── Change Password Modal (your original logic kept) ────────────────────── */}
      {pwdModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B132B] border border-[#1E2554] rounded-2xl p-7 w-full max-w-md shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Change Password</h2>
              <button
                onClick={() => setPwdModal(false)}
                className="text-[#8A9ABF] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-[#A3BFFA] mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  value={pwdForm.old_password}
                  onChange={(e) =>
                    setPwdForm((f) => ({ ...f, old_password: e.target.value }))
                  }
                  className="w-full bg-[#0A0F2C] border border-[#1E2554] rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm text-[#A3BFFA] mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  value={pwdForm.new_password}
                  onChange={(e) =>
                    setPwdForm((f) => ({ ...f, new_password: e.target.value }))
                  }
                  className="w-full bg-[#0A0F2C] border border-[#1E2554] rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm text-[#A3BFFA] mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={pwdForm.confirm_password}
                  onChange={(e) =>
                    setPwdForm((f) => ({
                      ...f,
                      confirm_password: e.target.value,
                    }))
                  }
                  className="w-full bg-[#0A0F2C] border border-[#1E2554] rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] outline-none"
                  placeholder="••••••••"
                />
              </div>

              {pwdError && <p className="text-red-400 text-sm">{pwdError}</p>}
              {pwdSuccess && (
                <p className="text-[#00E5FF] text-sm">
                  Password updated successfully!
                </p>
              )}

              <button
                onClick={handleChangePassword}
                disabled={changingPwd}
                className="w-full mt-4 py-3.5 bg-[#00E5FF] hover:bg-[#00D4FF] text-[#080D28] font-semibold rounded-xl transition-all disabled:opacity-60"
              >
                {changingPwd ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete modal – your original logic kept */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B132B] border border-[#1E2554] rounded-2xl p-7 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-5">
              Delete Account
            </h2>
            <p className="text-red-300 mb-6">
              This action cannot be undone. All your data will be permanently
              deleted.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModal(false)}
                className="flex-1 py-3 bg-[#1E2554] hover:bg-[#2A3555] rounded-xl text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded-xl text-white font-medium"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
