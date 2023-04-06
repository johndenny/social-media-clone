export const NewMessage = `
  subscription($chatId: String!) {
    newMessage(chatId: $chatId) {
      __typename
      id
      chatId
      createdAt
      type
      text
      sticker
      post {
        text
        photos {
          id
          aspectRatio
        }
        postedBy {
          id
          photoVersion
          username
        }
      }
      photo {
        id
        aspectRatio
      }
      sentBy {
        __typename
        id
        photoVersion
        username
        fullName
      }
      readBy {
        id
        username
      }
      readAt
      isRead
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
      topReactions
    }
  }
`;
