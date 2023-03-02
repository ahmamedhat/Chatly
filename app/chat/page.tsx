import { ChatHeader, ChatMain } from "@/components";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Chat({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-white dark:bg-dark h-full absolute inset-0">
      <div className="max-w-[60rem] flex flex-col justify-between pb-6 mx-auto h-full ">
        <ChatHeader userName={searchParams?.username ?? "online user"} />
        <ChatMain
          currentUser={session.user}
          onlineUserID={searchParams?.userID as string}
        />
      </div>
    </div>
  );
}
