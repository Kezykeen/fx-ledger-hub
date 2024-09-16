import styled from "styled-components";
import { useState, useEffect } from "react";
import { Modal } from "../../../../components/modal";
import AccountEntry from "../../initiateTransaction/components/accountEntry";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { Button } from "../../../../components/button";
import { useForm } from "react-hook-form";
import { createAccountSchema } from "./validation";
import { PopUp } from "../../../../components/popUp";
import ToastComponent from "../../../../components/toastComponent";
import { toast } from "react-toastify";
import { DocumentUpload } from "../../../../components/documentUpload";
import { usePost } from "../../../../hooks/api";
import { updateTransactionUrl } from "../../../../urls/customer";
import { QueryKeys } from "../../../../constants/enums";

export const UpdateModal = ({ isOpen, closeHandler, data }) => {
  const initialObj = {
    debitAccount: [{ account: null, amount: "" }],
    creditAccount: [{ account: null, amount: "" }],
  };

  const [formData, setFormData] = useState(initialObj);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data, isOpen]);

  const validateForm = (updatedFormData) => {
    return Object.values(updatedFormData).every((accountArray) =>
      accountArray.every(
        (account) => account.account && account.amount.trim() !== ""
      )
    );
  };

  const {
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createAccountSchema),
  });

  const updateFormData = (updatedData) => {
    setFormData(updatedData);
    setIsFormValid(validateForm(updatedData));
  };

  const handleChange = (name, index, field, value) => {
    if (field === "amount" && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    const updatedAccounts = formData[name].map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );

    const updatedFormData = { ...formData, [name]: updatedAccounts };
    updateFormData(updatedFormData);
  };

  const handleAdd = (name) => {
    const updatedFormData = {
      ...formData,
      [name]: [...formData[name], { account: null, amount: "" }],
    };
    updateFormData(updatedFormData);
  };

  const handleRemove = (name, index) => {
    const updatedFormData = {
      ...formData,
      [name]: formData[name].filter((_, idx) => idx !== index),
    };
    updateFormData(updatedFormData);
  };

  const handleClose = () => {
    setFormData(initialObj);
    closeHandler();
  };

  const parseAccountData = (data) => {
    const parsedData = {};

    for (const key in data) {
      if (Array.isArray(data[key])) {
        parsedData[key] = data[key].map((item) => {
          const parsedItem = {};
          for (const itemKey in item) {
            if (
              typeof item[itemKey] === "object" &&
              item[itemKey] !== null &&
              "value" in item[itemKey]
            ) {
              parsedItem[itemKey] = item[itemKey].value;
            } else {
              parsedItem[itemKey] = item[itemKey];
            }
          }
          return parsedItem;
        });
      } else {
        parsedData[key] = data[key];
      }
    }

    return parsedData;
  };

  const { mutate: updateTransaction, isPending } = usePost(
    updateTransactionUrl(formData?.creditAccount[0]?.account?.value),
    () => {
      toast.success(
        <ToastComponent
          title={"Transaction Updated!"}
          message={"You have successfully updated this transaction"}
        />
      );
      setIsConfirmOpen(false);
      handleClose();
    },
    QueryKeys.transaction
  );

  const onSubmit = () => {
    const parsedData = parseAccountData(formData);
    updateTransaction(parsedData);
  };

  return (
    <>
      <Modal
        closeHandler={handleClose}
        isOpen={isOpen}
        headerText={"Update Payment"}
        subText={"Update this transaction receipt below to proceed"}
      >
        <Container>
          <InputWrapper>
            <SectionTitle>Exchange Summary</SectionTitle>
            <Line></Line>
            <DetailRow>
              <Label>Total Amount Owed</Label>
              <LabelTwo>
                XAF <span>1200</span>
              </LabelTwo>
            </DetailRow>
          </InputWrapper>
          <AccountEntry
            entryArray={formData.creditAccount}
            handleChange={handleChange}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            name="creditAccount"
            label="Credit"
          />
          <DocumentUpload
            control={control}
            register={register}
            name={"receipt"}
            errors={errors}
            label={`Upload Receipt (Optional)`}
            width={`98%`}
          />
          <BtnWrapper>
            <Button
              buttonClass={"outline"}
              label={"Cancel"}
              width={`47%`}
              onClick={handleClose}
            />
            <Button
              buttonClass={"primary"}
              label={"Complete"}
              width={`47%`}
              onClick={() => setIsConfirmOpen(true)}
              disabled={!isFormValid}
            />
          </BtnWrapper>
        </Container>
        <PopUp
          open={isConfirmOpen}
          handleClose={() => setIsConfirmOpen(false)}
          onSubmit={onSubmit}
          isLoading={isPending}
          title={"Confirm Transaction Update?"}
          subtitle={
            "Are you sure you want to proceed to update this transaction?"
          }
        />
      </Modal>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  margin-top: 20px;
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto 0 10px;
`;

const SectionTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.gray800};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  border: 1px solid ${(props) => props.theme.colors.primary300};
  gap: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary25};
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: ${({ flexWrap }) => (flexWrap ? flexWrap : "unset")};
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray500};
`;

const LabelTwo = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray500};
  & > span {
    color: ${({ theme }) => theme.colors.primary300};
  }
`;

const Line = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary100} !important;
`;
