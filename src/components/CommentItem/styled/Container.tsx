import styled from "styled-components";
import { OptionsContainer } from "./OptionsContainer";

interface Props {}

export const Container = styled.li<Props>`
  display: flex;
  gap: 16px;
  padding: 0 28px 0 0;
  @media (min-width: 735px) {
    padding: 0;
  }
  &:hover ${OptionsContainer} {
    display: flex;
  }
`;
