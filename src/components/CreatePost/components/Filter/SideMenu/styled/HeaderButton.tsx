import styled from "styled-components";

interface Props {
  isSelected: boolean;
}

export const HeaderButton = styled.button<Props>`
  padding: 16px 0;
  flex: 1;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--primary-text));
  border-bottom: 1px solid rgb(var(--primary-text));
  opacity: ${(props) => (props.isSelected ? 1 : 0.3)};
  transition: opacity 0.2s ease-in-out;
`;
