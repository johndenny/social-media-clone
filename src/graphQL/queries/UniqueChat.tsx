export const UniqueChat = `
  query($chatId: String!, $date: String!) {
    uniqueChat(chatId: $chatId, date: $date) {
      __typename
      id
      name
      admins {
        __typename
        id
        username
        fullName
      }
      isAdmin
      isRequest
      createdBy {
        __typename
        id
        username
        fullName
      }
      members {
        __typename
        id
        photoVersion
        username
        fullName
      }
    }
  }
`;
