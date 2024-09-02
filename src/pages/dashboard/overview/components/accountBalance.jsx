import styled from "styled-components";
import { Button } from "../../../../../components/button";
import {
  ArrowUpIcon,
  CFAIcon,
  DollarIcon,
  NairaIcon,
  RMBIcon,
  USDTIcon,
} from "../../../../../assets/svgs";
import AccountBox from "./accountBox";
import FundModal from "./fundModal";
import { useState } from "react";
import WithdrawModal from "./withdrawModal";

const AccountBalance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

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
          amount={"100000"}
          asset={"USDT"}
          count={`1`}
          icon={USDTIcon}
        />
        <AccountBox
          amount={"2000000"}
          asset={"RMB"}
          count={`1`}
          icon={RMBIcon}
        />
        <AccountBox
          amount={"1500000"}
          asset={"NAIRA"}
          count={`5`}
          icon={NairaIcon}
        />
        <AccountBox amount={"3000"} asset={"CFA"} count={`1`} icon={CFAIcon} />
        <AccountBox
          amount={"750000"}
          asset={"DOLLAR"}
          count={`1`}
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
