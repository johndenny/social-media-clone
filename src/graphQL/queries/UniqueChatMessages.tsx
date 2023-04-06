export const UniqueChatMessages = `
  query($chatId: String!, $limit: Int!, $skip: Int!, $date: String!) {
    chatPagedMessages(chatId: $chatId, limit: $limit, skip: $skip, date: $date) {
      __typename
      id
      isNextPage
      messages {
        __typename
        id
        chatId
        createdAt
        type
        text
        sticker
        user {
          __typename
          id
          username
          fullName
        }
        post {
          __typename
          id
          text
          photos {
            __typename
            id
            aspectRatio
          }
          postedBy {
            __typename
            id
            photoVersion
            username
          }
        }
        photo {
          __typename
          id
          aspectRatio
        }
        message {
          __typename
          id
          text
          type
          sticker
          post {
            text
            photos {
              __typename
              id
              aspectRatio
            }
            postedBy {
              __typename
              id
              photoVersion
              username
            }
          }
          photo {
            __typename
            id
            aspectRatio
          }
          sentBy {
            __typename
            id
            username
            fullName
          }
        }
        sentBy {
          __typename
          id
          photoVersion
          username
          fullName
        }
        readBy {
          __typename
          id
          username
        }
        readAt
        isRead
        likesCount
        isLiked
        topReactions
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
  }
`;
