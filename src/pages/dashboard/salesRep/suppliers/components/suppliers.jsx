import React from "react";
import styled from "styled-components";
import { Table } from "./table/table";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

const ViewDetails = styled(Link)`
  color: #f97316;
  font-weight: 500;
  cursor: pointer;
`;
const Suppliers = () => {
  const columns = [
    {
      Header: "Customer Name",
      accessor: "customerName",
      Cell: ({ value }) => (
        <Flex>
          <span>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </span>
          <span>{value}</span>
        </Flex>
      ),
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Payment Status",
      accessor: "paymentStatus",
      Cell: ({ value }) => (
        <PaymentStatus status={value}>{value}</PaymentStatus>
      ),
    },
    {
      Header: "Date",
      accessor: "dateAdded",
    },
    {
      Header: "",
      id: "action",
      Cell: () => (
        <Button>
          <Flex>
            <SubTitle to={"/s/"}>Edit</SubTitle>
            <Span></Span>
            <ViewDetails to={"/s/customers/customers-detail"}>
              View Details
            </ViewDetails>
          </Flex>
        </Button>
      ),
    },
  ];
  const data = [
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      paymentStatus: "Paid",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      paymentStatus: "Owing",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      paymentStatus: "Paid",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      paymentStatus: "Owing",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      paymentStatus: "Paid",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      paymentStatus: "Owing",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      paymentStatus: "Paid",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      paymentStatus: "Owing",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      paymentStatus: "Paid",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      paymentStatus: "Owing",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      paymentStatus: "Paid",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      paymentStatus: "Owing",
      dateAdded: "Jan 4, 2022",
    },
  ];
  return <Table columns={columns} data={data} />;
};

export default Suppliers;

const Flex = styled.div`
  display: flex;
  gap: 0.7rem;
  color: ${({ theme }) => theme.colors.gray800};
  align-items: center;
`;

const Span = styled.span`
  width: 4px;
  height: 22px;
  gap: 0px;
  border-radius: 56px;
  opacity: 0px;
  background: ${({ theme }) => theme.colors.gray300};
`;

const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray700};
`;

const PaymentStatus = styled.span`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) =>
    props.status === "Paid" ? "#D1FAE5" : "#FEE2E2"};
  color: ${(props) => (props.status === "Paid" ? "#059669" : "#DC2626")};
`;

const Button = styled.div`
  width: 225px;
  height: 45px;
  padding: 4px 12px 4px 12px;
  gap: 12px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.gray100};
  display: flex;
  justify-content: center;
  align-item: center;
  transition: background-color 0.2s ease-in-out;
`;
