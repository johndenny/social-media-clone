export const UnlikeMessage = `
  mutation($messageId: String!) {
    unlikeMessage(messageId: $messageId) {
      __typename
      id
      chatId
      likesCount
      isLiked
      reactionsPage(limit: 2, skip: 0) {
        __typename
        id
        reactions {
          __typename
          user {
            __typename
            id
            photoVersion
            username
            fullName
          }
        }
      }
    }
  }
`;
