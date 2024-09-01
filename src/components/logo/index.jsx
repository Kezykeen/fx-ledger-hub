import styled from "styled-components";
import { Logo } from "../../assets/svgs";
const AppLogo = ({ useColored }) => {
  return (
    <LogoWrapper $useColored={useColored}>
      <Logo />
      <h3>IronClad</h3>
    </LogoWrapper>
  );
};

export default AppLogo;

const LogoWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  & h3 {
    font-weight: ${({ $useColored }) => ($useColored ? "700" : "600")};
    font-size: ${({ $useColored }) => ($useColored ? "14px" : "24px")};
    color: ${({ theme, $useColored }) =>
      $useColored ? theme.colors.primary300 : "#475467"};
    line-height: ${({ $useColored }) => ($useColored ? "17.54px" : "32px")};
    letter-spacing: ${({ $useColored }) => ($useColored ? "0.14px" : "0.25px")};
  }

  & > svg {
    width: ${({ $useColored }) => ($useColored ? "40px" : "42px")};
    height: ${({ $useColored }) => ($useColored ? "40px" : "42px")};
  }
`;
