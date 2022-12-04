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

const PagesContainer: React.FunctionComponent = () => {
  const [currentTab] = useAtom(currentTabAtom);
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

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    pomodoroStatusMutation([false]);
    window.location.reload();
  };

  return (
    <div>
      <button
        className="absolute top-1 right-1 rounded bg-red-400 shadow-lg focus:border-0 focus:outline-none focus:ring-0 hover:outline-none hover:border-none"
        onClick={handleLogout}
      >
        Logout
      </button>
      <Card>
        {currentTab === "Pomodoro" ? (
          <Pomodoro
            handleStart={handleStart}
            handlePause={handlePause}
            handleStop={handleStop}
            start={start}
          />
        ) : currentTab === "My Team" ? (
          <MyTeam />
        ) : (
          <SearchUsers />
        )}
      </Card>
    </div>
  );
};

export default PagesContainer;
