import styled from "styled-components";
import { UserListI } from "../../../types";

interface Props {
  profiles: UserListI[] | undefined;
}

export const Title = styled.h1<Props>`
  align-items: center;
  color: #262626;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  display: flex;
  flex: 1;
  gap: 12px;
  justify-content: ${(props) => (props.profiles ? "flex-start" : "center")};
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
