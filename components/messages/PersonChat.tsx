import { User } from "@/lib/api/gql/graphql";
import { IconsSizes } from "@/lib/constants";
import { parseChatName, timeFormatter } from "@/lib/helpers";
import { PersonChatMessage } from "@/types/typings";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { BsPersonCircle } from "react-icons/bs";

interface IPersonChatMessage extends PersonChatMessage {
  currentUserID: string;
}

const PersonChat: React.FC<IPersonChatMessage> = ({
  message,
  time,
  image,
  chatID,
  currentUserID,
}) => {
  const otherUser: User = parseChatName(message, currentUserID);
  return (
    <Link
      href={{
        pathname: "/chat",
        query: { username: otherUser.name, userID: otherUser._id, chatID },
      }}
      as={`/chat?username=${otherUser.name}&userID=${otherUser._id}&chatID=${chatID}`}
      key={chatID}
    >
      <div className="w-full bg-white dark:bg-dark h-20 border border-t-0 border-b-[0.5px] border-gray-200 dark:border-gray-800 py-2 border-x-0 flex items-center">
        <div className="w-[20%] max-w-[55px] items-center flex justify-center mr-2">
          {image ? (
            <Image
              src={image}
              blurDataURL={image}
              width={55}
              height={55}
              alt={otherUser.name}
              className="object-cover object-top rounded-full h-auto"
              quality={40}
            />
          ) : (
            <BsPersonCircle size={IconsSizes.xxxl} />
          )}
        </div>
        <div className="w-[80%] flex-1">
          <div className="flex justify-between items-center mb-1">
            <p className="truncate font-medium text-offBlack dark:text-white">
              {otherUser.name}
            </p>
            <p className="text-gray-400 text-xs">{timeFormatter(time)}</p>
          </div>
          <div className="flex justify-between">
            <p className="truncate text-gray-400">{message.body}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PersonChat;
