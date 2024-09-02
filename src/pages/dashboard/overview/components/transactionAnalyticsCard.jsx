import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatCurrency } from "../../../../utils/helpers.utils";
import { ArrowCircleIcon } from "../../../../assets/svgs";

const TransactionAnalyticsCard = ({
  bgColor,
  icon,
  title,
  amount,
  link,
  scale = true,
  main = false,
}) => {
  return (
    <TransactionAnalyticsCardWrapper $bg={bgColor}>
      {icon && <Icon $scale={scale}>{icon}</Icon>}
      <Text>{title}</Text>
      <TotalAmount $main={main}>{formatCurrency(amount)}</TotalAmount>
      <LinkWrapper to={link}>
        <span>View all</span>
        <span>
          <ArrowCircleIcon />
        </span>
      </LinkWrapper>
    </TransactionAnalyticsCardWrapper>
  );
};

export { TransactionAnalyticsCard };

const TransactionAnalyticsCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme, $bg }) => ($bg ? $bg : theme.colors.gray100)};
  width: 100%;
  padding: 12px;
  border-radius: ${({ bg }) => (bg ? "4px" : "8px")};
`;

const Icon = styled.div`
  width: 43px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary300};
  margin-bottom: 16px;
  & > svg {
    transform: ${({ $scale }) => ($scale ? "scale(1.8)" : "scale(1)")};
  }
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray500};
`;

const TotalAmount = styled.div`
  font-size: ${({ $main }) => ($main ? "32px" : "24px")};
  font-weight: 700;
  line-height: 48px;
  margin: 8px 0 12px;
  color: ${({ theme }) => theme.colors.gray800};
`;

const LinkWrapper = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin-top: auto;
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
