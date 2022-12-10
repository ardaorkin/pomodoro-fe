import * as React from "react";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import { Card } from "antd";

const modesArray = ["signup", "login"] as const;
type Mode = typeof modesArray[number];

const LoginContainer: React.FunctionComponent = () => {
  const [mode, setMode] = React.useState<Mode>("login");

  return (
    <Card style={{ width: 600, height: 700 }}>
      {mode === "signup" ? (
        <SignUp changeMode={() => setMode("login")} />
      ) : (
        <Login changeMode={() => setMode("signup")} />
      )}
    </Card>
  );
};

export default LoginContainer;
