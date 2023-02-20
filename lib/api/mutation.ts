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
