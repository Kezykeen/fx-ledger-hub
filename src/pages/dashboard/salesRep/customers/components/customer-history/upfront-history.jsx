import styled from "styled-components";
import { TableWidget } from "../../../../../../components/tableWidget";
import { PageHeader } from "../../../../../../components/pageHeader";
import Upfront from "../customer-record/customer-upfront";


const UpfrontRecord = () => {
  return (
    <Container>
      <PageHeader
        title={"Upfront History"}
        subTitle={"Here is an overview customer upfront history below"}
      />
      <WidgetWrapper>
        <TableWidget />
      </WidgetWrapper>
      <Upfront />
    </Container>
  );
};

export { UpfrontRecord };

UpfrontRecord.displayName = "UpfrontRecord";

const Container = styled.div`
  /* Add your styles here */
`;
const WidgetWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  margin-top: 1rem;
  border-radius: 12px;
  padding: 16px 24px;
  width: 100%;
`;

export const Divider = styled.div`
  margin: ${({ margin }) => margin ?? "20px"};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;
