"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import React from "react";
import { DarkModeIcon, LightModeIcon } from "..";

const LightDarkSwitch = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const toggleTheme = () => {
    currentTheme === "dark" ? setTheme("light") : setTheme("dark");
  };
  return (
    <label className="swap swap-rotate select-none rounded-lg">
      <div
        onClick={toggleTheme}
        className={clsx({
          "swap-on": currentTheme === "light",
          "swap-off": currentTheme === "dark",
        })}
      >
        <DarkModeIcon />
      </div>
      <div
        onClick={toggleTheme}
        className={`${currentTheme === "dark" ? "swap-on" : "swap-off"}`}
      >
        <LightModeIcon />
      </div>
    </label>
  );
};

export default LightDarkSwitch;
