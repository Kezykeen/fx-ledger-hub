import styled from "styled-components";
import { Modal } from "../../../../components/modal";
import { Button } from "../../../../components/button";
import { DownloadMini } from "../../../../assets/svgs";
import CloseSupplyModal from "./closeSupplyModal";
import { useState } from "react";

const DetailsModal = ({ isOpen, closeHandler, data }) => {
  const [isConfirmModalOpen, setisConfirmModalOpen] = useState(false);

  return (
    <Modal
      closeHandler={closeHandler}
      isOpen={isOpen}
      headerText={"Supply Details"}
      subText={"You are veiwing details of a supply below"}
    >
      <Container>
        <EntryBox>
          <EntryTitle>Summary</EntryTitle>
          <Entry>
            <EntryLabel>Currency</EntryLabel>
            <EntryValue $primary>{data?.currency}</EntryValue>
          </Entry>
          <Entry>
            <EntryLabel>Amount</EntryLabel>
            <EntryValue $primary>{data?.amount}</EntryValue>
          </Entry>
          <Entry>
            <EntryLabel>Supplier Name</EntryLabel>
            <EntryValue>{data?.supplierName}</EntryValue>
          </Entry>
          <Entry>
            <EntryLabel>Phone number</EntryLabel>
            <EntryValue>{data?.phoneNumber}</EntryValue>
          </Entry>
          <Entry>
            <EntryLabel>Date</EntryLabel>
            <EntryValue>{data?.date}</EntryValue>
          </Entry>
          <Entry>
            <EntryLabel>Supplier Receipt</EntryLabel>
            <EntryValue>
              <ReceiptButton href="#">
                <DownloadMini />
                <span>Receipt</span>
              </ReceiptButton>
            </EntryValue>
          </Entry>
        </EntryBox>
        <EntryBox>
          <EntryTitle>Initiated by</EntryTitle>
          <Entry>
            <EntryLabel>ID</EntryLabel>
            <EntryValue>{data?.salesRepId}</EntryValue>
          </Entry>
          <Entry>
            <EntryLabel>Sales Rep Name</EntryLabel>
            <EntryValue>{data?.salesRepName}</EntryValue>
          </Entry>
        </EntryBox>
        <BtnWrapper>
          <Button
            buttonClass={"outline"}
            label={"Go Back"}
            width={`47%`}
            onClick={closeHandler}
          />
          <Button
            buttonClass={"primary"}
            label={"Close Supply"}
            width={`47%`}
            onClick={() => setisConfirmModalOpen(true)}
          />
        </BtnWrapper>
      </Container>
      <CloseSupplyModal
        closeHandler={() => setisConfirmModalOpen(false)}
        detailsCloseHandler={closeHandler}
        isOpen={isConfirmModalOpen}
      />
    </Modal>
  );
};

export default DetailsModal;

const Container = styled.div`
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

const EntryTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 28px;
  color: #1d2939;
  padding-bottom: 12px;
  border-bottom: ${({ theme, $primary }) =>
    $primary
      ? `1px solid ${theme.colors.primary25}`
      : `1px solid ${theme.colors.gray200}`};
`;

const Entry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const EntryLabel = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray500};
`;

const EntryValue = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: ${({ theme, $primary }) =>
    $primary ? theme.colors.primary300 : theme.colors.gray800};
  text-transform: capitalize;
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto 0 10px;
`;

const ReceiptButton = styled.button`
  display: flex;
  text-decoration: none;
  gap: 8px;
  align-items: center;
  padding: 6px 14px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.gray200};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1rem;
  outline: none;
`;
