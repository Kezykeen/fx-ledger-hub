import styled from "styled-components";
import { Table } from "./table/table";
import { InOutFlowIcon } from "../../../../assets/svgs";
import { Link } from "react-router-dom";
import { formatNumberWithCommas } from "../../../../utils/helpers.utils";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const Transactions = ({
  data = [],
  totalCount,
  pageNumber,
  setPageNumber,
  hash,
}) => {
  const columns = [
    {
      Header: "Currency",
      accessor: "outgoingCurrencyTypeName",
      Cell: ({ value, row }) => (
        <Flex>
          <span>
            <InOutFlowIcon />
          </span>
          <span>{`${value} to ${row.original.incomingCurrencyTypeName}`}</span>
        </Flex>
      ),
    },
    {
      Header: "Rate",
      accessor: "rate",
    },
    {
      Header: "Incoming",
      accessor: "incomingAmount",
      Cell: ({ value, row }) => (
        <TextWrapper>
          <p>{formatNumberWithCommas(value)}</p>
          <SmallText>{row.original.incomingCurrencyTypeName}</SmallText>
        </TextWrapper>
      ),
    },
    {
      Header: "Outgoing",
      accessor: "outgoingAmount",
      Cell: ({ value, row }) => (
        <TextWrapper>
          <p>{formatNumberWithCommas(value)}</p>
          <SmallText style={{ color: "#6B7280" }}>
            {row.original.outgoingCurrencyTypeName}
          </SmallText>
        </TextWrapper>
      ),
    },
    {
      Header: "Date",
      accessor: "createdOn",
      Cell: ({ value }) => <>{dayjs(value).format("L")}</>,
    },
    {
      Header: "Payment Status",
      accessor: "customerIsOwing",
      Cell: ({ value }) => (
        <PaymentStatus $status={value}>
          {value ? `Owing` : `Paid`}
        </PaymentStatus>
      ),
    },
    {
      Header: "Customer Details",
      accessor: "customerName",
    },
    {
      Header: "",
      id: "action",
      accessor: "id",
      Cell: ({ value }) => (
        <ViewDetails to={`/transactions/${value}#${hash}`}>
          View Details
        </ViewDetails>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      setPageNumber={setPageNumber}
      totalCount={totalCount}
      pageNumber={pageNumber}
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
  padding: 5px 26px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) => (!props.$status ? "#D1FAE5" : "#FEE2E2")};
  color: ${(props) => (!props.$status ? "#059669" : "#DC2626")};
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
