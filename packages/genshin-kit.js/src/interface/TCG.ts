import { Time } from "./shared";

export interface TCGData {
  action_card_num_gained: number;
  action_card_num_total: number;
  avatar_card_num_gained: number;
  avatar_card_num_total: number;
  challenge_basic: ChallengeBasic;
  covers: Cover & { has_data: boolean; action_cost: ActionCost[] }[];
  hornor_character: unknown;
  level: number;
  nickname: string;
  replays: MatchData[];
  is_hide_covers: boolean;
  is_hide_replays: boolean;
}

interface ChallengeBasic {
  has_data: boolean;
  medal: string;
  nickname: string;
  schedule: Schedule;
  uid: string;
  win_count: number;
}

interface Schedule {
  begin: Time;
  end: Time;
  id: number;
  name: string;
}

export interface CardBackListData {
  card_back_list: Cover & { has_obtained: boolean }[];
}

export interface CardListData {
  is_last: boolean;
  next_offset: number;
  stats: null;
  card_list: CardList[];
}

export interface TCGGameRecordData {
  favourite_matches: MatchData[];
  recent_matches: MatchData[];
}

export interface MatchData {
  game_id: string;
  is_win: boolean;
  match_time: Omit<Time, "second">;
  match_type: string;
  opposite: Player;
  self: Player;
}

interface Player {
  name: string;
  linups: string[];
  is_overflow: boolean;
}

interface Cover {
  category: "GCGCardCategoryAvatarCard" | "CGCCardCategoryCardBack" | "GCGCardCategoryActionCard";
  id: number;
  image: string;
  imgae_v2: string;
}

interface BasicCardList<CardType, Category> {
  card_sources: string[];
  card_type: CardType;
  category: Category;
  card_wiki: string;
  deck_recommend: string;
  desc: string;
  hp: number;
  id: number;
  image: string;
  name: string;
  num: number;
  proficiency: number;
  rank_id: number;
  use_count: number;
  tags: string[];
}

type CardList =
  | (BasicCardList<"CardTypeCharacter", "GCGCardCategoryAvatarCard"> & { card_skills: CardSkills[] })
  | (BasicCardList<"CardTypeAssist" | "CardTypeModify" | "CardTypeEvent", "GCGCardCategoryActionCard"> & {
      action_cost: ActionCost[];
    });

interface CardSkills {
  desc: string;
  id: number;
  name: string;
  tag: string;
}

interface ActionCost {
  cost_type:
    | "CostTypeSame"
    | "CostTypeGeo"
    | "CostTypeElectro"
    | "CostTypePyro"
    | "CostTypeHydro"
    | "CostTypeCryo"
    | "CostTypeDenro"
    | "CostTypeAnemo"
    | "CostTypeVoid";
  cost_value: number;
}
