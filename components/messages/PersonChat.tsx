import { PersonChatMessage } from "@/typings";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

const PersonChat: React.FC<PersonChatMessage> = ({
  id,
  message,
  name,
  time,
  image,
  chatID,
}) => {
  return (
    <Link href={"/chat?chatId=" + chatID} key={id}>
      <div className="w-full bg-white dark:bg-dark h-20 border border-t-0 border-b-[0.5px] border-gray-200 dark:border-gray-800 py-2 border-x-0 flex items-center">
        <div className="w-[20%] items-center flex justify-center mr-2">
          <Image
            src={image}
            blurDataURL={image}
            width={55}
            height={55}
            alt={name}
            className="object-cover object-top rounded-full h-auto"
            quality={40}
          />
        </div>
        <div className="w-[80%]">
          <div className="flex justify-between">
            <p className="font-semibold text-offBlack dark:text-white">
              {name}
            </p>
            <p className="text-gray-400 text-xs">{time}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-400">{message}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PersonChat;
