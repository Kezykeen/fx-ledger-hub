import React from "react";
import styled from "styled-components";
import { Table } from "./table/table";
import { InOutFlowIcon } from "../../../../../assets/svgs";
import { Link } from "react-router-dom";

const ViewDetails = styled(Link)`
  color: #f97316;
  font-weight: 500;
  cursor: pointer;
`;
const Transactions = () => {
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
      Cell: () => (
        <ViewDetails to={"/s/transactions/transaction-detail"}>
          View Details
        </ViewDetails>
      ),
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
    {
      currency: "USD to EUR",
      rate: "0.85",
      incoming: "2000",
      incomingCurrency: "USD",
      outgoing: "1700",
      outgoingCurrency: "EUR",
      date: "Jan 5, 2022",
      paymentStatus: "Pending",
      customerDetails: "Alice Smith",
    },
    {
      currency: "GBP to JPY",
      rate: "150",
      incoming: "500",
      incomingCurrency: "GBP",
      outgoing: "75,000",
      outgoingCurrency: "JPY",
      date: "Jan 6, 2022",
      paymentStatus: "Paid",
      customerDetails: "Bob Johnson",
    },
    {
      currency: "AUD to CAD",
      rate: "0.92",
      incoming: "3000",
      incomingCurrency: "AUD",
      outgoing: "2760",
      outgoingCurrency: "CAD",
      date: "Jan 7, 2022",
      paymentStatus: "Failed",
      customerDetails: "Emma Wilson",
    },
    {
      currency: "CNY to KRW",
      rate: "175",
      incoming: "5000",
      incomingCurrency: "CNY",
      outgoing: "875,000",
      outgoingCurrency: "KRW",
      date: "Jan 8, 2022",
      paymentStatus: "Paid",
      customerDetails: "David Lee",
    },
    {
      currency: "INR to SGD",
      rate: "0.018",
      incoming: "50000",
      incomingCurrency: "INR",
      outgoing: "900",
      outgoingCurrency: "SGD",
      date: "Jan 9, 2022",
      paymentStatus: "Pending",
      customerDetails: "Sarah Chen",
    },
    {
      currency: "BRL to MXN",
      rate: "3.5",
      incoming: "1000",
      incomingCurrency: "BRL",
      outgoing: "3500",
      outgoingCurrency: "MXN",
      date: "Jan 10, 2022",
      paymentStatus: "Paid",
      customerDetails: "Carlos Rodriguez",
    },
    {
      currency: "ZAR to EGP",
      rate: "1.2",
      incoming: "10000",
      incomingCurrency: "ZAR",
      outgoing: "12000",
      outgoingCurrency: "EGP",
      date: "Jan 11, 2022",
      paymentStatus: "Paid",
      customerDetails: "Fatima Ahmed",
    },
    {
      currency: "RUB to TRY",
      rate: "0.15",
      incoming: "20000",
      incomingCurrency: "RUB",
      outgoing: "3000",
      outgoingCurrency: "TRY",
      date: "Jan 12, 2022",
      paymentStatus: "Pending",
      customerDetails: "Mehmet Yilmaz",
    },
    {
      currency: "SEK to NOK",
      rate: "1.05",
      incoming: "5000",
      incomingCurrency: "SEK",
      outgoing: "5250",
      outgoingCurrency: "NOK",
      date: "Jan 13, 2022",
      paymentStatus: "Paid",
      customerDetails: "Anna Larsson",
    },
    {
      currency: "NZD to CHF",
      rate: "0.65",
      incoming: "2500",
      incomingCurrency: "NZD",
      outgoing: "1625",
      outgoingCurrency: "CHF",
      date: "Jan 14, 2022",
      paymentStatus: "Failed",
      customerDetails: "Thomas Mueller",
    },
  ];
  return <Table columns={columns} data={data} />;
};

export default Transactions;

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
