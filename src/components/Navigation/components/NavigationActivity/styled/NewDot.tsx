import styled from "styled-components";

interface Props {}

export const NewDot = styled.div<Props>`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 150%);
  bottom: 0;
  height: 4px;
  width: 4px;
  border-radius: 50%;
  background-color: rgb(var(--badge));
`;
