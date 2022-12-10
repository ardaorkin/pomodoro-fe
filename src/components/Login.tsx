import { Button, Form, Input, notification } from "antd";
import { useAtom } from "jotai";
import * as React from "react";
import { loginAtom } from "../store";

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [, mutate] = useAtom(loginAtom);

  const handleLogin = async () => {
    try {
      await mutate([{ username, email, password }]);
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
          <Button type="primary" htmlType="submit" onClick={handleLogin}>
            Login
          </Button>
          <a href="signup">Don't have an account? Signup now!</a>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Login;
