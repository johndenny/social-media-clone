import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 16px;
  button {
    margin-top: 8px;
  }
`;
