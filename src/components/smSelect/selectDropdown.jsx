"use client";
import { forwardRef } from "react";
import Select, { components } from "react-select";
import { colors } from "../../theme/colors";
import styled from "styled-components";
import { ValidationText } from "../validationText";
/**
 * Custom Select component with React Select library.
 * @module SMSelect
 * @param {Object} props - Component props.
 * @param {Array} [props.options] - Array of options to display in the dropdown.
 * @param {string} [props.varient='simple'] - Select variant, either 'simple' or 'custom'.
 * @param {Function} [props.onChange=()=>{}] - Function called when an option is selected.
 * @param {string} [props.selectWidth='100%'] - Width of the select input.
 * @param {string} [props.placeholder='Hello'] - Placeholder text displayed when no option is selected.
 * @param {boolean} [props.disabled] - Determines if the select input is disabled.
 * @param {boolean} [props.loading] - Determines if the select input is in a loading state.
 * @param {*} [props.defaultInputValue] - Default value for the select input.
 * @param {*} [props.value] - Value of the selected option.
 * @param {boolean} [props.searchable] - Determines if the select input is searchable.
 * @param {string} [props.id] - HTML id attribute for the select input.
 * @param {boolean} [props.isError=false] - Determines if there is an error state.
 * @param {string} [props.errorText=''] - Text to display when there is an error.
 * @param {React.Ref} [ref] - Reference to the select component.
 * @returns {React.Component} React component.
 */
export const selectStyles = ({ isError }) => ({
  input: (styles) => ({
    ...styles,
    "&:not(.aui-no-focusvisible) :focus-visible": {
      boxShadow: "none",
      border: "none",
    },
  }),
  menu: (provided) => ({
    ...provided,
    overflowY: "auto",
    scrollbarColor: "transparent",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent !important",
      borderRadius: "2.5px",
      height: "50px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent !important",
      borderBottomRightRadius: "16px",
    },
    "&::-webkit-scrollbar-thumb, &::-webkit-scrollbar-track": {
      background: "transparent",
    },
  }),
  control: (styles, { isDisabled, isFocused }) => ({
    ...styles,
    borderRadius: "4px",
    outline: "none",
    cursor: "pointer",
    border: `1px solid ${isError ? "red" : isFocused ? `#f4a261` : colors.N30}`,
    minHeight: "40px",
    width: `100%`,
    color: isDisabled ? "#97a0af" : "#97a0af",
    backgroundColor: isDisabled ? "#f4f5f7" : colors.white,
    boxShadow: isFocused && `0 0 0 1px #f4a261`,
    "&:hover": {
      border: isFocused
        ? `1px solid #f4a261`
        : isError
        ? "1px solid red"
        : "1px solid #dfe1e6",
    },
  }),
  option: (styles, { isDisabled, isSelected }) => ({
    ...styles,
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "20px",
    cursor: "pointer",
    color: isDisabled ? "#97a0af" : colors.N700,
    backgroundColor: isDisabled
      ? "#f4f5f7"
      : isSelected
      ? colors.N30
      : colors.white,
    "&:hover": {
      backgroundColor: isSelected ? colors.N30 : colors.N20,
    },
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "20px",
    color: "#97a0af",
  }),
  valueContainer: (styles) => ({
    ...styles,
    borderLeft: "none",
    fontSize: "14px",
    minHeight: "40px",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: "none",
    fontSize: "14px",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: "#42526E",
    fontSize: "14px",
  }),
  autosizeInput: (styles) => ({
    ...styles,
    "&:not(.aui-no-focusvisible) :focus-visible": {
      boxShadow: "none",
    },
  }),
});

// eslint-disable-next-line react/display-name
const SMSelectDropDown = forwardRef(
  (
    {
      options = [],
      varient = "simple",
      onChange = () => {},
      placeholder,
      disabled,
      loading,
      defaultInputValue,
      value,
      searchable,
      id,
      width,
      isError = false,
      errorText = "",
      ...field
    },
    ref
  ) => {
    const handleChange = async (value) => {
      const awaitedValue = await value;
      onChange(awaitedValue);
    };
    const customOption = ({ data, ...props }) => (
      <components.Option {...props}>
        <div style={{ display: "flex", gap: ".3rem", alignItems: "center" }}>
          {data.icon && (
            <img
              src={data.icon}
              alt="icon"
              style={{ marginRight: 10, objectFit: "contain" }}
              height={18}
              width={18}
            />
          )}
          <span style={{ whiteSpace: "nowrap" }}>{data.label}</span>
        </div>
      </components.Option>
    );
    const customSingleValue = ({ data }) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
        }}
      >
        {data.icon && (
          <img
            src={data.icon}
            alt="icon"
            style={{ objectFit: "contain" }}
            height={18}
            width={18}
          />
        )}
        <span style={{ whiteSpace: "nowrap" }}>{data?.label}</span>
      </div>
    );
    return (
      <Container $width={width}>
        <Select
          ref={ref}
          options={options}
          onChange={handleChange}
          placeholder={placeholder}
          isDisabled={disabled}
          isLoading={loading}
          value={value}
          defaultValue={defaultInputValue}
          isSearchable={searchable}
          id={id}
          styles={selectStyles({ isError })}
          components={
            varient === "simple"
              ? {}
              : { Option: customOption, SingleValue: customSingleValue }
          }
          {...field}
        />
        <div>
          {errorText.length > 0 && <ValidationText message={errorText} />}
        </div>
      </Container>
    );
  }
);
export default SMSelectDropDown;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => ($width ? $width : `100%`)};
`;
