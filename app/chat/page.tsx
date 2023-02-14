"use client";

import { ChatHeader, ChatMessage } from "@/components";
import { ChatMessages, IconsSizes } from "@/lib/constants";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { TbSend } from "react-icons/tb";
import { io, Socket } from "socket.io-client";

export default function Chat() {
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState(ChatMessages);
  const [socket, setSocket] = useState<Socket>();

  const chatList = useRef<null | HTMLDivElement>(null);

  const query = useSearchParams().get("chatId");

  const user = {
    name: "Ahmad",
    id: 2,
  };

  socket?.on("receive-message", (message) => {
    console.log("message in chat page socket is", message);
    setChatMessages([...chatMessages, message]);
    console.log("messages now are", chatMessages.length);
  });

  useEffect(() => {
    console.log("query is", query);
    const socketObj = io("http://localhost:4000");
    setSocket(socketObj);
    socketObj.on("connect", () => {
      console.log("connected successsfully, chat", socketObj?.id);
    });
    chatList.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const sendMessage = async () => {
    if (messageInput.trim().length < 1) return;
    const newMessage = {
      sender: user.name,
      message: messageInput,
      id: Date.now(),
      receiverId: 1,
      senderId: user.id,
      time: Date().toString(),
      key: Date.now(),
    };
    const room = "";
    setChatMessages([...chatMessages, newMessage]);
    socket?.emit("send-message", newMessage, room);
    setMessageInput("");
  };

  useEffect(() => {
    chatList.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="bg-white dark:bg-dark h-screen">
      <div className="max-w-[60rem] flex flex-col justify-between pb-6 mx-auto h-full">
        <ChatHeader />
        <div className="overflow-y-scroll mt-[5rem]">
          {chatMessages.map((chatMessage) => {
            return (
              <ChatMessage
                currentUserId={user.id}
                id={chatMessage.id}
                message={chatMessage.message}
                receiverId={chatMessage.receiverId}
                senderId={chatMessage.senderId}
                time={chatMessage.time}
                key={chatMessage.id}
              />
            );
          })}
          <div className="my-auto" />
          <div ref={chatList} />
        </div>

        <div className="relative mt-4">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Write your message..."
            className="input w-full bg-lightTextInput dark:bg-darkTextInput text-offBlack dark:text-secondaryMessage"
            onKeyDown={(event) => {
              if (event.key == "Enter") sendMessage();
            }}
            required={true}
          />

          <TbSend
            size={IconsSizes.lg}
            className={`absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer duration-200 select-none transition ${
              messageInput.trim().length < 1
                ? "dark:bg-darkMessage bg-gray-500"
                : "bg-primaryMessage"
            }  rounded-full p-1 stroke-white`}
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}
