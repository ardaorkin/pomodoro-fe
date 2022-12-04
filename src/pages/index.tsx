import { IPages } from "../store";
import MyTeam from "./MyTeam";
import Pomodoro from "./Pomodoro";
import SearchUsers from "./SearchUsers";

export const Pages: IPages = {
  Pomodoro,
  MyTeam,
  SearchUsers,
};
export const DefaultPage = "Pomodoro";
