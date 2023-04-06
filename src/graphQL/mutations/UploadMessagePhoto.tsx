export const UploadMessagePhoto = `
  mutation($base64: String!, $aspectRatio: Float!, $chatId: String!) {
    uploadMessagePhoto(base64: $base64, aspectRatio: $aspectRatio, chatId: $chatId) {
      __typename
      id
      createdAt
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
    }
  }
`;
