import styled from "styled-components";
import { SectionTitle } from "./SectionTitle";

interface Props {}

export const ListItem = styled.li<Props>`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  &&:first-child ${SectionTitle} {
    border-top: none;
  }
`;
