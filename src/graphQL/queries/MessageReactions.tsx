export const MessageReactions = `
  query($messageId: String!, $limit: Int!, $skip: Int!) {
    uniqueMessage(messageId: $messageId) {
      __typename
      id
      reactionsPage(limit: $limit, skip: $skip) {
        __typename
        id
        isNextPage
        reactions {
          __typename
          reaction
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
