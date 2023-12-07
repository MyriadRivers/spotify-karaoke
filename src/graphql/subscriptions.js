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
  subscription AddedKaraoke($id: String!) {
    addedKaraoke(id: $id) {
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
