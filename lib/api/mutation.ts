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
