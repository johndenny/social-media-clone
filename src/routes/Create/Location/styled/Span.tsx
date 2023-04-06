import styled from "styled-components";

interface Props {}

export const Span = styled.span<Props>`
  text-overflow: ellipsis;
  line-height: 14px;
  overflow: hidden;
  max-width: 100%;
`;
