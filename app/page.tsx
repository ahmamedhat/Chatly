"use client";

import { PersonChat } from "@/components";
import { Chats } from "@/lib/constants";

export default function Home() {
  return (
    <div className="bg-white dark:bg-dark py-2">
      <h2 className="font-bold text-lg mb-4 text-offBlack dark:text-white">
        Messages
      </h2>
      {Chats.map((chat) => {
        return (
          <PersonChat
            key={chat.id}
            name={chat.name}
            id={chat.id}
            message={chat.message}
            time={chat.time}
            image={chat.image}
            chatID={chat.chatID}
          />
        );
      })}
    </div>
  );
}
