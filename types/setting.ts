export interface NotificationSettings {
  id: number;
  email_new_messages: boolean;
  email_event_reminders: boolean;
  email_profile_views: boolean;
  email_news_updates: boolean;
  push_enabled: boolean;
  push_sound: boolean;
}

export interface PrivacySettings {
  id: number;
  visible_to_clubs: boolean;
  visible_to_scouts: boolean;
  show_age_publicly: boolean;
  show_contact_publicly: boolean;
  allow_direct_messages: boolean;
}

export interface AccountSettings {
  id: number;
  language: string;
  timezone: string;
  save_search_history: boolean;
  show_event_recommendations: boolean;
}

export interface AllSettings {
  notification_settings: NotificationSettings;
  privacy_settings: PrivacySettings;
  account_settings: AccountSettings;
  active_sessions: ActiveSession[];
}

export interface ActiveSession {
  id: string;
  device: string;
  location: string;
  last_active: string;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
