import styled from "styled-components";

interface Props {
  isFlipped?: boolean;
}

export const Container = styled.div<Props>`
  flex-direction: row;
  align-self: center;
  padding: 0 6px;
  justify-content: ${(props) => (props.isFlipped ? "flex-start" : "flex-end")};
`;
