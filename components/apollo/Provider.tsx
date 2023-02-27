"use client";

import React from "react";
import client from "@/lib/api/apollo";
import { ApolloProvider } from "@apollo/client";

interface IProvider {
  children: React.ReactNode;
}

const Provider = ({ children }: IProvider) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
