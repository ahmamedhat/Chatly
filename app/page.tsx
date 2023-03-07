import { AllChats, GoogleSignin, Logout } from "@/components";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Home() {
  let session;
  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    console.error("session error", e);
  }
  return (
    <div className="flex flex-col justify-center h-full items-center mt-12">
      {session ? (
        <div className="h-full w-full flex flex-col justify-start">
          <div className="flex justify-between mb-14 flex-col">
            <div className="w-full h-20 border border-t-0 border-b-[0.5px] border-gray-300 dark:border-gray-600 py-2 border-x-0 mb-2">
              <p>Hello {session?.user?.name} 👋🏻</p>
              <p className="font-thin text-xs text-gray-500 sm:text-sm dark:text-secondaryMessage">
                Online
              </p>
            </div>
          </div>
          <AllChats />
          <div className="h-4" />
          <Logout />
        </div>
      ) : (
        <GoogleSignin />
      )}
    </div>
  );
}
