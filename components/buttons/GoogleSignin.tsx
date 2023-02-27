"use client";

import { IconsSizes } from "@/lib/constants";
import { signIn } from "next-auth/react";
import React, { useCallback, useState } from "react";
import Google from "../icons/Google";

interface IGoogleSigin extends React.HTMLAttributes<HTMLButtonElement> {}

const GoogleSignin: React.FC<IGoogleSigin> = ({ className, ...props }) => {
  const [loading, setLoading] = useState(false);

  const onSignin = useCallback(() => {
    setLoading(true);
    signIn("google");
  }, []);

  return (
    <button
      onClick={onSignin}
      className={`${className} normal-case btn gap-2 flex mx-auto bg-white dark:bg-dark text-black dark:text-secondaryMessage font-light hover:text-white ${
        loading && "loading"
      }`}
      {...props}
    >
      {!loading && <Google width={IconsSizes.md} height={IconsSizes.md} />}
      sign in with google
    </button>
  );
};

export default GoogleSignin;
