import styled from "styled-components";

export const TextHeader = styled.h1`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 300;
  font-size: 28px;
  line-height: 32px;

  @media (min-width: 736px) {
    margin-right: 18px;
  }
`;
