export const AdminToggle = `
  mutation($memberId: String!, $chatId: String!) {
    adminToggle(memberId: $memberId, chatId: $chatId) {
      __typename
      id
      name
      admins
      members {
        __typename
        id
        photoVersion
        username
        fullName
      }
    }
  }
`;
