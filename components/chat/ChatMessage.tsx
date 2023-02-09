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
      className={`chat ${
        senderId === currentUserId ? "chat-end" : "chat-start"
      } `}
    >
      <div className="chat-header">
        <time className="text-xs opacity-50">{time}</time>
      </div>
      <div className="chat-bubble bg-secondaryMessage dark:bg-darkMessage text-black ">
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
