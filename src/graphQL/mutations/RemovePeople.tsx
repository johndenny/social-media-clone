export const RemovePeople = `
  mutation($memberId: String!, $chatId: String!) {
    removePeople(memberId: $memberId, chatId: $chatId) {
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
