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

export const GET_USERS = gql`
  query Query {
    users {
      name
      _id
      email
    }
  }
`;

export const GET_USER = gql`
  query User($email: String!) {
    user(email: $email) {
      _id
      name
      email
      chats {
        _id
        name
      }
    }
  }
`;
