import styled from "styled-components";
import { Modal } from "../../../../components/modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { fundAccountSchema } from "./validation";
import SMSelectDropDown from "../../../../components/smSelect/selectDropdown";
import { InputField } from "../../../../components/inputField";
import { DocumentUpload } from "../../../../components/documentUpload";
import { Button } from "../../../../components/button";
import { useState } from "react";
import { PopUp } from "../../../../components/popUp";
import { toast } from "react-toastify";
import ToastComponent from "../../../../components/toastComponent";
import { currencyOptions } from "../../transactionHistory/components/data";
import { useGet, usePost } from "../../../../hooks/api";
import { fundAccountUrl, getAccountByCurrencyUrl } from "../../../../urls";
import { QueryKeys } from "../../../../constants/enums";
import { formatSelectItems } from "../../../../utils/helpers.utils";

const FundModal = ({ isOpen, handleClose }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const {
    control,
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(fundAccountSchema),
  });

  const selectedCurrency = watch("currency");
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

  const { data, isLoading: loadingAccounts } = useGet(
    [QueryKeys.currency, selectedCurrency?.value],
    getAccountByCurrencyUrl(selectedCurrency?.value),
    !!selectedCurrency?.value
  );

  const accounts = formatSelectItems(data?.data?.accounts, "name", "accountId");

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
      headerText={`Fund Account`}
      subText={`You can record your credit transaction below`}
    >
      <Container onSubmit={handleSubmit(() => setIsConfirmOpen(true))}>
        <InputWrapper>
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
            options={accounts}
            loading={loadingAccounts}
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

export default FundModal;

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
