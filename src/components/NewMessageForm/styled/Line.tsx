import styled from "styled-components";

interface Props {}

export const Line = styled.hr<Props>`
  background-color: rgb(var(--stroke));
  border: 0;
  height: 1px;
  width: 100%;
  margin: 0;
  z-index: 3;
`;
