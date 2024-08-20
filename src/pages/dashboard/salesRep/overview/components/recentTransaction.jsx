import React from "react";
import styled from "styled-components";
import { Table } from "./table/table";
import { InOutFlowIcon } from "../../../../../assets/svgs";

const ViewDetails = styled.span`
  color: #f97316;
  font-weight: 500;
  cursor: pointer;
`;
const RecentTransaction = () => {
  const columns = [
    {
      Header: "Currency",
      accessor: "currency",
      Cell: ({ value }) => (
        <Flex>
          <span>
            <InOutFlowIcon />
          </span>
          <span>{value}</span>
        </Flex>
      ),
    },
    {
      Header: "Rate",
      accessor: "rate",
    },
    {
      Header: "Incoming",
      accessor: "incoming",
      Cell: ({ value, row }) => (
        <>
          {value}
          <br />
          <SmallText>{row.original.incomingCurrency}</SmallText>
        </>
      ),
    },
    {
      Header: "Outgoing",
      accessor: "outgoing",
      Cell: ({ value, row }) => (
        <>
          {value}
          <br />
          <SmallText style={{ color: "#6B7280" }}>
            {row.original.outgoingCurrency}
          </SmallText>
        </>
      ),
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Payment Status",
      accessor: "paymentStatus",
      Cell: ({ value }) => (
        <PaymentStatus status={value}>{value}</PaymentStatus>
      ),
    },
    {
      Header: "Customer Details",
      accessor: "customerDetails",
    },
    {
      Header: "",
      id: "action",
      Cell: () => <ViewDetails>View Details</ViewDetails>,
    },
  ];
  const data = [
    {
      currency: "CFA to USDT",
      rate: "500",
      incoming: "1000",
      incomingCurrency: "USDT",
      outgoing: "55,000",
      outgoingCurrency: "Naira",
      date: "Jan 4, 2022",
      paymentStatus: "Paid",
      customerDetails: "John Doe",
    },
    {
      currency: "CFA to USDT",
      rate: "500",
      incoming: "1000",
      incomingCurrency: "USDT",
      outgoing: "55,000",
      outgoingCurrency: "Naira",
      date: "Jan 4, 2022",
      paymentStatus: "Paid",
      customerDetails: "John Doe",
    },
  ];
  return (
    <Container>
      <FlexCol>
        <Title>Recent Transactions</Title>
        <SubTitle>
          You are viewing customer history below. Please select the history you
          wish to view
        </SubTitle>
      </FlexCol>
      <Table columns={columns} data={data} />
    </Container>
  );
};

export default RecentTransaction;

const Container = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.gray100};
  width: 100%;
  border-radius: 12px;
  gap: 32px;
  & > div:last-of-type {
    padding: 24px 26px;
  }
`;
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding-bottom: 2rem;
`;
const Flex = styled.div`
  display: flex;
  gap: 0.7rem;
  color: ${({ theme }) => theme.colors.gray800};
  align-items: center;
`;
const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  text-align: left;
`;
const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray500};
`;

const CurrencyIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #fef3c7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const PaymentStatus = styled.span`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) =>
    props.status === "Paid" ? "#D1FAE5" : "#FEE2E2"};
  color: ${(props) => (props.status === "Paid" ? "#059669" : "#DC2626")};
`;

const SmallText = styled.small`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;
