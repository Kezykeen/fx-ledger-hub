import styled from "styled-components";
import { PageHeader } from "../../../components/pageHeader";
import { TableWidget } from "../../../components/tableWidget";
import FilterComponent from "../transactionHistory/components/filterComponent";
import { useEffect, useState } from "react";
import { TableTab } from "../../../components/tableTab";
import { paymentTabs } from "./components/data";
import PendingTable from "./components/pendingTable";
import { paymentHash } from "./components/data";
import UpfrontTable from "./components/upfrontTable";
import { AddIcon } from "../../../assets/svgs";
import { Button } from "../../../components/button";
import InitiatePaymentModal from "./components/initiatePaymentModal";
import { useLocation } from "react-router-dom";

const Payments = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(paymentTabs[0].hash);
  const { hash } = useLocation();
  const urlHash = hash.substring(1);

  useEffect(() => {
    setCurrentHash(urlHash);
  }, [urlHash]);

  const handleTabChange = (selectedTab) => {
    setCurrentHash(selectedTab);
  };

  return (
    <Container>
      <PageHeader
        title={"Payments"}
        subTitle={"Here is an overview of all your payments"}
        endComponent={
          currentHash === paymentHash.upfront ? (
            <Button
              icon={<AddIcon />}
              label={"Initiate upfront"}
              buttonClass={"primary"}
              width={"180px"}
              onClick={() => setIsPaymentModalOpen(true)}
            />
          ) : null
        }
      />
      <WidgetWrapper>
        <TableWidget
          customFilter={
            currentHash === paymentHash.pending ? (
              <FilterComponent setFilterOpen={setFilterOpen} />
            ) : null
          }
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />
        <Divider />
        <TableTab tabs={paymentTabs} onTabChange={handleTabChange} />
      </WidgetWrapper>
      {currentHash === paymentHash.pending ? (
        <PendingTable />
      ) : (
        <UpfrontTable />
      )}
      <InitiatePaymentModal
        closeHandler={() => setIsPaymentModalOpen(false)}
        isOpen={isPaymentModalOpen}
      />
    </Container>
  );
};

export { Payments };

Payments.displayName = "Payments";

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
