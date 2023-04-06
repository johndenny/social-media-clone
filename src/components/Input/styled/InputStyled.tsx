import styled from "styled-components";

export const InputStyled = styled.input`
  background: rgba(var(--b3f, 250, 250, 250), 1);
  border: 0;
  flex: 1 0 auto;
  margin: 0;
  outline: 0;
  overflow: hidden;
  padding: ${(props) => (props.value ? "9px 0 0 9px" : "4px 9px")};
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 30px;
`;
