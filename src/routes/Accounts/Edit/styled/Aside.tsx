import styled from "styled-components";

interface Props {}

export const Aside = styled.aside<Props>`
  box-sizing: border-box;
  color: rgb(var(--primary-text));
  flex: 0 0 194px;
  font-size: 16px;
  font-weight: 600;
  line-height: 18px;
  margin-top: 6px;

  @media (max-width: 735px) {
    flex-basis: 25px;
    padding: 0 20px;
  }

  @media (min-width: 736px) {
    padding-left: 32px;
    padding-right: 32px;
    text-align: right;
  }
`;
