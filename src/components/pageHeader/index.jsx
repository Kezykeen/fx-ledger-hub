import styled from "styled-components";

const PageHeader = ({ title, subTitle }) => {
  return (
    <Wrapper>
      <p>{title}</p>
      <small>{subTitle}</small>
    </Wrapper>
  );
};

export { PageHeader };

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  & p {
    font-size: clamp(18px, 3vw, 28px);
    font-weight: 500;
    line-height: 38px;
    color: ${({ theme }) => theme.colors.gray900};
  }

  & small {
    font-size: clamp(14px, 3vw, 16px);
    font-weight: 400;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
