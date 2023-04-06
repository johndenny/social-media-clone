import styled from "styled-components";

interface Props {
  isFlipped: boolean;
}

export const Container = styled.div<Props>`
  ${(props) =>
    props.isFlipped && {
      transform: "translateY(100%)",
    }}
  width: 250px;
  min-height: 100px;
  background-color: rgb(var(--primary-background));
  position: absolute;
  bottom: 0;
  z-index: 12;
  border-radius: 6px;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
`;
