import * as React from "react";
import { useAtom } from "jotai";
import { currentTabAtom, Tabs } from "../store";

const pages = ["Pomodoro", "My Team", "Search Users"];

const TabBar: React.FunctionComponent = () => {
  const [currentTab, setCurrentTab] = useAtom(currentTabAtom);

  const changeCurrentTab = (tabName: any) => setCurrentTab(tabName);

  return (
    <div className="h-16 space-x-2 flex flex-row absolute w-full">
      {pages.map((key, idx) => {
        return (
          <button
            key={idx}
            onClick={() => changeCurrentTab(key)}
            className={`w-96 rotate-180 rounded bg-red-400 focus:border-0 focus:outline-none focus:ring-0 hover:outline-none hover:border-none shadow-lg relative ${
              currentTab === key ? "top-2 z-20" : "z-0"
            }`}
          >
            <p className="rotate-180">{key}</p>
          </button>
        );
      })}
    </div>
  );
};

export default TabBar;
