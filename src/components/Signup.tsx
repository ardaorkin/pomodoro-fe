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

  const handleSignup = () => {
    mutate([{ firstName, lastName, username, email, password }]);
  };
  return (
    <form className="space-y-7">
      <div className="flex flex-row space-x-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            First Name
          </span>
          <input
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-b-pink-600
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 bg-transparent border-transparent"
            type={"text"}
            value={firstName}
            name="first_name"
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            Last Name
          </span>
          <input
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-b-pink-600
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 bg-transparent border-transparent"
            type={"text"}
            value={lastName}
            name="last_name"
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700">
          username
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
        onClick={handleSignup}
      >
        Signup
      </button>
    </form>
  );
};

export default SignUp;
