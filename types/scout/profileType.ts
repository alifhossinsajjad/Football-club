export interface Achievement {
  id: number;
  club_name: string;
  achievement: string;
  year: number;
  affiliation_type: string;
}

export interface DashboardStats {
  players_viewed: number;
  shortlisted_players: number;
  upcoming_events: number;
  active_conversations: number;
}

export interface ScoutProfile {
  id: number;
  first_name: string;
  last_name: string;
  specialization: string[];
  joined: string;
  dashboard_stats: DashboardStats;
  achievements: Achievement[];
  cover_image: string;
  profile_image: string;
  bio: string;
  location: string;
  experience_years: number;
  connections: number;
  about: string;
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
  created_at: string;
  updated_at: string;
  scout: number;
}