export const ConfirmFollowRequest = `
  mutation($requestId: String!) {
    confirmFollowRequest(requestId: $requestId) {
      __typename
      id
      follower {
        __typename
        id
        photoVersion
        username
        fullName
        isFollowing
        isPrivate
        isRequested
      }
      following {
        __typename
        id
        username
        counts {
          follows
          followedBy
        }
      }
    }
  }
`;
