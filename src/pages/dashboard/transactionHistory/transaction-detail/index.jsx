import styled from "styled-components";
import { PageHeader } from "../../../../components/pageHeader";
import { Divider } from "..";
import { colors } from "../../../../theme/colors";
import { DownloadMini } from "../../../../assets/svgs";
import ActionButtons from "./components/actionButtons";

const transaction = {
  initiatorId: "1234RTY",
  salesRepName: "John Doe",
  incomingAmount: 1200,
  outgoingAmount: 12000,
  date: "June 4, 2023",
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

export const TransactionDetailsOverview = () => {
  return (
    <PageContainer>
      <PageHeader
        title={"Transaction Details"}
        subTitle={"You are viewing transaction details below."}
        endComponent={<ActionButtons />}
      />
      <Divider />
      <TransactionInitiatorGrid>
        <ColumnWrapper>
          <SectionTitle>Transaction Initiator</SectionTitle>
          <Divider $margin="8px 0 16px" />
          <FlexCol $gap={"0.3rem"}>
            <DetailRow>
              <Label>ID</Label>
              <Value>{transaction?.initiatorId}</Value>
            </DetailRow>
            <DetailRow>
              <Label>Sales Rep Name</Label>
              <Value>{transaction?.salesRepName}</Value>
            </DetailRow>
          </FlexCol>
        </ColumnWrapper>

        <ColumnWrapper>
          <SectionTitle>Exchange Summary</SectionTitle>
          <Divider $margin="8px 0 16px" />
          <FlexCol $gap={"0.3rem"}>
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
          </FlexCol>
        </ColumnWrapper>
      </TransactionInitiatorGrid>

      <TransactionSummary>
        <PageHeader
          title={"Transaction Summary"}
          subTitle={"You are viewing transaction summary below"}
        />

        <SummaryBox>
          <DetailRow>
            <Value>Summary</Value>
            <Value>
              <Label>Date</Label>: {transaction?.date}
            </Value>
          </DetailRow>
          <Divider $margin="12px 0 16px" />
          <FlexCol $gap={"0.3rem"}>
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
              <Value style={{ width: "100%" }}>
                {transaction?.customerName}
              </Value>
            </DetailRow>
          </FlexCol>
        </SummaryBox>

        <PaymentStatusBox>
          <DetailRow>
            <Value>Payment Status</Value>
          </DetailRow>
          <Divider $margin="12px 0 16px" />
          <DetailRow flexWrap>
            <FlexCol>
              <Label>Amount Paid</Label>
              <Value>$1200</Value>
            </FlexCol>
            <FlexCol>
              <Label>Amount Owned</Label>
              <Value>$1200</Value>
            </FlexCol>
            <FlexCol>
              <Label>Status</Label>
              <Value>
                <StatusBadge status={transaction?.status}>
                  {transaction?.status}
                </StatusBadge>
              </Value>
            </FlexCol>
            <FlexCol>
              <Label>Supplier Receipt</Label>
              <Value>
                <ReceiptButton href="#">
                  <DownloadMini />
                  <span>Receipt</span>
                </ReceiptButton>
              </Value>
            </FlexCol>
            <FlexCol>
              <Label>Supplier Receipt</Label>
              <Value>
                <ReceiptButton href="#">
                  <DownloadMini />
                  <span>Receipt</span>
                </ReceiptButton>
              </Value>
            </FlexCol>
          </DetailRow>
        </PaymentStatusBox>

        <TransactionAccountDetails>
          <ColumnWrapper bg={colors.white}>
            <SectionTitle>Debit Account Details</SectionTitle>
            <Divider $margin="12px 0 16px" />
            <FlexCol $gap={"0.8rem"}>
              <DetailRow>
                <Label>Debit Account</Label>
                <Value>{transaction?.debitAccount}</Value>
              </DetailRow>
              <DetailRow>
                <Label>Amount</Label>
                <LabelTwo>
                  CFA <span>{transaction?.outgoingAmount}</span>
                </LabelTwo>
              </DetailRow>
            </FlexCol>
          </ColumnWrapper>

          <ColumnWrapper bg={colors.white}>
            <SectionTitle>Credit Account Details</SectionTitle>
            <Divider $margin="12px 0 16px" />
            <FlexCol $gap={"0.8rem"}>
              <DetailRow>
                <Label>Debit Account</Label>
                <Value>{transaction?.debitAccount}</Value>
              </DetailRow>
              <DetailRow>
                <Label>Amount</Label>
                <LabelTwo>
                  CFA <span>{transaction?.outgoingAmount}</span>
                </LabelTwo>
              </DetailRow>
            </FlexCol>
          </ColumnWrapper>
        </TransactionAccountDetails>

        <CommentWrapper>
          <ColumnWrapper bg={colors.white}>
            <SectionTitle>COO Comments</SectionTitle>
            <Divider $margin="12px 0 16px" />
            <FlexCol $gap={"0.8rem"}>
              <DetailRow
                style={{ justifyContent: "space-between", width: "100%" }}
              >
                <FlexCol $gap={"0.3rem"}>
                  <Label>ID</Label>
                  <Value>{transaction?.cooId}</Value>
                </FlexCol>
                <FlexCol $gap={"0.3rem"}>
                  <Label>Book Keeper Name</Label>
                  <Value>{transaction?.bookKeeperName}</Value>
                </FlexCol>
                <FlexCol $gap={"0.3rem"}>
                  <Label>Date Approved</Label>
                  <Value>{transaction?.date}</Value>
                </FlexCol>
              </DetailRow>
              <FlexCol $gap={"0.3rem"}>
                <Label>Reason For Rejecting</Label>
                <Value>Any Reason for rejecting can be found here</Value>
              </FlexCol>
            </FlexCol>
          </ColumnWrapper>
        </CommentWrapper>

        <CommentWrapper>
          <ColumnWrapper bg={colors.white}>
            <SectionTitle>CFO Comments</SectionTitle>
            <Divider $margin="12px 0 16px" />
            <FlexCol $gap={"0.8rem"}>
              <DetailRow
                style={{ justifyContent: "space-between", width: "100%" }}
              >
                <FlexCol $gap={"0.3rem"}>
                  <Label>ID</Label>
                  <Value>{transaction?.cfoId}</Value>
                </FlexCol>
                <FlexCol $gap={"0.3rem"}>
                  <Label>CFO Name</Label>
                  <Value>{transaction.cfoName}</Value>
                </FlexCol>{" "}
                <FlexCol $gap={"0.3rem"}>
                  <Label>Date Approved</Label>
                  <Value>{transaction?.date}</Value>
                </FlexCol>
              </DetailRow>
              <FlexCol $gap={"0.3rem"}>
                <Label>Reason For Rejecting</Label>
                <Value>Any Reason for rejecting can be found here</Value>
              </FlexCol>
            </FlexCol>
          </ColumnWrapper>
        </CommentWrapper>
      </TransactionSummary>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const ColumnWrapper = styled.div`
  background-color: ${({ bg }) => bg ?? "#f8f8f8"};
  border-radius: 8px;
  padding: 20px 16px 19px;
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
      padding: 4px 0;
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
  flex-wrap: ${({ flexWrap }) => (flexWrap ? flexWrap : "unset")};
  width: 100%;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray500};
`;

const LabelTwo = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #98a2b3;

  & > span {
    color: ${({ theme }) => theme.colors.primary300};
  }
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
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 20px;
`;

const TransactionAccountDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  border-radius: 12px;
`;

const CommentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  border-radius: 12px;
`;

const SummaryBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  padding: 24px 16px 19px;
  margin-top: 20px;
`;

const PaymentStatusBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  padding: 24px 16px 19px;
`;

const StatusBadge = styled.span`
  background-color: ${(props) =>
    props.status === "Paid" ? "#d4edda" : "#f8d7da"};
  color: ${(props) => (props.status === "Paid" ? "#155724" : "#721c24")};
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 14px;
`;

const ReceiptButton = styled.button`
  display: flex;
  text-decoration: none;
  gap: 8px;
  align-items: center;
  padding: 6px 14px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.gray200};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1rem;
  outline: none;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ${({ $gap }) => ($gap ? $gap : "10px")};
  width: 100%;
`;
