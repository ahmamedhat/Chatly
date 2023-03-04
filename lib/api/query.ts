import { gql } from "@apollo/client";

export const GET_CHATS = gql`
  query Chats($userId: ID!) {
    chats(userId: $userId) {
      _id
      createdAt
      updatedAt
      users {
        name
      }
      messages {
        _id
        body
        from {
          name
          _id
        }
        to {
          name
          _id
        }
      }
    }
  }
`;

export const GET_CHAT = gql`
  query Chat($chatId: ID!) {
    chat(id: $chatId) {
      users {
        name
      }
      messages {
        _id
        body
        from {
          _id
        }
        to {
          _id
        }
        createdAt
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
