import { ChatsHistory, OnlineUsers } from "@/components";
import { GET_CHATS } from "@/lib/api/query";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import client from "@/lib/api/apollo";

export default async function Messages() {
  const session = await getServerSession(authOptions);
  const { data } = await client.query({
    query: GET_CHATS,
    variables: { userId: session.user.id },
    fetchPolicy: "no-cache",
  });
  return (
    <div className="h-full">
      <ChatsHistory currentUser={session?.user} chats={data.chats} />
      <OnlineUsers currentUser={session?.user} />
    </div>
  );
}
