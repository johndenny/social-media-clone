import styled from "styled-components";
import { UnorderedList } from "../../ProfileListTextInput/styled";

interface Props {}

export const List = styled.li<Props>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 8px 16px;
  flex: 1;
  border-bottom: 1px solid rgb(var(--stroke));
`;
