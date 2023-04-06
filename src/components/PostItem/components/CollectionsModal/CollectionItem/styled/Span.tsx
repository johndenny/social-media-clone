import styled from "styled-components";

interface Props {}

export const Span = styled.span<Props>`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
