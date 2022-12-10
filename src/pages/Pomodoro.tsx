import { Button } from "antd";
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ margin: "50px 0 50px 0" }}>
        <div>
          <h2>Pomodoro</h2>
          <p>{new Date(passedTime * 1000).toISOString().substr(11, 8)}</p>
        </div>
        <div>
          <h2>Break</h2>
          <p>{new Date(breakTime * 1000).toISOString().substr(11, 8)}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "50%",
          justifyContent: "space-around",
        }}
      >
        <Button disabled={start} type="primary" onClick={handleStart}>
          Start
        </Button>
        <Button disabled={!start} type="primary" onClick={handlePause}>
          Pause
        </Button>
        <Button danger type="primary" onClick={handleStop}>
          Stop
        </Button>
      </div>
    </div>
  );
};

export default Pomodoro;
