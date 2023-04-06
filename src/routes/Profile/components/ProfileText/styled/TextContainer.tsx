import styled from "styled-components";

interface Props {}

export const TextContainer = styled.div<Props>`
  flex: 1;
  overflow: hidden;
  padding: 0 16px 21px;
  text-overflow: ellipsis;
  background-color: rgb(var(--primary-background));
  @media (min-width: 736px) {
    background-color: transparent;
    padding: 0;
    font-size: 16px;
    line-height: 24px;
  }
`;
