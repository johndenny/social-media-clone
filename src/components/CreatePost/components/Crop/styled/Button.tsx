import styled from "styled-components";

interface Props {
  isOpen?: boolean;
  isOtherOpen?: boolean;
}

export const Button = styled.button<Props>`
  :hover {
    opacity: 0.7;
  }
  padding: 8px;
  margin: 8px;
  background-color: ${(props) =>
    props.isOpen ? "rgb(var(--primary-background))" : "rgba(26, 26, 26, 0.8)"};
  border-radius: 50%;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  opacity: ${(props) => (props.isOtherOpen ? "0.4" : null)};
  transition: all 0.2s ease-in-out;
`;
