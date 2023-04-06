import styled from "styled-components";

interface Props {
  isModal?: boolean;
  isMobile: boolean | null;
}

export const Container = styled.div<Props>`
  ${(props) =>
    !props.isMobile && {
      width: "calc(100% - 40px)",
      height: "100%",
      maxWidth: `${props.isModal ? null : "935px"}`,
      margin: `${props.isModal ? "auto" : "24px auto 0"}`,
      justifyContent: "center",
    }}
`;
