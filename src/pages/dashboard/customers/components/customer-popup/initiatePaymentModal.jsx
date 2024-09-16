import styled from "styled-components";
import { Modal } from "../../../../../components/modal";
import { Button } from "../../../../../components/button";
import { useState } from "react";
import { DocumentUpload } from "../../../../../components/documentUpload";
import { PopUp } from "../../../../../components/popUp";
import { toast } from "react-toastify";
import ToastComponent from "../../../../../components/toastComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import SMSelectDropDown from "../../../../../components/smSelect/selectDropdown";
import { currencyOptions } from "../../../transactionHistory/components/data";
import { InputField } from "../../../../../components/inputField";
import {
  accountDetailsOptions,
  customerData,
} from "../../../initiateTransaction/components/data";
import { parseSelectFormData } from "../../../../../utils/helpers.utils";
import { initiatePaymentSchema } from "../validation";

const InitiateCustomerPaymentModal = ({ isOpen, closeHandler }) => {
  const [isConfirmModalOpen, setisConfirmModalOpen] = useState(false);

  const parseCustomers = () =>
    customerData.map((x) => ({
      label: x,
      value: x,
    }));

  const allCustomers = parseCustomers();

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(initiatePaymentSchema),
  });

  const handleClose = () => {
    reset();
    closeHandler();
  };

  const onSubmit = (values) => {
    toast.success(
      <ToastComponent
        title={"Supply Successfully Initiated!"}
        message={"You have successfully initiated a supply"}
      />
    );
    const parsedData = parseSelectFormData(values);
    console.log({ parsedData });
    setisConfirmModalOpen(false);
    handleClose();
  };

  return (
    <Modal
      closeHandler={handleClose}
      isOpen={isOpen}
      headerText={"Initiate Upfront"}
      subText={"Please fill this details to proceed"}
    >
      <Container onSubmit={handleSubmit(() => setisConfirmModalOpen(true))}>
        <EntryBox>
          <SMSelectDropDown
            placeholder={"Select customer"}
            name="customer"
            control={control}
            label={"Customer"}
            options={allCustomers}
            error={!!errors.customer}
            errorText={errors.customer && errors.customer.message}
          />
          <SMSelectDropDown
            placeholder={"Select currency"}
            name="currency"
            label={"Currency"}
            control={control}
            options={currencyOptions}
            error={!!errors.currency}
            errorText={errors.currency && errors.currency.message}
          />
          <SMSelectDropDown
            placeholder={"Select account"}
            name="account"
            control={control}
            label={"Account"}
            options={accountDetailsOptions}
            error={!!errors.account}
            errorText={errors.account && errors.account.message}
          />
          <InputField
            label={`Amount`}
            register={register}
            name="amount"
            type="number"
            placeholder="Enter amount"
            error={!!errors.amount}
            errorText={errors.amount && errors.amount.message}
          />
        </EntryBox>
        <EntryBox>
          <DocumentUpload
            control={control}
            name={"depositReceipt"}
            errors={errors}
            label={`Upload Deposit Receipt`}
          />
        </EntryBox>
        <BtnWrapper>
          <Button
            buttonClass={"outline"}
            label={"Cancel"}
            width={`48%`}
            type={"button"}
            onClick={handleClose}
          />
          <Button
            buttonClass={"primary"}
            label={"Complete"}
            width={`48%`}
            type="submit"
          />
        </BtnWrapper>
      </Container>
      <PopUp
        open={isConfirmModalOpen}
        handleClose={() => setisConfirmModalOpen(false)}
        onSubmit={handleSubmit(onSubmit)}
        title={"Initiate Upfront?"}
        subtitle={"Are you sure you want to proceed to initiate this upfront?"}
      />
    </Modal>
  );
};

export default InitiateCustomerPaymentModal;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  margin-top: 20px;
`;

const EntryBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 16px 18px;
  gap: 16px;
  border-radius: 8px;
  border: 1px solid #f2f4f7;
  background: ${({ theme, $primary }) =>
    $primary ? `#FFF3EB4D` : theme.colors.gray25};
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto 0 10px;
`;
