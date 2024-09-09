import styled from "styled-components";
import { PageHeader } from "../../../../components/pageHeader";
import { Divider } from "..";
import { colors } from "../../../../theme/colors";
import { DownloadMini } from "../../../../assets/svgs";
import ActionButtons from "./components/actionButtons";
import { useLocation } from "react-router-dom";
import { useGet } from "../../../../hooks/api";
import { getSingleTradeUrl } from "../../../../urls";
import { ApprovalStatus, QueryKeys } from "../../../../constants/enums";
import { LineLoader } from "../../../../components/lineLoader";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { formatNumberWithCommas } from "../../../../utils/helpers.utils";
dayjs.extend(localizedFormat);

export const TransactionDetailsOverview = () => {
  const { pathname, hash } = useLocation();
  const id = pathname?.split("/").pop();
  const urlHash = hash.substring(1);

  const { data: transaction, isLoading } = useGet(
    [QueryKeys.trade.getById, id],
    getSingleTradeUrl(id)
  );
  console.log({ transaction });
  const sortBySortOrder = (data = []) => {
    return data.sort((a, b) => a.sortOrder - b.sortOrder);
  };
  const sortedApprovals = sortBySortOrder(transaction?.data?.approvals);
  return (
    <PageContainer>
      <PageHeader
        title={"Transaction Details"}
        subTitle={"You are viewing transaction details below."}
        endComponent={urlHash === "pending-approval" && <ActionButtons />}
      />
      <Divider />
      <TransactionInitiatorGrid>
        <ColumnWrapper>
          <SectionTitle>Transaction Initiator</SectionTitle>
          <Divider $margin="8px 0 16px" />
          <FlexCol $gap={"0.3rem"}>
            <DetailRow>
              <Label>Sales Rep Name</Label>
              <Value>{transaction?.data?.createdByName}</Value>
            </DetailRow>
            <DetailRow>
              <Label>Date Created</Label>
              <Value>{dayjs(transaction?.data?.createdOn).format("LL")}</Value>
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
                {transaction?.data?.incomingCurrencyTypeName}{" "}
                <span>
                  {formatNumberWithCommas(transaction?.data?.incomingAmount)}
                </span>
              </LabelTwo>
            </DetailRow>
            <DetailRow>
              <Label>Outgoing Amount</Label>
              <LabelTwo>
                {transaction?.data?.outgoingCurrencyTypeName}{" "}
                <span>
                  {formatNumberWithCommas(transaction?.data?.outgoingAmount)}
                </span>
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
              <Label>Date</Label>:{" "}
              {dayjs(transaction?.data?.createdOn).format("LL")}
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
                {transaction?.data?.incomingCurrencyTypeName}
              </Value>
              <Value style={{ width: "100%", color: colors.primary300 }}>
                {transaction?.data?.rate}
              </Value>
              <Value style={{ width: "100%" }}>
                {transaction?.data?.customerName}
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
            {transaction?.data?.customerIsOwing && (
              <>
                <FlexCol>
                  <Label>Amount Paid</Label>
                  <Value>{transaction?.data?.amountCustomerPaid}</Value>
                </FlexCol>
                <FlexCol>
                  <Label>Amount Owed</Label>
                  <Value>{transaction?.data?.amountCustomerIsOwing}</Value>
                </FlexCol>
              </>
            )}

            <FlexCol>
              <Label>Status</Label>
              <Value>
                <StatusBadge $status={transaction?.data?.customerIsOwing}>
                  {transaction?.data?.customerIsOwing ? `Owing` : `Paid`}
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
            {/* <FlexCol>
              <Label>Supplier Receipt</Label>
              <Value>
                <ReceiptButton href="#">
                  <DownloadMini />
                  <span>Receipt</span>
                </ReceiptButton>
              </Value>
            </FlexCol> */}
          </DetailRow>
        </PaymentStatusBox>

        <TransactionAccountDetails>
          <ColumnWrapper $bg={colors.white}>
            <SectionTitle>Debit Account Details</SectionTitle>
            <Divider $margin="12px 0 16px" />
            <FlexCol $gap={"1rem"}>
              {transaction?.data?.accountsToDebit?.map((x, idx) => (
                <FlexCol $gap={"0.3rem"} key={idx}>
                  <DetailRow>
                    <Label>Debit Account</Label>
                    <Value>{x?.accountName}</Value>
                  </DetailRow>
                  <DetailRow>
                    <Label>Amount</Label>
                    <LabelTwo>
                      {transaction?.data?.outgoingCurrencyTypeName}{" "}
                      <span>{x?.amount}</span>
                    </LabelTwo>
                  </DetailRow>
                </FlexCol>
              ))}
            </FlexCol>
          </ColumnWrapper>

          <ColumnWrapper $bg={colors.white}>
            <SectionTitle>Credit Account Details</SectionTitle>
            <Divider $margin="12px 0 16px" />
            <FlexCol $gap={"1rem"}>
              {transaction?.data?.accountsToCredit?.map((x, idx) => (
                <FlexCol $gap={"0.3rem"} key={idx}>
                  <DetailRow>
                    <Label>Credit Account</Label>
                    <Value>{x?.accountName}</Value>
                  </DetailRow>
                  <DetailRow>
                    <Label>Amount</Label>
                    <LabelTwo>
                      {transaction?.data?.incomingCurrencyTypeName}{" "}
                      <span>{x?.amount}</span>
                    </LabelTwo>
                  </DetailRow>
                </FlexCol>
              ))}
            </FlexCol>
          </ColumnWrapper>
        </TransactionAccountDetails>

        <CommentWrapper>
          <ColumnWrapper $bg={colors.white}>
            <ColumnTitleSection>
              <SectionTitle>C0O Comments</SectionTitle>
              <ApprovalStatusBadge $status={sortedApprovals[0]?.approvalStatus}>
                {sortedApprovals[0]?.approvalStatusName}
              </ApprovalStatusBadge>
            </ColumnTitleSection>
            <Divider $margin="12px 0 16px" />
            <FlexCol $gap={"0.8rem"}>
              <DetailRow
                style={{ justifyContent: "space-between", width: "100%" }}
              >
                <FlexCol $gap={"0.3rem"}>
                  <Label>COO Name</Label>
                  <Value>{sortedApprovals[0]?.fullName}</Value>
                </FlexCol>
                <FlexCol $gap={"0.3rem"}>
                  <Label>COO Email</Label>
                  <Value>{sortedApprovals[0]?.userName}</Value>
                </FlexCol>
                {sortedApprovals[0]?.dateApproved && (
                  <FlexCol $gap={"0.3rem"}>
                    <Label>Date Approved</Label>
                    <Value>
                      {dayjs(sortedApprovals[0]?.dateApproved).format("LL")}
                    </Value>
                  </FlexCol>
                )}
              </DetailRow>
              {sortedApprovals[0]?.comment && (
                <FlexCol $gap={"0.3rem"}>
                  <Label>Reason For Rejecting</Label>
                  <Value>{sortedApprovals[0]?.comment}</Value>
                </FlexCol>
              )}
            </FlexCol>
          </ColumnWrapper>
        </CommentWrapper>

        {sortedApprovals[1]?.approvalStatus !== ApprovalStatus.NOT_STARTED && (
          <CommentWrapper>
            <ColumnWrapper $bg={colors.white}>
              <ColumnTitleSection>
                <SectionTitle>CFO Comments</SectionTitle>
                <ApprovalStatusBadge
                  $status={sortedApprovals[1]?.approvalStatus}
                >
                  {sortedApprovals[1]?.approvalStatusName}
                </ApprovalStatusBadge>
              </ColumnTitleSection>
              <Divider $margin="12px 0 16px" />
              <FlexCol $gap={"0.8rem"}>
                <DetailRow
                  style={{ justifyContent: "space-between", width: "100%" }}
                >
                  <FlexCol $gap={"0.3rem"}>
                    <Label>CFO Name</Label>
                    <Value>{sortedApprovals[1]?.fullName}</Value>
                  </FlexCol>
                  <FlexCol $gap={"0.3rem"}>
                    <Label>CFO Email</Label>
                    <Value>{sortedApprovals[1]?.userName}</Value>
                  </FlexCol>{" "}
                  {sortedApprovals[1]?.dateApproved && (
                    <FlexCol $gap={"0.3rem"}>
                      <Label>Date Approved</Label>
                      <Value>
                        {dayjs(sortedApprovals[1]?.dateApproved).format("LL")}
                      </Value>
                    </FlexCol>
                  )}
                </DetailRow>
                {sortedApprovals[1]?.comment && (
                  <FlexCol $gap={"0.3rem"}>
                    <Label>Reason For Rejecting</Label>
                    <Value>{sortedApprovals[1]?.comment}</Value>
                  </FlexCol>
                )}
              </FlexCol>
            </ColumnWrapper>
          </CommentWrapper>
        )}
      </TransactionSummary>
      <LineLoader loading={isLoading} />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const ColumnWrapper = styled.div`
  background-color: ${({ $bg }) => $bg ?? "#f8f8f8"};
  border-radius: 8px;
  padding: 20px 16px 19px;
`;

const ColumnTitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  background-color: ${(props) => (!props.$status ? "#D1FADF" : "#FEE4E2")};
  color: ${(props) => (!props.$status ? "#027A48" : "#D92D20")};
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 14px;
`;

const ApprovalStatusBadge = styled.span`
  background-color: ${(props) =>
    props.$status === ApprovalStatus.PENDING
      ? `#fd853a33`
      : props.$status === ApprovalStatus.APPROVED
      ? "#D1FADF"
      : "#FEE4E2"};
  color: ${(props) =>
    props.$status === ApprovalStatus.PENDING
      ? `#000000`
      : props.$status === ApprovalStatus.APPROVED
      ? "#027A48"
      : "#D92D20"};
  padding: 5px 20px;
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
