import styled from "styled-components";

interface Props {
  height?: number;
}

export const Article = styled.article.attrs<Props>((props) => ({
  style: {
    height: `${props.height ? props.height : null}px`,
  },
}))<Props>`
  height: 100%;
  flex-direction: row;
  ${(props) =>
    !props.height && {
      border: "1px solid rgb(var(--stroke))",
      borderTopRightRadius: "8px",
      borderBottomRightRadius: "8px",
    }}

  overflow: hidden;
  justify-content: center;
`;
