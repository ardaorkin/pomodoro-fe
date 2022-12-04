import { useAtom } from "jotai";
import * as React from "react";
import TabBar from "../components/TabBar";
import { accessTokenAtom } from "../store";

interface ICardProps {
  children: React.ReactElement | React.ReactElement[];
}

const Card: React.FunctionComponent<ICardProps> = (props) => {
  const [accessToken] = useAtom(accessTokenAtom);
  return (
    <div className="text-left space-y-12 rounded-md border-0 relative bg-red-400 flex flex-col">
      {accessToken && <TabBar />}
      <div
        className="p-20 border-t-2 border-red-400 shadow-xl z-10"
        style={{ width: 600, height: 750 }}
      >
        <React.Suspense fallback={<div>Loading...</div>}>
          {props.children}
        </React.Suspense>
      </div>
    </div>
  );
};

export default Card;
