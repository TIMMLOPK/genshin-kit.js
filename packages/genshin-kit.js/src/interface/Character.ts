export interface CharacterInfoData {
  id: number;
  image: string;
  icon: string;
  name: string;
  element: string;
  rarity: number;
  weapon_type: number;
  weapon_type_name: string;
}

export interface CharacterDetailsData {
  avatar_wiki: {
    [key: number]: string;
  };
  list: DetailedCharacter[];
  property_map: {
    [key: number]: {
      filter_name: string;
      icon: string;
      name: string;
      property_type: number;
    };
  };
  relic_property_options: RelicProperty;
  relic_wiki: {
    [key: number]: string;
  };
  weapon_wiki: {
    [key: number]: string;
  };
}

export interface Character extends Omit<CharacterInfoData, "weapon_type_name" | "weapon_type" | "icon"> {
  actived_constellation_num: number;
  card_image: string;
  fetter: number;
  level: number;
  is_chosen: boolean;
  relics: Artifact[];
  weapon: Weapon;
}

export interface CharacterData extends Omit<Character, "card_image"> {
  icon: string;
  side_icon: string;
  weapon_type: string;
  /**
   * @deprecated Use relics instead
   */
  reliquaries: Reliquary[];
}

interface RelicProperty {
  circlet_main_property_list: number[];
  goblet_main_property_list: number[];
  sand_main_property_list: number[];
  sub_property_list: number[];
}

interface Property {
  add: number;
  base: number;
  final: number;
  property_type: number;
}

interface Skill {
  desc: string;
  icon: string;
  is_unlock: boolean;
  level: number;
  name: string;
  skill_affix_list: SkillAffix[];
  skill_id: number;
  skill_type: number;
}

interface SkillAffix {
  name: string;
  value: string;
}

interface DetailedCharacter {
  base: CharacterData;
  base_properties: Property[];
  constellations: Constellation[];
  costumes: Costume[];
  element_properties: Property[];
  extra_properties: Property[];
  recommend_relic_property: {
    custom_properties: unknown[];
    has_set_recommend_prop: boolean;
    recommend_properties: RelicProperty;
  };
  relics: Artifact[];
  selected_properties: Property[];
  skills: Skill[];
  weapon: Weapon & {
    desc: string;
    main_property: Property;
    sub_property: Property;
    promote_level: number;
    type_name: string;
  };
}

interface Weapon {
  id: number;
  name: string;
  icon: string;
  type: string;
  rarity: number;
  level: number;
  affix_level: number;
}

/**
 * @deprecated Use Artifact instead
 */
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

interface ArtifactProperty {
  property_type: number;
  times: number;
  value: string;
}

interface Artifact {
  id: number;
  name: string;
  icon: string;
  rarity: number;
  pos: number;
  level: number;
  pos_name: string;
  set: ArtifactSet;
  main_property: ArtifactProperty;
  sub_property_list: ArtifactProperty[];
}

interface ArtifactSet {
  id: number;
  name: string;
  affixes: Affix[];
}

/**
 * @deprecated Use ArtifactSet instead
 */
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

interface Costume {
  id: number;
  icon: string;
  name: string;
}
