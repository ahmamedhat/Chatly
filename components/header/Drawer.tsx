import { chatConfig } from "@/config/chat";
import { IconsSizes } from "@/lib/constants";
import { ChatConfig } from "@/types/typings";
import Link from "next/link";
import React from "react";
import { RiMenu4Fill } from "react-icons/ri";
import BusinessTitle from "./BusinessTitle";
import LightDarkSwitch from "./LightDarkSwitch";
import NavItem from "./NavItem";

interface IDrawer extends React.HTMLAttributes<HTMLDivElement> {}

const Drawer: React.FC<IDrawer> = ({ children }) => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col text-gray-600 dark:text-gray-400">
        <div className="w-full max-w-[60rem] mx-auto navbar bg-base-400 dark:bg-dark h-[8vh]">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <RiMenu4Fill size={IconsSizes.md} />
            </label>
          </div>
          <BusinessTitle />
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {chatConfig.map((navItem: ChatConfig) => {
                return (
                  <li className="rounded-lg" key={navItem.href}>
                    <Link
                      href={navItem.href}
                      as={`${navItem.href}`}
                      className="rounded-lg"
                    >
                      <p className="text-sm font-light">{navItem.title}</p>
                    </Link>
                  </li>
                );
              })}
              <li className="rounded-lg">
                <LightDarkSwitch />
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 h-[92vh] bg-white dark:bg-dark max-w-[60rem] w-[22rem] sm:w-[30rem] md:w-[35rem] mx-auto">
          {children}
        </div>
      </div>
      <div className="drawer-side text-gray-600 dark:text-gray-400 ">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 space-y-2 bg-gray-200 dark:bg-base-100">
          {chatConfig.map((navItem) => {
            return (
              <NavItem
                key={navItem.href}
                title={navItem.title}
                href={navItem.href}
              />
            );
          })}
          <li className="rounded-lg block">
            <LightDarkSwitch />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
