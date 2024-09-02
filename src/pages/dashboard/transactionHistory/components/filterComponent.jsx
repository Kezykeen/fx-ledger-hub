import styled from "styled-components";
import { currencyOptions, paymentStatus } from "./data";
import SMSelectDropDown from "../../../../../components/smSelect/selectDropdown";
import { useState } from "react";
import { Button } from "../../../../../components/button";
import { InputField } from "../../../../../components/inputField";

const FilterComponent = ({ setFilterOpen }) => {
  const [formData, setFormData] = useState();

  const handleClearFilter = () => {
    setFormData({});
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log({ formData });
    setFilterOpen(false);
  };

  return (
    <Container>
      <TopWrapper>
        <Title>Filter By</Title>
        <ClearTxt onClick={handleClearFilter}>Clear Filter</ClearTxt>
      </TopWrapper>
      <InputWrapper>
        <InputField
          type="date"
          name="start"
          label={`Date from`}
          value={formData?.start || ""}
          onChange={(e) => handleChange(e?.target?.name, e?.target?.value)}
        />
        <InputField
          type="date"
          name="end"
          label={`Date to`}
          value={formData?.end || ""}
          onChange={(e) => handleChange(e?.target?.name, e?.target?.value)}
        />
      </InputWrapper>
      <SMSelectDropDown
        label={"Incoming currency"}
        options={currencyOptions}
        value={formData?.currency || null}
        onChange={(selectedOption) => handleChange("currency", selectedOption)}
      />
      <SMSelectDropDown
        label={"Payment status"}
        options={paymentStatus}
        value={formData?.status || null}
        onChange={(selectedOption) => handleChange("status", selectedOption)}
      />
      <ButtonWrapper>
        <Button buttonClass={"primary"} label={"Log In"} />
        <Button
          buttonClass={"primary"}
          label={"Filter"}
          onClick={handleSubmit}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default FilterComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 400px;
  padding: 24px;
  margin-top: 10px;
  border-radius: 24px;
  background-color: #ffffff;
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
  color: #1d2939;
`;

const ClearTxt = styled.p`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: #d92d20;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
