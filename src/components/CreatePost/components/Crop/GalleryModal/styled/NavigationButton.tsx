import styled from "styled-components";

interface Props {
  left?: boolean;
  right?: boolean;
  transparent?: boolean;
}

export const NavigationButton = styled.button<Props>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.left && 0};
  right: ${(props) => props.right && 0};
  opacity: ${(props) => props.transparent && 0.7};
`;
