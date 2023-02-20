import { gql } from "@apollo/client";

export const GET_CHATS = gql`
  query Query {
    chats {
      name
      _id
      users {
        _id
      }
    }
  }
`;
