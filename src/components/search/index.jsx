import { useState, useCallback } from "react";
import styled from "styled-components";
import { debounce } from "lodash"; // You'll need to install lodash

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch(term);
    }, 300),
    [onSearch]
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <SearchContainer>
      <SearchIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </SearchContainer>
  );
}

export default Search;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 42px;
  padding: 10px 40px 10px 15px;
  padding-left: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  box-shadow: 0px 1px 2px 0px #1018280d;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.Primary300};
  }
`;

const SearchIcon = styled.svg`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: #757575;
  pointer-events: none;
`;
