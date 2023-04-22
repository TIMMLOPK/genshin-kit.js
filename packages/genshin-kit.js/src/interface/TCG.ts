export interface TCGData {
  action_card_num_gained: number;
  action_card_num_total: number;
  avatar_card_num_gained: number;
  avatar_card_num_total: number;
  covers: Cover[];
  level: number;
  nickname: string;
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
  match_time: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
  match_type: string;
  opposite: {
    name: string;
    linups: string[];
  };
  self: {
    name: string;
    linups: string[];
  };
}

interface Cover {
  id: number;
  image: string;
}

interface BasicCardList<CardType> {
  card_sources: undefined[];
  card_type: CardType;
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
  | (BasicCardList<"CardTypeCharacter"> & { card_skills: CardSkills[] })
  | (BasicCardList<"CardTypeAssist" | "CardTypeModify" | "CardTypeEvent"> & {
      action_cost: ActionCost[];
    });

interface CardSkills {
  desc: string;
  id: number;
  name: string;
  tag: string;
}

interface ActionCost {
  cost_type: string;
  cost_value: number;
}
