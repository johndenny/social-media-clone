import styled from "styled-components";

interface Props {}

export const MessageCountContainer = styled.div<Props>`
  position: absolute;
  right: -8px;
  top: -6px;
  background-color: rgb(var(--badge));
  border-radius: 100px;
  font-size: 11px;
  height: 18px;
  min-width: 18px;
  align-items: center;
  justify-content: center;
  color: rgb(var(--primary-background));
  padding: 0 5px;
`;
