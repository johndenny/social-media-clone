export const Comment = `
mutation($postId: String!, $text: String!) {
  comment(postId: $postId, text: $text) {
    post {
      id
      counts {
        commentsOnly
      }
    }
    id
    createdAt
    text
    isLiked
    isEdited
    counts {
      likes
      replies
    }
    postedBy {
      id
      photoVersion
      username
    }
  }
}
`;
