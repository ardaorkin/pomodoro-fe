import * as React from "react";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import Card from "./Card";

const tabList = [
  {
    key: "login",
    tab: "login",
  },
];

const contentList: Record<string, React.ReactNode> = {
  login: <Login />,
  signup: <SignUp />,
};

const LoginContainer: React.FunctionComponent = () => {
  return <Card contentList={contentList} tabList={tabList} />;
};

export default LoginContainer;
