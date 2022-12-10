import { Button, Form, Input, notification } from "antd";
import { useAtom } from "jotai";
import * as React from "react";
import { signupAtom } from "../store";

interface ISignUpProps {}

const SignUp: React.FunctionComponent<ISignUpProps> = (props) => {
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [, mutate] = useAtom(signupAtom);

  const handleSignup = async () => {
    try {
      await mutate([{ firstName, lastName, username, email, password }]);
    } catch (error: any) {
      return notification.open({
        type: "error",
        message: "Login Error",
        description: error?.message || "",
      });
    }
  };
  return (
    <Form layout="vertical">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Form.Item label="First Name" name={"firstName"}>
          <Input
            style={{ width: 250 }}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Form.Item>
        <Form.Item label="Last Name" name={"lastName"}>
          <Input
            style={{ width: 250 }}
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </Form.Item>
      </div>
      <Form.Item label="User Name" name={"username"}>
        <Input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Item>
      <Form.Item label="Email" name={"email"}>
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Item>
      <Form.Item label="Password" name={"password"}>
        <Input.Password
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button type="primary" htmlType="submit" onClick={handleSignup}>
            Signup
          </Button>
          <a href="/">Already have an account? Login!</a>
        </div>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
