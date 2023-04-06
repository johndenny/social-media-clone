import styled from "styled-components";

interface Props {
  isChat: boolean;
}

export const Button = styled.button<Props>`
  align-items: center;
  opacity: ${(props) => (props.isChat ? "0.5" : null)};
  :hover {
    opacity: ${(props) => (props.isChat ? "1" : null)};
  }
  :focus {
    opacity: ${(props) => (props.isChat ? "1" : null)};
  }
`;
