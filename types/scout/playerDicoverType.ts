

export interface DiscoveryPlayer {
  id: number;
  profile_image: string;
  first_name: string;
  last_name: string;
  designation: string;
  nationality: string;
  age: number;
  preferred_foot: string;
  height: string;
  weight: string;
  current_club: string;
  availability_status: "AVAILABLE" | "NOT_AVAILABLE" | "UNKNOWN";
  highlight_video_available: boolean;
  rating?: number;
  is_shortlisted?: boolean;
  shortlist_id?: number; // ADD THIS
}

export interface PlayerDiscoveryListResponse {
  results: DiscoveryPlayer[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface PlayerDiscoveryFilters {
  position?: string;
  nationality?: string;
  age_min?: number;
  age_max?: number;
  search?: string;
  page?: number;

}


