export const SharePost = `
  mutation($postId: String!, $text: String!, $ids: [String!]!) {
    sharePost(postId: $postId, text: $text, ids: $ids) {
      __typename
      id
      createdAt
      text
      chatId  
    }
  }
`;
