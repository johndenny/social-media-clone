import styled from "styled-components";

interface Props {}

export const PrivatePlaceholder = styled.div<Props>`
  border: 1px solid rgb(var(--stroke));
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  background-color: rgb(var(--primary-background));
  padding: 40px;
  text-align: center;
  gap: 16px;
`;
