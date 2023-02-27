"use client";

import { IconsSizes } from "@/lib/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { RiMenu4Fill } from "react-icons/ri";
import LoginLogoutState from "../buttons/LoginLogoutState";
import LightDarkSwitch from "./LightDarkSwitch";

interface IDrawer extends React.HTMLAttributes<HTMLDivElement> {}

const Drawer: React.FC<IDrawer> = ({ children }) => {
  const router = useRouter();

  const onLinkPressed = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col text-gray-600 dark:text-gray-400">
        <div className="w-full navbar bg-base-400 dark:bg-dark">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <RiMenu4Fill size={IconsSizes.md} />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 cursor-default text-lg">Chatly</div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              <li className="rounded-lg">
                <Link href={"/messages"} className="rounded-lg">
                  <p className="text-sm font-light">messages</p>
                </Link>
              </li>
              <li className="rounded-lg">
                <Link href={"/about"} className="rounded-lg">
                  <p className="text-sm font-light">about</p>
                </Link>
              </li>
              <li className="rounded-lg">
                <Link href={"/"} className="rounded-lg">
                  <LoginLogoutState />
                </Link>
              </li>
              <li className="rounded-lg">
                <LightDarkSwitch />
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4">{children}</div>
      </div>
      <div className="drawer-side text-gray-600 dark:text-gray-400 ">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 space-y-2 bg-gray-200 dark:bg-base-100">
          <li>
            <label
              htmlFor="my-drawer-3"
              onClick={() => onLinkPressed("/messages")}
              className="text-sm font-light"
            >
              messages
            </label>
          </li>
          <li>
            <label
              htmlFor="my-drawer-3"
              onClick={() => onLinkPressed("/about")}
              className="text-sm font-light"
            >
              about
            </label>
          </li>
          <li>
            <label
              htmlFor="my-drawer-3"
              onClick={() => onLinkPressed("/")}
              className="text-sm font-light"
            >
              <LoginLogoutState />
            </label>
          </li>
          <li className="rounded-lg block">
            <LightDarkSwitch />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
