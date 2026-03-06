export interface ClubRegisterPayload {
  email: string;
  password: string;
  confirm_password: string;

  organization_name: string;
  organization_type: string;
  country: string;
  city: string;
  website: string;
  phone_number: string;
  full_address: string;
  postal_code: string;
  established_year: number;
  registration_number: string;
  tax_id: string;

  contact_full_name: string;
  contact_role_position: string;
  contact_email: string;
  contact_phone_number: string;

  number_of_training_fields: number;
  additional_facilities: string[];
  age_groups_work_with: string[];
  training_programs: string[];

  club_website: string;
  facebook: string;
  instagram: string;
  twitter: string;

  official_verification_documents: string | null;
  club_academy_logo: string | null;

  legal_terms_accepted: boolean;
}

export type ClubRegisterResponse = unknown;
