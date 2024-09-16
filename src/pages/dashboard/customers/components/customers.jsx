import styled from "styled-components";
import { Table } from "./table/table";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useState } from "react";
import EditCustomerAccountModal from "./customer-popup/editCustomerModal";

const Customers = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
      Header: "Date",
      accessor: "dateAdded",
    },
    {
      Header: "",
      id: "action",
      Cell: () => (
        <Button>
          <Flex>
            <SubTitle onClick={() => setIsEditModalOpen(true)}>
              Edit Details
            </SubTitle>
            <Span></Span>
            <ViewDetails to={"/customers/customers-detail"}>
              View Details
            </ViewDetails>
          </Flex>
        </Button>
      ),
    },
  ];

  const data = {
    data: [
      {
        customerName: "John Doe",
        phoneNumber: "+234 8120 1234",
        dateAdded: "Jan 4, 2022",
      },
      {
        customerName: "John Doe",
        phoneNumber: "+234 8120 1234",
        dateAdded: "Jan 4, 2022",
      },
      {
        customerName: "John Doe",
        phoneNumber: "+234 8120 1234",
        dateAdded: "Jan 4, 2022",
      },
      {
        customerName: "John Doe",
        phoneNumber: "+234 8120 1234",
        dateAdded: "Jan 4, 2022",
      },
      {
        customerName: "John Doe",
        phoneNumber: "+234 8120 1234",
        dateAdded: "Jan 4, 2022",
      },
    ],
    metaData: {
      totalPages: 10,
      page: pageNumber,
    },
  };

  return (
    <>
      <Table
        columns={columns}
        data={data?.data}
        setPageNumber={setPageNumber}
        availablePages={data?.metaData?.totalPages}
        pageNumber={data?.metaData?.page}
      />
      <EditCustomerAccountModal
        handleClose={() => setIsEditModalOpen(false)}
        isOpen={isEditModalOpen}
      />
    </>
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
    color: ${({ theme }) => theme.colors.primary300};
  }
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
  align-items: center;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary50};
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
