/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSong = /* GraphQL */ `
  query GetSong(
    $name: String!
    $artists: [String!]!
    $duration: Float!
    $id: String!
  ) {
    getSong(name: $name, artists: $artists, duration: $duration, id: $id) {
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
