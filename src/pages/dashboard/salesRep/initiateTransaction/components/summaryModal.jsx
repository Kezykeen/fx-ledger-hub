import styled from "styled-components";
import { Modal } from "../../../../../components/modal";
import { Button } from "../../../../../components/button";
import { toast } from "react-toastify";
import ToastComponent from "../../../../../components/toastComponent";

const SummaryModal = ({ isOpen, closeHandler, data }) => {
  const handleSubmit = () => {
    toast.success(
      <ToastComponent
        title={"Exchange Transaction sent"}
        message={
          "Your exchange transaction has been sent, you will get a notification once approved"
        }
      />
    );
    // closeHandler();
  };
  console.log({ data });

  return (
    <Modal
      closeHandler={closeHandler}
      isOpen={isOpen}
      headerText={"Transaction Summary"}
      subText={"You can initiate a new exchange transaction below"}
    >
      <Container>
        <EntryBox>
          <EntryTitle>Summary</EntryTitle>
          <Entry>
            <EntryLabel>Incoming currency</EntryLabel>
            <EntryValue $primary>{data?.incomingCurrency}</EntryValue>
          </Entry>
          <Entry>
            <EntryLabel>Rate</EntryLabel>
            <EntryValue $primary>{data?.rate}</EntryValue>
          </Entry>
          <Entry>
            <EntryLabel>Customer Name</EntryLabel>
            <EntryValue>{data?.customer}</EntryValue>
          </Entry>
          {data?.amountPaid && (
            <Entry>
              <EntryLabel>Amount Paid</EntryLabel>
              <AmountValue>
                N <span>{data?.amountPaid}</span>
              </AmountValue>
            </Entry>
          )}
          {data?.amountPending && (
            <Entry>
              <EntryLabel>Amount Owed</EntryLabel>
              <AmountValue>
                N <span>{data?.amountPending}</span>
              </AmountValue>
            </Entry>
          )}
        </EntryBox>
        <EntryBox $primary>
          <EntryTitle $primary>Exchange Summary</EntryTitle>
          <Entry>
            <EntryLabel>Incoming Amount</EntryLabel>
            <AmountValue>
              CFA <span>{data?.amount}</span>
            </AmountValue>
          </Entry>
          <Entry>
            <EntryLabel>Outgoing Amount</EntryLabel>
            <AmountValue>
              N <span>{data?.outgoingAmount}</span>
            </AmountValue>
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
            label={"Confirm"}
            width={`47%`}
            onClick={handleSubmit}
          />
        </BtnWrapper>
      </Container>
    </Modal>
  );
};

export default SummaryModal;

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

const AmountValue = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  color: #98a2b3;

  & > span {
    font-size: 600;
    color: ${({ theme }) => theme.colors.primary300};
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto 0 10px;
`;
