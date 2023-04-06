export const UniqueComment = `
  query($commentId: String!, $replyId: String!) {
    comment(commentId: $commentId) {
      uniqueReply(replyId: $replyId) {
        id
        commentId
        createdAt
        text
        isLiked
        likeCount
        postedBy {
          id
          photoVersion
          username
        }
      }
      id
      createdAt
      text
      isEdited
      isLiked
      counts {
        likes
        replies
      }
      postedBy {
        id
        photoVersion
        username
      }
      post {
        postedBy {
          id
        }
      }
    }
  }
`;
