export interface ActivitiesData {
  sumo: SumoRecords[];
  rogue: RogueRecords[];
  channeller_slab_copy: ChannellerSlabCopy;
  potion: PotionRecords[];
  sumo_second: SumoRecords[];
  crystal: CrystalRecords[];
  perilous: PerilousRecords[];
  summer_v2: SummerV2;
  spray: Spray;
}

interface SumoRecords {
  challenge_id: number;
  challenge_name: string;
  difficulty: number;
  heraldry_icon: string;
  lineups: Lineups[];
  max_score: number;
  score_mutiple: number;
}

interface Lineups {
  avatars: Avatars[];
  skills: Skills[];
}

interface Avatars {
  icon: string;
  id: number;
  is_trail_avatar: boolean;
  level: number;
  rarity: number;
}

interface Skills {
  desc: string;
  icon: string;
  id: number;
  name: string;
}

interface RogueRecords {
  challenge_id: number;
  challenge_name: string;
  is_passed: boolean;
  main_avatars: Omit<Avatars, "is_trail_avatar">[];
  runes: Skills & { element: string }[];
  settled_level: number;
  support_avatars: Omit<Avatars, "is_trail_avatar">[];
}

interface ChannellerSlabCopy {
  end_time: string;
  exists_data: boolean;
  records: ChannellerSlabCopyRecords[];
  start_time: string;
  total_score: number;
}

interface ChannellerSlabCopyRecords {
  avatars: Omit<Avatars, "is_trail_avatar">[];
  buffs: Omit<Skills, "icon"> & { energy: number; quality: number }[];
  challenge_id: number;
  challenge_name: string;
  difficulty: number;
  energy: number;
  limit_conditions: Pick<Skills, "desc" | "id"> & { score: number }[];
  max_score: number;
  score_mutiple: number;
}

interface PotionRecords {
  finised: boolean;
  levels: Level[];
  stage_name: string;
  stage_score: number;
}

interface Level {
  avatars: Avatars[];
  buffs: Skills & { cornor_mark: string; quality: number }[];
  difficulty: number;
  difficulty_id: number;
  factor: number;
  level_name: string;
  score: number;
}

interface CrystalRecords
  extends Pick<Level, "difficulty" | "difficulty_id" | "factor"> {
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
  avatars: Avatars[];
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

interface PerilousRecords {
  Levels: PerilousRecordsLevels[];
  cost_time_seconds: number;
  difficulty_id: number;
  name: string;
}

interface PerilousRecordsLevels {
  avatars: Omit<Avatars, "is_trail_avatar" | "level">[];
  buffs: Skills[];
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
  records: ChallengeRecords[];
}

interface ChallengeRecords {
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
  records: SailingRecords[];
}

interface SailingRecords {
  id: number;
  cost_time: number;
  mission_id: number;
  finished: boolean;
}

interface Story {
  records: StoryRecords[];
}

interface StoryRecords {
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
  avatars: Avatars[];
  buffs: Pick<Skills, "name" | "desc" | "icon">[];
  score: number;
}
