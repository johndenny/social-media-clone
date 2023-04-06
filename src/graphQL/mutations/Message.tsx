export const Message = `
  mutation($chatId: String!, $postId: String, $sticker: String, $text: String, $messageId: String) {
    message(chatId: $chatId, postId: $postId, sticker: $sticker, text: $text, messageId: $messageId) {
      __typename
      id
      createdAt
      text
      chatId  
    }
  }
`;
