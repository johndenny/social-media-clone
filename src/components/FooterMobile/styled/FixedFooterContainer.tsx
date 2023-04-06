import styled from "styled-components";
import { FixedContainer } from "../../HeaderMobile/styled";

export const FixedFooterContainer = styled(FixedContainer)`
  bottom: 0;
  top: auto;
  &::before {
    top: -1px;
  }
`;
