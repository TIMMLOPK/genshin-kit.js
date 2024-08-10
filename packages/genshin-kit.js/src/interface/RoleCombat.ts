import { Time } from "./shared";

export type RoleCombatData<need_detail extends boolean = false> = {
  data: Data<need_detail>[];
  is_unlock: boolean;
};

interface Data<detailed extends boolean = false> {
  detail: detailed extends true ? Detail : null;
  has_data: boolean;
  has_detail_data: detailed;
  schedule: Schedule;
  stat: Stat;
}

interface Detail {
  backup_avatars: RoleCombatAvatar[];
  detail_stat: Stat;
  fight_statisic: FightStatistic;
  rounds_data: RoundData[];
}

interface RoundData {
  avatars: RoleCombatAvatar[];
  buffs: never[];
  choice_cards: never[];
  enemies: Enemy[];
  finish_date_time: Time;
  finish_time: string;
  is_get_medal: boolean;
  round_id: number;
}

interface Enemy {
  icon: string;
  level: number;
  name: string;
}

interface FightStatistic {
  is_show_battle_stats: null;
  max_damage_avatar: null;
  max_defeat_avatar: null;
  max_take_damage_avatar: null;
  shortest_avatar_list: never[];
  total_coin_consumed: null;
  total_use_time: number;
}

interface RoleCombatAvatar {
  avatar_id: number;
  /**
   * @description 1. User's avatar, 2. Trial avatar, 3. Support avatar
   */
  avatar_type: number;
  element: number;
  image: string;
  level: number;
  name: string;
  rarity: number;
}

interface Schedule {
  start_time: string;
  end_time: string;
  schedule_id: number;
  schedule_type: number;
  start_date_time: Time;
  end_date_time: Time;
}

interface Stat {
  avatar_bonus_num: number;
  coin_num: number;
  difficulty_id: number;
  /**
   * @description Star Challenge Stellas
   */
  get_medal_round_list: number[];
  heraldry: number;
  max_round_id: number;
  medal_num: number;
  rent_cnt: number;
}
