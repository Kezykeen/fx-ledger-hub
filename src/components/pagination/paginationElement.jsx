import React from "react";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 0px;
  width: 100%;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? "#f0f0f0" : "white")};
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;

  color: ${({ active, theme }) =>
    active ? theme.colors.gray700 : theme.colors.gray500};

  &:hover {
    background-color: #f5f5f5;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const PageInfo = styled.span`
  margin: 0 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray700};
`;

const PaginationElement = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationWrapper>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </PageButton>
      <PageInfo>
        Page <b>{currentPage}</b> of <b>{totalPages}</b>
      </PageInfo>
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </PageButton>
    </PaginationWrapper>
  );
};

export default PaginationElement;
