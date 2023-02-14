import { timeFormatter } from "@/lib/helpers";
import { ChatMessage as ChatMessageType } from "@/typings";
import React from "react";

interface IChatMessage extends ChatMessageType {
  currentUserId: number;
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
      className={`chat cursor-default text-dark ${
        senderId === currentUserId ? "chat-end" : "chat-start"
      } `}
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
