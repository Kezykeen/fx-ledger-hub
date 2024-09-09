import styled from "styled-components";
import { useState, useEffect } from "react";
import { Modal } from "../../../../components/modal";
import AccountEntry from "../../initiateTransaction/components/accountEntry";
import { Button } from "../../../../components/button";
import { PopUp } from "../../../../components/popUp";
import ToastComponent from "../../../../components/toastComponent";
import { toast } from "react-toastify";
import { parseSelectFormArrayData } from "../../../../utils/helpers.utils";

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

  const onSubmit = () => {
    const parsedData = parseSelectFormArrayData(formData);
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
          title={"Confirm Transaction Approval?"}
          subtitle={
            "Are you sure you want to proceed to approve this transaction?"
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
