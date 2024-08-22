import React from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useTable, usePagination, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";

import { InfiniteProgressBar } from "../InfiniteProgressBar/InfiniteProgressBar";
import PaginationElement from "../pagination/paginationElement";

const TMTable = ({
  columns,
  data,
  title,
  additionalTitleData,
  availablePages,
  setPageNumber,
  loading,
  isServerSidePagination = true,
  controlledPageCount,
  searchParams = "",
  hasPerformedQuery,
  customEmptyStateMessage,
  additionalFooterData,
  noBottomSpace,
  metaData,
  onRowClick,
  isStickyColumn = false,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    gotoPage,
    pageOptions,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      manualPagination: isServerSidePagination,
      ...(controlledPageCount && { pageCount: controlledPageCount }),
    },
    usePagination,
    useSticky,
    isStickyColumn && useBlockLayout
  );

  const list = { hidden: { opacity: loading ? 0 : 1 } };

  const rowData = isServerSidePagination ? rows : page;
  const isPageGreaterThan1 = isServerSidePagination
    ? availablePages > 1
    : pageOptions.length > 1;

  return (
    <TableWrapper>
      {title && (
        <TableHeader>
          <h3>{title}</h3>
          {additionalTitleData}
        </TableHeader>
      )}

      <TableContent>
        {loading && <InfiniteProgressBar />}
        <div className={noBottomSpace ? "" : "overflow-x-scroll"}>
          <StyledTable
            {...getTableProps()}
            initial={{ visibility: "hidden", x: -25 }}
            animate={{ visibility: "visible", x: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ filter: loading ? "blur(4px)" : "none" }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
                  {headerGroup.headers.map((column, index) => (
                    <TableHeaderCell
                      {...column.getHeaderProps()}
                      key={Math.random() * index}
                    >
                      {column.render("Header")}
                    </TableHeaderCell>
                  ))}
                </tr>
              ))}
            </thead>
            <TBody style={{ gap: "1rem" }} {...getTableBodyProps()}>
              <AnimatePresence mode="wait">
                {rowData.map((row) => {
                  prepareRow(row);
                  return (
                    <>
                      <TableRow
                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                        variants={list}
                        {...row.getRowProps()}
                        key={Math.PI * Math.random()}
                      >
                        {row.cells.map((cell, index, array) => (
                          <TableCell
                            {...cell.getCellProps()}
                            key={index}
                            initial={{ visibility: "hidden", x: -20 }}
                            animate={{ visibility: "visible", x: 5 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            style={{
                              borderRadius:
                                index === 0
                                  ? "20px 0px 0px 20px"
                                  : index === array?.length - 1
                                  ? "0px 20px 20px 0px"
                                  : "0px",
                            }}
                          >
                            {cell.render("Cell")}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow
                        className="separator"
                        colspan={`${row?.cells?.length}`}
                      ></TableRow>
                    </>
                  );
                })}
              </AnimatePresence>
            </TBody>
          </StyledTable>
        </div>
        {!loading && rowData.length === 0 && (
          <EmptyState>
            {hasPerformedQuery ? (
              <div>search error</div>
            ) : (
              <div>empty state</div>
            )}
            <h4>
              {hasPerformedQuery
                ? `No result found${
                    searchParams && ` for  "${searchParams}"`
                  }, check your selection and try again`
                : customEmptyStateMessage ||
                  "Your request results will be displayed here"}
            </h4>
          </EmptyState>
        )}
        {!noBottomSpace && isPageGreaterThan1 && (
          <TableFooter>
            <div
              style={{ filter: loading ? "blur(4px)" : "none", width: "100%" }}
            >
              <PaginationElement
                onPageChange={isServerSidePagination ? setPageNumber : gotoPage}
                totalPages={
                  isServerSidePagination ? availablePages : pageOptions.length
                }
                currentPage={
                  isServerSidePagination ? page : pageOptions[pageIndex]
                }
              />
            </div>
          </TableFooter>
        )}
        <div>{additionalFooterData}</div>
      </TableContent>
    </TableWrapper>
  );
};

export { TMTable };

const TableWrapper = styled.div`
  border-radius: 8px;
  padding: 24px 0;
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
`;

const TableHeader = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-bottom: 1px solid #e0e0e0;
  padding: 20px 24px;
`;

const TableContent = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled(motion.table)`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeaderCell = styled.th`
  background-color: #ffffff;
  padding: 13px 15px;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray500};
  text-align: start;
`;

const TableRow = styled(motion.tr)`
  border-radius: 12px;
  background-color: white;
  &.separator {
    height: 13px;
  }
`;

const TableCell = styled(motion.td)`
  max-width: 200px;
  background-color: #f2f4f799;
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray800};
`;
const TBody = styled(motion.tbody)``;
const EmptyState = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 0;
  padding: 20px;
`;

const TableFooter = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 16px;
`;
