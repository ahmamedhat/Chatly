"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BusinessTitle = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex-1">
      <Link href={"/messages"}>
        <div className="px-2 mx-2 text-lg pt-1 lg:pt-0 h-[1.8rem] w-20 relative">
          <Image
            src={`/images/logo-${
              currentTheme == "dark" ? "white" : "dark"
            }.png`}
            alt={"chatly"}
            fill
            sizes="(max-width: 768px) 415px,
            (max-width: 1200px) 415px,
            415px"
            priority
            className="duration-300 ease-in-out hover:scale-110 object-contain"
          />
        </div>
      </Link>
    </div>
  );
};

export default BusinessTitle;
