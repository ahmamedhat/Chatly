"use client";

import { ChatConfig } from "@/types/typings";
import { useRouter } from "next/navigation";
import React from "react";

const NavItem = ({ href, title }: ChatConfig) => {
  const router = useRouter();

  const onLinkPressed = (pathname: string) => {
    router.push(pathname);
  };
  return (
    <li>
      <label
        htmlFor="my-drawer-3"
        onClick={() => onLinkPressed(href)}
        className="text-sm font-light"
      >
        {title}
      </label>
    </li>
  );
};

export default NavItem;
