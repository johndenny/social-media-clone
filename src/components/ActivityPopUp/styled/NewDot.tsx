import styled from "styled-components";

interface Props {}

export const NewDot = styled.div<Props>`
  position: absolute;
  bottom: 4px;
  height: 4px;
  width: 4px;
  border-radius: 50%;
  background-color: rgb(var(--badge));
`;
