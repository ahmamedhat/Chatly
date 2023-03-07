import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Contact() {
  let session;
  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    console.error("session error", e);
    throw new Error("error getting user session contact");
  }
  return (
    <div className="flex flex-col justify-center h-full items-center">
      Contact
    </div>
  );
}
