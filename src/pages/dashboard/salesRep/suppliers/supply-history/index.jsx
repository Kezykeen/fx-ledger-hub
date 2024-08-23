import styled from "styled-components";
import { PageHeader } from "../../../../../components/pageHeader";
import { Divider } from "..";
import { colors } from "../../../../../theme/colors";
import { ButtonDropdown, Flex } from "../../../../../components/buttonDropdown";
import { TableTab } from "../../../../../components/tableTab";
import { CustomerRecord } from "../../customers/components/customer-history/transcation-history";


const suppliers = {
  date: "June 4,2023",
  customerName: "John Doe",
  customerCounrty: "Nigeria",
  customerAddress: "51 Value Waters, Ago Palaceway",
  customerCity: "Lagos",
  customerState: "Lagos State",
  phoneNumber: "08120289349",
};

export const SuppliersOverview = () => {
  const buttonGroup = [
    {
      name: "View",
      onClick: () => {},
    },
    {
      name: "Edit",
      onClick: () => {},
    },
    {
      name: "Delete",
      textColor: "R300",
      onClick: () => {},
    },
  ];
  return (
    <PageContainer>
      <DetailRow>
        <PageHeader
          title={"Supply History"}
          subTitle={"You are viewing supply history details below."}
        />
        <div>
          
          
        </div>
      </DetailRow>
      <ColumnWrapper>
        <DetailRow>
          <SectionTitle>Customer Details</SectionTitle>
          <Value>
            <Label>Date</Label>: {suppliers?.date}
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
          <Value style={{ width: "100%" }}>{suppliers?.customerAddress}</Value>
        </DetailRow>
      </ColumnWrapper>

      <CustomersHistory>
        <DetailRow>
          <PageHeader
            title={"Customer History"}
            subTitle={
              "You are viewing customer history below. Please select the history you wish to view"
            }
          />
          <div>
            <ButtonDropdown
              buttonGroup={buttonGroup}
              buttonElement={
                <Flex>
                  <span>All Teams</span>
                </Flex>
              }
            />
          </div>
        </DetailRow>
        <TableTab
          tabs={["Transaction History", "Refund History", "Supply History"]}
          backgroundColor="gray100"
        />

        <SummaryBox>
            <CustomerRecord />
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
  background-color: ${({ bg }) => bg ?? "#f8f8f8"};
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
