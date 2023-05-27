export interface RecordCardData {
  list: List[];
  current: List | undefined;
}

interface List {
  has_role: boolean;
  game_id: number;
  game_role_id: string;
  nickname: string;
  region: string;
  level: number;
  background_image: string;
  is_public: boolean;
  /**
   * @description 1: Days Active, 2: Characters, 3: Achievements, 4: Spiral Abyss
   */
  data: [Data, Data, Data, Data];
  region_name: string;
  url: string;
}

interface Data {
  name: string;
  type: number;
  value: string;
}
