import styled from "styled-components";
import { Table } from "./table/table";
import { InOutFlowIcon } from "../../../../assets/svgs";
import { Link } from "react-router-dom";
import { formatNumberWithCommas } from "../../../../utils/helpers.utils";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const RecentTransaction = ({ data }) => {
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
        <ViewDetails to={`/transactions/${value}`}>View Details</ViewDetails>
      ),
    },
  ];
  //   {
  //     currency: "XAF to USDT",
  //     rate: "500",
  //     incoming: "1000",
  //     incomingCurrency: "USDT",
  //     outgoing: "55,000",
  //     outgoingCurrency: "Naira",
  //     date: "Jan 4, 2022",
  //     paymentStatus: "Paid",
  //     customerDetails: "John Doe",
  //   },
  //   {
  //     currency: "XAF to USDT",
  //     rate: "500",
  //     incoming: "1000",
  //     incomingCurrency: "USDT",
  //     outgoing: "55,000",
  //     outgoingCurrency: "Naira",
  //     date: "Jan 4, 2022",
  //     paymentStatus: "Paid",
  //     customerDetails: "John Doe",
  //   },
  // ];

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
  padding: 24px;
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
  padding-bottom: 2rem;
`;

const Flex = styled.div`
  display: flex;
  gap: 0.7rem;
  color: ${({ theme }) => theme.colors.gray800};
  align-items: center;
  font-size: 12px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 38px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray900};
`;

const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray500};
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & > p {
    font-size: 16px;
  }
`;

const PaymentStatus = styled.span`
  padding: 5px 26px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) => (!props.$status ? "#D1FAE5" : "#FEE2E2")};
  color: ${(props) => (!props.$status ? "#059669" : "#DC2626")};
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
