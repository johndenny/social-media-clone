import styled from "styled-components";
import { RangeNumber } from "./RangeNumber";

interface Props {}

export const RangeContainer = styled.div<Props>`
  height: 36px;
  flex-direction: row;
  align-items: center;
  :active ${RangeNumber} {
    font-weight: 600;
    color: rgb(var(--primary-text));
  }
`;
