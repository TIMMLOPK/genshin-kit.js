import type { Character } from "./Character";

export interface GenshinUserData {
  avatars: Character[];
  homes: Teapot[];
  role: Role;
  stats: Stats;
  world_explorations: WorldExploration[];
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
  geoculus_number: number;
  dendroculus_number: number;
  electroculus_number: number;
  hydroculus_number: number;
  avatar_number: number;
  way_point_number: number;
  domain_number: number;
  spiral_abyss: string;
  precious_chest_number: number;
  luxurious_chest_number: number;
  exquisite_chest_number: number;
  common_chest_number: number;
  magic_chest_number: number;
}

interface WorldExploration {
  area_exploration_list: AreaExploration[];
  boss_list: Boss[];
  level: number;
  exploration_percentage: number;
  icon: string;
  name: string;
  type: "Reputation" | "Offering" | "TypeUnknown";
  offerings: offering[];
  id: number;
  parent_id: number;
  map_url: string;
  strategy_url: string;
  background_image: string;
  inner_icon: string;
  cover: string;
  detail_active: boolean;
  index_active: boolean;
  is_hot: boolean;
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
