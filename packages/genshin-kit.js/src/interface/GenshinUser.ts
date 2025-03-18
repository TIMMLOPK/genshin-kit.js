import type { Character } from "./Character";

export interface GenshinUserData {
  avatars: Character[];
  homes: Teapot[];
  role: Role;
  stats: Stats;
  world_explorations: WorldExploration[];
  city_explorations: unknown[];
}

interface Role {
  AvatarUrl: string;
  level: number;
  nickname: string;
  region: string;
  game_head_icon: string;
}

interface Teapot {
  level: number;
  visit_num: number;
  comfort_num: number;
  item_num: number;
  name: string;
  icon: string;
  comfort_level_name: string;
  comfort_level_icon: string;
}

interface Stats {
  active_day_number: number;
  achievement_number: number;
  anemoculus_number: number;
  avatar_number: number;
  common_chest_number: number;
  dendroculus_number: number;
  domain_number: number;
  electroculus_number: number;
  exquisite_chest_number: number;
  full_fetter_avatar_num: number;
  geoculus_number: number;
  hydroculus_number: number;
  luxurious_chest_number: number;
  magic_chest_number: number;
  precious_chest_number: number;
  pyroculus_number: number;
  way_point_number: number;
  spiral_abyss: string;
  /**
   * @description Imaginarium Theater
   */
  role_combat: RoleCombat;
}

interface RoleCombat {
  has_data: boolean;
  has_detail_data: boolean;
  is_unlock: boolean;
  max_round_id: number;
}

interface WorldExploration {
  area_exploration_list: AreaExploration[];
  boss_list: Boss[];
  cover: string;
  detail_active: boolean;
  exploration_percentage: number;
  icon: string;
  id: number;
  index_active: boolean;
  inner_icon: string;
  is_hot: boolean;
  level: number;
  map_url: string;
  name: string;
  natan_reputation: unknown;
  offerings: offering[];
  parent_id: number;
  seven_statue_level: number;
  strategy_url: string;
  type: "Reputation" | "Offering" | "TypeUnknown";
  world_type: number;
}

interface AreaExploration {
  exploration_percentage: number;
  name: string;
}

interface offering {
  name: string;
  level: number;
  icon: string;
}

interface Boss {
  kill_num: number;
  name: string;
}
