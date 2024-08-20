import React from "react";
import styled from "styled-components";
import { ButtonDropdown, Flex } from "../buttonDropdown";
import { DownloadMini, FilterIcon } from "../../assets/svgs";
import Search from "../search";

const TableWidget = () => {
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
    <TableWidgetWrapper>
      <Flex>
        <ButtonDropdown
          buttonGroup={buttonGroup}
          buttonElement={
            <Flex>
              <Icon>
                <FilterIcon className="svg" />
              </Icon>
              <span>Filters</span>
            </Flex>
          }
        />
        <Search />
      </Flex>
      <div>
        <ButtonDropdown
          buttonGroup={buttonGroup}
          buttonElement={
            <Flex>
              <DownloadMini />
              <span>Export</span>
            </Flex>
          }
        />
      </div>
    </TableWidgetWrapper>
  );
};

export { TableWidget };

const TableWidgetWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  & > div:first-of-type {
    width: 80%;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  & > .svg {
    scale: 0.8;
  }
`;
