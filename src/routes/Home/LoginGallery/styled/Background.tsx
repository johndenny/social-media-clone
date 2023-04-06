import styled from "styled-components";
import homePhones from "../../../../assets/images/homepage/home-phones.png";

export const Background = styled.div`
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  background-image: url(${homePhones});
  background-position: -46px 0;
  background-size: 468.32px 634.15px;
  -webkit-flex-basis: 380.32px;
  -ms-flex-preferred-size: 380.32px;
  flex-basis: 380.32px;
  height: 581.15px;
  margin-bottom: 12px;
  margin-right: 32px;
  @media (max-width: 875px) {
    display: none;
  }
`;
