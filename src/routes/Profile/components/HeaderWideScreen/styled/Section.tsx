import styled from "styled-components";

interface Props {}

export const Section = styled.section<Props>`
  flex-basis: 30px;
  flex-grow: 2;
  align-items: stretch;
  border: 0;
  box-sizing: border-box;
  color: rgb(var(--ig-primary-text));
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  min-width: 0;
  margin: 0;
  padding: 0;
  position: relative;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
`;
