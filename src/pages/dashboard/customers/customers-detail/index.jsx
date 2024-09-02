import styled from "styled-components";
import { PageHeader } from "../../../../components/pageHeader";
import { Divider } from "..";
import { colors } from "../../../../theme/colors";
import { ButtonDropdown } from "../../../../components/buttonDropdown";
import { TableTab } from "../../../../components/tableTab";
import { useState } from "react";
import { ArrowDown } from "../../../../assets/svgs";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { customerDetailsTab } from "../components/data";

const customer = {
  date: "June 4,2023",
  customerName: "John Doe",
  customerCounrty: "Nigeria",
  customerAddress: "51 Value Waters, Ago Palaceway",
  customerCity: "Lagos",
  customerState: "Lagos State",
  phoneNumber: "08120289349",
};

export const CustomerDetailsOverview = () => {
  const [exportOpen, setExportOpen] = useState(false);
  const [textOpen, setTextOpen] = useState(false);
  const navigate = useNavigate();

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
  const exportTextGroup = [
    {
      name: "CFA",
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

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    // Handle the active tab change logic if needed
    console.log(`Active tab changed to: ${tab}`);
  };
  const handleTabClick = (tab) => {
    switch (tab) {
      case "Transaction History":
        navigate("");
        break;
      case "Refund History":
        navigate("refund");
        break;
      case "Upfront History":
        navigate("upfront");
        break;
      default:
        break;
    }
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
            buttonElement={
              <StyledMenuButton>
                <span>Actions</span>
                <ArrowDown />
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
                  <ArrowDown />
                </StyleMenuButton>
              }
            />
          </div>
        </FlexRow>
        <Line></Line>
        <TableTab
          tabs={customerDetailsTab}
          backgroundColor="gray100"
          onTabChange={handleTabChange}
          onTabClick={handleTabClick}
          padding="16px 0"
        />

        <SummaryBox>
          <Outlet />
        </SummaryBox>
      </CustomersHistory>
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
  background-color: ${(props) => props.theme.colors.Primary300};
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
  background-color: ${(props) => props.theme.colors.Primary100};
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
