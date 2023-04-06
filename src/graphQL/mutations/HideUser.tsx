export const HideUser = `
  mutation($id: String!) {
    hideUser(id: $id) {
      __typename
      userId
    }
  }
`;
