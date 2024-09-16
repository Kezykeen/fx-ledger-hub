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
import SMSelectDropDown from "../../../../../components/smSelect/selectDropdown";
import { PopUp } from "../../../../../components/popUp";
import { toast } from "react-toastify";
import { currencyOptions } from "../../../transactionHistory/components/data";
import ToastComponent from "../../../../../components/toastComponent";
import { usePost } from "../../../../../hooks/api";
import { createCustomerUrl } from "../../../../../urls/customer";
import { QueryKeys } from "../../../../../constants/enums";

const EditSupplierAccountModal = ({ isOpen, handleClose, customerType }) => {
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
    createCustomerUrl(customerType),
    () => {
      toast.success(
        <ToastComponent
          title={"Account created successfully"}
          message={`Your account has been created successfully`}
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

  const onSubmit = (data) => {
    const payload = {
      fullName: data.name,
      phoneNumber: data.phoneNumber,
      customerType: data?.customerType?.value,
      address: data.address,
    };
    createAccount(payload);
  };

  const handlePhoneChange = (value) => {
    console.log("Phone number changed:", value);
  };

  return (
    <Modal
      closeHandler={onClose}
      isOpen={isOpen}
      headerText={`Edit Supplier`}
      subText={`You can edit supplier information details below`}
    >
      <Container onSubmit={handleSubmit(() => setIsConfirmOpen(true))}>
        <EntryTitle>{`Supplier Details`}</EntryTitle>
        <InputWrapper>
          <InputField
            label={`Supplier Name`}
            register={register}
            name="name"
            placeholder="Enter account name"
            error={!!errors.name}
            errorText={errors.name && errors.name.message}
          />
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <>
                <Label>Phone Number</Label>
                <PhoneInput
                  {...field}
                  country={"ng"}
                  onChange={handlePhoneChange}
                  inputStyle={{
                    width: "100%",
                    height: "45px",
                    padding: "0 65px",
                  }}
                  inputProps={{
                    name: "phoneNumber",
                    required: true,
                  }}
                  buttonStyle={{
                    borderRadius: "8px 0 0 8px",
                    padding: "5px 10px",
                  }}
                  placeholder="Enter phone number"
                />
              </>
            )}
          />
          {errors.phoneNumber && (
            <ErrorText>{errors.phoneNumber.message}</ErrorText>
          )}

          <SMSelectDropDown
            placeholder={"Select currency"}
            name="currency"
            label={"Currency"}
            control={control}
            options={currencyOptions}
            error={!!errors.currency}
            errorText={errors.currency && errors.currency.message}
          />
          <InputField
            label={`Address`}
            register={register}
            name="address"
            placeholder="Enter address"
            error={!!errors.address}
            errorText={errors.address && errors.address.message}
          />
        </InputWrapper>

        <BtnWrapper>
          <Button
            label={"Cancel"}
            buttonClass={"outline"}
            width={`48%`}
            type={"button"}
            onClick={onClose}
          />
          <Button
            label={"Save"}
            buttonClass={"primary"}
            width={`48%`}
            type="submit"
          />
        </BtnWrapper>
      </Container>

      <PopUp
        open={isConfirmOpen}
        handleClose={() => setIsConfirmOpen(false)}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isPending}
        title={"Confirm Submission?"}
        subtitle={
          "Are you sure you want to proceed with submission of this receipt?"
        }
      />
    </Modal>
  );
};

export default EditSupplierAccountModal;

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
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray500};
`;
