import styled from "styled-components";
import { Modal } from "../../../../components/modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { createAccountSchema } from "./validation";
import SMSelectDropDown from "../../../../components/smSelect/selectDropdown";
import { InputField } from "../../../../components/inputField";
import { DocumentUpload } from "../../../../components/documentUpload";
import { Button } from "../../../../components/button";
import { useState } from "react";
import { PopUp } from "../../../../components/popUp";
import { toast } from "react-toastify";
import ToastComponent from "../../../../components/toastComponent";
import { currencyTypeOptions } from "../../transactionHistory/components/data";
import { usePost } from "../../../../hooks/api";
import { createAccountUrl } from "../../../../urls";
import { CurrencyType, QueryKeys } from "../../../../constants/enums";

const CreateAccountModal = ({
  isOpen,
  handleClose,
  currencyId,
  asset,
  currencyType,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createAccountSchema),
  });

  const { mutate: createAccount, isPending } = usePost(
    createAccountUrl(currencyId),
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
      ...data,
      currencyAccountType: data?.currencyAccountType?.value,
    };
    createAccount(payload);
  };

  return (
    <Modal
      closeHandler={onClose}
      isOpen={isOpen}
      headerText={`Add New Account`}
      subText={`You can add new ${asset} account`}
    >
      <Container onSubmit={handleSubmit(() => setIsConfirmOpen(true))}>
        <InputWrapper>
          <InputField
            label={`Account Name`}
            register={register}
            name="name"
            placeholder="Enter account name"
            error={!!errors.name}
            errorText={errors.name && errors.name.message}
          />
          <InputField
            label={`Account Number`}
            register={register}
            name="number"
            placeholder="Enter account number"
            error={!!errors.number}
            errorText={errors.number && errors.number.message}
          />
          <InputField
            label={`Account Balance`}
            register={register}
            name="balance"
            placeholder="Enter account balance"
            error={!!errors.balance}
            errorText={errors.balance && errors.balance.message}
          />
          {currencyType === CurrencyType.XAF && (
            <SMSelectDropDown
              placeholder={"Select currency account type"}
              name="currencyAccountType"
              label={"Currency Account Type"}
              control={control}
              options={currencyTypeOptions}
              error={!!errors.currencyAccountType}
              errorText={
                errors.currencyAccountType && errors.currencyAccountType.message
              }
            />
          )}
        </InputWrapper>
        <DocumentUpload
          control={control}
          name={"receipt"}
          errors={errors}
          label={`Upload Receipt (Optional)`}
          width={`98%`}
        />
        <BtnWrapper>
          <Button
            label={"Cancel"}
            buttonClass={"outline"}
            width={`48%`}
            type={"button"}
            onClick={onClose}
          />
          <Button
            label={"Continue"}
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

export default CreateAccountModal;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
