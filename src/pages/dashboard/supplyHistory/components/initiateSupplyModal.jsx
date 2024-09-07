import styled from "styled-components";
import { Modal } from "../../../../components/modal";
import { Button } from "../../../../components/button";
import { useState } from "react";
import { DocumentUpload } from "../../../../components/documentUpload";
import { PopUp } from "../../../../components/popUp";
import { toast } from "react-toastify";
import ToastComponent from "../../../../components/toastComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import SMSelectDropDown from "../../../../components/smSelect/selectDropdown";
import { currencyOptions } from "../../transactionHistory/components/data";
import { InputField } from "../../../../components/inputField";
import { accountDetailsOptions } from "../../initiateTransaction/components/data";
import { CheckBox } from "../../../../components/checkbox";
import { initiateSupplySchema } from "./validation";
import { parseSelectFormData } from "../../../../utils/helpers.utils";

const InitiateSupplyModal = ({ isOpen, closeHandler }) => {
  const [isConfirmModalOpen, setisConfirmModalOpen] = useState(false);
  const [isFullPayment, setIsFullPayment] = useState(false);

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(initiateSupplySchema),
  });

  console.log({ isConfirmModalOpen });

  const handleClose = () => {
    reset();
    closeHandler();
  };

  const handleCheck = (e) => {
    setIsFullPayment(e.target.checked);
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
      headerText={"Initiate Supply"}
      subText={"Please fill the information below to proceed"}
    >
      <Container onSubmit={handleSubmit(() => setisConfirmModalOpen(true))}>
        <EntryBox>
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
        <FullBox>
          <CheckBox isTransparent size={14} onChange={handleCheck} />
          <FullTxtWWrapper>
            <FullMain>Did the supplier pay in full?</FullMain>
            <FullSub>Please select if the supplier paid in full</FullSub>
          </FullTxtWWrapper>
        </FullBox>
        {isFullPayment && (
          <EntryBox>
            <DocumentUpload
              control={control}
              name={"depositReceipt"}
              errors={errors}
              label={`Upload Deposit Receipt`}
            />
          </EntryBox>
        )}

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
        title={"Initiate Supply?"}
        subtitle={"Are you sure you want to proceed to initiate this refund?"}
      />
    </Modal>
  );
};

export default InitiateSupplyModal;

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

const FullBox = styled.label`
  display: flex;
  align-items: start;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray100};

  & > span {
    margin-top: 3px;
  }
`;

const FullTxtWWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const FullMain = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #344054;
`;

const FullSub = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: #344054;
`;
