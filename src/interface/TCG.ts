export interface TCGData {
  action_card_num_gained: number;
  action_card_num_total: number;
  avatar_card_num_gained: number;
  avatar_card_num_total: number;
  covers: Covers[];
  level: number;
  nickname: string;
}

interface Covers {
  id: number;
  image: string;
}

export interface CardListData {
  is_last: boolean;
  next_offset: number;
  stats: null;
  card_list: CardList[];
}

interface CardList {
  action_cost: never[];
  card_sources: never[];
  card_type: string;
  card_wiki: string;
  card_skills: CardSkills[];
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

interface CardSkills {
  desc: string;
  id: number;
  name: string;
  tag: string;
}

export interface CardBackListData {
  card_back_list: Covers & { has_obtained: boolean }[];
}
