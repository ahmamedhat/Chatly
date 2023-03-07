import { User } from "@/lib/api/gql/graphql";
import { MARK_MESSAGE_AS_READ } from "@/lib/api/mutation";
import { IconsSizes } from "@/lib/constants";
import { chatTimeFormatter, parseUser } from "@/lib/helpers";
import { PersonChatMessage } from "@/types/typings";
import { useMutation } from "@apollo/client";
import clsx from "clsx";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { BsPersonCircle } from "react-icons/bs";

interface IPersonChatMessage extends PersonChatMessage {
  users: User[];
  currentUserID: string;
}

const PersonChat: React.FC<IPersonChatMessage> = ({
  message,
  time,
  image,
  chatID,
  currentUserID,
  users,
}) => {
  const otherUser: User = parseUser(users, currentUserID);

  const [markAsRead] = useMutation(MARK_MESSAGE_AS_READ);

  const onChatClicked = () => {
    markAsRead({ variables: { id: message._id } });
  };

  return (
    <Link
      href={{
        pathname: "/chat",
        query: { userID: otherUser?._id, chatID },
      }}
      onClick={onChatClicked}
      as={`/chat?userID=${otherUser?._id}&chatID=${chatID}`}
      key={chatID}
    >
      <div
        className={clsx(
          "w-full relative h-20 border border-t-0 border-b-[0.5px] border-gray-200 dark:border-gray-700 py-2 border-x-0 flex items-center rounded-md mb-2"
        )}
      >
        {!message.read && message.from._id !== currentUserID && (
          <div className="bg-red-500 rounded-full w-3 h-3 absolute right-0 top-0" />
        )}
        <div className="w-[20%] max-w-[55px] items-center flex justify-center mr-2">
          {otherUser?.image ? (
            <Image
              src={otherUser?.image}
              blurDataURL={image}
              width={55}
              height={55}
              alt={otherUser?.name}
              className="object-cover object-top rounded-full h-auto"
              quality={40}
            />
          ) : (
            <BsPersonCircle size={IconsSizes.xxxl} />
          )}
        </div>
        <div className="w-[80%] flex-1">
          <div className="flex justify-between items-center mb-1">
            <p
              className={clsx("truncate", {
                "text-dark dark:text-white font-bold":
                  !message.read && message.from._id !== currentUserID,
                "text-gray-700 dark:text-gray-300 font-medium":
                  message.read && message.from._id !== currentUserID,
              })}
            >
              {otherUser?.name}
            </p>
            <p
              className={clsx("text-xs truncate", {
                "text-gray-800 dark:text-gray-300 font-medium":
                  !message.read && message.from._id !== currentUserID,
                "font-regular text-gray-400 dark:text-gray-400":
                  message.read && message.from._id !== currentUserID,
              })}
            >
              {chatTimeFormatter(time)}
            </p>
          </div>
          <div className="flex justify-between">
            <p
              className={clsx("truncate", {
                "text-gray-800 dark:text-gray-300 font-medium":
                  !message.read && message.from._id !== currentUserID,
                "font-regular text-gray-400 dark:text-gray-400":
                  message.read && message.from._id !== currentUserID,
              })}
            >
              {message.body}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PersonChat;
