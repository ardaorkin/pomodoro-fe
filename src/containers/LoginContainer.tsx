import * as React from "react";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import { Card } from "antd";

const contentList: Record<string, React.ReactNode> = {
  login: <Login />,
  signup: <SignUp />,
};

const LoginContainer: React.FunctionComponent = () => {
  return (
    <Card style={{ width: 600, height: 700 }}>
      <Login />
    </Card>
  );
};

export default LoginContainer;
