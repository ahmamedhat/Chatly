import { IconsSizes } from "@/lib/constants";
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
      className={`btn gap-2 bg-white dark:bg-dark text-black dark:text-secondaryMessage font-light hover:text-white mt-10 mx-auto flex ${
        loading && "loading"
      }`}
    >
      {!loading && (
        <BiLogOut size={IconsSizes.md} className="fill-primaryMessage" />
      )}
      Logout
    </button>
  );
};

export default Logout;
