import styled from "styled-components";
import { PageHeader } from "../../../../components/pageHeader";
import { Divider } from "..";
import { useState } from "react";
import { colors } from "../../../../theme/colors";
import { DownloadMini, DropdownIcon } from "../../../../assets/svgs";
import { ButtonDropdown } from "../../../../components/buttonDropdown";

const transaction = {
  initiatorId: "1234RTY",
  salesRepName: "John Doe",
  incomingAmount: 1200,
  outgoingAmount: 12000,
  date: "June 4,2023",
  incomingCurrency: "Naira",
  rate: 550,
  customerName: "John Doe",
  status: "Paid",
  debitAccount: "82378237832",
  debitAmount: 1200,
  creditAccount: "82378237832",
  creditAmount: 1200,
  cooId: "12334",
  bookKeeperName: "John Doe",
  cooApprovalDate: "John Doe",
  cooRejectReason: "Any Reason for rejecting can be found here",
  cfoId: "12334",
  cfoName: "John Doe",
  cfoApprovalDate: "John Doe",
  cfoRejectReason: "Any Reason for rejecting can be found here",
};

const CustomerTransactionOverview = () => {
  const [exportOpen, setExportOpen] = useState(false);
  const exportButtonGroup = [
    {
      name: "Update Payment",
      onClick: () => {},
    },
    {
      name: "Initial Refund",
      onClick: () => {},
    },
    {
      name: "initial Upfront",
      onClick: () => {},
    },
  ];
  return (
    <PageContainer>
      <DetailRow>
        <PageHeader
          title={"Transaction Details"}
          subTitle={"You are viewing transaction details below."}
        />

        <div>
          <ButtonDropdown
            open={exportOpen}
            setOpen={setExportOpen}
            buttonGroup={exportButtonGroup}
            buttonElement={
              <StyledMenuButton>
                <span>Actions</span>
                <DropdownIcon />
              </StyledMenuButton>
            }
          />
        </div>
      </DetailRow>
      <Divider />

      <TransactionInitiatorGrid>
        <ColumnWrapper>
          <SectionTitle>Transaction Initiator</SectionTitle>
          <Divider marginY="8px" />
          <DetailRow>
            <Label>ID</Label>
            <Value>{transaction?.initiatorId}</Value>
          </DetailRow>
          <DetailRow>
            <Label>Sales Rep Name</Label>
            <Value>{transaction?.salesRepName}</Value>
          </DetailRow>
        </ColumnWrapper>

        <ColumnWrapper>
          <SectionTitle>Exchange Summary</SectionTitle>
          <Divider marginY="8px" />

          <DetailRow>
            <Label>Incoming Amount</Label>
            <LabelTwo>
              CFA <span>{transaction?.incomingAmount}</span>
            </LabelTwo>
          </DetailRow>
          <DetailRow>
            <Label>Outgoing Amount</Label>
            <LabelTwo>
              N <span>{transaction?.outgoingAmount}</span>
            </LabelTwo>
          </DetailRow>
        </ColumnWrapper>
      </TransactionInitiatorGrid>

      <TransactionSummary>
        <FlexRow>
          <PageHeader
            title={"Transaction Summary"}
            subTitle={"You are viewing transaction summary below"}
          />
        </FlexRow>

        <Divider />

        <SummaryBox>
          <DetailRow>
            <Value>Summary</Value>
            <Value>
              <Label>Date</Label>: {transaction?.date}
            </Value>
          </DetailRow>
          <Divider marginY="8px" />

          <DetailRow>
            <Label style={{ width: "100%" }}>Incoming currency</Label>
            <Label style={{ width: "100%" }}>Rate</Label>
            <Label style={{ width: "100%" }}>Customer Name</Label>
          </DetailRow>
          <DetailRow>
            <Value style={{ width: "100%", color: colors.primary300 }}>
              {transaction?.incomingCurrency} 
            </Value>
            <Value style={{ width: "100%", color: colors.primary300 }}>
              {transaction?.rate}
            </Value>
            <Value style={{ width: "100%" }}>{transaction?.customerName}</Value>
          </DetailRow>
        </SummaryBox>

        <PaymentStatusBox>
          <DetailRow>
            <Value>Payment Status</Value>
          </DetailRow>
          <Divider marginY="8px" />
          <DetailRow flexWrap>
            <FlexCol minW="300px">
              <Label>Amount Paid</Label>
              <Value>$1200</Value>
            </FlexCol>
            <FlexCol minW="300px">
              <Label>Amount Owned</Label>
              <Value>$1200</Value>
            </FlexCol>
            <FlexCol minW="300px">
              <Label>Status</Label>
              <Value>
                <StatusBadge status={transaction?.status}>
                  {transaction?.status}
                </StatusBadge>
              </Value>
            </FlexCol>
            <FlexCol minW="300px">
              <Label>Supplier Receipt</Label>
              <Value>
                <ReceiptButton href="#">
                  <span>
                    <DownloadMini />
                  </span>{" "}
                  <span>Receipt</span>
                </ReceiptButton>
              </Value>
            </FlexCol>
            <FlexCol minW="300px">
              <Label>Supplier Receipt</Label>
              <Value>
                <ReceiptButton href="#">
                  <span>
                    <DownloadMini />
                  </span>{" "}
                  <span>Receipt</span>
                </ReceiptButton>
              </Value>
            </FlexCol>
          </DetailRow>
        </PaymentStatusBox>
      </TransactionSummary>
    </PageContainer>
  );
};

export default CustomerTransactionOverview;

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const ColumnWrapper = styled.div`
  background-color: ${({ bg }) => bg ?? "#f8f8f8"};
  border-radius: 8px;
  padding: 20px;
`;

const TransactionInitiatorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-top: 20px;

  & > div {
    background-color: ${({ theme }) => theme.colors.white};
    & > *:first-child {
      padding: 4px;
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  line-height: 28px;
  text-align: left;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-wrap: ${({ flexWrap }) => (flexWrap ? flexWrap : "unset")};
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray500};
`;
const LabelTwo = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray500};
  & > span {
    color: ${({ theme }) => theme.colors.primary300};
  }
`;

const StyledMenuButton = styled.button`
  display: flex;
  justify-content: center;
  text-decoration: none;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  padding: 10px 16px !important;
  color: white;
  border: 1px solid ${(props) => props.theme.colors.gray100} !important;
  background-color: ${(props) => props.theme.colors.primary300};
  border-radius: 8px;
  outline: none;
  box-shadow: 0px 1px 2px 0px #1018280d;
  width: 150px;
  height: 44px;
`;

const Value = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray800};
`;

const TransactionSummary = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-top: 20px;
`;

const SummaryBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
`;

const PaymentStatusBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
`;
const StatusBadge = styled.span`
  background-color: ${(props) =>
    props.status === "Paid" ? "#d4edda" : "#f8d7da"};
  color: ${(props) => (props.status === "Paid" ? "#155724" : "#721c24")};
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
`;

const ReceiptButton = styled.button`
  display: flex;
  text-decoration: none;
  gap: 8px;
  align-items: center;
  padding: 4px 12px 4px 12px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.gray200};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1rem;
  outline: none;
  &:hover {
    text-decoration: underline;
  }
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  width: 100%;
  max-width: ${({ minWidth }) => (minWidth ? minWidth : "fit-content")};
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
