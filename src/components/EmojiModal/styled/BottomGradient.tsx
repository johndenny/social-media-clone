import styled from "styled-components";

interface Props {}

export const BottomGradient = styled.div<Props>`
  align-items: stretch;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgb(var(--primary-background)) 100%
  );
  border-radius: 20px;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  font: inherit;
  font-size: 100%;
  height: 8px;
  left: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  vertical-align: baseline;
  width: 100%;
  border: 0;
`;
