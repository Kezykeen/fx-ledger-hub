import styled from "styled-components";
import { Table } from "./table/table";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

const ViewDetails = styled(Link)`
  color: #f97316;
  font-weight: 500;
  cursor: pointer;
`;

const SuppliersTable = () => {
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
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <PaymentStatus $status={value}>{value}</PaymentStatus>
      ),
    },
    {
      Header: "Date Added",
      accessor: "dateAdded",
    },
    {
      Header: "",
      id: "action",
      Cell: () => (
        <Button>
          <Flex>
            <SubTitle to={"/s/"}>Edit Details</SubTitle>
            <Span></Span>
            <ViewDetails to={"1"}>View Details</ViewDetails>
          </Flex>
        </Button>
      ),
    },
  ];
  const data = [
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      status: "Complete",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      status: "Owing",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      status: "Refund in progress",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      status: "Supply in progress",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      status: "Complete",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      status: "Owing",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      status: "Complete",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      status: "Refund in progress",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      status: "Complete",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      status: "Supply in progress",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      status: "Complete",
      dateAdded: "Jan 4, 2022",
    },
    {
      customerName: "John Doe",
      phoneNumber: "+234 8120 1234",
      status: "Owing",
      dateAdded: "Jan 4, 2022",
    },
  ];
  return <Table columns={columns} data={data} />;
};

export default SuppliersTable;

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
    props.$status === "Complete"
      ? "#D1FAE5"
      : props.$status === "Refund in progress"
      ? "#FEDF89"
      : props.$status === "Supply in progress"
      ? "#FFD7BF"
      : "#FEE2E2"}; // light red for default or any other status

  color: ${(props) =>
    props.$status === "Complete"
      ? "#059669"
      : props.$status === "Refund in progress"
      ? "#B54708"
      : props.$status === "Supply in progress"
      ? "#DB6C27"
      : "#D92D20"}; // dark red for default or any other status
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
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.Primary50};
    cursor: pointer;
  }
`;
