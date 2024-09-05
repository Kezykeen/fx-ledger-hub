import styled from "styled-components";
import { Table } from "../components/table/table";
import { InOutFlowIcon } from "../../../../assets/svgs";
import { useState } from "react";
import { UpdateModal } from "../../customers/components/updatePaymentModal";

const datas = {
  creditAccount: [
    { account: { label: "Solomon", value: "solomon" }, amount: "2000" },
    { account: { label: "Mbadid", value: "mbadid" }, amount: "1000" },
  ],
};

const HistoryRedcord = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
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
            {row.original.currency}
          </SmallText>
        </>
      ),
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "",
      id: "action",
      Cell: () => (
        <ViewDetailsButton onClick={() => setIsUpdateModalOpen(true)}>
          View Details
        </ViewDetailsButton>
      ),
    },
  ];

  const data = {
    data: [
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
      },
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
      },
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
      },
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
      },
      {
        currency: "USDT",
        amount: "1000",
        date: "Jan 4, 2022",
      },
    ],
    metaData: {
      totalPages: 10,
      page: pageNumber,
    },
  };

  return (
    <>
      <Table
        columns={columns}
        data={data?.data}
        setPageNumber={setPageNumber}
        availablePages={data?.metaData?.totalPages}
        pageNumber={data?.metaData?.page}
      />
      <UpdateModal
        closeHandler={() => setIsUpdateModalOpen(false)}
        isOpen={isUpdateModalOpen}
        data={datas}
      />
    </>
  );
};

export default HistoryRedcord;

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

const ViewDetailsButton = styled.button`
  color: #f97316;
  font-weight: 500;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  transition: background-color 0.5s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray100};
    cursor: pointer;
    color: black;
    padding: 7px;
    border-radius: 5px;
  }
`;
