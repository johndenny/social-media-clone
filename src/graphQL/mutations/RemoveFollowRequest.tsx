export const RemoveFollowRequest = `
  mutation($receiveId: String!, $requestId: String!) {
    removeFollowRequest(receiveId: $receiveId, requestId: $requestId) {
      __typename
      userReceive {
        __typename
        id
        isRequested
      }
    }
  }
`;
