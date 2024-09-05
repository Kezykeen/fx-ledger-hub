import styled from "styled-components";
import { ButtonDropdown, Flex } from "../buttonDropdown";
import { DownloadMini, FilterIcon } from "../../assets/svgs";
import Search from "../search";
import { useState } from "react";

const TableWidget = ({ customFilter, filterOpen, setFilterOpen }) => {
  const [exportOpen, setExportOpen] = useState(false);

  const exportButtonGroup = [
    {
      name: "CSV",
      onClick: () => {},
    },
    {
      name: "Excel",
      onClick: () => {},
    },
    {
      name: "PDF",
      onClick: () => {},
    },
  ];

  return (
    <TableWidgetWrapper>
      <Flex>
        {customFilter && (
          <ButtonDropdown
            open={filterOpen}
            setOpen={setFilterOpen}
            customElement={customFilter}
            buttonElement={
              <StyledMenuButton>
                <Icon>
                  <FilterIcon className="svg" />
                </Icon>
                <span>Filters</span>
              </StyledMenuButton>
            }
          />
        )}
        <Search />
      </Flex>
      <div>
        <ButtonDropdown
          open={exportOpen}
          setOpen={setExportOpen}
          buttonGroup={exportButtonGroup}
          buttonElement={
            <StyledMenuButton>
              <DownloadMini />
              <span>Export</span>
            </StyledMenuButton>
          }
        />
      </div>
    </TableWidgetWrapper>
  );
};

export { TableWidget };

const StyledMenuButton = styled.button`
  display: flex;
  text-decoration: none;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  padding: 10px 16px !important;
  border: 1px solid ${(props) => props.theme.colors.gray100} !important;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  outline: none;
  box-shadow: 0px 1px 2px 0px #1018280d;
`;

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
