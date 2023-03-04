import React from "react";
import { ChatHeader, ChatMain } from "@/components";
import client from "@/lib/api/apollo";
import { GET_CHAT } from "@/lib/api/query";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Chat({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await getServerSession(authOptions);
  let chat;

  if (searchParams?.chatID) {
    try {
      const response = await client.query({
        query: GET_CHAT,
        variables: { chatId: searchParams?.chatID },
        fetchPolicy: "no-cache",
      });
      chat = response.data.chat;
    } catch (e) {
      console.log("error is", e);
    }
  }

  return (
    <div className="bg-white dark:bg-dark h-full absolute inset-0">
      <div className="max-w-[60rem] flex flex-col justify-between pb-6 mx-auto h-full ">
        <ChatHeader userName={searchParams?.username ?? "online user"} />
        <ChatMain
          currentUser={session.user}
          onlineUserID={searchParams?.userID as string}
          chat={chat}
        />
      </div>
    </div>
  );
}
