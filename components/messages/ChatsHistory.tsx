"use client";

import { User } from "@/types/typings";
import React from "react";
import EmptyMessages from "./EmptyMessages";
import PersonChat from "./PersonChat";
import { Chat } from "../../lib/api/gql/graphql";

interface IChatHistory {
  currentUser: User;
  chats: Chat[];
}

const ChatsHistory = ({ currentUser, chats }: IChatHistory) => {
  return (
    <div className="max-w-[50rem] mx-auto mt-4 mb-6">
      <h2 className="font-semibold text-lg mb-4 text-gray-600 dark:text-gray-400">
        Chats
      </h2>

      {!currentUser ? (
        <EmptyMessages
          title="You're not signed in yet"
          descriptipon="Sign in to start chatting with online users!"
        />
      ) : chats.length > 0 ? (
        chats.map((chat: Chat) => {
          return (
            <PersonChat
              chatID={chat._id}
              message={chat.messages[0]}
              time={chat.updatedAt}
              key={chat._id}
              currentUserID={currentUser.id}
            />
          );
        })
      ) : (
        <EmptyMessages
          title="No old chats here yet"
          descriptipon="Start chatting with online users now!"
        />
      )}
    </div>
  );
};

export default ChatsHistory;
