export interface ExtraAward {
  id: number;
  icon: string;
  name: string;
  cnt: number;
  sign_day: number;
}

export interface ExtraReward {
  awards: ExtraAward[];
  end_timestamp: string;
  has_short_act: boolean;
  login: boolean;
  start_timestamp: string;
  total_cnt: number;
}

export interface RewardInfo {
  total_sign_day: number;
  today: string;
  is_sign: boolean;
  first_bind: boolean;
  is_sub: boolean;
  region: string;
}

export interface DayReward {
  icon: string;
  name: string;
  cnt: number;
}
