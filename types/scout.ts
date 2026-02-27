export interface ScoutRegisterPayload {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: string;
  phone_number: string;
  license_type: string;
  license_number: string;
  agency_name: string;
  agency_affiliation: string;
  specialization: string[];
  primary_scouting_regions: string[];
  secondary_scouting_regions: string[];
  age_group_focus: string[];
  position_focus: string[];
  languages_spoken: string[];
  players_discovered: string;
  contracts_signed: string;
  notable_discoveries: string;
  club_affiliations: string;
  scout_license_document: string | null;
  government_issued_id: string | null;
  legal_agreement_accepted: boolean;
}

