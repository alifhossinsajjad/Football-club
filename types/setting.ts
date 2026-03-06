// ─── Types ────────────────────────────────────────────────────────────────────

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

export interface ActiveSession {
  id: string;
  device: string;
  location: string;
  last_active: string;
}

export interface AllSettings {
  notification_settings: NotificationSettings;
  privacy_settings: PrivacySettings;
  account_settings: AccountSettings;
  active_sessions: ActiveSession[];
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

// Matches the actual API response from /players/settings/download_data/
export interface DownloadDataResponse {
  profile: {
    id: number;
    user: number;
    profile_image: string;
    cover_image: string;
    first_name: string;
    last_name: string;
    full_name: string;
    designation: string;
    address: string;
    availability_status: string;
    age: number;
    height: string;
    weight: string;
    nationality: string;
    preferred_foot: string;
    date_of_birth: string;
    jersey_number: number;
    about: string;
    phone: string;
    instagram: string;
    twitter: string;
    facebook: string;
    youtube: string;
    preferred_leagues: string;
    contract_status: string;
    available_from: string;
    profile_completeness: number;
    career_stats: {
      id: number;
      season: string;
      matches: number;
      goals: number;
      assists: number;
      minutes: number;
    };
    skills: {
      id: number;
      pace: number;
      shooting: number;
      dribbling: number;
      passing: number;
      physical: number;
      technical: number;
    };
    playing_history: Array<{
      id: number;
      club_name: string;
      position: string;
      start_year: number;
      end_year: number;
      achievements: string;
      created_at: string;
    }>;
    achievements: Array<{
      id: number;
      title: string;
      description: string;
      date_achieved: string;
      created_at: string;
    }>;
    insights: {
      id: number;
      profile_views: number;
      profile_views_this_week: number;
      scout_views: number;
      scout_views_this_week: number;
      club_interest: number;
      club_interest_this_month: number;
    };
    highlight_videos: Array<{
      id: number;
      title: string;
      video_url: string;
      description: string;
      created_at: string;
    }>;
    created_at: string;
    updated_at: string;
  };
  message: string;
}
