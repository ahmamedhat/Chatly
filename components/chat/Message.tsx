import { Message } from "@/lib/api/gql/graphql";
import { timeFormatter } from "@/lib/helpers";
import clsx from "clsx";
import React, { memo } from "react";

interface IChatMessage extends Partial<Message> {
  currentUserId: string;
}

const ChatMessage: React.FC<IChatMessage> = ({
  _id,
  body,
  createdAt,
  from,
  currentUserId,
}) => {
  return (
    <div
      key={_id}
      className={clsx("chat cursor-default text-dark", {
        "chat-end": from?._id === currentUserId,
        "chat-start": from?._id !== currentUserId,
      })}
    >
      <div className="chat-header">
        <time className="text-xs opacity-50 dark:text-secondaryMessage">
          {timeFormatter(createdAt!)}
        </time>
      </div>
      <div className="chat-bubble bg-secondaryMessage dark:bg-darkMessage text-black ">
        {body}
      </div>
    </div>
  );
};

export default memo(ChatMessage);
