import styled from "styled-components";
import { Button } from "../../../../components/button";
import {
  ArrowUpIcon,
  CFAIcon,
  DollarIcon,
  NairaIcon,
  RMBIcon,
  USDTIcon,
} from "../../../../assets/svgs";
import AccountBox from "./accountBox";
import FundModal from "./fundModal";
import { useState } from "react";
import WithdrawModal from "./withdrawModal";
import { useGet } from "../../../../hooks/api";
import { getAccountUrl } from "../../../../urls";
import { CurrencyType, QueryKeys } from "../../../../constants/enums";

const AccountBalance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const { data } = useGet([QueryKeys.account], getAccountUrl());

  const getAccountbyCurrency = (currencyType) =>
    data?.data?.find((x) => x?.type === currencyType);

  return (
    <Container>
      <TopWrapper>
        <Title>Account Balance</Title>
        <ButtonWrapper>
          <Button
            label={"Withdraw"}
            icon={<ArrowUpIcon />}
            buttonClass={"outline"}
            onClick={() => setIsWithdrawModalOpen(true)}
          />
          <Button
            label={"Fund"}
            icon={<FundArrow />}
            onClick={() => setIsModalOpen(true)}
          />
        </ButtonWrapper>
      </TopWrapper>
      <BottomWrapper>
        <AccountBox
          asset={"USDT"}
          data={getAccountbyCurrency(CurrencyType.USDT)}
          icon={USDTIcon}
        />
        <AccountBox
          asset={"RMB"}
          data={getAccountbyCurrency(CurrencyType.RMB)}
          icon={RMBIcon}
        />
        <AccountBox
          asset={"NAIRA"}
          data={getAccountbyCurrency(CurrencyType.Naira)}
          icon={NairaIcon}
        />
        <AccountBox
          asset={"XFA"}
          data={getAccountbyCurrency(CurrencyType.XFA)}
          icon={CFAIcon}
        />
        <AccountBox
          asset={"DOLLAR"}
          data={getAccountbyCurrency(CurrencyType.Dollar)}
          icon={DollarIcon}
        />
      </BottomWrapper>
      <FundModal
        handleClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      />
      <WithdrawModal
        handleClose={() => setIsWithdrawModalOpen(false)}
        isOpen={isWithdrawModalOpen}
      />
    </Container>
  );
};

export default AccountBalance;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  gap: 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray100};
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray900};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FundArrow = styled(ArrowUpIcon)`
  transform: rotate(180deg);
`;

const BottomWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
`;
