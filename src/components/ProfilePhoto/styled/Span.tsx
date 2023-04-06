import styled from "styled-components";

interface SpanProps {
  height: string;
}

export const Span = styled.span<SpanProps>`
  background-color: rgb(250, 250, 250);
  border-radius: 50%;
  box-sizing: border-box;
  display: block;
  flex: 0 0 auto;
  overflow: hidden;
  position: relative;
  height: ${(props) => props.height};
  width: ${(props) => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    border: 1px solid rgba(32, 32, 32, 0.0975);
    border-radius: 50%;
    bottom: 0;
    content: "";
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
  }
`;
