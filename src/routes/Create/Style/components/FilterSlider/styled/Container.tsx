import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  width: auto;
  overflow: auto hidden;
  flex-direction: row;
  padding: 16px 0;
  user-select: none;

  &::before {
    content: " ";
    padding-left: 16px;
    width: 0;
  }

  &::after {
    content: " ";
    padding-right: 16px;
    width: 0;
  }
`;
