import { useAtomValue } from "jotai";
import * as React from "react";
import { breakTimeAtom, passedTimeAtom } from "../store";

interface IPomodoroProps {
  start: boolean;
  handleStart: () => void;
  handlePause: () => void;
  handleStop: () => void;
}

const Pomodoro: React.FunctionComponent<IPomodoroProps> = ({
  start,
  handlePause,
  handleStart,
  handleStop,
}) => {
  const passedTime = useAtomValue(passedTimeAtom);
  const breakTime = useAtomValue(breakTimeAtom);
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
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className="rounded bg-red-400 shadow-lg disabled:shadow-inner focus:border-0 focus:outline-none focus:ring-0 hover:outline-none hover:border-none"
          disabled={!start}
          onClick={handlePause}
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
