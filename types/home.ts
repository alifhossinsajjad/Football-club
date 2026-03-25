export interface HeroData {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    primary_button_text: string;
    primary_button_url: string;
    secondary_button_text: string;
    secondary_button_url: string;
    background_color: string;
    title_color: string;
    subtitle_color: string;
    hero_image: string;
    is_active: boolean;
}

export interface HeroResponse {
    success: boolean;
    data: HeroData[];
}
