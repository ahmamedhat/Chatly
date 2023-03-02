import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Contact() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col justify-center h-full items-center">
      Contact
    </div>
  );
}
