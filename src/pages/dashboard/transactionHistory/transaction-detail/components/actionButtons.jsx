import styled from "styled-components";
import { Button } from "../../../../../components/button";
import { useLocation, useNavigate } from "react-router-dom";
import RejectPopup from "./rejectPopup";
import { useState } from "react";
import { PopUp } from "../../../../../components/popUp";
import { usePut } from "../../../../../hooks/api";
import { adminActionTradeUrl } from "../../../../../urls";
import { ApprovalType, QueryKeys } from "../../../../../constants/enums";
import { toast } from "react-toastify";
import ToastComponent from "../../../../../components/toastComponent";

const ActionButtons = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const navigate = useNavigate();
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const { mutate: adminAction, isPending } = usePut(
    adminActionTradeUrl(id),
    () => {
      toast.success(
        <ToastComponent
          title={"Transaction Approved!"}
          message={"You have successfully approved this transaction"}
        />
      );
      setIsApprovalModalOpen(false);
      navigate("/transactions");
    },
    [QueryKeys.trade.getById]
  );

  const handleSubmit = () => {
    const payload = {
      approvalType: ApprovalType.APPROVED,
    };
    adminAction(payload);
  };

  return (
    <Container>
      <Button
        buttonClass={"outline"}
        label={"Edit"}
        width={`103px`}
        onClick={() => navigate("edit")}
      />
      <Button
        buttonClass={"danger"}
        label={"Reject"}
        width={`103px`}
        onClick={() => setIsRejectModalOpen(true)}
      />
      <Button
        buttonClass={"success"}
        label={"Approve"}
        width={`103px`}
        onClick={() => setIsApprovalModalOpen(true)}
      />
      <RejectPopup
        closeModal={() => setIsRejectModalOpen(false)}
        isOpen={isRejectModalOpen}
        id={id}
      />
      <PopUp
        open={isApprovalModalOpen}
        handleClose={() => setIsApprovalModalOpen(false)}
        onSubmit={handleSubmit}
        isLoading={isPending}
        title={"Approve Transaction?"}
        subtitle={
          "Are you sure you want to proceed to approve this transaction?"
        }
      />
    </Container>
  );
};

export default ActionButtons;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
