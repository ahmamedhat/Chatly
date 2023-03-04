import { ApolloClient, InMemoryCache } from "@apollo/client";

const apiURL = ((process.env.NEXT_PUBLIC_API_URL as string) +
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) as string;

const client = new ApolloClient({
  uri: apiURL,
  cache: new InMemoryCache(),
});

export default client;
