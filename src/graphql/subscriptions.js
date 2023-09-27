/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const requestedKaraoke = /* GraphQL */ `
  subscription RequestedKaraoke {
    requestedKaraoke {
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
export const addedKaraoke = /* GraphQL */ `
  subscription AddedKaraoke(
    $name: String!
    $artists: [String!]!
    $duration: Float!
    $id: String!
  ) {
    addedKaraoke(name: $name, artists: $artists, duration: $duration, id: $id) {
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
