import styled from "styled-components";
import { Modal } from "../../../../../components/modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { initiatePaymentSchema } from "../validation";
import SMSelectDropDown from "../../../../../components/smSelect/selectDropdown";
import { InputField } from "../../../../../components/inputField";
import { DocumentUpload } from "../../../../../components/documentUpload";
import { Button } from "../../../../../components/button";
import { useState } from "react";
import { PopUp } from "../../../../../components/popUp";
import { toast } from "react-toastify";
import ToastComponent from "../../../../../components/toastComponent";
import {
  accountDetailsOptions,
  customerData,
} from "../../../initiateTransaction/components/data";
import { usePost } from "../../../../../hooks/api";
import { fundAccountUrl } from "../../../../../urls";
import { QueryKeys } from "../../../../../constants/enums";
import { formatSelectItems } from "../../../../../utils/helpers.utils";

const RefundModal = ({ isOpen, handleClose }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const parseCustomers = () =>
    customerData.map((x) => ({
      label: x,
      value: x,
    }));

  const allCustomers = parseCustomers();

  const {
    control,
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(initiatePaymentSchema),
  });

  const selectedAccount = watch("account");

  const { mutate: fundAccount, isPending } = usePost(
    fundAccountUrl(selectedAccount?.value),
    () => {
      toast.success(
        <ToastComponent
          title={"Account funded successfully"}
          message={`Your account has been funded successfully`}
        />
      );
      setIsConfirmOpen(false);
      onClose();
    },
    QueryKeys.account
  );

  const accounts = formatSelectItems(
    accountDetailsOptions?.data?.accounts,
    "name",
    "accountId"
  );

  const onClose = () => {
    reset();
    handleClose();
  };

  const onSubmit = (data) => {
    const payload = {
      amount: data?.amount,
    };
    fundAccount(payload);
  };

  return (
    <Modal
      closeHandler={onClose}
      isOpen={isOpen}
      headerText={`Initial Refund`}
      subText={`Please fill the information below to proceed`}
    >
      <Container onSubmit={handleSubmit(() => setIsConfirmOpen(true))}>
        <InputWrapper>
          <SMSelectDropDown
            placeholder={"Select customer"}
            name="customer"
            label={"Select Customer"}
            control={control}
            options={allCustomers}
            error={!!errors.customer}
            errorText={errors.customer && errors.customer.message}
          />
          <SMSelectDropDown
            placeholder={"Enter Account"}
            name="account"
            control={control}
            label={"Credit Account Details"}
            options={accounts}
            loading={""}
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
            label={"Complete"}
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

export default RefundModal;

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
