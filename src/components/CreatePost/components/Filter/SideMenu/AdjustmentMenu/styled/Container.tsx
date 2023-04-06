import styled from "styled-components";
import { ResetButton } from "./ResetButton";

interface Props {
  isZero: boolean;
}

export const Container = styled.div<Props>`
  padding: 0 16px;
  :hover ${ResetButton} {
    display: ${(props) => (props.isZero ? "none" : "flex")};
  }
`;
