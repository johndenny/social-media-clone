import styled from "styled-components";

interface Props {}

export const Title = styled.h1<Props>`
  font-size: 24px;
  font-weight: 300;
  white-space: nowrap;
  min-width: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 28px;
`;
