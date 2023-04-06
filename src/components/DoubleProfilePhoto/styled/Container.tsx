import styled from "styled-components";

interface Props {
  height: string;
  marginTop?: string;
}

export const Container = styled.div<Props>`
  margin-top: ${(props) => props.marginTop};
  height: ${(props) => props.height};
  width: ${(props) => props.height};
`;
