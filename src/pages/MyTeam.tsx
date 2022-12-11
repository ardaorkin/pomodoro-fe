import { Badge, Button, List } from "antd";
import { useAtom, useAtomValue } from "jotai";
import * as React from "react";
import TeamForm from "../components/TeamForm";
import { deleteMemberAtom, teamsAtom } from "../store";

interface IMember {
  username: string;
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  onPomodoro?: boolean;
}

const MyTeam: React.FunctionComponent = () => {
  const myTeam = useAtomValue(teamsAtom);
  const [, deleteMemberMutation] = useAtom(deleteMemberAtom);

  const handleDelete = (members: string[], teamID: string) => {
    deleteMemberMutation([{ members, teamID }]);
    window.location.reload();
  };

  return myTeam ? (
    <List
      itemLayout="horizontal"
      dataSource={myTeam.members}
      renderItem={(member: IMember, idx: number) => (
        <List.Item
          style={{ textAlign: "start" }}
          actions={[
            <Button
              disabled={member._id === myTeam.owner}
              danger
              type="primary"
              onClick={() => handleDelete([member._id], myTeam._id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Badge status={member.onPomodoro ? "success" : "error"} />}
            title={`${member.username}`}
            description={`${member.first_name} ${member.last_name} ${member.email}`}
          />
        </List.Item>
      )}
    />
  ) : (
    <TeamForm />
  );
};

export default MyTeam;
