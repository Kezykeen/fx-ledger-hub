import SMSelectDropDown from "../../../../components/smSelect/selectDropdown";
import { accountDetailsOptions } from "./data";
import { InputField } from "../../../../components/inputField";
import { AddIcon, DeleteIcon } from "../../../../assets/svgs";
import styled from "styled-components";

const AccountEntry = ({
  entryArray,
  handleChange,
  handleAdd,
  handleRemove,
  name,
  label,
}) => {
  console.log({ entryArray });
  return (
    <Container>
      <EntryTitle>{`${label} Account Details`}</EntryTitle>
      {entryArray.map((item, index) => (
        <EntryBox key={index}>
          <InputWrapper>
            <SMSelectDropDown
              placeholder={`Select ${label} Account`}
              label={`${label} Account Details ${index + 1}`}
              options={accountDetailsOptions}
              value={item.accountId}
              onChange={(selectedOption) =>
                handleChange(name, index, "accountId", selectedOption)
              }
            />
            <InputField
              label={`Amount ${index + 1}`}
              name={`${name}[${index}].amount`}
              placeholder={`Enter amount`}
              value={item.amount}
              onChange={(e) =>
                handleChange(name, index, "amount", e.target.value)
              }
            />
          </InputWrapper>
          {!!index && <DeleteIcon onClick={() => handleRemove(name, index)} />}
        </EntryBox>
      ))}
      <AddWrapper onClick={() => handleAdd(name)}>
        <AddIcon />
        <AddText>Add New Account</AddText>
      </AddWrapper>
    </Container>
  );
};

export default AccountEntry;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EntryTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray900};
`;

const EntryBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 18px 18px 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray50};

  & > svg {
    position: absolute;
    top: 14px;
    right: 10px;
    height: 16px;
    width: 16px;
    cursor: pointer;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const AddWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const AddText = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: #344054;
`;
