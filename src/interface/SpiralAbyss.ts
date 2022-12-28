export interface AbyssBattleData {
  damage_rank: Rank[];
  defeat_rank: Rank[];
  energy_skill_rank: Rank[];
  floor: Floor[];
  normal_skill_rank: Rank[];
  reveal_rank: Rank[];
  take_damage_rank: Rank[];
  end_time: string;
  is_unlock: boolean;
  max_floor: string;
  schedule_id: number;
  start_time: string;
  total_battle_times: number;
  total_star: number;
  total_win_times: number;
}

interface Rank {
  avatar_id: number;
  avatar_icon: string;
  value: number;
  rarity: number;
}

interface Floor {
  index: number;
  icon: string;
  is_unlock: boolean;
  settle_time: string;
  star: number;
  max_star: number;
  levels: Level[];
}

interface Level {
  index: number;
  star: number;
  max_star: number;
}
