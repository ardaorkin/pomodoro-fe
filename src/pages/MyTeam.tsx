import { useAtom } from "jotai";
import * as React from "react";
import TeamForm from "../components/TeamForm";
import UserCard from "../components/UserCard";
import { deleteMemberAtom, teamsAtom } from "../store";

interface IMember {
  username: string;
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
}

const MyTeam: React.FunctionComponent = () => {
  const [myTeam] = useAtom(teamsAtom);
  const [, deleteMemberMutation] = useAtom(deleteMemberAtom);

  const handleDelete = (members: string[], teamID: string) => {
    deleteMemberMutation([{ members, teamID }]);
    window.location.reload();
  };

  return myTeam ? (
    <div>
      <label className="float-left space-x-2">
        <span>Team Name:</span>
        <div className="float-right">{myTeam.name}</div>
      </label>

      {myTeam.members.map((member: IMember, idx: number) => {
        return (
          <div className="relative" key={idx}>
            <UserCard user={member} showDeleteButton />
            {member._id !== myTeam.owner && (
              <div
                className="rounded-full bg-red-500 absolute right-1 top-1/3  hover:scale-105 text-2xl text-slate-100 text-center cursor-pointer"
                style={{ width: 40, height: 40 }}
                onClick={() => handleDelete([member._id], myTeam._id)}
              >
                -
              </div>
            )}
          </div>
        );
      })}
    </div>
  ) : (
    <TeamForm />
  );
};

export default MyTeam;
