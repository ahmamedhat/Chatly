import { useSession } from "next-auth/react";
import React from "react";
import GoogleSignin from "./GoogleSignin";
import Logout from "./Logout";

const Auth = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session !== undefined &&
        (session === null ? <GoogleSignin className="mt-4" /> : <Logout />)}
    </div>
  );
};

export default Auth;
