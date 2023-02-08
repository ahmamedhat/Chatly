import { IconsSizes } from "@/lib/constants";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

export interface IHeader {
  appName: string;
}

const Header: React.FC<IHeader> = ({ appName }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    const { theme, setTheme, systemTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (!mounted) return null;

    {
      return currentTheme === "dark" ? (
        <MdOutlineLightMode
          size={IconsSizes.md}
          className="fill-white hover:fill-primaryMessage cursor-pointer"
          onClick={() => setTheme("light")}
        />
      ) : (
        <MdDarkMode
          size={IconsSizes.md}
          className="fill-black hover:fill-primaryMessage cursor-pointer"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white p-4">
      <div className="flex flex-row justify-between max-w-contained m-auto">
        <Link href={"/"}>
          <p className="font-bold text-lg">{appName}</p>
        </Link>
        <div className="flex flex-row space-x-4 items-center">
          <Link href={"/about"}>
            <p className="text-sm font-thin">ABOUT</p>
          </Link>

          {renderThemeChanger()}
        </div>
      </div>
    </div>
  );
};

export default Header;
