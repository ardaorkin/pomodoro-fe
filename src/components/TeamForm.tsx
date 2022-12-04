import { useAtom } from "jotai";
import * as React from "react";
import { createTeamAtom } from "../store";

const TeamForm: React.FunctionComponent = () => {
  const [teamName, setTeamName] = React.useState<string>("");
  const [teamResult, setTeamResult] = React.useState<any>([]);
  const [createTeam, mutation] = useAtom(createTeamAtom);

  React.useEffect(() => {
    setTeamResult(createTeam);
  }, [createTeam]);

  const handleCreateTeam = () => {
    mutation([teamName]);
  };
  return (
    <form className="space-y-7">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700">
          Team Name
        </span>
        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-b-pink-600
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 bg-transparent border-transparent"
          type={"text"}
          value={teamName}
          name="name"
          onChange={(event) => setTeamName(event.target.value)}
        />
      </label>

      <button
        className="rounded bg-red-400 shadow-lg focus:border-0 focus:outline-none focus:ring-0 hover:outline-none hover:border-none"
        type="button"
        onClick={handleCreateTeam}
      >
        Create Team
      </button>
      {JSON.stringify(teamResult)}
    </form>
  );
};

export default TeamForm;
