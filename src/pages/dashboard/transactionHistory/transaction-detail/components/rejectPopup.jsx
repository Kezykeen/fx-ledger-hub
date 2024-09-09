import styled from "styled-components";
import { PopUp } from "../../../../../components/popUp";
import { InputField } from "../../../../../components/inputField";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import ToastComponent from "../../../../../components/toastComponent";
import { ApprovalType, QueryKeys } from "../../../../../constants/enums";
import { usePut } from "../../../../../hooks/api";
import { adminActionTradeUrl } from "../../../../../urls";
import { useNavigate } from "react-router-dom";

const rejectSchema = yup.object().shape({
  reason: yup.string().required("please input reason"),
});

const RejectPopup = ({ isOpen, closeModal, id }) => {
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(rejectSchema),
  });

  const { mutate: adminAction, isPending } = usePut(
    adminActionTradeUrl(id),
    () => {
      toast.success(
        <ToastComponent
          title={"Transaction Declined!"}
          message={"You have successfully declined this transaction"}
        />
      );
      handleClose();
      navigate("/transactions");
    },
    [QueryKeys.trade.getById]
  );

  const handleClose = () => {
    reset();
    closeModal();
  };

  const onSubmit = (values) => {
    const payload = {
      approvalType: ApprovalType.REJECTED,
      comment: values?.reason,
    };
    adminAction(payload);
  };

  return (
    <PopUp
      open={isOpen}
      handleClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isPending}
      title={"Decline Transaction?"}
      subtitle={"Are you sure you want to decline this transaction?"}
    >
      <ReasonBox>
        <InputField
          label={`Reason for decline *`}
          register={register}
          name="reason"
          inputType="textarea"
          placeholder="Enter your reason for decline"
          error={!!errors.reason}
          errorText={errors.reason && errors.reason.message}
        />
      </ReasonBox>
    </PopUp>
  );
};

export default RejectPopup;

const ReasonBox = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 12px;
  gap: 8px;
  border-radius: 12px;
  background: #f9fafb;
  margin-top: 16px;
`;
