export const DeleteMessage = `
  mutation($messageId: String!) {
    deleteMessage(messageId: $messageId) {
      __typename
      id
    }
  }
`;
