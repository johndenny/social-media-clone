import styled from "styled-components";

interface Props {}

export const Span = styled.span<Props>`
  max-width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;
