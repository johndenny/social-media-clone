import styled from "styled-components";

interface Props {
  containerStyle?: "fill";
}

export const Container = styled.div<Props>`
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.containerStyle === "fill" && {
      height: "100%",
      width: "100%",
    }};
`;
