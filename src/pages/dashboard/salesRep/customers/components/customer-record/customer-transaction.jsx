import React from "react";
import styled from "styled-components";
import { Table } from "../table/table";
import { InOutFlowIcon } from "../../../../../../assets/svgs";
import { Link } from "react-router-dom";
import { useState } from "react";

const Transactions = () => {
  const [pageNumber, setPageNumber] = useState(1);
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
      Header: "",
      id: "action",
      Cell: () => (
        <ViewDetails to={"/s/customers/customers-detail/transaction-details"}>
          View Details
        </ViewDetails>
      ),
    },
  ];
  const data = {
    data: [
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
    ],
    metaData: {
      totalPages: 10,
      page: pageNumber,
    },
  };
  return (
    <Table
      columns={columns}
      data={data?.data}
      setPageNumber={setPageNumber}
      availablePages={data?.metaData?.totalPages}
      pageNumber={data?.metaData?.page}
    />
  );
};

export default Transactions;

const Flex = styled.div`
  display: flex;
  gap: 0.7rem;
  color: ${({ theme }) => theme.colors.gray800};
  align-items: center;
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

const ViewDetails = styled(Link)`
  color: #f97316;
  font-weight: 500;
  cursor: pointer;
`;
