export const UnreadMessageCount = `
  subscription {
    unreadMessageCount {
      __typename
      id
      unreadCount
      chatRequestsCount
    }
  }
`;
