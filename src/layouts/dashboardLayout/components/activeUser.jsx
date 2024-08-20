import React from "react";
import styled from "styled-components";
const AWrapper = styled.div`
  width: 100%;
  position: sticky;
  bottom: 0;
  padding: 10px 24px;
  padding-bottom: 24px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #fdf1e4;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
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
  font-weight: bold;
  color: #e67e22;
  position: relative;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  position: relative;
  font-weight: bold;
  color: #333;
`;

const Email = styled.span`
  color: #666;
  font-size: 0.9em;
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  background-color: #2ecc71;
  border-radius: 50%;
  display: inline-block;

  position: absolute;
  bottom: -0px;
  left: 70%;
`;

const ActiveUser = ({ name, email }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <AWrapper>
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
    </AWrapper>
  );
};

export default ActiveUser;
