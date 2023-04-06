import styled from "styled-components";

interface Props {
  selected: boolean;
}

export const ChatCardContainer = styled.div<Props>`
  flex-direction: row;
  padding: 8px 16px;
  gap: 12px;
  background-color: ${(props) =>
    props.selected ? "rgb(var(--highlight-background))" : null};
  :hover {
    background-color: ${(props) =>
      props.selected ? null : "rgb(var(--secondary-background))"};
  }
  :active {
    opacity: 0.7;
  }
`;
