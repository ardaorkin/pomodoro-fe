import * as React from "react";
import { IUser } from "../store";

interface IUserCardProps {
  user: IUser;
  handleUser?: (data: any) => void;
  isMember?: boolean;
  showDeleteButton?: boolean;
}

const UserCard: React.FunctionComponent<IUserCardProps> = (props) => {
  const handleClick = () => {
    if (props.handleUser) {
      return props.handleUser([props.user._id]);
    }
    return null;
  };
  return (
    <div
      className={`${
        props.isMember ? "shadow-inner" : "shadow-lg hover:scale-105`"
      } w-full h-20 rounded flex flex-row p-5 items-center space-x-3 cursor-pointer relative`}
      onClick={handleClick}
    >
      <div
        className={`rounded-full bg-green-400 border-green-400 border w-7 h-7 ${
          props.user.onPomodoro ? "shadow-lg" : "shadow-inner"
        }`}
      ></div>
      <p>
        {props.user.first_name} {props.user.last_name}
      </p>
      <p>{props.user.username}</p>
      <p>{props.user.email}</p>
    </div>
  );
};

export default UserCard;
