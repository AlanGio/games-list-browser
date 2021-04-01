export type GameType = {
  api_rate_limit?: number;
  title: string;
  platform: string;
  score: number;
  genre: string;
  editors_choice: string;
};

export type GameOrderTypes =
  | "sort_a_z"
  | "sort_z_a"
  | "title"
  | "platform"
  | "score"
  | "genre"
  | "editors_choice";
