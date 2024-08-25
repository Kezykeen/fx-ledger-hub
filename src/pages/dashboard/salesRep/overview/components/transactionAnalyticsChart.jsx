import { useState } from "react";
import styled from "styled-components";
import SMSelectDropDown from "../../../../../components/smSelect/selectDropdown";
import { ChartWrapper } from "../../../../../components/charts/chart";
import { ChartCards } from "../../../../../components/chartCards/chartCards";

const TransactionAnalyticsChart = () => {
  const [selectedYear, setSelectedYear] = useState({
    value: "2023",
    label: "2023",
  });
  const aspectRatio = 4;
  const backgroundColors = ["#F4A460"];
  const yearOptions = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ];

  const chartData = [
    { label: "Jan", value: 40 },
    { label: "Feb", value: 80 },
    { label: "Mar", value: 30 },
    { label: "Apr", value: 76 },
    { label: "May", value: 25 },
    { label: "Jun", value: 70 },
    { label: "Jul", value: 50 },
    { label: "Aug", value: 55 },
    { label: "Sep", value: 45 },
    { label: "Oct", value: 60 },
    { label: "Nov", value: 85 },
    { label: "Dec", value: 35 },
  ];

  return (
    <Container>
      <Header>
        <Title>Transaction Analytics</Title>
        <SMSelectDropDown
          options={yearOptions}
          value={selectedYear}
          onChange={setSelectedYear}
          width="120px"
        />
      </Header>
      <ChartCards>
        <ChartWrapper
          type="bar"
          chartData={chartData}
          backgrounds={backgroundColors}
          stepSize={20}
          aspectRatio={aspectRatio}
          borderRadius={10}
        />
      </ChartCards>
    </Container>
  );
};

export default TransactionAnalyticsChart;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  padding: 1rem;
  border-radius: 12px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 23px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  text-align: left;
`;
