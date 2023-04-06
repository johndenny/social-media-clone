import styled from "styled-components";

interface Props {
  isWide: boolean;
}

export const Header = styled.header<Props>`
  margin: 0 ${(props) => (props.isWide ? 24 : 20)}px;
  flex-direction: row;
  justify-content: space-between;
`;
