import styled from "styled-components";
import { Button } from "../../../styled";

interface Props {
  fetching: boolean;
}

export const UploadButton = styled(Button)<Props>`
  opacity: ${(props) => (props.fetching ? 0.5 : 1)};
`;
