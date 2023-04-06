import styled from "styled-components";

interface Props {
  width: string;
  height: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

export const Line = styled.div<Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  position: absolute;
`;
