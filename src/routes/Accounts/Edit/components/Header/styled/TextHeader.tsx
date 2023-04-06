import styled from "styled-components";

interface Props {}

export const TextHeader = styled.h1<Props>`
  font-size: 20px;
  font-weight: normal;
  line-height: 22px;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
