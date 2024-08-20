import styled from "styled-components";
import { PageHeader } from "../../../../components/pageHeader";
import Transactions from "./components/transaction";
import { TableWidget } from "../../../../components/tableWidget";
import { TableTab } from "../../../../components/tableTab";

const TransactionHistory = () => {
  const handleTabChange = (selectedTab) => {
    console.log("Selected tab:", selectedTab);
    // Perform actions based on the selected tab
  };
  return (
    <Container>
      <PageHeader
        title={"Transaction History"}
        subTitle={"Here is an overview of all your transactions "}
      />
      <WidgetWrapper>
        <TableWidget />
        <Divider />
        <TableTab
          tabs={["In Progress", "Approved", "Declined"]}
          defaultActiveTab="Declined"
          onTabChange={handleTabChange}
        />
      </WidgetWrapper>
      <Transactions />
    </Container>
  );
};

export { TransactionHistory };

TransactionHistory.displayName = "TransactionHistory";

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

export const Divider = styled.div`
  margin: ${({ margin }) => margin ?? "20px"};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;
