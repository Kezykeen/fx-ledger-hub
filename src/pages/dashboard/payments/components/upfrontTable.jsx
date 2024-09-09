import styled from "styled-components";
import { DownloadMini, InOutFlowIcon } from "../../../../assets/svgs";
import { useState } from "react";
import { TMTable } from "../../../../components/table/TMTable";

const UpfrontTable = () => {
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
        <TextWrapper>
          <p>{value}</p>
          <SmallText>{row.original.currency}</SmallText>
        </TextWrapper>
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
      Header: "Received By",
      accessor: "receivedBy",
    },
    {
      Header: "",
      id: "action",
      Cell: () => (
        <DownlaodReceipt>
          <DownloadMini />
          <DownloadTxt>Download Receipt</DownloadTxt>
        </DownlaodReceipt>
      ),
    },
  ];

  const data = {
    data: [
      {
        currency: "XAF to USDT",
        rate: "500",
        amount: "1000",
        incomingCurrency: "USDT",
        outgoing: "55,000",
        outgoingCurrency: "Naira",
        date: "Jan 4, 2022",
        amountOwed: "$1,200",
        customerDetails: "John Doe",
        receivedBy: "Bola Ahmed",
      },
      {
        currency: "XAF to USDT",
        rate: "500",
        amount: "1000",
        incomingCurrency: "USDT",
        outgoing: "55,000",
        outgoingCurrency: "Naira",
        date: "Jan 4, 2022",
        amountOwed: "$1,200",
        customerDetails: "John Doe",
        receivedBy: "Bola Ahmed",
      },
      {
        currency: "USD to EUR",
        rate: "0.85",
        amount: "2000",
        incomingCurrency: "USD",
        outgoing: "1700",
        outgoingCurrency: "EUR",
        date: "Jan 5, 2022",
        amountOwed: "Pending",
        customerDetails: "Alice Smith",
        receivedBy: "Bola Ahmed",
      },
      {
        currency: "GBP to JPY",
        rate: "150",
        amount: "500",
        incomingCurrency: "GBP",
        outgoing: "75,000",
        outgoingCurrency: "JPY",
        date: "Jan 6, 2022",
        amountOwed: "$1,200",
        customerDetails: "Bob Johnson",
        receivedBy: "Bola Ahmed",
      },
      {
        currency: "AUD to CAD",
        rate: "0.92",
        amount: "3000",
        incomingCurrency: "AUD",
        outgoing: "2760",
        outgoingCurrency: "CAD",
        date: "Jan 7, 2022",
        amountOwed: "Failed",
        customerDetails: "Emma Wilson",
        receivedBy: "Bola Ahmed",
      },
      {
        currency: "CNY to KRW",
        rate: "175",
        amount: "5000",
        incomingCurrency: "CNY",
        outgoing: "875,000",
        outgoingCurrency: "KRW",
        date: "Jan 8, 2022",
        amountOwed: "$1,200",
        customerDetails: "David Lee",
        receivedBy: "Bola Ahmed",
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

export default UpfrontTable;

const Flex = styled.div`
  display: flex;
  gap: 0.7rem;
  color: ${({ theme }) => theme.colors.gray800};
  align-items: center;
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

const DownlaodReceipt = styled.div`
  display: flex;
  align-items: center;
  width: 194px;
  height: 40px;
  padding: 10px 16px;
  gap: 8px;
  border-radius: 8px;
  cursor: pointer;

  & > svg {
    path {
      stroke: #fd853a;
    }
  }
`;

const DownloadTxt = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  color: #fd853a;
`;
