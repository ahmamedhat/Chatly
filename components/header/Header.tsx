import { IconsSizes } from "@/lib/constants";
import { useTheme } from "next-themes";
import React from "react";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";

export interface IHeader {
  appName: string;
}

const Header: React.FC<IHeader> = ({ appName }) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  console.log("current", currentTheme);

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white p-4">
      <div className="flex flex-row justify-between max-w-contained m-auto">
        <p className="font-bold cursor-pointer">{appName}</p>
        {currentTheme === "dark" ? (
          <MdOutlineLightMode
            size={IconsSizes.md}
            className="fill-white hover:fill-primaryMessage cursor-pointer"
            onClick={() => setTheme("light")}
          />
        ) : (
          <MdOutlineNightlight
            size={IconsSizes.md}
            className="fill-black hover:fill-primaryMessage cursor-pointer"
            onClick={() => setTheme("dark")}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
