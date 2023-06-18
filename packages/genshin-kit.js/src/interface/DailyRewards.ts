export type DailyRewardSignInData =
  | (DailyRewardSignInRawData<"success"> & {
      rewards: DayRewardData;
    })
  | DailyRewardSignInRawData<"error" | "Already claimed" | "geetest tiggered">;

interface DailyRewardSignInRawData<status = unknown> {
  status: status;
  code: number;
}

export interface DayRewardData {
  icon: string;
  name: string;
  count: number;
}

export interface DailyRewardInfoData {
  total_sign_day: number;
  today: string;
  is_sign: boolean;
  is_sub: boolean;
  first_bind: boolean;
  region: string;
  month_last_day: boolean;
}

export interface DailyRewardExtraRewardData {
  awards: DayRewardData & { highlight: boolean; id: number; sign_day: number }[];
  has_short_act: boolean;
  login: boolean;
  month_card: MonthCard;
  start_timestamp: string;
  end_timestamp: string;
  total_count: number;
}

interface MonthCard {
  has_month_card: boolean;
  start_time: string;
  open_time: string;
  end_time: string;
  status: string;
}

export interface DailyRewardResignData {
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

export interface DailyRewardSignInHistoryData {
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
