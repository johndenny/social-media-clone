export const VerifyReset = `
  mutation($userId: Int!, $resetToken: String!) {
    verifyReset(userId: $userId, resetToken: $resetToken) {
      verified
    }
  }
`;
