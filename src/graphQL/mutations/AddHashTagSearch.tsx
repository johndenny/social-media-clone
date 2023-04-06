export const AddHashTagSearch = `
  mutation($hashTagName: String!) {
    addHashTagSearch(hashTagName: $hashTagName) {
      hashTag {
        id
        name
        postCount
      }
    }
  }
`;
