import React from "react";
import styled from "styled-components";
import {
  DataBaseIcon,
  TrendFallIcon,
  TrendRiseIcon,
} from "../../../../../assets/svgs";
import { colors } from "../../../../../theme/colors";
import { formatCurrency } from "../../../../../utils/helpers.utils";

const TransactionOverview = () => {
  const transactionSummary = [
    {
      transactionDetail: "Total Transactions",
      transactionAmount: 5000,
      trendColor: colors.white,
      trend: "rise",
      iconBgColor1: "#F24A20F0",
      iconBgColor2: "#F24A20F0",
      iconColor: colors.Primary100,
    },
    {
      transactionDetail: "In - Progress",
      transactionAmount: 1500,
      trendColor: "#30B895",
      trend: "rise",
      iconBgColor1: colors.Primary50,
      iconBgColor2: colors.Primary25,
      iconColor: colors.Primary300,
    },
    {
      transactionDetail: "Approved",
      transactionAmount: 3000,
      trendColor: "#30B895",
      trend: "rise",
      iconBgColor1: colors.success50,
      iconBgColor2: colors.success100,
      iconColor: colors.success700,
    },
    {
      transactionDetail: "Declined",
      transactionAmount: 500,
      trendColor: colors.error600,
      trend: "fall",
      iconBgColor1: colors.error100,
      iconBgColor2: colors.error50,
      iconColor: colors.error600,
    },
  ];

  return (
    <Wrapper>
      <p>Transaction Overview</p>
      <div>
        <Flex>
          {transactionSummary.map((item, index) => (
            <TransactionOverviewCard
              {...item}
              variant={index === 0 ? "secondary" : "primary"}
            />
          ))}
        </Flex>
      </div>
    </Wrapper>
  );
};

export { TransactionOverview };

const TransactionOverviewCard = ({
  variant = "primary",
  transactionAmount,
  transactionDetail,
  trendColor,
  trend,
  iconBgColor1,
  iconBgColor2,
  iconColor,
}) => {
  return (
    <TransactionOverviewCardWrapper variant={variant}>
      <div>
        <IconWrapper
          iconBgColor1={iconBgColor1}
          iconBgColor2={iconBgColor2}
          iconColor={iconColor}
        >
          <span>
            <DataBaseIcon />
          </span>
        </IconWrapper>
        <TrendIconWrapper trend={trend} trendColor={trendColor}>
          {trend === "fall" ? <TrendFallIcon /> : <TrendRiseIcon />}
        </TrendIconWrapper>
      </div>
      <div>
        <h4>{formatCurrency(transactionAmount)}</h4>
        <p>{transactionDetail}</p>
      </div>
    </TransactionOverviewCardWrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1.5rem;
  padding-bottom: 0.85rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.Primary25};
  & > p {
    font-size: clamp(16px, 1vw, 18px);
    font-weight: 600;
    line-height: 28px;
    color: ${({ theme }) => theme.colors.gray900};
    font-family: "Montserrat", sans-serif;
  }
  & > div {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;
    overflow-x: auto;
  }
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 1rem;
  margin-bottom: 1rem;
`;
const TransactionOverviewCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  height: 160px;
  justify-content: space-between;
  width: ${({ variant }) => (variant === "primary" ? "217px" : "317px")};
  background: ${({ variant, theme }) =>
    variant === "secondary"
      ? "linear-gradient(74.35deg, #FD853A 3.98%, rgba(250, 168, 79, 0) 278.91%)"
      : theme.colors.white};
  & > div:first-of-type {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
  & > div:last-of-type {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    & > p,
    & > h4 {
      color: ${({ variant, theme }) =>
        variant === "secondary" ? theme.colors.white : theme.colors.N900};
    }
    & > h4 {
      font-size: 25px;
      font-weight: 700;
      line-height: 38px;
    }
    & > p {
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;
    }
  }
`;
const IconWrapper = styled.div`
  border-radius: 100%;
  position: relative;
  isolation: isolate;
  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ iconBgColor1 }) => iconBgColor1};
    color: ${({ iconColor }) => iconColor};
    border-radius: 100%;
    height: 24px;
    width: 24px;
    z-index: 1;
  }
  &::after {
    content: "";
    position: absolute;
    height: 32px;
    width: 32px;
    border-radius: 100%;
    background: ${({ iconBgColor2 }) => iconBgColor2};
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const TrendIconWrapper = styled.div`
  color: ${({ trendColor }) => trendColor};
  position: relative;
`;
