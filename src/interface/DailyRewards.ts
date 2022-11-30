export interface DailyRewardsData {
  status: string;
  code: number;
  rewards: DayRewardData | null;
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

export interface ExtraRewardData {
  awards: DayRewardData & { highlight: boolean; id: number; sign_day: number }[];
  end_timestamp: string;
  has_short_act: boolean;
  login: boolean;
  mc: {
    has_month_card: boolean;
    start_time: string;
    open_time: string;
    end_time: string;
    status: string;
  };
  start_timestamp: string;
  total_count: number;
}

export interface ResignData {
  resign_count_daily: number;
  resign_count_monthly: number;
  resign_limit_daily: number;
  resign_limit_monthly: number;
  sign_count_missed: number;
  quality_count: number;
  signed: boolean;
  sign_count: number;
  cost: number;
  month_quality_count: number;
}

export interface ClaimHistoryData {
  list: HistoryData[];
  total: number;
}

interface HistoryData {
  id: number;
  status: number;
  type: number;
  game: string;
  img: string;
  name: string;
  created_at: string;
  desc: string;
  count: number;
}
