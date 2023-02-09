"use client";

import { ChatMessage } from "@/components";
import { ChatMessages, IconsSizes } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TbSend } from "react-icons/tb";

export default function Chat() {
  const query = useSearchParams().get("chatId");
  console.log("query is", query);
  const user = {
    id: 2,
  };

  const sendMessage = () => {
    console.log("message sent!");
  };
  return (
    <div className="bg-white dark:bg-dark flex flex-col justify-between h-[92vh] pb-6">
      <div className="overflow-y-scroll">
        {ChatMessages.map((chatMessage) => {
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
      </div>

      <div className="relative mt-4">
        <input
          type="text"
          placeholder="Write your message..."
          className="input w-full bg-lightTextInput dark:bg-darkTextInput"
          required={true}
        />

        <TbSend
          size={IconsSizes.lg}
          className="absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer select-none bg-primaryMessage rounded-full p-1 stroke-white "
          onClick={sendMessage}
        />
      </div>
    </div>
  );
}
