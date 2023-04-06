import styled from "styled-components";

interface Props {
  isFlipped: boolean;
}

export const Container = styled.div<Props>`
  background-color: rgb(var(--primary-background));
  border-radius: 6px;
  z-index: 4;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.0975));
  position: fixed;
  ${(props) =>
    props.isFlipped
      ? {
          transform: "translateY(-105%) translateX(-26px)",
          marginBottom: "12px",
        }
      : {
          transform: "translateX(-26px)",
          marginTop: "12px",
        }}
`;
