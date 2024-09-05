import styled from "styled-components";
import { useState } from "react";
import { TMTable } from "../../../../components/table/TMTable";
import { InOutFlowIcon } from "../../../../assets/svgs";
import DetailsModal from "./detailsModal";

const SupplyHistoryTable = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [viewData, setViewData] = useState();

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
          <SmallText>{row.original.amount}</SmallText>
        </TextWrapper>
      ),
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Supplier Name",
      accessor: "supplierName",
    },
    {
      Header: "",
      id: "action",
      Cell: ({ row }) => (
        <ViewDetails onClick={() => setViewData(row?.original)}>
          View Details
        </ViewDetails>
      ),
    },
  ];

  const data = {
    data: [
      {
        currency: "USDT",
        amount: "1000",
        incomingCurrency: "USDT",
        outgoing: "55,000",
        outgoingCurrency: "Naira",
        date: "Jan 4, 2022",
        paymentStatus: "Paid",
        supplierName: "John Doe",
        phoneNumber: "09021324234",
        salesRepId: 12345,
        salesRepName: "Bola Ahmed",
      },
      {
        currency: "USDT",
        amount: "1000",
        incomingCurrency: "USDT",
        outgoing: "55,000",
        outgoingCurrency: "Naira",
        date: "Jan 4, 2022",
        paymentStatus: "Paid",
        supplierName: "John Doe",
        phoneNumber: "09021324234",
        salesRepId: 12345,
        salesRepName: "Bola Ahmed",
      },
      {
        currency: "EUR",
        amount: "2000",
        incomingCurrency: "USD",
        outgoing: "1700",
        outgoingCurrency: "EUR",
        date: "Jan 5, 2022",
        paymentStatus: "Pending",
        supplierName: "Alice Smith",
        phoneNumber: "09021324234",
        salesRepId: 12345,
        salesRepName: "Bola Ahmed",
      },
      {
        currency: "JPY",
        amount: "500",
        incomingCurrency: "GBP",
        outgoing: "75,000",
        outgoingCurrency: "JPY",
        date: "Jan 6, 2022",
        paymentStatus: "Paid",
        supplierName: "Bob Johnson",
        phoneNumber: "09021324234",
        salesRepId: 12345,
        salesRepName: "Bola Ahmed",
      },
      {
        currency: "CAD",
        amount: "3000",
        incomingCurrency: "AUD",
        outgoing: "2760",
        outgoingCurrency: "CAD",
        date: "Jan 7, 2022",
        paymentStatus: "Failed",
        supplierName: "Emma Wilson",
        phoneNumber: "09021324234",
        salesRepId: 12345,
        salesRepName: "Bola Ahmed",
      },
      {
        currency: "KRW",
        amount: "5000",
        incomingCurrency: "CNY",
        outgoing: "875,000",
        outgoingCurrency: "KRW",
        date: "Jan 8, 2022",
        paymentStatus: "Paid",
        supplierName: "David Lee",
        phoneNumber: "09021324234",
        salesRepId: 12345,
        salesRepName: "Bola Ahmed",
      },
    ],
    metaData: {
      totalPages: 10,
      page: pageNumber,
    },
  };

  return (
    <>
      <TMTable
        columns={columns}
        data={data?.data}
        setPageNumber={setPageNumber}
        availablePages={data?.metaData?.totalPages}
        pageNumber={data?.metaData?.page}
      />
      <DetailsModal
        closeHandler={() => setViewData(null)}
        data={viewData}
        isOpen={!!viewData}
      />
    </>
  );
};

export default SupplyHistoryTable;

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

const ViewDetails = styled.p`
  color: #f97316;
  font-weight: 500;
  cursor: pointer;
`;
