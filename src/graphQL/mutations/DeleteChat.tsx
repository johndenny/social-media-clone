export const DeleteChat = `
  mutation($chatId: String!) {
    deleteChat(chatId: $chatId) {
      __typename
      id
    }
  }
`;
