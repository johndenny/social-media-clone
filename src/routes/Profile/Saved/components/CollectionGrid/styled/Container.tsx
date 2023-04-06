import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  padding: 0 16px;

  @media (max-width: 735px) {
    grid-template-columns: 1fr 1fr;
  }
`;
