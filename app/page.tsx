"use client";

import Google from "@/components/icons/Google";
import { IconsSizes } from "@/lib/constants";
import { RootState } from "@/lib/redux/store";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { signOut, useSession, signIn, getSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <div className="bg-white dark:bg-dark space-y-4 py-2 flex flex-col justify-center items-center h-screen">
      {session?.user ? (
        <>
          <p>Welcome Back</p>
          <p>{session?.user?.name}</p>
          <button
            onClick={() => signOut()}
            className="btn gap-2 bg-white dark:bg-dark text-black dark:text-secondaryMessage font-light hover:text-white"
          >
            <BiLogOut size={IconsSizes.md} className="fill-primaryMessage" />
            logout
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="btn gap-2 bg-white dark:bg-dark text-black dark:text-secondaryMessage font-light hover:text-white"
        >
          <Google width={IconsSizes.md} height={IconsSizes.md} />
          Sign in with Google
        </button>
      )}
    </div>
  );
}
