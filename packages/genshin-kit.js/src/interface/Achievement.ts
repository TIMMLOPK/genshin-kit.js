export interface AchievementData {
  list: Achievement[];
  achievement_num: number;
}

interface Achievement {
  finish_num: number;
  icon: string;
  id: string;
  name: string;
  percentage: number;
  show_percent: boolean;
}
