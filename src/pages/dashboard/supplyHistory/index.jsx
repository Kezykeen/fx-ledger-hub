import styled from "styled-components";
import { PageHeader } from "../../../components/pageHeader";
import { TableWidget } from "../../../components/tableWidget";
import FilterComponent from "../transactionHistory/components/filterComponent";
import { useState } from "react";
import { TableTab } from "../../../components/tableTab";
import { supplyHistoryTabs } from "./components/data";
import { Button } from "../../../components/button";
import { AddIcon } from "../../../assets/svgs";
import TransactionSupply from "./components/supply-transaction/transaction";
import { UpdateModal } from "../customers/components/updatePaymentModal";

const datas = {
  creditAccount: [
    { account: { label: "Solomon", value: "solomon" }, amount: "2000" },
    { account: { label: "Mbadid", value: "mbadid" }, amount: "1000" },
  ],
};


const SupplyHistory = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

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
            onClick={() => setIsUpdateModalOpen(true)}
          />
        }
      />
      <Divider />
      <WidgetWrapper>
        <TableWidget
          customFilter={<FilterComponent setFilterOpen={setFilterOpen} />}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />
        <Divider />
        <TableTab tabs={supplyHistoryTabs} onTabChange={handleTabChange} />

        <UpdateModal
          closeHandler={() => setIsUpdateModalOpen(false)}
          isOpen={isUpdateModalOpen}
          data={datas}
        />
      </WidgetWrapper>

      <TransactionSupply />
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
