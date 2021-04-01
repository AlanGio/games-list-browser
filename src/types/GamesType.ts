export type GameType = {
  api_rate_limit?: number;
  editors_choice: string;
  genre: string;
  platform: string;
  score: number;
  title: string;
};

export type GameOrderTypes =
  | "editors_choice"
  | "genre"
  | "platform"
  | "score"
  | "sort_a_z"
  | "sort_z_a"
  | "title";

export type GameFilterTypes = "platform" | "title";
