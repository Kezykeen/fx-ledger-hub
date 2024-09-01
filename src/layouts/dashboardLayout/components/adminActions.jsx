import styled from "styled-components";
import { ButtonDropdown } from "../../../components/buttonDropdown";
import { useState } from "react";
import { Button } from "../../../components/button";
import { DropdownIcon } from "../../../assets/svgs";
import { useNavigate } from "react-router-dom";

const AdminActions = () => {
  const navigate = useNavigate();
  const [exportOpen, setExportOpen] = useState(false);

  const adminActions = [
    {
      name: "Initiate Transaction",
      onClick: () => navigate("initiate-transaction"),
    },
    {
      name: "Initiate Upfront",
      onClick: () => {},
    },
    {
      name: "Initiate Customer Refunds",
      onClick: () => {},
    },
    {
      name: "Initiate Supplier Refunds",
      onClick: () => {},
    },
    {
      name: "Initiate Supply",
      onClick: () => {},
    },
    {
      name: "Add Customer",
      onClick: () => {},
    },
    {
      name: "Add Supplier",
      onClick: () => {},
    },
    {
      name: "Withdraw",
      onClick: () => {},
    },
    {
      name: "Fund",
      onClick: () => {},
    },
    {
      name: "Add Account",
      onClick: () => {},
    },
  ];

  return (
    <ButtonDropdown
      open={exportOpen}
      setOpen={setExportOpen}
      buttonGroup={adminActions}
      width={`100%`}
      buttonElement={
        <Button
          buttonClass={"primary"}
          label={
            <Flex>
              Actions <DropdownIcon />
            </Flex>
          }
        />
      }
    />
  );
};

export default AdminActions;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
`;
