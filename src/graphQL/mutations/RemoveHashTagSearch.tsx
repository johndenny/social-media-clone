export const RemoveHashTagSearch = `
  mutation($hashTagName: String!) {
    removeHashTagSearch(hashTagName: $hashTagName) {
      hashTag {
        id
        name
        postCount
      }
    }
  }
`;
