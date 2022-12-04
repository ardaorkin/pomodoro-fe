import * as React from "react";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import Card from "./Card";

interface ILoginContainerProps {}

const modesArray = ["signup", "login"] as const;
type Mode = typeof modesArray[number];

const LoginContainer: React.FunctionComponent<ILoginContainerProps> = () => {
  const [mode, setMode] = React.useState<Mode>("login");

  return (
    <Card>
      <div className="flex flew-row space-x-3">
        <button
          disabled={mode === "signup"}
          onClick={() => setMode("signup")}
          className="rounded bg-red-400 shadow-lg disabled:shadow-inner focus:border-0 focus:outline-none focus:ring-0 hover:outline-none hover:border-none"
        >
          Signup
        </button>

        <button
          disabled={mode === "login"}
          className="rounded bg-red-400 shadow-lg disabled:shadow-inner focus:border-0 focus:outline-none focus:ring-0 hover:outline-none hover:border-none"
          onClick={() => setMode("login")}
        >
          Login
        </button>
      </div>
      {mode === "signup" ? <SignUp /> : <Login />}
    </Card>
  );
};

export default LoginContainer;
