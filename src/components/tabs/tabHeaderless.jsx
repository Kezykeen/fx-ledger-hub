import React from "react";
import { BackgroundlessButton } from "../../globals/sharedStyles";
import styled, { css } from "styled-components";

const TabHeaderless = ({ onClick, items, isActive }) => {
  return (
    <TabHeaderWrapper>
      {items.map((str, index) => (
        <Button
          isActive={isActive === str}
          onClick={() => onClick(str)}
          className={`${isActive === str && "active"}`}
          key={index}
        >
          {str}
        </Button>
      ))}
    </TabHeaderWrapper>
  );
};

export { TabHeaderless };

const TabHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Button = styled(BackgroundlessButton)`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  font-style: normal;
  transition: border ease-in-out 0.3s;
  padding: 9px 16px 9px 16px;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.Primary300 : theme.colors.gray700};
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.Primary25 : theme.colors.white};
  &:first-of-type {
    border-radius: 8px 0px 0px 8px !important;
  }
  &:last-of-type {
    border-radius: 0px 8px 8px 0px !important;
  }
  &:is(:not(:first-of-type)) {
    border-left: 1px solid transparent;
  }
  ${({ isActive, theme }) =>
    isActive &&
    css`
      border: 1px solid ${theme.colors.Primary300} !important;
    `}
  &:has(+ .active) {
    border-right: 1px solid transparent;
  }
`;
