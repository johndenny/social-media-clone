import styled from "styled-components";

interface Props {}

export const MemberContainer = styled.div<Props>`
  flex-direction: row;
  padding: 8px 16px;
  align-items: center;
  gap: 16px;
  :hover {
    background-color: rgb(var(--secondary-background));
  }
`;
