import styled from "styled-components";

interface Props {}

export const InputContainer = styled.div<Props>`
  flex-direction: row;
  min-height: 44px;
  align-items: center;
  padding: 8px 12px 8px 22px;
  border: 1px solid rgb(var(--stroke));
  border-radius: 22px;
`;
