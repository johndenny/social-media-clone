import styled from "styled-components";

interface Props {
  isSelected: boolean;
}

export const PostOptionButton = styled.button<Props>`
  ${(props) =>
    props.isSelected
      ? { fontWeight: "600" }
      : {
          borderBottom: "1px solid rgb(var(--stroke))",
        }}

  padding: 14px 16px;
  font-size: 16px;
  justify-content: space-between;
  align-items: center;
`;
