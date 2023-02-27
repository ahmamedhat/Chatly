import { GoogleSignin, Logout } from "@/components";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Home() {
  const user = await getServerSession(authOptions);
  return (
    <div className="flex flex-col justify-center h-full items-center">
      {!user ? <GoogleSignin /> : <Logout />}
    </div>
  );
}
