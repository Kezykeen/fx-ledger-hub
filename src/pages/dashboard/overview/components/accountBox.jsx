import styled from "styled-components";
import { ArrowRightDuo } from "../../../../assets/svgs";
import { formatNumberWithCommas } from "../../../../utils/helpers.utils";
import AmountModal from "./amountModal";
import { useState } from "react";
import CreateAccountModal from "./createAccountModal";

const AccountBox = ({ icon: Icon, asset, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  return (
    <Container>
      <Icon />
      <TextWrapper>
        <AmountWrapper>
          <Amount>{formatNumberWithCommas(data?.totalBalance || 0)}</Amount>
          <CountBox onClick={() => setIsModalOpen(true)}>
            <Count>{data?.totalAccounts || 0}</Count>
            <ArrowRightDuo />
          </CountBox>
        </AmountWrapper>
        <Asset>{asset}</Asset>
      </TextWrapper>
      <AmountModal
        handleClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        asset={asset}
        icon={Icon}
        createModalHandler={setIsOpenCreateModal}
        data={data}
      />
      <CreateAccountModal
        asset={asset}
        currencyId={data?.currencyId}
        currencyType={data?.type}
        handleClose={() => setIsOpenCreateModal(false)}
        isOpen={isOpenCreateModal}
      />
    </Container>
  );
};

export default AccountBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 24px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};

  & > svg {
    width: 51px;
    height: 51px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Amount = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray900};
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 23px;
  padding: 8px;
  gap: 0px;
  border-radius: 4px;
  border: 1px solid #d0d5dd;
  cursor: pointer;
`;

const Count = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray600};
`;

const Asset = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray400};
  text-transform: uppercase;
`;
