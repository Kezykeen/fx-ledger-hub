import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowCircleIcon, WalletBalanceIcon } from "../../../../assets/svgs";

const AnalyticsCard = () => {
  return (
    <Container>
      <Title>Account Analytics</Title>
      <CardWrapper>
        <Icon>
          <WalletBalanceIcon />
        </Icon>
        <Text>Account Balance</Text>
        <TotalAmount>
          <span>XFA</span> 1,200
        </TotalAmount>
        <LinkWrapper to={"/transactions"}>
          <span>View Transactions</span>
          <ArrowCircleIcon />
        </LinkWrapper>
      </CardWrapper>
    </Container>
  );
};

export { AnalyticsCard };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 240px;
  padding: 16px;
  border-radius: 8px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray100}`};
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
  line-height: 30px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray900};
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffd7bf80;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
`;

const Icon = styled.div`
  width: 43px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary300};
  margin-bottom: 16px;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray500};
`;

const TotalAmount = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 48px;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.gray800};

  & > span {
    color: #fd853a;
  }
`;

const LinkWrapper = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
  padding-top: 0.6rem;
  color: ${({ theme }) => theme.colors.primary300};
  transition: all ease-in-out 0.2s;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary200};
  }
  & > span {
    display: flex;
    align-items: center;
  }
`;
