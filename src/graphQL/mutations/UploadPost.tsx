export const UploadPost = `
  mutation($photoData: [PhotoInputType!]!, $location: LocationType, $text: String) {
    uploadPhotoPost(photoData: $photoData, location: $location, text: $text) {
      __typename
      id
      createdAt
      text
      isEdited
      isLiked
      isSaved
      counts {
        comments
        likes
      }
      postedBy {
        __typename
        id
        photoVersion
        username
      }
      photos {
        id
        aspectRatio
        tags {
          id
          x
          y
          User {
            id
            username
          }
        }
      }
      featuredComments {
        id
        text
        postedBy {
          id
          username
        }
        isLiked
      }
    }
  }
`;
