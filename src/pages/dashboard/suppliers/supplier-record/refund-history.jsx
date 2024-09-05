import styled from "styled-components";
import { TableTab } from "../../../../components/tableTab";
import { TableWidget } from "../../../../components/tableWidget";
import { useState } from "react";
import FilterComponent from "../../customers/components/fiterComponent";
import { suppliersTab } from "../components/data";
import { Divider } from "../../transactionHistory";
import HistoryRedcord from "./history-details";

const RefundHistory = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    // Handle the active tab change logic if needed
    console.log(`Active tab changed to: ${tab}`);
  };

  return (
    <Container>
      <WidgetWrapper>
        <TableWidget
          customFilter={<FilterComponent setFilterOpen={setFilterOpen} />}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />
        <Divider />
        <TableTab tabs={suppliersTab} onTabChange={handleTabChange} />
      </WidgetWrapper>
      <HistoryRedcord />
    </Container>
  );
};

export default RefundHistory;

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const WidgetWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 12px;
  padding: 16px 24px;
  width: 100%;
`;
