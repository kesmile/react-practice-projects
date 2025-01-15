import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
query getClients {
  clients{
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    },
    count
    edges {
      cursor
      node {
        id
        name
        address
      }
    }
  }
}
`;