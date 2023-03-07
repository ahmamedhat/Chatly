"use client";

import { IconsSizes } from "@/lib/constants";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const onSignout = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (e) {
      console.log("error sign out", e);
      setLoading(false);
    }
  };
  return (
    <button
      onClick={onSignout}
      className={clsx(
        "normal-case btn gap-2 flex mx-auto bg-white dark:bg-dark text-black dark:text-secondaryMessage font-light hover:bg-white md:hover:bg-black md:hover:text-white",
        { loading }
      )}
    >
      {!loading && (
        <BiLogOut size={IconsSizes.md} className="fill-primaryMessage" />
      )}
      Logout
    </button>
  );
};

export default Logout;
