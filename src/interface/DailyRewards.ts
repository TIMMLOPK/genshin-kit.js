export interface DailyRewardsData {
  status: string;
  code: number;
}

export interface DayRewardData {
  icon: string;
  name: string;
  count: number;
}

export interface RewardInfoData {
  total_sign_day: number;
  today: string;
  is_sign: boolean;
  first_bind: boolean;
  is_sub: boolean;
  region: string;
}
