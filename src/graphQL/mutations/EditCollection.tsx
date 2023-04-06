export const EditCollection = `
  mutation($name: String!, $collectionId: String!) {
    editCollection(name: $name, collectionId: $collectionId) {
      __typename
      id
      name
      nameLink
    }
  }
`;
