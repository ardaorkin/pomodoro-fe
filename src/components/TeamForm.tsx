import { Button, Form, Input, notification } from "antd";
import { useSetAtom } from "jotai";
import * as React from "react";
import { createTeamAtom } from "../store";

const TeamForm: React.FunctionComponent = () => {
  const [teamName, setTeamName] = React.useState<string>("");
  const mutation = useSetAtom(createTeamAtom);

  const handleCreateTeam = async () => {
    try {
      await mutation([teamName]);
      window.location.reload();
    } catch (error: any) {
      return notification.open({
        type: "error",
        message: "Team Creation Error",
        description: error?.message || "",
      });
    }
  };
  return (
    <Form layout="inline">
      <Form.Item label="Team Name" name={"teamName"}>
        <Input
          value={teamName}
          onChange={(event) => setTeamName(event.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleCreateTeam}>
          Create Team
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TeamForm;
