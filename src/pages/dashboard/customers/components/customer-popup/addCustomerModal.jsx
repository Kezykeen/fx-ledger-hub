import styled from "styled-components";
import { Modal } from "../../../../../components/modal";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { createCustomerSchema } from "../validation";
import { InputField } from "../../../../../components/inputField";
import { Button } from "../../../../../components/button";
import { useState } from "react";
import { PopUp } from "../../../../../components/popUp";
import { toast } from "react-toastify";
import ToastComponent from "../../../../../components/toastComponent";
import { usePost } from "../../../../../hooks/api";
import { createCustomerUrl } from "../../../../../urls/customer";
import { QueryKeys } from "../../../../../constants/enums";
import { AccountType } from "../../../../../constants/callRoute";

const AddCustomerAccountModal = ({ isOpen, handleClose }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCustomerSchema),
  });

  const { mutate: createAccount, isPending } = usePost(
    createCustomerUrl(),
    (data) => {
      toast.success(
        <ToastComponent
          title="Account created successfully"
          message={`Customer ${data.fullName} has been created.`}
        />
      );
      setIsConfirmOpen(false);
      onClose();
    },
    QueryKeys.account
  );

  

  const onClose = () => {
    reset();
    handleClose();
  };

  const confirmSubmission = (data) => {
    const payload = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      customerType: AccountType.customer,
      address: data.address,
    };

    createAccount(payload);
  };

  const onSubmit = () => {
    setIsConfirmOpen(true);
  };

  const handlePhoneChange = (value, field) => {
    field.onChange(value);
  };

  return (
    <Modal
      closeHandler={onClose}
      isOpen={isOpen}
      headerText="Add New Customer"
      subText="Fill in the details below to add a new customer."
    >
      <Container onSubmit={handleSubmit(onSubmit)}>
        <EntryTitle>Customer Details</EntryTitle>
        <InputWrapper>
          <InputField
            label="Customer Name"
            register={register}
            name="fullName"
            placeholder="Enter account name"
            error={!!errors.name}
            errorText={errors.fullName?.message}
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <>
                <Label>Phone Number</Label>
                <PhoneInput
                  {...field}
                  country="ng"
                  register={register}
                  onChange={(value) => handlePhoneChange(value, field)}
                  buttonStyle={{
                    borderRadius: "8px 0 0 8px",
                    padding: "5px 10px",
                  }}
                  inputProps={{
                    name: "phoneNumber",
                    required: true,
                    ref: field.ref,
                    autoFocus: false,
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "45px",
                    padding: "0 65px",
                  }}
                  placeholder="Enter phone number"
                />
              </>
            )}
          />
          {errors.phoneNumber && (
            <ErrorText>{errors.phoneNumber.message}</ErrorText>
          )}
          <InputField
            label="Address"
            register={register}
            name="address"
            placeholder="Enter address"
            error={!!errors.address}
            errorText={errors.address?.message}
          />
        </InputWrapper>

        <BtnWrapper>
          <Button
            label="Cancel"
            buttonClass="outline"
            width="48%"
            type="button"
            onClick={onClose}
          />
          <Button
            label="Continue"
            buttonClass="primary"
            width="48%"
            type="submit"
          />
        </BtnWrapper>
      </Container>

      {/* Confirmation Popup */}
      <PopUp
        open={isConfirmOpen}
        handleClose={() => setIsConfirmOpen(false)}
        onSubmit={handleSubmit(confirmSubmission)}
        isLoading={isPending}
        title="Confirm Submission?"
        subtitle="Are you sure you want to proceed?"
      />
    </Modal>
  );
};

export default AddCustomerAccountModal;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  margin-top: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  gap: 8px;
  border-radius: 12px;
  background: #f9fafb;
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto 0 10px;
`;

const EntryTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray500};
`;

const ErrorText = styled.p`
  color: #e96d6d;
  font-size: 12px;
  margin-top: 5px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray500};
`;
