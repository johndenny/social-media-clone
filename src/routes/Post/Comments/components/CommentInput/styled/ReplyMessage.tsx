import styled from "styled-components";

interface Props {
  position: "top" | "bottom";
}

export const ReplyMessage = styled.div<Props>`
  width: 100%;
  ${(props) =>
    props.position === "top" && {
      postion: "relative",
      borderTop: "1px solid rgb(var(--highlight-background))",
      backgroundColor: "rgb(var(--secondary-background))",
    }}
  ${(props) =>
    props.position === "bottom" && {
      position: "absolute",
      bottom: "0",
      transform: "translateY(100%)",
      borderBottom: "1px solid rgb(var(--stroke))",
      backgroundColor: "rgb(var(--highlight-background))",
    }}
  justify-content: space-between;
  flex-direction: row;
  padding: 12px 16px;
  color: rgb(var(--secondary-text));
  z-index: 2;
`;
