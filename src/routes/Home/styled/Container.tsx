import styled from "styled-components";

interface IContainer {
  isMobile?: boolean | null;
}

export const Container = styled.div<IContainer>`
  color: #262626;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  flex-grow: 1;
  justify-content: center;
  margin-top: 12px;
  max-width: 350px;
`;
