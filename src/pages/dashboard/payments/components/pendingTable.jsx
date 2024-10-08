import styled from "styled-components";
import { InOutFlowIcon } from "../../../../assets/svgs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TMTable } from "../../../../components/table/TMTable";

const PendingTable = () => {
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
        <TextWrapper>
          <p>{value}</p>
          <SmallText>{row.original.incomingCurrency}</SmallText>
        </TextWrapper>
      ),
    },
    {
      Header: "Outgoing",
      accessor: "outgoing",
      Cell: ({ value, row }) => (
        <TextWrapper>
          <p>{value}</p>
          <SmallText style={{ color: "#6B7280" }}>
            {row.original.outgoingCurrency}
          </SmallText>
        </TextWrapper>
      ),
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Amount Owed",
      accessor: "amountOwed",
      Cell: ({ value }) => <AmountOwedTxt>{value}</AmountOwedTxt>,
    },
    {
      Header: "Customer Details",
      accessor: "customerDetails",
    },
    {
      Header: "",
      id: "action",
      Cell: () => <ViewDetails to={"/payments/1"}>View Details</ViewDetails>,
    },
  ];

  const data = {
    data: [
      {
        currency: "XAF to USDT",
        rate: "500",
        incoming: "1000",
        incomingCurrency: "USDT",
        outgoing: "55,000",
        outgoingCurrency: "Naira",
        date: "Jan 4, 2022",
        amountOwed: "$1,200",
        customerDetails: "John Doe",
      },
      {
        currency: "XAF to USDT",
        rate: "500",
        incoming: "1000",
        incomingCurrency: "USDT",
        outgoing: "55,000",
        outgoingCurrency: "Naira",
        date: "Jan 4, 2022",
        amountOwed: "$1,200",
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
        amountOwed: "Pending",
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
        amountOwed: "$1,200",
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
        amountOwed: "Failed",
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
        amountOwed: "$1,200",
        customerDetails: "David Lee",
      },
    ],
    metaData: {
      totalPages: 10,
      page: pageNumber,
    },
  };
  return (
    <TMTable
      columns={columns}
      data={data?.data}
      setPageNumber={setPageNumber}
      availablePages={data?.metaData?.totalPages}
      pageNumber={data?.metaData?.page}
    />
  );
};

export default PendingTable;

const Flex = styled.div`
  display: flex;
  gap: 0.7rem;
  color: ${({ theme }) => theme.colors.gray800};
  align-items: center;
`;

const AmountOwedTxt = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #d92d20;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & > p {
    font-size: 16px;
  }
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
