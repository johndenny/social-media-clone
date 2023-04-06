import styled from "styled-components";

interface IBlackLinkContainer {
  isMobile: boolean | null;
}

export const BackLinkContainer = styled.div<IBlackLinkContainer>`
  height: 44px;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-justify-content: space-around;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  background-color: #fafafa;
  background-color: rgba(var(--b3f, 250, 250, 250), 1);
  border: ${(props) =>
    props.isMobile ? "1px solid rgba(var(--b38, 219, 219, 219), 1)" : "none"};
  border-top: 1px solid rgba(var(--b38, 219, 219, 219), 1);
  ${(props) => (props.isMobile ? "position: fixed; " : "position: absolute;")}
  bottom: 0;
  right: 0;
  left: 0;
`;
