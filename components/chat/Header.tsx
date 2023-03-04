"use client";

import { socketActions } from "@/lib/redux/reducers/socketSlice";
import { RootState } from "@/lib/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../buttons/Back";

interface IHeader {
  userID: string;
  userName: string;
}

const Header: React.FC<IHeader> = ({ userName, userID }) => {
  const typingState = useSelector((store: RootState) => store.socket.typing);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(socketActions.setTyping({ uid: userID, value: false }));
    }, 3000);
    return () => clearTimeout(timer);
  }, [typingState[userID]]);

  return (
    <div className="flex justify-start pt-4 items-start flex-row border-b-[0.3px] border-gray-400 max-w-[60rem] mx-auto text-dark dark:text-secondaryMessage font-bold text-lg bg-white dark:bg-dark fixed inset-0 z-10 h-[5rem] px-4">
      <BackButton href="/messages" />
      <div className="flex flex-col items-start justify-center ml-2">
        <p className="cursor-default truncate">{userName}</p>
        <p className="text-sm font-extralight text-gray-400">
          {typingState[userID] ? "typing" : ""}
        </p>
      </div>
    </div>
  );
};

export default Header;
