import React from "react";
import styled from "styled-components";
import { Table } from "./table/table";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useState } from "react";

const Customers = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const columns = [
    {
      Header: "Customer Name",
      accessor: "customerName",
      Cell: ({ value }) => {
        const valueArray = value.split(" ");
        const firstName = valueArray[0].substring(0, 1);
        const lastLetter = valueArray[1].substring(0, 1);
        const abbr = firstName + lastLetter;
        return (
          <Flex>
            <span>
              <Avatar sx={{ color: "#FD853A", bgcolor: "#FFF3EB" }}>
                {abbr}
              </Avatar>
            </span>
            <span>{value}</span>
          </Flex>
        );
      },
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
            <SubTitle onClick={""}>Edit Details</SubTitle>
            <Span></Span>
            <ViewDetails to={"/s/customers/customers-detail"}>
              View Details
            </ViewDetails>
          </Flex>
        </Button>
      ),
    },
  ];
  const data = {
    data:[
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
    ],
    metaData: {
      totalPages: 10,
      page: pageNumber,
    },
  }
  
  return (
    <Table
      columns={columns}
      data={data?.data}
      setPageNumber={setPageNumber}
      availablePages={data?.metaData?.totalPages}
      pageNumber={data?.metaData?.page}
    />
  );
};

export default Customers;

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

  &:hover {
    color: ${({ theme }) => theme.colors.Primary300};
  }
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
  background-color: #6670850d;
  display: flex;
  justify-content: center;
  align-item: center;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.Primary50};
    cursor: pointer;
  }
`;

const ViewDetails = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #fd853a;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.gray700};
  }
`;
