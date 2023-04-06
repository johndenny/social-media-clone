export const LikeMessage = `
  mutation($messageId: String!, $reaction: String!) {
    likeMessage(messageId: $messageId, reaction: $reaction) {
      __typename
      id
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
