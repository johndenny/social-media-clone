export const TagSearch = `
  query($filter: String!) {
    tagFilter(filter: $filter) {
      name
      postCount
    }
  }
`;
