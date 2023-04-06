import styled from "styled-components";

interface Props {
  isViewer: boolean;
}

export const Container = styled.div<Props>`
  :hover {
    ${(props) =>
      props.isViewer && {
        backgroundColor: "rgb(var(--highlight-background))",
        cursor: "pointer",
      }}
  }
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
`;
