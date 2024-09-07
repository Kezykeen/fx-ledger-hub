import styled from "@emotion/styled";
import { useRef, useEffect, useState } from "react";
import { PlaneIcon } from "../../assets/svgs";

export const Modal = ({
  children,
  isOpen,
  closeHandler,
  headerText,
  subText,
  width,
  modalHeight = "95vh",
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const ref = useRef();
  const overlayRef = useRef();

  const handleClick = (e) => {
    const refWrapper = ref.current;
    if (refWrapper && !refWrapper.contains(e.target)) {
      closeHandler();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const element = overlayRef.current;
    element?.addEventListener("mousedown", handleClick, false);

    return () => {
      element?.removeEventListener("mousedown", handleClick, false);
    };
  });

  return (
    <>
      {isVisible && (
        <>
          <Container
            $isOpen={isOpen}
            $modalHeight={modalHeight}
            ref={ref}
            width={width}
            onAnimationEnd={handleAnimationEnd}
          >
            <TopWrapper $hasSub={!!subText}>
              <PlaneIcon />
              <HeaderWrapper>
                <Header>{headerText}</Header>
                <SubText>{subText}</SubText>
              </HeaderWrapper>
            </TopWrapper>
            <ContentWrapper>{children}</ContentWrapper>
          </Container>
          <Overlay
            ref={overlayRef}
            $overlayBg={"grey"}
            $isOpen={isOpen}
            onAnimationEnd={handleAnimationEnd}
          />
        </>
      )}
    </>
  );
};

const slideIn = `
  @keyframes slideIn {
    0% {
      transform: translateX(520px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const slideOut = `
  @keyframes slideOut {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(520px);
      opacity: 0;
    }
  }
`;

const Container = styled.div`
  position: fixed;
  top: calc(5vh / 2);
  right: calc(5vh / 2);
  display: flex;
  width: ${({ width }) => (width ? width : "30vw")};
  height: ${({ $modalHeight }) => $modalHeight};
  max-height: 95vh;
  padding: 30px 24px 20px;
  flex-direction: column;
  align-items: flex-start;
  background: #fff;
  border-radius: 20px;
  z-index: 99;
  cursor: default;
  animation: ${({ $isOpen }) =>
    $isOpen
      ? "slideIn 0.25s cubic-bezier(0.42, 0, 0.58, 1) forwards"
      : "slideOut 0.25s cubic-bezier(0.42, 0, 0.58, 1) forwards"};

  ${slideIn}
  ${slideOut}

  .modal-footer {
    position: sticky;
    bottom: 0;
    background-color: ${(props) => props.theme.wrappers};
  }
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding-bottom: 16px;
  border-bottom: 1px solid #eaecf0;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  & > svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const Header = styled.h2`
  color: #101828;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.72px;
`;

const SubText = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: #667085;
`;

const fadeIn = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const fadeOut = `
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ $overlayBg }) => $overlayBg};
  mix-blend-mode: multiply;
  animation: ${({ $isOpen }) =>
    $isOpen
      ? "fadeIn 0.25s ease-in-out forwards"
      : "fadeOut 0.25s ease-in-out forwards"};

  ${fadeIn}
  ${fadeOut}
  z-index: 9;
`;
