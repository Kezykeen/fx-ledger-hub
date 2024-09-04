import styled from "styled-components";
import { PageHeader } from "../../../../components/pageHeader";
import { Divider } from "..";
import { useState } from "react";
import { colors } from "../../../../theme/colors";
import { TableTab } from "../../../../components/tableTab";
import { supplierDetailsTab } from "../components/data";
import { ButtonDropdown } from "../../../../components/buttonDropdown";
import { DropdownIcon } from "../../../../assets/svgs";
import { Outlet, useNavigate } from "react-router-dom";
import { UpdateModal } from "../../customers/components/updatePaymentModal";

const suppliers = {
  date: "June 4,2023",
  currency: "XFA",
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

export const SupplierDetails = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const navigate = useNavigate();

  const exportButtonGroup = [
    {
      name: "Initial Refund",
      onClick: () => {
        setIsUpdateModalOpen(true);
      },
    },
    {
      name: "Initial Supply",
      onClick: () => {
        setIsUpdateModalOpen(true);
      },
    },
    {
      name: "Edit",
      onClick: () => {
        setIsUpdateModalOpen(true);
      },
    },
  ];

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    // Handle the active tab change logic if needed
    console.log(`Active tab changed to: ${tab}`);
  };
  const handleTabClick = (hash) => {
    switch (hash) {
      case "transaction-history":
        navigate("");
        break;
      case "refund-history":
        navigate("");
        break;
      default:
        navigate(`#${hash}`);
        break;
    }
  };
  return (
    <PageContainer>
      <DetailRow>
        <PageHeader
          title={"Supply Details"}
          subTitle={"You are viewing customer details below."}
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

      <CustomersHistory>
        <ColumnWrapper>
          <DetailRow>
            <SectionTitle>Supplier Details</SectionTitle>
            <Value>
              <DetailRow>
                <Label>
                  Currency: <span> {suppliers?.currency}</span>
                </Label>
                <Span></Span>
                <Label>Date Added</Label>: {suppliers?.date}
              </DetailRow>
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
              {suppliers?.customerName}
            </Value>
            <Value style={{ width: "100%", color: colors.gray800 }}>
              {suppliers?.customerCounrty}
            </Value>
            <Value style={{ width: "100%" }}>{suppliers?.customerCity}</Value>
          </DetailRow>
          <DetailRow>
            <Label style={{ width: "100%" }}>State</Label>
            <Label style={{ width: "100%" }}>Phone Number</Label>
            <Label style={{ width: "100%" }}>Address</Label>
          </DetailRow>
          <DetailRow>
            <Value style={{ width: "100%", color: colors.gray800 }}>
              {suppliers?.customerState}
            </Value>
            <Value style={{ width: "100%", color: colors.gray800 }}>
              {suppliers?.phoneNumber}
            </Value>
            <Value style={{ width: "100%" }}>
              {suppliers?.customerAddress}
            </Value>
          </DetailRow>
        </ColumnWrapper>
      </CustomersHistory>

      <CustomersHistory>
        <DetailRow>
          <PageHeader
            title={"Supplier History"}
            subTitle={"You are viewing supply history below."}
          />
        </DetailRow>
        <Border></Border>
        <TableTab
          tabs={supplierDetailsTab}
          backgroundColor="gray100"
          onTabChange={handleTabChange}
          onTabClick={handleTabClick}
          padding="16px 0"
        />

        <SummaryBox>
          <Outlet />
        </SummaryBox>
      </CustomersHistory>
      <UpdateModal
        closeHandler={() => setIsUpdateModalOpen(false)}
        isOpen={isUpdateModalOpen}
        data={data}
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

  & > span {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary300};
  }
`;

const Border = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`

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

const Span = styled.span`
  width: 4px;
  height: 22px;
  margin: 0 10px;
  border-radius: 56px;
  opacity: 0px;
  background: ${({ theme }) => theme.colors.gray300};
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
