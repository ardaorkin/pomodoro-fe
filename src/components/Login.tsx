import { useAtom } from "jotai";
import * as React from "react";
import { loginAtom } from "../store";

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [, mutate] = useAtom(loginAtom);

  const handleLogin = () => {
    mutate([{ username, email, password }]);
  };
  return (
    <form className="space-y-7">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700">
          Username
        </span>
        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-b-pink-600
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 bg-transparent border-transparent"
          type={"text"}
          value={username}
          name="username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700">Email</span>
        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-b-pink-600
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 bg-transparent border-transparent"
          type={"email"}
          value={email}
          name="email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700">
          Password
        </span>
        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-b-pink-600
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 bg-transparent border-transparent"
          type={"password"}
          value={password}
          name="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      <button
        className="rounded bg-red-400 shadow-lg focus:border-0 focus:outline-none focus:ring-0 hover:outline-none hover:border-none"
        type="button"
        onClick={handleLogin}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
