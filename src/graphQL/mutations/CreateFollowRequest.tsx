export const CreateFollowRequest = `
  mutation($receiveId: String!) {
    createFollowRequest(receiveId: $receiveId) {
      __typename
      userReceive {
        __typename
        id
        isRequested
      }
    }
  }
`;
