/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const requestKaraoke = /* GraphQL */ `
  mutation RequestKaraoke(
    $name: String!
    $artists: [String!]!
    $duration: Float!
    $id: String!
  ) {
    requestKaraoke(
      name: $name
      artists: $artists
      duration: $duration
      id: $id
    ) {
      name
      artists
      duration
      id
      lyrics
      url
      __typename
    }
  }
`;
export const addKaraoke = /* GraphQL */ `
  mutation AddKaraoke(
    $name: String!
    $artists: [String!]!
    $duration: Float!
    $id: String!
    $lyrics: AWSJSON!
    $url: String!
  ) {
    addKaraoke(
      name: $name
      artists: $artists
      duration: $duration
      id: $id
      lyrics: $lyrics
      url: $url
    ) {
      name
      artists
      duration
      id
      lyrics
      url
      __typename
    }
  }
`;
