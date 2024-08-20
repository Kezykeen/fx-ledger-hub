import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatCurrency } from "../../../../../utils/helpers.utils";
import { ArrowCircleIcon } from "../../../../../assets/svgs";

const TransactionAnalyticsCard = ({
  bgColor,
  icon,
  title,
  amount,
  link,
  scale = true,
}) => {
  return (
    <TransactionAnalyticsCardWrapper bg={bgColor}>
      {icon && <Icon scale={scale}>{icon}</Icon>}
      <Text>{title}</Text>
      <TotalAmount>{formatCurrency(amount)}</TotalAmount>
      <LinkWrapper to={link}>
        <span>View all</span>
        <span>
          <ArrowCircleIcon />
        </span>
      </LinkWrapper>
    </TransactionAnalyticsCardWrapper>
  );
};

export { TransactionAnalyticsCard };

const TransactionAnalyticsCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${({ theme, bg }) => (bg ? bg : theme.colors.gray100)};
  min-width: 227px;
  width: 100%;
  padding: 12px;
  border-radius: ${({ theme, bg }) => (bg ? "4px" : "8px")};
`;

const Icon = styled.div`
  width: 43px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.Primary300};
  & > svg {
    transform: ${({ scale }) => (scale ? "scale(1.8)" : "scale(1)")};
  }
`;
const Text = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray500};
`;

const TotalAmount = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: 48px;
`;
const LinkWrapper = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  padding-top: 0.4rem;
  color: ${({ theme }) => theme.colors.Primary300};
  transition: all ease-in-out 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.Primary200};
  }
  & > span {
    display: flex;
    align-items: center;
  }
`;
