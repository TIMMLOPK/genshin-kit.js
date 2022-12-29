export interface TCGData {
  action_card_num_gained: number;
  action_card_num_total: number;
  avatar_card_num_gained: number;
  avatar_card_num_total: number;
  covers: Covers[];
  level: number;
  nickname: string;
}

export interface CardBackListData {
  card_back_list: Covers & { has_obtained: boolean }[];
}

export interface CardListData {
  is_last: boolean;
  next_offset: number;
  stats: null;
  card_list: CardList[];
}

interface Covers {
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
  | (BasicCardList<"CardTypeAssist" | "CardTypeModify" | "CardTypeEvent"> & { action_cost: ActionCost[] });

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
