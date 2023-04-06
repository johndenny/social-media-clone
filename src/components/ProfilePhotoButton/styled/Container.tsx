import styled from "styled-components";

interface Props {
  height: string;
  margin?: string;
}

export const Container = styled.div<Props>`
  background-color: rgb(var(--secondary-background));
  border-radius: 50%;
  box-sizing: border-box;
  display: block;
  flex: 0 0 auto;
  overflow: hidden;
  position: relative;
  height: ${(props) => props.height};
  width: ${(props) => props.height};
  margin: ${(props) => props.margin};
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
