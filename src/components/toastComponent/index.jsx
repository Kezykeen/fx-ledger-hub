import styled from "styled-components";

const ToastComponent = ({ title, message }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Message>{message}</Message>
    </Container>
  );
};

export default ToastComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #5b5b5b;
`;

const Message = styled.p`
  font-size: 15px;
  font-weight: 400;
  color: #757575;
`;
