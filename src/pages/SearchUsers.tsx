import { Button, Input, List } from "antd";
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
    <div>
      <Input.Search onChange={(event) => handleSearch(event.target.value)} />
      <div>
        <List
          itemLayout="horizontal"
          dataSource={userList.data}
          renderItem={(user: IUser, idx: number) => (
            <List.Item
              style={{ textAlign: "start" }}
              actions={[
                <Button
                  disabled={teams.members
                    .map(({ _id }: { _id: string }) => _id)
                    .includes(user._id)}
                  type="primary"
                  onClick={() => handleAddToTeam([user._id])}
                >
                  Add To Team
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={`${user.username}`}
                description={`${user.first_name || ""} ${
                  user.last_name || ""
                } ${user.email}`}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default SearchUsers;
