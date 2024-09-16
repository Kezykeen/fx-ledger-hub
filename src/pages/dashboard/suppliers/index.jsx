import styled from "styled-components";
import { PageHeader } from "../../../components/pageHeader";
import { TableWidget } from "../../../components/tableWidget";
import { PlusIcon } from "../../../assets/svgs";
import SuppliersTable from "./components/suppliersTable";
import { Button } from "../../../components/button";
import { useState } from "react";
import { Flex } from "../../../components/buttonDropdown";
import AddSupplierAccountModal from "./components/supplier-popup/addSupplierModal";
import RefundModal from "./components/supplier-popup/refundModal";

const Suppliers = () => {
  const [isAddSupplier, setIsAddSupplier] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);

  return (
    <Container>
      <DetailRow>
        <PageHeader
          title={"All Suppliers"}
          subTitle={"Here is an overview of all your transactions"}
        />

        <DetailRow>
          <ActionWrapper>
            <Button
              buttonClass={"outline"}
              onClick={() => setIsAddSupplier(true)}
              label={
                <Flex>
                  <span>{<PlusIcon />}</span> <span>Add Supplier</span>
                </Flex>
              }
            />
          </ActionWrapper>

          <div>
            <Button
              onClick={() => {
                setIsRefundOpen(true);
              }}
              buttonClass={"primary"}
              width={"186px"}
              label={
                <Flex>
                  <span>Intiate Refund</span>
                </Flex>
              }
            />
          </div>
        </DetailRow>
      </DetailRow>
      <WidgetWrapper>
        <TableWidget />
      </WidgetWrapper>
      <SuppliersTable />

      <AddSupplierAccountModal
        handleClose={() => setIsAddSupplier(false)}
        isOpen={isAddSupplier}
      />

      <RefundModal
        handleClose={() => setIsRefundOpen(false)}
        isOpen={isRefundOpen} 
        />
    </Container>
  );
};

export { Suppliers };

Suppliers.displayName = "SupplyHistory";

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

const ActionWrapper = styled.div`
  padding-left: 24px;
  padding-right: 24px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-wrap: ${({ flexWrap }) => (flexWrap ? flexWrap : "unset")};
`;

export const Divider = styled.div`
  margin: ${({ margin }) => margin ?? "20px 0"};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;
