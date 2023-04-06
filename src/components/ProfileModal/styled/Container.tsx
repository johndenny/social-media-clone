import styled from "styled-components";

interface Props {}

export const Container = styled.div<Props>`
  border-radius: 12px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgb(var(--stroke));
  overflow: hidden;
  position: absolute;
  z-index: 150;
`;
