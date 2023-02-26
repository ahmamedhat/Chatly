import React from "react";
import BackButton from "../buttons/Back";

interface IHeader {
  userName: string;
}

const Header: React.FC<IHeader> = ({ userName }) => {
  return (
    <div className="flex justify-start flex-row border-b-[0.3px] border-gray-400 max-w-[60rem] mx-auto text-dark dark:text-secondaryMessage font-bold text-lg bg-white dark:bg-dark items-center fixed inset-0 z-10 h-[5rem] px-4">
      <BackButton href="/messages" />
      <p className="cursor-default truncate ml-2">{userName}</p>
    </div>
  );
};

export default Header;
