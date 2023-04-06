export const RemoveUserSearch = `
  mutation($userId: String!) {
    removeUserSearch(userId: $userId) {
      user {
        id
        photoVersion
        username
        fullName
      }
    }
  }
`;
