import styled from "styled-components";

interface MarginProps {
  margin?: string;
}

export const Margin = styled.div<MarginProps>`
  margin: ${(props) => (props.margin ? props.margin : null)};
`;
