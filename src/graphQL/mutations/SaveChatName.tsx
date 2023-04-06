export const SaveChatName = `
  mutation($name: String!, $chatId: String!) {
    saveChatName(name: $name, chatId: $chatId) {
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
