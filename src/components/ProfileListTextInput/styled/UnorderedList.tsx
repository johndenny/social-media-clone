import styled from "styled-components";

interface Props {
  position: "top" | "bottom";
}

export const UnorderedList = styled.ul<Props>`
  ${(props) =>
    props.position === "top" && {
      top: "0",
      transform: "translateY(-100%)",
      borderRight: "1px solid rgb(var(--stroke))",
    }}
  ${(props) =>
    props.position === "bottom" && {
      bottom: "0",
      transform: "translateY(100%)",
    }}
  background-color: rgb(var(--secondary-background));
  display: flex;
  flex-direction: column;
  position: absolute;
  width: ${(props) => (props.position === "top" ? "300px" : "100%")};
  z-index: 2;
  max-height: 200px;
  overflow-y: auto;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.0975));
`;
