import styled from "styled-components";

interface Props {
  height: number;
  transition: boolean;
}

export const ContentContainer = styled.div.attrs<Props>((props) => ({
  style: {
    height: `${props.height}px`,
    transition: `${props.transition ? "all 0.3s ease 0s" : null}`,
  },
}))<Props>`
  padding-top: 8px;
  overflow: auto;
`;
