export const Search = `
  query($filter: String!) {
    search(filter: $filter) {
      id
      hashTag {
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
