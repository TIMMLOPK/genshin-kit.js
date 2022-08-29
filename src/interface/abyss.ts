/**
 * interface for abyss API
 * 
 */

interface AbyssRank {
    avatar_id: number;
    avatar_icon: string;
    value: number;
    rarity: number;
}

interface AbyssLevel {
    index: number;
    star: number;
    max_star: number;
}

interface AbyssFloor {
    index: number;
    icon: string;
    is_unlock: boolean;
    settle_time: string;
    star: number;
    max_star: number;
    levels: AbyssLevel[];
}

export interface AbyssBattle {
    damge_rank : AbyssRank[];
    defeat_rank : AbyssRank[];
    endTime : string;
    energy_skill_rank: AbyssRank[];
    floor : AbyssFloor[];
    is_unlock : boolean;
    max_floor : string;
    normal_skill_rank: AbyssRank[];
    reveal_rank: AbyssRank[];
    schedule_id: number;
    startTime : string;
    take_damage_rank: AbyssRank[];
    total_battle_times: number;
    total_star: number;
    total_win_times: number;
}


