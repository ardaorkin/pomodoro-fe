import { useAtom } from "jotai";
import * as React from "react";
import {
  breakTimeAtom,
  currentTabAtom,
  passedTimeAtom,
  pomodoroStatusAtom,
} from "../store";
import Card from "./Card";
import { POMODORO_INITIALS } from "../constants.json";
import Pomodoro from "../pages/Pomodoro";
import MyTeam from "../pages/MyTeam";
import SearchUsers from "../pages/SearchUsers";

const tabList = [
  {
    key: "pomodoro",
    tab: "Pomodoro",
  },
  {
    key: "myteam",
    tab: "My Team",
  },
  {
    key: "search",
    tab: "Search Users",
  },
];

const PagesContainer: React.FunctionComponent = () => {
  const [, pomodoroStatusMutation] = useAtom(pomodoroStatusAtom);
  const [start, setStart] = React.useState<boolean>(false);
  const [passedTime, setPassedTime] = useAtom(passedTimeAtom);
  const [breakTime, setBreakTime] = useAtom(breakTimeAtom);

  React.useEffect(() => {
    if (start) {
      if (breakTime === -1 && passedTime === 0) {
        resetToInitials();
      }
      if (passedTime === 0) {
        const breakTimer = setInterval(() => {
          if (breakTime > -1) {
            setBreakTime((prev) => prev - 1);
          }
        }, 1000);
        return () => clearInterval(breakTimer);
      }
      const pomodoroTimer = setInterval(() => {
        setPassedTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(pomodoroTimer);
    }
  }, [start, passedTime, breakTime]);

  const resetToInitials = () => {
    setPassedTime(POMODORO_INITIALS.initialPomodoroTime);
    setBreakTime(POMODORO_INITIALS.initialBreakTime);
  };

  const handleStop = () => {
    setStart(false);
    resetToInitials();
    pomodoroStatusMutation([false]);
  };

  const handleStart = () => {
    setStart(true);
    pomodoroStatusMutation([true]);
  };

  const handlePause = () => {
    setStart(false);
    pomodoroStatusMutation([false]);
  };

  const contentList: Record<string, React.ReactNode> = {
    pomodoro: (
      <Pomodoro
        handleStart={handleStart}
        handlePause={handlePause}
        handleStop={handleStop}
        start={start}
      />
    ),
    myteam: <MyTeam />,
    search: <SearchUsers />,
  };

  return <Card contentList={contentList} tabList={tabList} />;
};

export default PagesContainer;
