import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useEffect, useState } from "react";
import {
  customerData,
  transactionMeansOptions,
} from "../../initiateTransaction/components/data";
import { InitiateTransactionSchema } from "../../initiateTransaction/components/validation";
import {
  findValueAndLabel,
  // parseSelectFormData,
} from "../../../../utils/helpers.utils";
import { currencyOptions } from "../components/data";
import { PageHeader } from "../../../../components/pageHeader";
import { Divider } from "..";
import SMSelectDropDown from "../../../../components/smSelect/selectDropdown";
import { InputField } from "../../../../components/inputField";
import { CheckBox } from "../../../../components/checkbox";
import { DocumentUpload } from "../../../../components/documentUpload";
import { Button } from "../../../../components/button";
import { useLocation, useNavigate } from "react-router-dom";
import AccountModal from "./components/accountModal";

const accountData = {
  debitAccount: [
    { account: { label: "Mbadid", value: "mbadid" }, amount: "1000" },
  ],
  creditAccount: [
    { account: { label: "Solomon", value: "solomon" }, amount: "2000" },
  ],
};

export const EditTransaction = ({ data }) => {
  const [isFullPayment, setIsFullPayment] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const backPath = pathname.split("/").slice(0, 3).join("/");

  const parseCustomers = () =>
    customerData.map((x) => ({
      label: x,
      value: x,
    }));

  const allCustomers = parseCustomers();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(InitiateTransactionSchema),
    defaultValues: {
      incomingCurrency: data?.incomingCurrency
        ? findValueAndLabel(data?.incomingCurrency, currencyOptions)
        : null,
      outgoingCurrency: data?.outgoingCurrency
        ? findValueAndLabel(data?.outgoingCurrency, currencyOptions)
        : null,
      transactionMeans: data?.transactionMeans
        ? findValueAndLabel(data?.transactionMeans, transactionMeansOptions)
        : null,
      customer: data?.customer
        ? findValueAndLabel(data?.customer, allCustomers)
        : null,
      rate: data?.rate || "",
      amount: data?.amount || "",
      amountPaid: data?.amountPaid || "",
      amountPending: data?.amountPending || "",
      customerReceipt: data?.customerReceipt || null,
      supplierReceipt: data?.supplierReceipt || null,
    },
  });

  const amountValue = watch("amount");
  const rateValue = watch("rate");

  useEffect(() => {
    !isNaN(amountValue) &&
      !isNaN(rateValue) &&
      setValue("outgoingAmount", rateValue * amountValue);
  }, [amountValue, rateValue, setValue]);

  const handleBack = () => {
    navigate(backPath);
  };

  const handleCheck = (e) => {
    setIsFullPayment(e.target.checked);
  };

  // const onSubmit = (data) => {
  //   const parsedData = parseSelectFormData(data);
  //   setIsAccountModalOpen(false);
  //   console.log({ parsedData });
  // };

  return (
    <Container>
      <PageHeader
        title={"Initiate Transaction"}
        subTitle={"You can initiate a new exchange transaction below"}
      />
      <Divider />
      <Form onSubmit={handleSubmit(() => setIsAccountModalOpen(true))}>
        <EntryWrapper>
          <EntryTitle>Exchange Details</EntryTitle>
          <EntryBox>
            <FlexBetween>
              <SMSelectDropDown
                placeholder={"Select incoming currency"}
                name="incomingCurrency"
                label={"Incoming Currency"}
                control={control}
                options={currencyOptions}
                error={!!errors.incomingCurrency}
                errorText={
                  errors.incomingCurrency && errors.incomingCurrency.message
                }
                noShift
              />
              <SMSelectDropDown
                placeholder={"Select outgoing currency"}
                name="outgoingCurrency"
                control={control}
                label={"Outgoing Currency"}
                options={currencyOptions}
                error={!!errors.outgoingCurrency}
                errorText={
                  errors.outgoingCurrency && errors.outgoingCurrency.message
                }
                noShift
              />
            </FlexBetween>
            <FlexBetween>
              <InputField
                label={`Rate`}
                register={register}
                type="number"
                name="rate"
                placeholder="Enter rate"
                error={!!errors.rate}
                errorText={errors.rate && errors.rate.message}
                noShift
              />
              <InputField
                label={`Amount`}
                register={register}
                name="amount"
                type="number"
                placeholder="Enter amount"
                error={!!errors.amount}
                errorText={errors.amount && errors.amount.message}
                noShift
              />
            </FlexBetween>
            <FlexBetween>
              <SMSelectDropDown
                placeholder={"Select means of transaction currency"}
                name="transactionMeans"
                control={control}
                label={"Transaction Means"}
                options={transactionMeansOptions}
                error={!!errors.transactionMeans}
                errorText={
                  errors.transactionMeans && errors.transactionMeans.message
                }
                noShift
              />
              <InputField
                label={`Outgoing Amount`}
                name="outgoingAmount"
                register={register}
                disabled
                placeholder="Enter amount"
                noShift
              />
            </FlexBetween>
          </EntryBox>
        </EntryWrapper>
        <EntryWrapper>
          <EntryTitle>Customer Details</EntryTitle>
          <EntryBox>
            <SMSelectDropDown
              placeholder={"Select customer"}
              name="customer"
              control={control}
              label={"Customer"}
              options={allCustomers}
              error={!!errors.customer}
              errorText={errors.customer && errors.customer.message}
              noShift
            />
          </EntryBox>
        </EntryWrapper>
        <EntryWrapper>
          <EntryTitle>Payment Status</EntryTitle>
          <EntryBox>
            <FullBox>
              <CheckBox isTransparent size={14} onChange={handleCheck} />
              <FullTxtWWrapper>
                <FullMain>Did the client pay in full?</FullMain>
                <FullSub>Please select if the client paid in full</FullSub>
              </FullTxtWWrapper>
            </FullBox>
            {!isFullPayment && (
              <FlexBetween>
                <InputField
                  label={`Amount Paid`}
                  register={register}
                  name="amountPaid"
                  placeholder="Enter amount paid"
                />
                <InputField
                  label={`Amount Pending`}
                  register={register}
                  name="amountPending"
                  placeholder="Enter amount pending"
                />
              </FlexBetween>
            )}
          </EntryBox>
        </EntryWrapper>
        <EntryWrapper>
          <EntryTitle>Payment Receipts</EntryTitle>
          <EntryBox>
            <FlexBetween $gap={45}>
              <DocumentUpload
                control={control}
                name={"customerReceipt"}
                errors={errors}
                label={`Upload Customer Receipt (Optional)`}
              />
              <DocumentUpload
                control={control}
                name={"supplierReceipt"}
                errors={errors}
                label={`Upload Supplier Receipt (Optional)`}
              />
            </FlexBetween>
          </EntryBox>
        </EntryWrapper>
        <BtnWrapper>
          <Button
            label={"Cancel"}
            buttonClass={"outline"}
            width={`152px`}
            type={"button"}
            onClick={handleBack}
          />
          <Button
            label={"Continue"}
            buttonClass={"primary"}
            width={`152px`}
            type="submit"
          />
        </BtnWrapper>
      </Form>
      <AccountModal
        closeHandler={() => setIsAccountModalOpen(false)}
        isOpen={isAccountModalOpen}
        data={accountData}
      />
    </Container>
  );
};

const Container = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const EntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  width: 100%;
`;

const EntryBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 28px 18px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const EntryTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray900};
`;

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => ($gap ? `${$gap}px` : `16px`)};
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

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 12px;
  margin-top: 10px;
`;
