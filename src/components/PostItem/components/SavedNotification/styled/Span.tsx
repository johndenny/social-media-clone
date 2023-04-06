import styled from "styled-components";

interface Props {}

export const Span = styled.span<Props>`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;
