export const ViewerChats = `
  query($limit: Int!, $skip: Int!, $date: String!) {
    viewerChatsPaged(limit: $limit, skip: $skip, date: $date) {
      __typename
      id
      isNextPage
      chats {
        __typename
        id
        name
        isAdmin
        members {
          __typename
          id
          photoVersion
          username
          fullName
        }
        lastestMessage {
          __typename
          id
          createdAt
          text
          sticker
          isRead
          post {
            __typename
            id
          }
          photo {
            __typename
            id
          }
          sentBy {
            __typename
            id
            username
          }
          like {
            reaction
            user {
              __typename
              id
              username
            }
            message {
              __typename
              id
              sentBy {
                __typename
                id
                username
              }
            }
          }
        }
      }
    }
  }
`;
