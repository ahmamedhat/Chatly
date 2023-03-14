import { ChatsHistory, OnlineUsers } from "@/components";
import { GET_CHATS } from "@/lib/api/query";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import client from "@/lib/api/apollo";
import clientPromise from "@/lib/api/mongodb";

export const metadata = {
  title: "Messages",
  description: "All your old messages and online users are shown here",
};

export const dynamic = "force-dynamic";

export default async function Messages() {
  let session;
  let chats;

  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    console.error("session error", e);
    throw new Error("error getting user session");
  }

  if (session?.user) {
    try {
      const response = await client.query({
        query: GET_CHATS,
        variables: { userId: session?.user?.id },
        fetchPolicy: "no-cache",
      });
      chats = response.data.chats;
    } catch (e) {
      throw new Error("error getting chats");
    }
  }
  return (
    <div className="h-full">
      <ChatsHistory currentUser={session?.user} chats={chats} />
      <OnlineUsers currentUser={session?.user} />
    </div>
  );
}
