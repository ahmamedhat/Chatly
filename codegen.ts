import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["app/**/*.tsx", "lib/api/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./lib/api/gql/": {
      preset: "client",
    },
  },
};

export default config;
