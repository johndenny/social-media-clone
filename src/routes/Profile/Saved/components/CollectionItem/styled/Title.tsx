import styled from "styled-components";

interface Props {}

export const Title = styled.h2<Props>`
  color: rgb(var(--primary-text));
  font-weight: 600;
  padding-top: 8px;
  white-space: nowrap;
  min-width: 0;
  text-overflow: ellipsis;
  overflow: hidden;
`;
