import styled from "styled-components";
import { PageHeader } from "../../../components/pageHeader";
import { TableWidget } from "../../../components/tableWidget";
import { Button } from "../../../components/button";
import { PlusIcon } from "../../../assets/svgs";
import { ButtonDropdown, Flex } from "../../../components/buttonDropdown";
import SuppliersTable from "./components/suppliersTable";

const Suppliers = () => {
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
          title={"All Suppliers"}
          subTitle={"Here is an overview of all your transactions"}
        />

        <DetailRow>
          <ActionWrapper>
            <Button
              buttonClass={"primary"}
              label={
                <Flex>
                  <span>{<PlusIcon />}</span> <span>Add Supplier</span>
                </Flex>
              }
            />
          </ActionWrapper>

          <ButtonDropdown
            buttonGroup={buttonGroup}
            buttonElement={
              <Flex>
                <span>Initiate Refund</span>
              </Flex>
            }
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
  margin: ${({ margin }) => margin ?? "20px"};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;
