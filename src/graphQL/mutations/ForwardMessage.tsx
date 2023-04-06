export const ForwardMessage = `
  mutation($ids: [String!]!, $photoId: String, $postId: String, $text: String) {
    forwardMessage(photoId: $photoId, postId: $postId, text: $text ids: $ids) {
      __typename
      id
    }
  }
`;
