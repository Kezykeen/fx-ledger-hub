import styled from "styled-components";
import { Table } from "../table/table";
import { DownloadMini, InOutFlowIcon } from "../../../../../assets/svgs";
import { Link } from "react-router-dom";
import { useState } from "react";

const Upfront = () => {
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
      Header: "Received By",
      accessor: "customerDetails",
    },
    {
      Header: "",
      id: "action",
      Cell: () => (
        <ViewDetails to={""}>
          <DownloadMini
            style={{
              fill: "#FD853A",
              marginRight: "10px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          />
          Download Receipt
        </ViewDetails>
      ),
    },
  ];
  const data = {
    data: [
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
        customerDetails: "John Doe",
      },
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
        customerDetails: "John Doe",
      },
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
        customerDetails: "John Doe",
      },
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
        customerDetails: "John Doe",
      },
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
        customerDetails: "John Doe",
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

export default Upfront;

const Flex = styled.div`
  display: flex;
  gap: 0.7rem;
  color: ${({ theme }) => theme.colors.gray800};
  align-items: center;
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
  transition: background-color 0.5s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray100};
    cursor: pointer;
    color: black;
    padding: 7px;
    border-radius: 5px;
  }
`;
