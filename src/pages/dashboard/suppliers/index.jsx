import styled from "styled-components";
import { PageHeader } from "../../../components/pageHeader";
import { TableWidget } from "../../../components/tableWidget";
import { PlusIcon } from "../../../assets/svgs";
import SuppliersTable from "./components/suppliersTable";
import { Button } from "../../../components/button";
import { useState } from "react";
import { Flex } from "../../../components/buttonDropdown";
import { UpdateModal } from "../customers/components/updatePaymentModal";

const data = {
  creditAccount: [
    { account: { label: "Solomon", value: "solomon" }, amount: "2000" },
    { account: { label: "Mbadid", value: "mbadid" }, amount: "1000" },
  ],
};

const Suppliers = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
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
              onClick={() => {
                setIsUpdateModalOpen(true);
              }}
              buttonClass={"outline"}
              label={
                <Flex>
                  <span>{<PlusIcon />}</span> <span>Add Customer</span>
                </Flex>
              }
            />
          </ActionWrapper>

          <div>
            <Button
              onClick={() => {
                setIsUpdateModalOpen(true);
              }}
              buttonClass={"primary"}
              label={
                <Flex>
                  <span>Intiate Refund</span>
                </Flex>
              }
            />
          </div>
          <UpdateModal
            closeHandler={() => setIsUpdateModalOpen(false)}
            isOpen={isUpdateModalOpen}
            data={data}
          />
        </DetailRow>
      </DetailRow>
      <WidgetWrapper>
        <TableWidget />
      </WidgetWrapper>
      <SuppliersTable />
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
