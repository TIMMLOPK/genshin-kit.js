import type { Character } from "./Character";
import type { TeapotData } from "./Teapot";

interface Info {
  AvatarUrl: string;
  level: number;
  nickname: string;
  region: string;
}

interface Stats {
  active_day_number: number;
  achievement_number: number;
  anemoculus_number: number;
  geoculus_number: number;
  avatar_number: number;
  way_point_number: number;
  domain_number: number;
  spiral_abyss: string;
  precious_chest_number: number;
  luxurious_chest_number: number;
  exquisite_chest_number: number;
  common_chest_number: number;
  electroculus_number: number;
  magic_chest_number: number;
  dendroculus_number: number;
}

interface World_explorations {
  level: number;
  exploration_percentage: number;
  icon: string;
  name: string;
  type: string;
  offerings: {
    name: string;
    level: number;
    icon: string;
  }[];
  id: number;
  parent_id: number;
  map_url: string;
  strategy_url: string;
  background_image: string;
  inner_icon: string;
  cover: string;
}

export interface GenshinUserData {
  avatars: Character[];
  homes: TeapotData[];
  role: Info;
  stats: Stats;
  world_explorations: World_explorations[];
}
