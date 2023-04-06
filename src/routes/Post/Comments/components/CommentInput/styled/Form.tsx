import styled from "styled-components";

interface Props {
  isWide: boolean | undefined;
}

export const Form = styled.form<Props>`
  display: flex;
  align-items: center;
  flex: 1;
  ${(props) =>
    !props.isWide && {
      backgroundColor: "rgb(var(--primary-background))",
      border: "1px solid rgb(var(--stroke))",
      borderRadius: "30px",
      padding: "12px 16px",
      position: "relative",
      overflow: "hidden",
    }};
`;
