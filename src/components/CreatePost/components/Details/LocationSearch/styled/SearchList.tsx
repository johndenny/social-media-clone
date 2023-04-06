import styled from "styled-components";

interface Props {}

export const SearchList = styled.div<Props>`
  position: absolute;
  height: 200px;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgb(var(--primary-background));
  overflow: auto;
  transform: translateY(100%);
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.0975));
`;
