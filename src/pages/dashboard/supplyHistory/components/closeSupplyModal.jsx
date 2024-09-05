import { toast } from "react-toastify";
import ToastComponent from "../../../../components/toastComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { PopUp } from "../../../../components/popUp";
import styled from "styled-components";
import { InputField } from "../../../../components/inputField";
import { DocumentUpload } from "../../../../components/documentUpload";
import { closeSupplySchema } from "./validation";

const CloseSupplyModal = ({ isOpen, closeHandler, detailsCloseHandler }) => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(closeSupplySchema),
  });

  const handleClose = () => {
    reset();
    closeHandler();
  };

  const onSubmit = (values) => {
    toast.success(
      <ToastComponent
        title={"Supply Closed!"}
        message={"You have successfully closed this supply"}
      />
    );
    console.log({ values });
    handleClose();
    detailsCloseHandler();
  };

  return (
    <PopUp
      open={isOpen}
      handleClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      title={"Close supply?"}
      subtitle={"Are you sure you want to proceed to close this supply?"}
    >
      <AmountBox>
        <InputField
          label={`Amount *`}
          register={register}
          name="amount"
          inputType="textarea"
          placeholder="Enter amount"
          error={!!errors.amount}
          errorText={errors.amount && errors.amount.message}
        />
        <DocumentUpload
          control={control}
          name={"depositReceipt"}
          errors={errors}
          label={`Upload Deposit Receipt`}
        />
      </AmountBox>
    </PopUp>
  );
};

export default CloseSupplyModal;

const AmountBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 16px 12px;
  border-radius: 12px;
  background: #f9fafb;
  margin-top: 16px;
`;
