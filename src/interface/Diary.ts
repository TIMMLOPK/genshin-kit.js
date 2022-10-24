export interface DiaryData {
  uid: number;
  region: string;
  nickname: string;
  optional_month: number[];
  month: number;
  data_month: number;
  month_data: MonthData;
  day_data: DayData;
}

export interface DayData {
  current_primogems: number;
  current_mora: number;
}

export interface MonthData {
  current_primogems: number;
  current_mora: number;
  last_primogems: number;
  last_mora: number;
  primogem_rate: number;
  mora_rate: number;
  group_by: GroupBy[];
}

export interface GroupBy {
  action_id: number;
  action: string;
  num: number;
  percent: number;
}
