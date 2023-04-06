import styled from "styled-components";

interface Props {
  left?: boolean;
}

export const Spacer = styled.div<Props>`
  flex-basis: 32px;
  aspect-ratio: 1;
  align-items: ${(props) => (props.left ? "flex-start" : "flex-end")};
  justify-content: center;
`;
