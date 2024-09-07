import styled from "styled-components";
import { Modal } from "../../../../components/modal";
import { Button } from "../../../../components/button";
import { toast } from "react-toastify";
import ToastComponent from "../../../../components/toastComponent";
import { formatNumberWithCommas } from "../../../../utils/helpers.utils";

const SummaryModal = ({ isOpen, closeHandler, data }) => {
  const handleSubmit = () => {
    const parsedData = {};

    for (const key in data) {
      if (
        typeof data[key] === "object" &&
        data[key] !== null &&
        "value" in data[key]
      ) {
        parsedData[key] = data[key].value;
      } else {
        parsedData[key] = data[key];
      }
    }
    console.log({ parsedData });
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
            <EntryValue $primary>{data?.incomingCurrency?.label}</EntryValue>
          </Entry>
          <Entry>
            <EntryLabel>Rate</EntryLabel>
            <EntryValue $primary>{data?.rate}</EntryValue>
          </Entry>
          <Entry>
            <EntryLabel>Customer Name</EntryLabel>
            <EntryValue>{data?.customerId?.label}</EntryValue>
          </Entry>
          {data?.amountCustomerPaid && (
            <Entry>
              <EntryLabel>Amount Paid</EntryLabel>
              <AmountValue>
                {data?.incomingCurrency?.label}{" "}
                <span>{formatNumberWithCommas(data?.amountCustomerPaid)}</span>
              </AmountValue>
            </Entry>
          )}
          {data?.amountCustomerIsOwing && (
            <Entry>
              <EntryLabel>Amount Owed</EntryLabel>
              <AmountValue>
                {data?.incomingCurrency?.label}{" "}
                <span>
                  {formatNumberWithCommas(data?.amountCustomerIsOwing)}
                </span>
              </AmountValue>
            </Entry>
          )}
        </EntryBox>
        <EntryBox $primary>
          <EntryTitle $primary>Exchange Summary</EntryTitle>
          <Entry>
            <EntryLabel>Incoming Amount</EntryLabel>
            <AmountValue>
              {data?.incomingCurrency?.label}{" "}
              <span>
                {formatNumberWithCommas(data?.incomingCurrencyAmount)}
              </span>
            </AmountValue>
          </Entry>
          <Entry>
            <EntryLabel>Outgoing Amount</EntryLabel>
            <AmountValue>
              {data?.outgoingCurrency?.label}{" "}
              <span>
                {formatNumberWithCommas(data?.outgoingCurrencyAmount)}
              </span>
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
