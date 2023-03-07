"use client";

import { User } from "@/types/typings";
import React, { useEffect } from "react";
import EmptyMessages from "./EmptyMessages";
import PersonChat from "./PersonChat";
import { Chat } from "../../lib/api/gql/graphql";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";

interface IChatHistory {
  currentUser?: User;
  chats?: Chat[];
}

const ChatsHistory = ({ currentUser, chats }: IChatHistory) => {
  const chatsState = useSelector((store: RootState) => store.socket.chats);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [chatsState]);

  return (
    <div className="max-w-[50rem] mx-auto mt-4 mb-6">
      <Toaster />
      <h2 className="font-semibold text-xl mb-4 text-gray-800 dark:text-gray-300">
        chats
      </h2>

      {!currentUser ? (
        <EmptyMessages
          title="You're not signed in yet"
          descriptipon="Sign in to start chatting with online users!"
        />
      ) : chats && chats?.length > 0 ? (
        chats?.map((chat: Chat) => {
          return (
            <PersonChat
              chatID={chat._id}
              message={chat.messages[0]}
              time={chat.updatedAt}
              key={chat._id}
              currentUserID={currentUser.id}
              users={chat.users}
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
