import React from "react";
import styled from "styled-components";

export const ValidationText = ({ message }) => {
  return (
    <ValidTextWrapper>
      <Text>{message}</Text>
    </ValidTextWrapper>
  );
};

const ValidTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-style: normal;
  font-weight: 450;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.red400};
`;
