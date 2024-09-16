import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { Modal } from "../../../../../components/modal";
import AccountEntry from "../../../initiateTransaction/components/accountEntry";
import { Button } from "../../../../../components/button";
import { initiatePaymentSchema } from "../validation";
import { PopUp } from "../../../../../components/popUp";
import ToastComponent from "../../../../../components/toastComponent";
import { toast } from "react-toastify";
import { DocumentUpload } from "../../../../../components/documentUpload";

export const UpdateModal = ({ isOpen, closeHandler }) => {
  const initialObj = {
    debitAccount: [{ account: null, amount: "" }],
    creditAccount: [{ account: null, amount: "" }],
  };

  const [formData, setFormData] = useState(initialObj);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(initiatePaymentSchema),
  });

  const validateForm = (updatedFormData) => {
    return Object.values(updatedFormData).every((accountArray) =>
      accountArray.every(
        (account) => account.account && account.amount.trim() !== ""
      )
    );
  };

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
    reset,
    closeHandler();
  };

  const parseAccountData = (data) => {
    const parsedData = {};

    for (const key in data) {
      if (Array.isArray(data[key])) {
        // If the value is an array, iterate over its items
        parsedData[key] = data[key].map((item) => {
          const parsedItem = {};
          for (const itemKey in item) {
            if (
              typeof item[itemKey] === "object" &&
              item[itemKey] !== null &&
              "value" in item[itemKey]
            ) {
              // Extract the "value" key from the object
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

  const onSubmit = () => {
    const parsedData = parseAccountData(formData);
    console.log({ parsedData });
    toast.success(
      <ToastComponent
        title={"Transaction Approved!"}
        message={"You have successfully approved this transaction"}
      />
    );
    setIsConfirmOpen(false);
    closeHandler();
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
          <SummaryBox>
            <Text>Exchange Summary</Text>
            <Line />
            <DetailRow>
              <Label>Total Amount Owed</Label>
              <LabelTwo>
                CFA <span>1200</span>
              </LabelTwo>
            </DetailRow>
          </SummaryBox>
          <AccountEntry
            entryArray={formData.creditAccount}
            handleChange={handleChange}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            name="creditAccount"
            label="Credit"
          />
          <InputWrapper>
            <DocumentUpload
              control={control}
              name={"receipt"}
              errors={errors}
              label={`Upload Receipt (Optional)`}
              width={`98%`}
            />
          </InputWrapper>
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
          onSubmit={handleSubmit(onSubmit)}
          title={"Confirm Transaction Approval?"}
          subtitle={
            "Are you sure you want to proceed to approve this transaction?"
          }
        />
      </Modal>
    </>
  );
};

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  margin-top: 20px;
`;

const Line = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary300};
  margin: 10px 0;
`;

const SummaryBox = styled.div`
  dispaly: flex;
  background: #fff3eb;
  padding: 24px 16px 24px 16px;
  fleex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.primary300};
  border-radius: 8px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  gap: 8px;
  border-radius: 12px;
  background: #f9fafb;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 28px;
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

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: ${({ flexWrap }) => (flexWrap ? flexWrap : "unset")};
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto 0 10px;
`;
