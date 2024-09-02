import styled from "styled-components";
import { useState, useEffect } from "react";
import { Modal } from "../../../../../components/modal";
import AccountEntry from "../../../initiateTransaction/components/accountEntry";
import { Button } from "../../../../../components/button";
import { PopUp } from "../../../../../components/popUp";
import ToastComponent from "../../../../../components/toastComponent";
import { toast } from "react-toastify";

const ApprovalModal = ({ isOpen, closeHandler, data }) => {
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
        headerText={"Approve Transaction"}
        subText={"You can initiate a new exchange transaction below"}
      >
        <Container>
          <AccountEntry
            entryArray={formData.debitAccount}
            handleChange={handleChange}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            name="debitAccount"
            label="Debit"
          />
          <AccountEntry
            entryArray={formData.creditAccount}
            handleChange={handleChange}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            name="creditAccount"
            label="Credit"
          />
          <BtnWrapper>
            <Button
              buttonClass={"outline"}
              label={"Go Back"}
              width={`47%`}
              onClick={handleClose}
            />
            <Button
              buttonClass={"primary"}
              label={"Continue"}
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
          title={"Confirm Transaction Approval?"}
          subtitle={
            "Are you sure you want to proceed to approve this transaction?"
          }
        />
      </Modal>
    </>
  );
};

export default ApprovalModal;

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
