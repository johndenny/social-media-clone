import styled from "styled-components";

interface Props {}

export const VerticalLine = styled.div<Props>`
  height: 100%;
  width: 1px;
  background-color: rgb(var(--stroke));
`;
