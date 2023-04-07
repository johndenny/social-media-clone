export const VerifyReset = `
  mutation($userId: String!, $resetToken: String!) {
    verifyReset(userId: $userId, resetToken: $resetToken) {
      verified
    }
  }
`;
