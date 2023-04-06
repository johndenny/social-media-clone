import styled from "styled-components";

interface Props {}

export const Article = styled.article<Props>`
  flex: 1 1 400px;
  @media (min-width: 735px) {
    padding: 0 60px 0 0;
  }
`;
