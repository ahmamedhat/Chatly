import { IconsSizes } from "@/lib/constants";
import { PersonOnlineMessage } from "@/types/typings";
import Link from "next/link";
import React from "react";
import { BsPersonCircle } from "react-icons/bs";

const PersonOnline: React.FC<PersonOnlineMessage> = ({
  userID,
  username,
  self,
}) => {
  return self ? null : (
    <Link
      as={`chat?username=${username}&userID=${userID}`}
      href={{
        pathname: "/chat",
        query: { username, userID },
      }}
      key={userID}
    >
      <div className="w-full bg-white dark:bg-dark h-20 border border-t-0 border-b-[0.5px] border-gray-200 dark:border-gray-800 py-2 border-x-0 flex items-center">
        <div className="w-[20%] max-w-[55px] items-center flex justify-center mr-2">
          <BsPersonCircle size={IconsSizes.xxl} />
        </div>
        <div className="w-[80%] flex-1">
          <div className="flex justify-between">
            <p className="font-medium text-offBlack dark:text-white">
              {username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PersonOnline;
