/* eslint-disable no-undef */
import axios from "axios";
import { GameType } from "../types/GamesType";

export const getGames = () => {
  return axios.get<GameType[]>(
    `//s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json`
  );
};

export default getGames;
