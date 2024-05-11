import { KeyToUpperCase, Time } from "./shared";

export interface RealTimeNoteData {
  current_resin: number;
  max_resin: number;
  resin_recovery_time: string;
  finished_task_num: number;
  total_task_num: number;
  is_extra_task_reward_received: boolean;
  remain_resin_discount_num: number;
  resin_discount_num_limit: number;
  current_expedition_num: number;
  max_expedition_num: number;
  current_home_coin: number;
  max_home_coin: number;
  home_coin_recovery_time: string;
  calendar_url: string;
  transformer: Transformer;
  daily_task: DailyTask;
  expeditions: Expedition[];
  archon_quest_progress: ArchonQuestProgress;
}

interface Transformer {
  obtained: boolean;
  recovery_time: KeyToUpperCase<Omit<Time, "year" | "month">> & { reached: boolean };
  wiki: string;
  noticed: boolean;
  last_job_id: string;
}

interface Expedition {
  avatar_side_icon: string;
  status: string;
  remained_time: string;
}

interface ArchonQuestProgress {
  list: {
    status: "StatusNotOpen" | string;
    chapter_num: string;
    chapter_title: string;
    id: number;
  }[];
  is_open_archon_quest: boolean;
  is_finish_all_mainline: boolean;
  is_finish_all_interchapter: boolean;
}

interface DailyTask {
  total_num: number;
  finished_num: number;
  is_extra_reward_received: boolean;
  task_rewards: TaskReward[];
  attendance_rewards: AttendanceReward[];
  attendance_visible: boolean;
}

interface TaskReward {
  status: "TaskRewardStatusUnfinished" | "TaskRewardStatusTakenAward";
}

interface AttendanceReward {
  status: "AttendanceRewardStatusUnfinished" | "AttendanceRewardStatusTakenAward" | "AttendanceRewardStatusForbid";
  progress: number;
}
