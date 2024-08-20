import React, { useState } from "react";
import styled from "styled-components";
import { PageHeader } from "../../../../components/pageHeader";
import { TabHeaderless } from "../../../../components/tabs/tabHeaderless";
import { TransactionOverview } from "./components/transactionOverview";
import { TransactionAnalyticsCard } from "./components/transactionAnalyticsCard";
import { CameraIcon, MoneyIcon, WalletIcon } from "../../../../assets/svgs";
import TransactionAnalyticsChart from "./components/transactionAnalyticsChart";
import RecentTransaction from "./components/recentTransaction";
const tabItems = ["Today", "7 days", "30 days", "12 Months"];
const SalesRepOverview = () => {
  const [sortBy, setSortBy] = useState(tabItems[0]);
  return (
    <Container>
      <PageHeader
        title={"Welcome back, Amara"}
        subTitle={"Here is an overview of all your transactions "}
      />
      <TabHeaderless
        isActive={sortBy}
        items={tabItems}
        onClick={(str) => setSortBy(str)}
      />
      <TransactionOverview />
      <Wrapper>
        <p>Payment Analytics</p>
        <div>
          <Grid>
            <GridColOne>
              <TransactionAnalyticsCard
                icon={<CameraIcon />}
                title={"Pending Payments"}
                amount={120000}
                link={"/sales/overview"}
              />
            </GridColOne>
            <GridColTwo>
              <RefundAnalyticsSummaryWrapper>
                <div>
                  <span>
                    <WalletIcon />
                  </span>
                  <h5>Refunds Analytics</h5>
                </div>
                <Flex>
                  <TransactionAnalyticsCard
                    title={"Customer Refunds"}
                    amount={500}
                    link={"/sales/overview"}
                    bgColor={"#E4E7EC66"}
                  />
                  <TransactionAnalyticsCard
                    title={"Supplier Refunds"}
                    amount={500}
                    link={"/sales/overview"}
                    bgColor={"#E4E7EC66"}
                  />
                </Flex>
              </RefundAnalyticsSummaryWrapper>
            </GridColTwo>
          </Grid>
        </div>
      </Wrapper>
      <TransactionAnalyticsWrapper>
        <TransactionAnalyticsChart />
        <UpFrontWrapper>
          <small>Upfront Analytics</small>
          <TransactionAnalyticsCard
            icon={<MoneyIcon />}
            scale={false}
            title={"Total Upfronts"}
            amount={1200}
            link={"/sales/overview"}
            bgColor={"#FFD7BF80"}
          />
        </UpFrontWrapper>
      </TransactionAnalyticsWrapper>
      <RecentTransaction />
    </Container>
  );
};

export { SalesRepOverview };

SalesRepOverview.displayName = "SalesRepOverview";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1.5rem;
  padding-bottom: 0.85rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray50};
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
  width: 100%;
  gap: 1rem;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 2rem;
  width: fit-content;
  min-width: 100%;
`;

const GridColOne = styled.div`
  grid-column: span 1;
`;
const GridColTwo = styled.div`
  grid-column: span 3;
  width: 100%;
  height: 100%;
`;

const RefundAnalyticsSummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray100};
  & > div:first-of-type {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.Primary300};
    & > span {
      display: flex;
      align-items: center;
      gap: 6px;
      &:first-of-type {
        height: 32px;
        width: 32px;
        & svg {
          transform: scale(1.4);
        }
      }
    }
  }
`;

const TransactionAnalyticsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  justify-content: space-between;
  & > div:first-of-type {
    width: 100%;
  }
  & > div:last-of-type {
    & > div {
      height: 100%;
    }
  }
`;

const UpFrontWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 288px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  padding: 1rem;
  border-radius: 12px;

  & > small {
    font-size: 18px;
    font-weight: 600;
    line-height: 30px;
    height: fit-content;
  }
`;
