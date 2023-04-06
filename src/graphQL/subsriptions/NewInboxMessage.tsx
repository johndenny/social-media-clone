export const NewInboxMessage = `
  subscription {
    newInboxMessage {
      __typename
      id
      name
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
        sentBy {
          __typename
          id
          username
        }
        post {
          id
        }
        photo {
          id
        }
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
        isRead
        like {
          reaction
          user {
            username
          }
          message {
            sentBy {
              username
            }
          }
        }
      }
    }
  }
`;
