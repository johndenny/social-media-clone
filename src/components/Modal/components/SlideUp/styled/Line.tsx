import styled from "styled-components";

interface Props {}

export const Line = styled.div<Props>`
  height: 4px;
  border-radius: 2px;
  width: 48px;
  background-color: rgb(var(--stroke));
`;
