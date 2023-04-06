import styled from "styled-components";

interface Props {
  paddingBottom: number;
}

export const ImagePadding = styled.div.attrs<Props>((props) => ({
  style: {
    paddingBottom: `${props.paddingBottom}%`,
  },
}))<Props>``;
