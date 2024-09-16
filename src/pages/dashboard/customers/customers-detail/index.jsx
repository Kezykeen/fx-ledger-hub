import styled from "styled-components";
import { PageHeader } from "../../../../components/pageHeader";
import { Divider } from "..";
import { colors } from "../../../../theme/colors";
import { ButtonDropdown } from "../../../../components/buttonDropdown";
import { TableTab } from "../../../../components/tableTab";
import { useEffect, useState } from "react";
import { customerDetailsTab, customerHistoryHash } from "../components/data";
import { CustomerRecord } from "../components/customer-history/transaction-history";
import { RefundRecord } from "../components/customer-history/refund-history";
import { UpfrontRecord } from "../components/customer-history/upfront-history";
import { DropdownBlackIcon, DropdownIcon } from "../../../../assets/svgs";
import { UpdateModal } from "../components/updatePaymentModal";
import InitiateCustomerPaymentModal from "../components/customer-popup/initiatePaymentModal";
import FundModal from "../components/customer-popup/fundModal";

const customer = {
  date: "June 4,2023",
  customerName: "John Doe",
  customerCounrty: "Nigeria",
  customerAddress: "51 Value Waters, Ago Palaceway",
  customerCity: "Lagos",
  customerState: "Lagos State",
  phoneNumber: "08120289349",
};

const data = {
  creditAccount: [
    { account: { label: "Solomon", value: "solomon" }, amount: "2000" },
    { account: { label: "Mbadid", value: "mbadid" }, amount: "1000" },
  ],
};

export const CustomerDetailsOverview = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isUpfrontModalOpen, setIsUpfrontModalOpen] = useState(false);
  const [isRefundMoadlOpen, setIsRefundModalOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [textOpen, setTextOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(customerDetailsTab[0].hash);
  const urlHash = window.location.hash.substring(1);

  useEffect(() => {
    setCurrentHash(urlHash);
  }, [urlHash]);

  const exportButtonGroup = [
    {
      name: "Update Payment",
      onClick: () => {
        setIsUpdateModalOpen(true);
      },
    },
    {
      name: "Initial Refund",
      onClick: () => {
        setIsRefundModalOpen(true);
      },
    },
    {
      name: "initial Upfront",
      onClick: () => {
        setIsUpfrontModalOpen(true);
      },
    },
  ];

  const exportTextGroup = [
    {
      name: "XFA",
      onClick: () => {},
    },
    {
      name: "RMB",
      onClick: () => {},
    },
    {
      name: "USDT",
      onClick: () => {},
    },
    {
      name: "Dollar",
      onClick: () => {},
    },
  ];

  const handleTabChange = (selectedTab) => {
    setCurrentHash(selectedTab);
  };

  return (
    <PageContainer>
      <DetailRow>
        <PageHeader
          title={"Customer Details"}
          subTitle={"You are viewing customer details below."}
        />
        <div>
          <ButtonDropdown
            open={exportOpen}
            setOpen={setExportOpen}
            buttonGroup={exportButtonGroup}
            width={`unset`}
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

      <CustomersHistory>
        <ColumnWrapper>
          <DetailRow>
            <SectionTitle>Customer Details</SectionTitle>
            <Value>
              <Label>Date</Label>: {customer?.date}
            </Value>
          </DetailRow>
          <Divider marginY="8px" />
          <DetailRow>
            <Label style={{ width: "100%" }}>Customer Name</Label>
            <Label style={{ width: "100%" }}>Country</Label>
            <Label style={{ width: "100%" }}>City</Label>
          </DetailRow>
          <DetailRow>
            <Value style={{ width: "100%", color: colors.gray800 }}>
              {customer?.customerName}
            </Value>
            <Value style={{ width: "100%", color: colors.gray800 }}>
              {customer?.customerCounrty}
            </Value>
            <Value style={{ width: "100%" }}>{customer?.customerCity}</Value>
          </DetailRow>
          <DetailRow>
            <Label style={{ width: "100%" }}>State</Label>
            <Label style={{ width: "100%" }}>Phone Number</Label>
            <Label style={{ width: "100%" }}>Address</Label>
          </DetailRow>
          <DetailRow>
            <Value style={{ width: "100%", color: colors.gray800 }}>
              {customer?.customerState}
            </Value>
            <Value style={{ width: "100%", color: colors.gray800 }}>
              {customer?.phoneNumber}
            </Value>
            <Value style={{ width: "100%" }}>{customer?.customerAddress}</Value>
          </DetailRow>
        </ColumnWrapper>
      </CustomersHistory>

      <CustomersHistory>
        <FlexRow>
          <PageHeader
            title={"Customer History"}
            subTitle={
              "You are viewing customer history below. Please select the history you wish to view"
            }
          />

          <div>
            <ButtonDropdown
              open={textOpen}
              setOpen={setTextOpen}
              buttonGroup={exportTextGroup}
              buttonElement={
                <StyleMenuButton>
                  <span>All Teams</span>
                  <DropdownBlackIcon />
                </StyleMenuButton>
              }
            />
          </div>
        </FlexRow>
        <Line />
        <TableTab
          tabs={customerDetailsTab}
          backgroundColor="gray100"
          onTabChange={handleTabChange}
          padding="16px 0"
        />

        <SummaryBox>
          {currentHash === customerHistoryHash.transaction && (
            <CustomerRecord />
          )}
          {currentHash === customerHistoryHash.refund && <RefundRecord />}
          {currentHash === customerHistoryHash.upfront && <UpfrontRecord />}
        </SummaryBox>
      </CustomersHistory>
      <UpdateModal
        closeHandler={() => setIsUpdateModalOpen(false)}
        isOpen={isUpdateModalOpen}
        data={data}
      />
      <InitiateCustomerPaymentModal
        closeHandler={() => setIsUpfrontModalOpen(false)}
        isOpen={isUpfrontModalOpen}
      />
      <FundModal
        handleClose={() => setIsRefundModalOpen(false)}
        isOpen={isRefundMoadlOpen}  
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const ColumnWrapper = styled.div`
  background-color: ${({ bg }) => bg ?? "#ffff"};
  border-radius: 8px;
  padding: 20px;
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

const Value = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray800};
`;

const CustomersHistory = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: 1.5rem 1.5rem;
  border-radius: 12px;
  margin-top: 20px;
`;

const SummaryBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
`;

const StyledMenuButton = styled.button`
  display: flex;
  justify-content: center;
  text-decoration: none;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  padding: 10px 16px !important;
  border: none;
  color: white;
  background-color: ${(props) => props.theme.colors.primary300};
  border-radius: 8px;
  outline: none;
  box-shadow: 0px 1px 2px 0px #1018280d;
  width: 150px;
  height: 44px;
`;

const StyleMenuButton = styled.button`
  display: flex;
  justify-content: center;
  text-decoration: none;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  padding: 10px 16px !important;
  border: none;
  background-color: ${(props) => props.theme.colors.primary100};
  border-radius: 8px;
  outline: none;
  box-shadow: 0px 1px 2px 0px #1018280d;
  width: 150px;
  height: 44px;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Line = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.gray200} !important;
`;
