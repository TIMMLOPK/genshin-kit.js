export interface CharacterInfoData {
  id: number;
  image: string;
  icon?: string;
  name: string;
  element: string;
  rarity: number;
  weapon_type?: number;
  weapon_type_name?: string;
}

export interface Character extends CharacterInfoData {
  fetter: number;
  level: number;
  actived_constellation_num: number;
  card_image?: string;
}

export interface CharacterData extends Character {
  weapon: Weapon;
  reliquaries: Reliquary[];
  constellation: Constellation[];
  costumes: Costume[];
  external: null;
}

interface Costume {
  id: number;
  icon: string;
  name: string;
}

interface Weapon {
  id: number;
  name: string;
  icon: string;
  type: string;
  rarity: number;
  level: number;
  promote_level: number;
  type_name: string;
  desc: string;
  affix_level: number;
}

interface Reliquary {
  id: number;
  name: string;
  icon: string;
  rarity: number;
  pos: number;
  level: number;
  set: ReliquarySet;
  pos_name: string;
}

interface ReliquarySet {
  id: number;
  name: string;
  affixes: Affix[];
}

interface Affix {
  activation_number: number;
  effect: string;
}

interface Constellation {
  id: number;
  name: string;
  icon: string;
  effect: string;
  is_actived: boolean;
  pos: number;
}
