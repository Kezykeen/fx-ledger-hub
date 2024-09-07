import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styled from "styled-components";
import { ConfirmIcon } from "../../assets/svgs";
import { Button } from "../button";

export const PopUp = ({
  open,
  children,
  handleClose,
  title,
  subtitle,
  width,
  onSubmit,
  isLoading,
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 400,
          style: {
            background: `#1F2124B2`,
            backdropFilter: "blur(5px)",
            zIndex: 999,
          },
        },
      }}
    >
      <Fade in={open}>
        <Container $width={width}>
          <ConfirmIcon />
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          <ContentWrapper>{children}</ContentWrapper>
          <ButtonWrapper>
            <Button
              buttonClass={"outline"}
              label={"Cancel"}
              width={`48%`}
              onClick={handleClose}
            />
            <Button
              buttonClass={"primary"}
              label={"Confirm"}
              width={`48%`}
              onClick={onSubmit}
              loading={isLoading}
            />
          </ButtonWrapper>
        </Container>
      </Fade>
    </Modal>
  );
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 11px 15px -7px,
    rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;
  display: flex;
  flex-direction: column;
  padding: 24px 20px 32px 20px;
  border-radius: 20px;
  background-color: #fff;
  width: ${({ $width }) => ($width ? $width : `27vw`)};
  z-index: 9999;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 48px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  text-align: left;
  color: #101828;
  margin: 20px 0 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: #667085;
`;

const ContentWrapper = styled.div``;
