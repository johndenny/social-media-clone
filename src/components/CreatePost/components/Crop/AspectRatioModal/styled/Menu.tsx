import styled from "styled-components";

interface Props {
  row?: boolean;
}

export const Menu = styled.div<Props>`
  background-color: rgba(26, 26, 26, 0.8);
  border-radius: 8px;
  z-index: 3;
  flex-direction: ${(props) => (props.row ? "row" : null)};
`;
