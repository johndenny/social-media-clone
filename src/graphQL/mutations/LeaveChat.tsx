export const LeaveChat = `
  mutation($chatId: String!) {
    leaveChat(chatId: $chatId) {
      __typename
      id
    }
  }
`;
