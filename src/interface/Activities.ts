export interface ActivitiesData {
  sumo: SumoRecord[];
  // rogue: RogueRecord[];
  channeller_slab_copy: ChannellerSlabCopy;
  potion: PotionRecord[];
  sumo_second: SumoRecord[];
  crystal: CrystalRecord[];
  perilous: PerilousRecord[];
  summer_v2: SummerV2;
  spray: Spray;
}

interface SumoRecord {
  challenge_id: number;
  challenge_name: string;
  difficulty: number;
  heraldry_icon: string;
  lineups: Lineup[];
  max_score: number;
  score_mutiple: number;
}

interface Lineup {
  avatars: Avatar[];
  skills: Skill[];
}

interface Avatar {
  icon: string;
  id: number;
  is_trail_avatar: boolean;
  level: number;
  rarity: number;
}

interface Skill {
  desc: string;
  icon: string;
  id: number;
  name: string;
}

// interface RogueRecord {
//   challenge_id: number;
//   challenge_name: string;
//   is_passed: boolean;
//   main_avatars: Omit<Avatar, "is_trail_avatar">[];
//   runes: Skill & { element: string }[];
//   settled_level: number;
//   support_avatars: Omit<Avatar, "is_trail_avatar">[];
// }

interface ChannellerSlabCopy {
  end_time: string;
  exists_data: boolean;
  records: ChannellerSlabCopyRecord[];
  start_time: string;
  total_score: number;
}

interface ChannellerSlabCopyRecord {
  avatars: Omit<Avatar, "is_trail_avatar">[];
  buffs: Omit<Skill, "icon"> & { energy: number; quality: number }[];
  challenge_id: number;
  challenge_name: string;
  difficulty: number;
  energy: number;
  limit_conditions: Pick<Skill, "desc" | "id"> & { score: number }[];
  max_score: number;
  score_mutiple: number;
}

interface PotionRecord {
  finised: boolean;
  levels: Level[];
  stage_name: string;
  stage_score: number;
}

interface Level {
  avatars: Avatar[];
  buffs: Skill & { cornor_mark: string; quality: number }[];
  difficulty: number;
  difficulty_id: number;
  factor: number;
  level_name: string;
  score: number;
}

interface CrystalRecord extends Pick<Level, "difficulty" | "difficulty_id" | "factor"> {
  first_half: FirstHalf;
  second_half: FirstHalf;
  heraldray_icon: string;
  stage_name: string;
  stage_score: number;
  unlock_time: {
    Day: number;
    Hour: number;
    Minute: number;
    Second: number;
    reached: boolean;
  };
}

interface FirstHalf {
  avatars: Avatar[];
  buff_count: number;
  buffs: {
    cond_id: number;
    cond: string;
    effect_id: number;
    effect: string;
    effect_icon: string;
    effect_level: number;
  }[];
}

interface PerilousRecord {
  Levels: PerilousRecordsLevel[];
  cost_time_seconds: number;
  difficulty_id: number;
  name: string;
}

interface PerilousRecordsLevel {
  avatars: Omit<Avatar, "is_trail_avatar" | "level">[];
  buffs: Skill[];
}

interface SummerV2 {
  anchor_number: number;
  challenge: Challenge;
  chest_number: number;
  exists_data: boolean;
  is_hot: boolean;
  map_url: string;
  max_anchor_number: number;
  max_way_point_number: number;
  sailing: Sailing;
  story: Story;
  way_point_number: number;
}

interface Challenge {
  unlocked: boolean;
  records: ChallengeRecord[];
}

interface ChallengeRecord {
  finish_time: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
  finised: boolean;
  icon: string;
  id: number;
  name: string;
  skill_use_num: number;
  success_num: number;
}

interface Sailing {
  records: SailingRecord[];
}

interface SailingRecord {
  id: number;
  cost_time: number;
  mission_id: number;
  finished: boolean;
}

interface Story {
  records: StoryRecord[];
}

interface StoryRecord {
  finish_time: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
  finised: boolean;
  icon: string;
  id: number;
  mission_id: number;
  name: string;
}

interface Spray {
  data: SprayData[];
  exists_data: boolean;
  is_hot: boolean;
}

interface SprayData {
  difficult_id: number;
  factor: number;
  galleries: SprayGallery[];
  icon: string;
  name: string;
  score: number;
}

interface SprayGallery {
  avatars: Avatar[];
  buffs: Pick<Skill, "name" | "desc" | "icon">[];
  score: number;
}
