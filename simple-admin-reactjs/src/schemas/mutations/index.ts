import { gql } from "@apollo/client";

export const SIGNUP = gql`
mutation signUp($username: String!, $password: String!, $email: String!) {
    signUp(
      input: {
        fields: {
          username: $username
          password: $password
          email: $email
        }
      }
    ) {
      viewer {
        sessionToken
        user {
          username
          email
        }
      }
    }
  }
`;

export const LOGIN = gql`
mutation logIn($username: String!, $password: String!) {
  logIn(input: { username: $username, password: $password }) {
    viewer {
      sessionToken
      user {
        id
        username
      }
    }
  }
}
`