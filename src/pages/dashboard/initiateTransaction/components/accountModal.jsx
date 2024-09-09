import { Modal } from "../../../../components/modal";
import { Button } from "../../../../components/button";
import styled from "styled-components";
import AccountEntry from "./accountEntry";
import { useState } from "react";
import SummaryModal from "./summaryModal";
import { getAccountByCurrencyUrl } from "../../../../urls";
import { useGet } from "../../../../hooks/api";
import { QueryKeys } from "../../../../constants/enums";
import { formatSelectItems } from "../../../../utils/helpers.utils";

const initialObj = {
  outgoingCurrencyDebitAccounts: [{ accountId: null, amount: "" }],
  incomingCurrencyCreditAccounts: [{ accountId: null, amount: "" }],
};

const AccountModal = ({ isOpen, closeHandler, data }) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [formData, setFormData] = useState(initialObj);
  const [summaryData, setSummaryData] = useState();
  const [isFormValid, setIsFormValid] = useState(false);

  const { data: incomingData, isLoading: loadingIncoming } = useGet(
    [QueryKeys.currency, data?.incomingCurrency?.value],
    getAccountByCurrencyUrl(data?.incomingCurrency?.value),
    !!data?.incomingCurrency?.value
  );

  const { data: outgoingData, isLoading: loadingOutgoing } = useGet(
    [QueryKeys.currency, data?.outgoingCurrency?.value],
    getAccountByCurrencyUrl(data?.outgoingCurrency?.value),
    !!data?.outgoingCurrency?.value
  );

  const incomingAccounts = formatSelectItems(
    incomingData?.data?.accounts,
    "name",
    "accountId"
  );
  const outgoingAccounts = formatSelectItems(
    outgoingData?.data?.accounts,
    "name",
    "accountId"
  );

  const validateForm = (updatedFormData) => {
    return Object.values(updatedFormData).every((accountArray) =>
      accountArray.every((acc) => acc.accountId && acc.amount.trim() !== "")
    );
  };

  const updateFormData = (updatedData) => {
    setFormData(updatedData);
    setIsFormValid(validateForm(updatedData));
  };

  const handleChange = (name, index, field, value) => {
    if (field === "amount" && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    const updatedAccounts = formData[name].map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );

    const updatedFormData = { ...formData, [name]: updatedAccounts };
    updateFormData(updatedFormData);
  };

  const handleAdd = (name) => {
    const updatedFormData = {
      ...formData,
      [name]: [...formData[name], { accountId: null, amount: "" }],
    };
    updateFormData(updatedFormData);
  };

  const handleRemove = (name, index) => {
    const updatedFormData = {
      ...formData,
      [name]: formData[name].filter((_, idx) => idx !== index),
    };
    updateFormData(updatedFormData);
  };

  const handleClose = () => {
    setFormData(initialObj);
    closeHandler();
  };

  const handleSummaryClose = () => {
    setIsSummaryOpen(false);
    handleClose();
  };

  const onSubmit = () => {
    if (isFormValid) {
      console.log({ formData });
      setSummaryData({ ...formData, ...data });
      setIsSummaryOpen(true);
      // closeHandler();
    }
  };

  return (
    <>
      <Modal
        closeHandler={handleClose}
        isOpen={isOpen}
        headerText={"Complete Payment"}
        subText={"You can complete payment below"}
      >
        <Container>
          <AccountEntry
            entryArray={formData.outgoingCurrencyDebitAccounts}
            handleChange={handleChange}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            loading={loadingOutgoing}
            options={outgoingAccounts}
            name="outgoingCurrencyDebitAccounts"
            label="Debit"
          />
          <AccountEntry
            entryArray={formData.incomingCurrencyCreditAccounts}
            handleChange={handleChange}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            loading={loadingIncoming}
            options={incomingAccounts}
            name="incomingCurrencyCreditAccounts"
            label="Credit"
          />
          <BtnWrapper>
            <Button
              buttonClass={"outline"}
              label={"Go Back"}
              width={`48%`}
              onClick={handleClose}
            />
            <Button
              buttonClass={"primary"}
              label={"Continue"}
              width={`48%`}
              onClick={onSubmit}
              disabled={!isFormValid}
            />
          </BtnWrapper>
        </Container>
      </Modal>
      <SummaryModal
        closeHandler={handleSummaryClose}
        isOpen={isSummaryOpen}
        data={summaryData}
      />
    </>
  );
};

export default AccountModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  margin-top: 20px;
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto 0 10px;
`;
