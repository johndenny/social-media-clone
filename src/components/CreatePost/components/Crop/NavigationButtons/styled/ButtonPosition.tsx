import styled from "styled-components";

interface Props {
  left?: boolean;
  right?: boolean;
}

export const ButtonPosition = styled.div<Props>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) =>
    props.left && {
      left: "0",
    }}
  ${(props) =>
    props.right && {
      right: "0",
    }}
`;
