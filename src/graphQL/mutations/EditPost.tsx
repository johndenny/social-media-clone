export const EditPost = `
  mutation($postId: String!, $photos: [PhotoEditType!]!, $text: String, $location: LocationType) {
    editPost(postId: $postId, photos: $photos, text: $text, location: $location) {
      __typename
      id
      createdAt
      text
      isEdited
      photos {
        __typename
        id
        tags {
          __typename
          id
          User {
            __typename
            id
            username
          }
          x
          y
        }
      }
      location {
        __typename
        id
        name
      }
    }
  }
`;
