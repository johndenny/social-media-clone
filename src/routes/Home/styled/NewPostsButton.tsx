import styled, { keyframes } from "styled-components";

interface Props {
  isSlideUp: boolean;
}

const dropDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(175%)
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(175%);
  }
  to {
    transform: translateY(0);
  }
`;

export const NewPostsButton = styled.button<Props>`
  background-color: rgb(var(--primary-background));
  padding: 8px 16px;
  display: flex;
  border-radius: 22px;
  font-weight: 600;
  box-shadow: 0px 4px 16px 1px rgba(0, 0, 0, 0.15);
  /* border: 1px solid rgb(var(--highlight-background)); */
  z-index: 3;
  animation: ${(props) => (props.isSlideUp ? slideUp : dropDown)} 0.2s
    ease-in-out;
  animation-fill-mode: forwards;
`;
