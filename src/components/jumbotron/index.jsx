import styled from "styled-components";
import { ParagraphOne } from "../../theme/typography";

function Jumbotron({
  headerText,
  endText,
  headerContainer,
  children,
  footerContent,
  footerStyle,
  borderClasses,
}) {
  return (
    <StyledSection borderClasses={borderClasses}>
      {headerText && (
        <StyledHeader>
          {headerContainer ? (
            headerContainer
          ) : (
            <StyledHeaderContent>
              <HeaderText>{headerText}</HeaderText>
              {endText && <h6 className="jumbo-header">{endText}</h6>}
            </StyledHeaderContent>
          )}
        </StyledHeader>
      )}
      <StyledContent>{children}</StyledContent>
      {footerContent && (
        <StyledFooter footerStyle={footerStyle}>{footerContent}</StyledFooter>
      )}
    </StyledSection>
  );
}

export { Jumbotron };

const StyledSection = styled.section`
  background: ${({ theme }) => theme.colors.white};
  ${({ borderClasses }) => borderClasses && `border: ${borderClasses}`};
  width: 100%;
`;

const StyledHeader = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.N40}`};
  padding: 1rem;
`;

const StyledHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderText = styled(ParagraphOne)`
  color: ${({ theme }) => theme.colors.N900};
  text-transform: capitalize;
`;

const StyledContent = styled.div``;

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: ${({ theme }) => `1px solid ${theme.colors.N40}`};
  padding: 1rem;
  ${({ footerStyle }) => footerStyle && `border: ${footerStyle}`};
`;
