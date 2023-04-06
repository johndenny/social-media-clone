import styled from "styled-components";

interface Props {
  isSecondary?: boolean;
}

export const BackDrop = styled.div<Props>`
  align-items: center;
  justify-content: space-around;
  background-color: var(--modal-backdrop);
  bottom: 0;
  flex-direction: column;
  left: 0;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${(props) => (props.isSecondary ? 50 : 100)};
  overflow: hidden;
`;
