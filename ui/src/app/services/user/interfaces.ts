export interface IUserToken {
  message: string;
  profile: {
    phone: string;
    username: string;
    external_id: string;
    native_language: string;
    last_activity: string;
    native_score: number;
    ons: number;
    eps: number;
    scoring_version: number;
    registration_date: string;
    native_strictness: boolean;
    finish_onboard: boolean;
    is_bootstrap: boolean;
    mini_program: boolean;
    difficulty: string;
    daily_reminder: string;
    display_language: string;
    sound_effect_volume: number;
    learning_commitment: number;
    accept_notifications: boolean;
    free_trial: string;
    location: string;
    self_proficiency: number;
    learning_purpose: string;
  };
  session: string;
  refresh_token: string;
}
