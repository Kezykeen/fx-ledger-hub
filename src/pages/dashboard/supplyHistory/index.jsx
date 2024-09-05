import styled from "styled-components";
import { PageHeader } from "../../../components/pageHeader";
import { TableWidget } from "../../../components/tableWidget";
import FilterComponent from "../transactionHistory/components/filterComponent";
import { useState } from "react";
import { TableTab } from "../../../components/tableTab";
import { supplyHistoryTabs } from "./components/data";
import { Button } from "../../../components/button";
import { AddIcon } from "../../../assets/svgs";
import SupplyHistoryTable from "./components/supplyTable";
import InitiateSupplyModal from "./components/initiateSupplyModal";

const SupplyHistory = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [isSupplyModalOpen, setIsSupplyModalOpen] = useState(false);

  const handleTabChange = (selectedTab) => {
    console.log("Selected tab:", selectedTab);
    // Perform actions based on the selected tab
  };

  return (
    <Container>
      <PageHeader
        title={"Supply History"}
        subTitle={"You are viewing supply history details below."}
        endComponent={
          <Button
            icon={<AddIcon />}
            label={"Initiate Supply"}
            buttonClass={"primary"}
            width={"180px"}
            onClick={() => setIsSupplyModalOpen(true)}
          />
        }
      />
      <WidgetWrapper>
        <TableWidget
          customFilter={<FilterComponent setFilterOpen={setFilterOpen} />}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />
        <Divider />
        <TableTab tabs={supplyHistoryTabs} onTabChange={handleTabChange} />
      </WidgetWrapper>
      <SupplyHistoryTable />
      <InitiateSupplyModal
        closeHandler={() => setIsSupplyModalOpen(false)}
        isOpen={isSupplyModalOpen}
      />
    </Container>
  );
};

export { SupplyHistory };

SupplyHistory.displayName = "SupplyHistory";

const Container = styled.div``;

const WidgetWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  margin-top: 1rem;
  border-radius: 12px;
  padding: 16px 24px;
  width: 100%;
`;

const Divider = styled.div`
  margin: ${({ $margin }) => $margin ?? "20px 0"};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;
