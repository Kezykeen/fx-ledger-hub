import styled from "styled-components";
import { Button } from "../../../../../components/button";
import { useNavigate } from "react-router-dom";
import RejectPopup from "./rejectPopup";
import { useState } from "react";
import ApprovalModal from "./approvalModal";

const data = {
  debitAccount: [
    { account: { label: "Mbadid", value: "mbadid" }, amount: "1000" },
  ],
  creditAccount: [
    { account: { label: "Solomon", value: "solomon" }, amount: "2000" },
  ],
};

const ActionButtons = () => {
  const navigate = useNavigate();
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

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
      />
      <ApprovalModal
        closeHandler={() => setIsApprovalModalOpen(false)}
        isOpen={isApprovalModalOpen}
        data={data}
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
