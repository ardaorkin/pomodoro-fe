import { List } from "antd";
import { useAtomValue } from "jotai";
import * as React from "react";
import { myPomodorosAtom } from "../store";

interface IPomodoro {
  date: string;
  length: number;
}

const MyPomodoros: React.FunctionComponent = () => {
  const myPomodoros = useAtomValue(myPomodorosAtom);
  return (
    <List
      itemLayout="horizontal"
      dataSource={myPomodoros}
      renderItem={(pomodoro: IPomodoro, idx: number) => (
        <List.Item style={{ textAlign: "start" }}>
          <List.Item.Meta
            description={pomodoro.date.split("T").join(" ").split(".")[0]}
            title={new Date(pomodoro.length * 1000).toISOString().substr(11, 8)}
          />
        </List.Item>
      )}
    />
  );
};

export default MyPomodoros;
