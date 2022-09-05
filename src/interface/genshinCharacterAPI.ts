export interface Character {
    id: number;
    image: string;
    name: string;
    element: string;
    fetter: number;
    level: number;
    rarity: number;
    actived_constellation_num: number;
    card_image?: string;
}


export interface Characters extends Character {
    weapon: Weapon;
    reliquaries: Reliquary[];
    constellation: Constellation[];
    costumes: Array<any>;
    external: null;
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
    set : ReliquarySet;
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

