import { OnlineUsers } from "@/components";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Messages() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-full">
      <OnlineUsers currentUser={session?.user} />
    </div>
  );
}
