import styled from "styled-components";

interface Props {
  isWide: boolean;
}

export const TextContainer = styled.div<Props>`
  margin-bottom: ${(props) => (props.isWide ? 24 : 16)}px;
  text-align: center;
`;
