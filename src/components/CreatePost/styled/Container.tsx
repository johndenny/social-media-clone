import styled from "styled-components";
import { modalShow } from "../../Modal/styled";

interface Props {}

export const Container = styled.div<Props>`
  overflow: hidden;
  border-radius: 12px;
  background-color: rgb(var(--primary-background));
  animation: ${modalShow} 0.18s ease-out;
  transition: all 0.2s ease-in-out;
`;
