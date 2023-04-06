export const ViewerFollowRequests = `
  query($limit: Int!, $skip: Int!) {
    followRequests(limit: $limit, skip: $skip) {
      __typename
      id
      isNextPage
      profiles {
        __typename
        id
        photoVersion
        username
        fullName
      }
    }
  }
`;
