import styled from "styled-components";

interface Props {
  border?: "top" | "bottom";
  isHomepage?: boolean;
}

export const List = styled.li<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => (props.isHomepage ? "8px 0" : "8px 16px")};
  flex: 1;
  ${(props) =>
    props.border === "top" && { borderTop: "1px solid rgb(var(--stroke))" }}
  ${(props) =>
    props.border === "bottom" && {
      borderBottom: "1px solid rgb(var(--stroke))",
    }}
`;
