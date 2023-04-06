export const HashTag = `
query($name: String!, $limit: Int!, $skip: Int!) {
  hashTag(name: $name) {
    id
    name
    postCount
    pagedPosts(limit: $limit, skip: $skip) {
      __typename
      id 
      isNextPage
      posts {
        id
        text
        counts {
          likes
          comments
        }
        photos {
          __typename
          id
          aspectRatio
        }
      }      
    }
  }
}
`;
