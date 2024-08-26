import styled from "styled-components";

const ActiveUser = ({ name, email }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Wrapper>
      <Container>
        <Avatar>
          {initials}
          <StatusDot />
        </Avatar>
        <InfoContainer>
          <Name>{name}</Name>
          <Email>{email}</Email>
        </InfoContainer>
      </Container>
    </Wrapper>
  );
};

export default ActiveUser;

const Wrapper = styled.div`
  width: 100%;
  position: sticky;
  bottom: 0;
  padding: 15px 18px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #fdf1e4;
  padding: 12px 16px;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f8d7bd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #e67e22;
  position: relative;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  color: #344054;
  position: relative;
`;

const Email = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: #344054;
`;

const StatusDot = styled.span`
  width: 12px;
  height: 12px;
  background-color: #2ecc71;
  border-radius: 50%;
  display: inline-block;
  border: 1.5px solid #fff;
  position: absolute;
  bottom: -0px;
  left: 70%;
`;
