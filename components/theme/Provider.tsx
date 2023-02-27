"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

interface IProvider {
  children: React.ReactNode;
}

const Provider = ({ children }: IProvider) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default Provider;
