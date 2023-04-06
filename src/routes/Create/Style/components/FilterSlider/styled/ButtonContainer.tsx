import styled from "styled-components";

interface Props {
  paddingLeft: number;
  paddingRight: number;
}

export const ButtonContainer = styled.div.attrs<Props>((props) => ({
  style: {
    paddingLeft: `${props.paddingLeft}px`,
    paddingRight: `${props.paddingRight}px`,
  },
}))<Props>`
  flex-direction: row;
  gap: 6px;
`;
