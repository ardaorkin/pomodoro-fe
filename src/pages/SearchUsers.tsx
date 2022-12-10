import { useAtom } from "jotai";
import * as React from "react";
import {
  addToTeamAtom,
  ISearchUsersProps,
  IUser,
  searchUsersAtom,
  teamsAtom,
} from "../store";

const SearchUsers: React.FunctionComponent<ISearchUsersProps> = () => {
  const [userList, userListMutation] = useAtom(searchUsersAtom);
  const [teams] = useAtom(teamsAtom);
  const [, addToTeamMutation] = useAtom(addToTeamAtom);

  const handleSearch = (value: string) => {
    userListMutation([value]);
  };

  const handleAddToTeam = (members: string[]) => {
    addToTeamMutation([{ members, teamID: teams._id }]);
  };

  return (
    <div className="flex flex-col space-y-7">
      <input
        placeholder="Search users"
        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-b-pink-600
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 bg-transparent border-transparent placeholder:text-gray-100 placeholder:italic"
        type={"text"}
        name="username"
        onChange={(event) => handleSearch(event.target.value)}
      />
      <div>
        {userList.data?.map((user: IUser, idx: number) => (
          <div>text</div>
          // <UserCard
          //   user={user}
          //   key={idx}
          //   handleUser={handleAddToTeam}
          //   isMember={teams.members
          //     .map(({ _id }: { _id: string }) => _id)
          //     .includes(user._id)}
          // />
        ))}
      </div>
    </div>
  );
};

export default SearchUsers;
