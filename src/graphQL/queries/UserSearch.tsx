export const UserSearch = `
  query($filter: String!) {
    usersFilter(filter: $filter) {
      id
      photoVersion
      username
      fullName
    }
  }
`;
