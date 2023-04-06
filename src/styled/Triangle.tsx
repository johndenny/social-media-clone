import styled from "styled-components";

interface Props {
  isFlipped: boolean;
  color: string;
  height: number;
  left: string;
}

export const Triangle = styled.div<Props>`
  border-bottom: ${(props) =>
    props.isFlipped ? 0 : `${props.height}px solid ${props.color}`};
  border-top: ${(props) =>
    props.isFlipped ? `${props.height}px solid ${props.color}` : 0};
  border-left: ${(props) => props.height}px solid transparent;
  border-right: ${(props) => props.height}px solid transparent;

  top: ${(props) => (props.isFlipped ? "100%" : `-${props.height}px`)};
  margin-left: -${(props) => props.height}px;
  left: ${(props) => props.left};
  position: absolute;
`;
