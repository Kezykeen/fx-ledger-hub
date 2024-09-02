import styled from "styled-components";
import { PageHeader } from "../../../../components/pageHeader";
import { Divider } from "../transactionHistory";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { InitiateTransactionSchema } from "./components/validation";
import SMSelectDropDown from "../../../../components/smSelect/selectDropdown";
import { currencyOptions } from "../transactionHistory/components/data";
import { InputField } from "../../../../components/inputField";
import { customerData, transactionMeansOptions } from "./components/data";
import { CheckBox } from "../../../../components/checkbox";
import { useEffect, useState } from "react";
import { DocumentUpload } from "../../../../components/documentUpload";
import { Button } from "../../../../components/button";
import AccountModal from "./components/accountModal";
import { findValueAndLabel } from "../../../../utils/helpers.utils";

export const InitiateTransaction = ({ data }) => {
  const [isFullPayment, setIsFullPayment] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [formData, setFormData] = useState();

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

  const handleCheck = (e) => {
    setIsFullPayment(e.target.checked);
  };

  const onSubmit = (data) => {
    console.log({ data });
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
    setFormData(parsedData);
    setIsSummaryModalOpen(true);
  };
  console.log({ errors });

  return (
    <Container>
      <PageHeader
        title={"Initiate Transaction"}
        subTitle={"You can initiate a new exchange transaction below"}
      />
      <Divider />
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Button label={"Cancel"} buttonClass={"outline"} width={`152px`} />
          <Button label={"Continue"} buttonClass={"primary"} width={`152px`} />
        </BtnWrapper>
      </Form>
      <AccountModal
        closeHandler={() => setIsSummaryModalOpen(false)}
        isOpen={isSummaryModalOpen}
        data={formData}
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
