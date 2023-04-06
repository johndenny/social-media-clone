import styled from "styled-components";

interface Props {
  disabled: boolean;
}

export const MessageContainer = styled.div<Props>`
  padding: ${(props) => (props.disabled ? null : "8px 0 0")};
  max-height: ${(props) => (props.disabled ? "0" : "100%")};
  transition: max-height 0.2s, padding 0.2s;
  background-color: rgb(var(--primary-background));
`;
