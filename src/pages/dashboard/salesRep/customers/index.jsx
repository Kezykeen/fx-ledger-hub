import styled from "styled-components";
import { PageHeader } from "../../../../components/pageHeader";
import { TableWidget } from "../../../../components/tableWidget";
import Customers from "./components/customers";
import { ButtonDropdown, Flex } from "../../../../components/buttonDropdown";


const CustomersHistory = () => {
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
    <Container>
      <DetailRow>
        <PageHeader
          title={"All Customers"}
          subTitle={"Here is an overview of all your transactions "}
        />

        <DetailRow>
          <ButtonDropdown 
            buttonGroup={buttonGroup}
            buttonElement={
              <Flex>
                <span>Actions</span>
              </Flex>
            }
          />
        </DetailRow>
      </DetailRow>
      <WidgetWrapper>
        <TableWidget />
      </WidgetWrapper>
      <Customers />
    </Container>
  );
};

export { CustomersHistory };

CustomersHistory.displayName = "CustomersHistory";

const Container = styled.div`
  /* Add your styles here */
`;
const WidgetWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  margin-top: 1rem;
  border-radius: 12px;
  padding: 16px 24px;
  width: 100%;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-wrap: ${({ flexWrap }) => (flexWrap ? flexWrap : "unset")};
`;

export const Divider = styled.div`
  margin: ${({ margin }) => margin ?? "20px"};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;
