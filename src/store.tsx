import { atom } from "jotai";
import { atomsWithMutation, atomsWithQuery } from "jotai-tanstack-query";
import { FunctionComponent } from "react";
import { API_URL, POMODORO_INITIALS } from "./constants.json";

export interface IUser {
  username: string;
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  onPomodoro?: boolean;
}

export interface ITeam {
  _id: string;
  name: string;
  members: IUser[];
  owner: string;
}

export interface ISignupBody extends ILoginBody {
  firstName: string;
  lastName: string;
}

export interface ILoginBody {
  username: string;
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface ISearchUsersProps {}

export interface IPages {
  Pomodoro: FunctionComponent;
  MyTeam: FunctionComponent;
  SearchUsers: FunctionComponent;
}

export type Tabs = "Pomodoro" | "My Team" | "Search Users";

export const currentTabAtom = atom<Tabs>("Pomodoro");

export const accessTokenAtom = atom(localStorage.getItem("access_token") ?? "");

export const [, signupAtom] = atomsWithMutation(() => ({
  mutationKey: ["signup"],
  mutationFn: async (body: ISignupBody) => {
    const res = await fetch(API_URL + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const result: IToken = await res.json();
      localStorage.setItem("access_token", result.token);
      window.location.reload();
    } else {
      const error = await res.text();
      throw new Error(error);
    }
  },
}));

export const [, loginAtom] = atomsWithMutation(() => ({
  mutationKey: ["login"],
  mutationFn: async (body: ILoginBody) => {
    const res = await fetch(API_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const result: IToken = await res.json();
      localStorage.setItem("access_token", result.token);
      window.location.reload();
    } else {
      const error = await res.text();
      throw new Error(error);
    }
  },
}));

export const [, searchUsersAtom] = atomsWithMutation((get) => ({
  mutationKey: ["search"],
  mutationFn: async (username: string) => {
    const res = await fetch(API_URL + "/search", {
      method: "POST",
      headers: {
        Authorization: get(accessTokenAtom),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    return data;
  },
}));

export const [, addToTeamAtom] = atomsWithMutation((get) => ({
  mutationKey: ["addToTeam"],
  mutationFn: async ({
    members,
    teamID,
  }: {
    members: string[];
    teamID: string;
  }) => {
    const res = await fetch(API_URL + "/addmembers", {
      method: "POST",
      headers: {
        Authorization: get(accessTokenAtom),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ members, teamID }),
    });
    const data = await res.json();
    return data;
  },
}));

export const [, createTeamAtom] = atomsWithMutation((get) => ({
  mutationKey: ["createTeam"],
  mutationFn: async (teamName: string) => {
    const res = await fetch(API_URL + "/createTeam", {
      method: "POST",
      headers: {
        Authorization: get(accessTokenAtom),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: teamName }),
    });
    if (res.status === 200) {
      const result = await res.json();
      return result;
    } else {
      const error = await res.text();
      throw new Error(error);
    }
  },
}));

export const [teamsAtom] = atomsWithQuery((get) => ({
  queryKey: ["teams", get(accessTokenAtom)],
  queryFn: async ({ queryKey: [, accessToken] }: { queryKey: string[] }) => {
    const res = await fetch(API_URL + "/myTeam", {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    });
    const result: ITeam = await res.json();
    return result;
  },
}));

export const [, deleteMemberAtom] = atomsWithMutation((get) => ({
  mutationKey: ["deleteMember"],
  mutationFn: async ({
    members,
    teamID,
  }: {
    members: string[];
    teamID: string;
  }) => {
    const res = await fetch(API_URL + "/removeMembers", {
      method: "POST",
      headers: {
        Authorization: get(accessTokenAtom),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ members, teamID }),
    });
    const result = await res.json();
    return result;
  },
}));

export const [, pomodoroStatusAtom] = atomsWithMutation((get) => ({
  mutationKey: ["pomodoroStatus"],
  mutationFn: async (status: boolean) => {
    const res = await fetch(API_URL + "/onPomodoro", {
      method: "PUT",
      headers: {
        Authorization: get(accessTokenAtom),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    const result = await res.json();
    return result;
  },
}));

export const passedTimeAtom = atom<number>(
  POMODORO_INITIALS.initialPomodoroTime
);
export const breakTimeAtom = atom<number>(POMODORO_INITIALS.initialBreakTime);
