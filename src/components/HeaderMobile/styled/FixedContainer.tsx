import styled from "styled-components";

interface Props {
  search?: boolean;
  isWide?: boolean | null;
  isWideChat?: boolean;
}

export const FixedContainer = styled.div<Props>`
  background-color: #fff;
  background-color: rgba(
    var(
      ${(props) =>
        props.search ? "--secondary-background" : "--primary-background"}
    ),
    1
  );
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 16px;
  font-weight: 600;
  left: 0;
  position: ${(props) => (props.isWide ? "relative" : "fixed")};
  flex: ${(props) => (props.isWideChat ? "1" : null)};
  right: 0;
  top: 0;
  z-index: 4;

  &::before {
    background-color: #dbdbdb;
    background-color: rgba(var(--b6a, 219, 219, 219), 1);
    bottom: -1px;
    content: "";
    height: ${(props) => (props.isWideChat ? "0" : "1px")};
    left: 0;
    position: absolute;
    right: 0;
  }
`;
