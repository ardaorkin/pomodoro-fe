import { useAtom } from "jotai";
import * as React from "react";
import { Pages } from "../pages";
import { currentTabAtom } from "../store";
import Card from "./Card";

const PagesContainer: React.FunctionComponent = () => {
  const [currentTab] = useAtom(currentTabAtom);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
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
          <Pages.Pomodoro />
        ) : currentTab === "MyTeam" ? (
          <Pages.MyTeam />
        ) : (
          <Pages.SearchUsers />
        )}
      </Card>
    </div>
  );
};

export default PagesContainer;
