import { timeFormatter } from "@/lib/helpers";
import { ChatMessage as ChatMessageType } from "@/types/typings";
import clsx from "clsx";
import React from "react";

interface IChatMessage extends ChatMessageType {
  currentUserId: string;
}

const ChatMessage: React.FC<IChatMessage> = ({
  id,
  message,
  receiverId,
  senderId,
  time,
  currentUserId,
}) => {
  return (
    <div
      key={id + receiverId}
      // className={`chat cursor-default text-dark ${
      //   senderId === currentUserId ? "chat-end" : "chat-start"
      // } `}
      className={clsx("chat cursor-default text-dark", {
        "chat-end": senderId === currentUserId,
        "chat-start": senderId !== currentUserId,
      })}
    >
      <div className="chat-header">
        <time className="text-xs opacity-50 dark:text-secondaryMessage">
          {timeFormatter(time)}
        </time>
      </div>
      <div className="chat-bubble bg-secondaryMessage dark:bg-darkMessage text-black ">
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
