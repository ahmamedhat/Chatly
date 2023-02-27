"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

interface ISession extends React.HTMLAttributes<HTMLDivElement> {}

const Session: React.FC<ISession> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Session;
