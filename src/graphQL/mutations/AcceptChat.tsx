export const AcceptChat = `
  mutation($chatId: String!, $date: String!) {
    acceptChat(chatId: $chatId, date: $date) {
      __typename
      id
    }
  }
`;
