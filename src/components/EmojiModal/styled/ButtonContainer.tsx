import styled from "styled-components";

interface Props {
  isChat: boolean;
}

export const ButtonContainer = styled.div<Props>`
  min-width: ${(props) => (props.isChat ? "28px" : null)};
  justify-content: center;
  align-items: center;
`;
