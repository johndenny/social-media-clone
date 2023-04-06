export const RemoveChatRequest = `
  mutation($chatId: String!, $date: String!) {
    removeChatRequest(chatId: $chatId, date: $date) {
      __typename
      id
    }
  }
`;
