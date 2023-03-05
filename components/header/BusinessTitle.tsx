"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BusinessTitle = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex-1 px-2 mx-2 text-lg pt-1 lg:pt-0">
      <Link href={"/messages"}>
        <Image
          src={`/images/logo-${currentTheme == "dark" ? "white" : "dark"}.png`}
          alt={"chatly"}
          width={70}
          height={40}
          className="duration-300 ease-in-out hover:scale-110"
        />
      </Link>
    </div>
  );
};

export default BusinessTitle;
