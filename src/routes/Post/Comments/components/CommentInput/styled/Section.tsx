import styled from "styled-components";

interface Props {
  isWide: boolean | undefined;
}

export const Section = styled.section<Props>`
  ${(props) =>
    props.isWide
      ? {
          padding: "6px 0",
          borderTop: "1px solid rgb(var(--highlight-background))",
          flexDirection: "row",
        }
      : {
          padding: "8px 16px",
          gap: "16px",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "rgb(var(--highlight-background))",
          borderBottom: "1px solid rgb(var(--stroke))",
        }}
`;
