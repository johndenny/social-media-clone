export const AllMessageDates = `
  query($chatId: String!, $limit: Int!, $skip: Int!, $date: String!) {
    chatPagedMessages(chatId: $chatId, limit: $limit, skip: $skip, date: $date) {
      __typename
      id
      messages {
        __typename
        id
        createdAt
      }
    }
  }
`;
