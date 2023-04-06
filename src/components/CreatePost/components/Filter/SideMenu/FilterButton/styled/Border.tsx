import styled from "styled-components";

interface Props {
  isSelected: boolean;
}

export const Border = styled.div<Props>`
  border: 2px solid
    ${(props) =>
      props.isSelected ? "rgb(var(--primary-button))" : "transparent"};
  border-radius: 4px;
  :active {
    transform: scale(0.95);
  }
`;
