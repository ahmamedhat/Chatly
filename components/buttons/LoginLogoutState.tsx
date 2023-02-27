"use client";

import { useSession } from "next-auth/react";
import React from "react";

const LoginLogoutState = () => {
  const { data: session } = useSession();
  return (
    <p className="text-sm font-light">{`${
      session?.user ? "logout" : "login"
    }`}</p>
  );
};

export default LoginLogoutState;
