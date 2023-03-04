import { gql } from "@apollo/client";

export const CREATE_NEW_USER = gql`
  mutation CreateNewUser($name: String!, $email: String!) {
    createNewUser(name: $name, email: $email) {
      name
      _id
      email
    }
  }
`;

export const ADD_NEW_MESSAGE = gql`
  mutation AddNewMessage($from: ID!, $to: ID!, $body: String!) {
    addNewMessage(from: $from, to: $to, body: $body) {
      _id
      body
      createdAt
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
`;

export const MARK_MESSAGE_AS_READ = gql`
  mutation MarkAsRead($id: ID!) {
    markAsRead(id: $id) {
      read
    }
  }
`;
