import styled from "styled-components";

interface Props {
  isHidden: boolean;
}

export const LeftButton = styled.div<Props>`
  display: flex;
  flex-basis: 32px;
  flex-direction: row;
  display: ${(props) => (props.isHidden ? "none" : null)};
`;
