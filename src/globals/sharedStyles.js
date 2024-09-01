import styled from "styled-components";

export const BackgroundlessButton = styled.button`
  background: transparent;
  cursor: pointer;
  border: 0px;
  transition: 0.2s ease-in;

  :disabled {
    :active {
      transform: scale(1);
    }

    opacity: 0.6;
  }
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ${({ $gap }) => ($gap ? `${$gap}px` : `10px`)};
  width: 100%;
`;
