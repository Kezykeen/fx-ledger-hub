import styled from "styled-components";
import { TableWidget } from "../../../../../components/tableWidget";
import { TableTab } from "../../../../../components/tableTab";
import { PageHeader } from "../../../../../components/pageHeader";
import Transactions from "../customer-record/customer-transaction";
import { customerTab } from "../data";
import { useState } from "react";

const CustomerRecord = () => {
  const [activeTab, setActiveTab] = useState(customerTab[0].hash);

  const handleTabChange = (selectedTab) => {
    setActiveTab(selectedTab);
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
          tabs={customerTab}
          handleStateTab={handleTabChange}
          activeStateTab={activeTab}
        />
      </WidgetWrapper>
      <Transactions />
    </Container>
  );
};

export { CustomerRecord };

CustomerRecord.displayName = "CustomerRecord";

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
