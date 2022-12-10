import { useAtom } from "jotai";
import * as React from "react";
import { pomodoroStatusAtom } from "../store";
import { Button, Card as AntCard, Skeleton } from "antd";

interface ICardProps {
  contentList: Record<string, React.ReactNode>;
  tabList: { key: string; tab: string }[];
}

const Card: React.FunctionComponent<ICardProps> = ({
  contentList,
  tabList,
}) => {
  const [activeTabKey1, setActiveTabKey1] = React.useState<string>("tab1");
  const [, pomodoroStatusMutation] = useAtom(pomodoroStatusAtom);

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    pomodoroStatusMutation([false]);
    window.location.reload();
  };

  return (
    <AntCard
      extra={
        <Button
          style={{ marginTop: 10 }}
          danger
          type="primary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      }
      defaultActiveTabKey={`${contentList[0]}`}
      style={{ width: 600, height: 700 }}
      tabList={tabList}
      activeTabKey={activeTabKey1}
      onTabChange={(key) => {
        onTab1Change(key);
      }}
    >
      <React.Suspense fallback={<Skeleton />}>
        {contentList[activeTabKey1]}
      </React.Suspense>
    </AntCard>
  );
};

export default Card;
