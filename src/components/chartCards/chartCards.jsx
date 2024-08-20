import styled from "styled-components";

export const ChartCards = ({ children, height }) => {
  return (
    <ChartCardContainer style={{ height: height }}>
      {children || "content"}
    </ChartCardContainer>
  );
};

const ChartCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;
