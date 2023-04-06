import styled from "styled-components";

interface Props {
  index: number;
}

export const Placeholder = styled.div<Props>`
  ${(props) =>
    props.index === 2 && {
      borderRight: "1px solid rgb(var(--stroke))",
      borderTop: "1px solid rgb(var(--stroke))",
    }}
  ${(props) =>
    props.index === 3 && {
      borderLeft: "1px solid rgb(var(--stroke))",
      borderTop: "1px solid rgb(var(--stroke))",
    }}
  background-color: rgb(var(--highlight-background));
`;
