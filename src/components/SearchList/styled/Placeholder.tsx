import styled from "styled-components";

interface Props {}

export const Placeholder = styled.div<Props>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  color: rgb(var(--secondary-text));
  font-weight: 600;
`;
