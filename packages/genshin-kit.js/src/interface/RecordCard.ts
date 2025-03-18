export interface RecordCardData {
  list: List[];
  current: List | undefined;
}

interface List {
  has_role: boolean;
  game_name: string;
  game_id: number;
  game_role_id: string;
  nickname: string;
  region: string;
  region_name: string;
  level: number;
  background_image: string;
  is_public: boolean;
  /**
   * @description [0]: Days Active, [1]: Characters, [2]: Achievements, [3]: Spiral Abyss
   */
  data: [Data, Data, Data, Data];
  url: string;
}

interface Data {
  name: string;
  type: number;
  value: string;
}
