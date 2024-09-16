import styled from "styled-components";
import { PageHeader } from "../../../components/pageHeader";
import { TableWidget } from "../../../components/tableWidget";
import Customers from "./components/customers";
import { Button } from "../../../components/button";
import { DropdownIcon, PlusIcon } from "../../../assets/svgs";
import { UpdateModal } from "./components/updatePaymentModal";
import { ButtonDropdown, Flex } from "../../../components/buttonDropdown";
import { useState } from "react";
import FilterComponent from "./components/fiterComponent";
import InitiateCustomerPaymentModal from "./components/customer-popup/initiatePaymentModal";
import FundModal from "./components/customer-popup/fundModal";
import AddCustomerAccountModal from "./components/customer-popup/addCustomerModal";


const CustomersHistory = () => {
  const [isUpfrontModalOpen, setIsUpfrontModalOpen] = useState(false);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isRefundMoadlOpen, setIsRefundModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const exportButtonGroup = [
    {
      name: "Update Payment",
      onClick: () => {
        setIsUpdateModalOpen(true);
      },
    },
    {
      name: "Initial Refund",
      onClick: () => {
        setIsRefundModalOpen(true);
      },
    },
    {
      name: "initial Upfront",
      onClick: () => {
        setIsUpfrontModalOpen(true);
      },
    },
  ];

  return (
    <Container>
      <DetailRow>
        <PageHeader
          title={"All Customers"}
          subTitle={"Here is an overview of all your transactions"}
        />
        <DetailRow>
          <ActionWrapper>
            <Button
              onClick={() => {
                setIsAddCustomerModalOpen(true);
              }}
              buttonClass={"outline"}
              label={
                <Flex>
                  <span>{<PlusIcon />}</span> <span>Add Customer</span>
                </Flex>
              }
            />
          </ActionWrapper>
          <ButtonDropdown
            open={exportOpen}
            setOpen={setExportOpen}
            buttonGroup={exportButtonGroup}
            width={`unset`}
            buttonElement={
              <StyledMenuButton>
                <span>Actions</span>
                <DropdownIcon />
              </StyledMenuButton>
            }
          />
        </DetailRow>
      </DetailRow>
      <WidgetWrapper>
        <TableWidget
          customFilter={<FilterComponent setFilterOpen={setFilterOpen} />}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />
      </WidgetWrapper>
      <Customers />
      <UpdateModal
        closeHandler={() => setIsUpdateModalOpen(false)}
        isOpen={isUpdateModalOpen}
        
      />
      <InitiateCustomerPaymentModal
        closeHandler={() => setIsUpfrontModalOpen(false)}
        isOpen={isUpfrontModalOpen}
      />
      <FundModal
        handleClose={() => setIsRefundModalOpen(false)}
        isOpen={isRefundMoadlOpen}  
      />
      <AddCustomerAccountModal
        handleClose={() => setIsAddCustomerModalOpen(false)}
        isOpen={isAddCustomerModalOpen}
      />
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

const StyledMenuButton = styled.button`
  display: flex;
  justify-content: center;
  text-decoration: none;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  padding: 10px 16px !important;
  border: 1px solid ${(props) => props.theme.colors.gray100} !important;
  background-color: ${(props) => props.theme.colors.primary300};
  color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  outline: none;
  box-shadow: 0px 1px 2px 0px #1018280d;
  width: 186px;
  height: 44px;
`;

const ActionWrapper = styled.div`
  padding-left: 24px;
  padding-right: 24px;
`;

const DetailRow = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: ${({ flexWrap }) => (flexWrap ? flexWrap : "unset")};
  z-index: 9;
`;

export const Divider = styled.div`
  margin: ${({ margin }) => margin ?? "20px 0"};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;
