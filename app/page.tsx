import { GoogleSignin, Logout } from "@/components";
import { IconsSizes } from "@/lib/constants";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";
import Link from "next/link";
import { AiOutlineMessage } from "react-icons/ai";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col justify-center h-full items-center">
      {session ? (
        <div className="h-full w-full flex flex-col justify-start">
          <div className="flex justify-between mb-14">
            <div>
              <p>Hello {session?.user?.name} 👋🏻</p>
              <p className="font-thin text-xs text-secondaryMessage">Online</p>
            </div>
            <Link href={"/messages"}>
              <AiOutlineMessage
                size={IconsSizes.md}
                className="stroke-gray-600 dark:stroke-gray-400"
              />
            </Link>
          </div>
          <Logout />
        </div>
      ) : (
        <GoogleSignin />
      )}
    </div>
  );
}
