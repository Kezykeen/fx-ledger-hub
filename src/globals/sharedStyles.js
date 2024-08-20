import styled from "styled-components";

export const BackgroundlessButton = styled.button`
  background: transparent;
  cursor: pointer;
  border: 0px;
  transition: 0.2s ease-in-out;

  :active {
    transform: scale(1.05);
  }

  :disabled {
    :active {
      transform: scale(1);
    }

    opacity: 0.6;
  }
`;
