import styled from "styled-components";

interface Props {}

export const Checkbox = styled.div<Props>`
  border: 1px solid rgb(var(--stroke));
  border-radius: 3px;
  display: inline-block;
  margin: 0 8px 0 3px;
  width: 16px;
  height: 16px;
`;
