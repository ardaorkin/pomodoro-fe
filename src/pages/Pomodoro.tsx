import * as React from "react";
import { POMODORO_INITIALS } from "../constants.json";

const Pomodoro: React.FunctionComponent = () => {
  const [start, setStart] = React.useState<boolean>(false);
  const [passedTime, setPassedTime] = React.useState<number>(
    POMODORO_INITIALS.initialPomodoroTime
  );
  const [breakTime, setBreakTime] = React.useState<number>(
    POMODORO_INITIALS.initialBreakTime
  );

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

  const handleStop: () => void = () => {
    setStart(false);
    resetToInitials();
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col space-y-7">
        <div
          className={`w-96 rounded ${
            passedTime === 0 || !start ? "shadow-inner" : "shadow-lg"
          } p-10 relative`}
        >
          <h2 className="absolute top-1 left-1">Pomodoro</h2>
          <p className="text-center text-2xl">
            {new Date(passedTime * 1000).toISOString().substr(11, 8)}
          </p>
        </div>
        <div
          className={`w-96 rounded ${
            passedTime === 0 ? "shadow-lg" : "shadow-inner"
          } p-10 relative`}
        >
          <h2 className="absolute top-1 left-1">Break</h2>
          <p className="text-center text-2xl">
            {new Date(breakTime * 1000).toISOString().substr(11, 8)}
          </p>
        </div>
      </div>
      <div className="flex flex-row space-x-7 align-center justify-center">
        <button
          className="rounded bg-red-400 shadow-lg disabled:shadow-inner focus:border-0 focus:outline-none focus:ring-0 hover:outline-none hover:border-none"
          disabled={start}
          onClick={() => setStart(true)}
        >
          Start
        </button>
        <button
          className="rounded bg-red-400 shadow-lg disabled:shadow-inner focus:border-0 focus:outline-none focus:ring-0 hover:outline-none hover:border-none"
          disabled={!start}
          onClick={() => setStart(false)}
        >
          Pause
        </button>
        <button
          className="rounded bg-red-400 shadow-lg focus:border-0 focus:outline-none focus:ring-0 hover:outline-none hover:border-none"
          onClick={handleStop}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
