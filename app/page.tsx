"use client";

import { PersonChat } from "@/components";
import { Chats } from "@/lib/constants";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const socket = io("http://localhost:4000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("you connected app with socket id: ", socket.id);
    });
    socket.on("receive-message", (socket) => {
      console.log("app socket message is", socket);
    });
  }, []);

  return (
    <div className="bg-white dark:bg-dark py-2">
      <div className="max-w-[50rem] mx-auto">
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
    </div>
  );
}
