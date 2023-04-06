export const RecentSearch = `
  query {
    recentSearch {
      __typename
      id
      hashTag {
        id
        name
        postCount
      }
      user {
        id
        photoVersion
        username
        fullName
      }
    }
  }
`;
