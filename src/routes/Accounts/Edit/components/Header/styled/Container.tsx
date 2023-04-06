import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  margin: 20px 0 0;
  flex-direction: row;
  justify-content: flex-start;
  @media (min-width: 735px) {
    margin: 30px 0 0;
  }
`;
