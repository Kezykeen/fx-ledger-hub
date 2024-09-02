import styled from "styled-components";
import { Modal } from "../../../../components/modal";
import { Button } from "../../../../components/button";
import { ArrowRightUpIcon } from "../../../../assets/svgs";
import { useNavigate } from "react-router-dom";

const AmountModal = ({ isOpen, handleClose, asset, icon: Icon }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {};

  return (
    <Modal
      closeHandler={handleClose}
      isOpen={isOpen}
      headerText={`${asset} Account Information`}
      subText={`You are viewing all your ${asset} account balance here`}
    >
      <Container>
        <TotalBox>
          <Icon />
          <TotalTxtWrapper>
            <Total>100,000</Total>
            <Asset>{asset}</Asset>
          </TotalTxtWrapper>
        </TotalBox>
        <BreakdownBox>
          <BreakdownTitle>Account Breakdown</BreakdownTitle>
          <AccountEntry>
            <AccountTxtWrapper>
              <FlexGap>
                <AccountTotal>1000</AccountTotal>
                <AccountAsset>{asset}</AccountAsset>
              </FlexGap>
              <FlexGap>
                <AccountDeets>0089098080</AccountDeets>
                <Divider />
                <AccountDeets>Amara Jude</AccountDeets>
                <Divider />
                <AccountDeets>Access Bank</AccountDeets>
              </FlexGap>
            </AccountTxtWrapper>
            <ArrowRightUpIcon
              onClick={() => navigate(`/ledger/${asset.toLowerCase()}`)}
            />
          </AccountEntry>
        </BreakdownBox>
        <BtnWrapper>
          <Button
            buttonClass={"outline"}
            label={"Go Back"}
            width={`48%`}
            onClick={handleClose}
          />
          <Button
            buttonClass={"primary"}
            label={"Add New Account"}
            width={`48%`}
            onClick={handleSubmit}
          />
        </BtnWrapper>
      </Container>
    </Modal>
  );
};

export default AmountModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
`;

const TotalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 38px;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background: linear-gradient(85.12deg, #8f3a23 4.98%, #b4552b 86.68%);

  & > svg {
    rect {
      fill: #b95617;
    }

    path {
      fill: ${({ theme }) => theme.colors.white};
    }

    g {
      path:first-child:not(:last-child) {
        fill: #b95617;
      }
    }
  }
`;

const TotalTxtWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Total = styled.p`
  font-size: 32px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  color: ${({ theme }) => theme.colors.white};
`;

const Asset = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: ${({ theme }) => theme.colors.white};
  text-transform: capitalize;
`;

const BreakdownBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray100};
`;

const BreakdownTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray800};
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto 0 10px;
`;

const AccountEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  background: #ffffff;

  & > svg {
    cursor: pointer;
  }
`;

const AccountTxtWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FlexGap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AccountTotal = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray900};
`;

const AccountAsset = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray400};
`;

const AccountDeets = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray700};
`;

const Divider = styled.span`
  height: 10px;
  width: 1px;
  border: 1px solid #d0d5dd;
`;
