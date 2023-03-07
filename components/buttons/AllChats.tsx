"use client";
import React, { useState } from "react";
import { IconsSizes } from "@/lib/constants";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { BsFillChatTextFill } from "react-icons/bs";

const AllChats = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const goToChats = async () => {
    setLoading(true);
    router.push("/messages");
  };
  return (
    <button
      onClick={goToChats}
      className={clsx(
        "normal-case btn gap-2 flex mx-auto bg-white dark:bg-dark text-black dark:text-secondaryMessage font-light hover:bg-white hover:text-black md:hover:bg-black md:hover:text-white",
        { loading }
      )}
    >
      {!loading && (
        <BsFillChatTextFill
          size={IconsSizes.md}
          className="fill-primaryMessage"
        />
      )}
      View all chats
    </button>
  );
};
export default AllChats;
