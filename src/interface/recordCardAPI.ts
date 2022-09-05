interface Data {
    name: string;
    type: number;
    value: string;
}

interface ListItem {
    has_role: boolean;
    game_id: number;
    game_role_id: string;
    nickname: string;
    region: string;
    level: number;
    background_image: string;
    is_public: boolean;
    data: Data[];
    region_name: string;
    url: string;
}

export interface RecordCard {
    list: ListItem[];
}