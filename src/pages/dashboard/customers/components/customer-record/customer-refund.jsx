import styled from "styled-components";
import { Table } from "../table/table";
import { InOutFlowIcon } from "../../../../../assets/svgs";
import { Link } from "react-router-dom";
import { useState } from "react";

const Refund = () => {
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
      Header: "Amount",
      accessor: "amount",
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
      Header: "Customer Details",
      accessor: "customerDetails",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <PaymentStatus $status={value}>{value}</PaymentStatus>
      ),
    },
    {
      Header: "",
      id: "action",
      Cell: () => <ViewDetails to={""}>View Details</ViewDetails>,
    },
  ];
  const data = {
    data: [
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
        customerDetails: "John Doe",
        status: "Open",
      },
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
        customerDetails: "John Doe",
        status: "Closed",
      },
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
        customerDetails: "John Doe",
        status: "Closed",
      },
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
        customerDetails: "John Doe",
        status: "Closed",
      },
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
        customerDetails: "John Doe",
        status: "Closed",
      },
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
        customerDetails: "John Doe",
        status: "Closed",
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

export default Refund;

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
    props.$status === "Paid" ? "#D1FAE5" : "#FEE2E2"};
  color: ${(props) => (props.$status === "Paid" ? "#059669" : "#DC2626")};
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
