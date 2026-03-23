export interface Achievement {
  id?: number;
  club_name: string;
  achievement: string;
  year: number;
  affiliation_type: string;
}

export interface ScoutingStatistic {
  players_scouted: number | string;
  players_recommended: number | string;
  professional_placements: number | string;
  success_rate: number | string;
  clubs_worked_with: number | string;
  international_coverage?: number | string;
}

export interface NotableDiscovery {
  player_name: string;
  position: string;
  current_team: string;
  discovered_year: number | string;
}

export interface ScoutingRegion {
  country: string;
  coverage_type: string;
  active_since: number | string;
}

export interface ProfessionalHistory {
  organization: string;
  role: string;
  duration: string;
  is_current: boolean;
  description?: string;
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
  scouting_statistics?: ScoutingStatistic;
  notable_discoveries?: NotableDiscovery[];
  scouting_regions?: ScoutingRegion[];
  professional_history?: ProfessionalHistory[];
  cover_image: string;
  profile_image: string;
  bio: string;
  location: string;
  experience_years: number;
  connections: number;
  about: string;
  email?: string;
  phone?: string;
  website: string;
  twitter: string;
  facebook: string;
  youtube: string;
  instagram?: string;
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