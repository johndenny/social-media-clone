export const AddUserSearch = `
  mutation($userId: String!) {
    addUserSearch(userId: $userId) {
      user {
        id
        photoVersion
        username
        fullName
      }
    }
  }
`;
