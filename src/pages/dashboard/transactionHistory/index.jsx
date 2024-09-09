import styled from "styled-components";
import { PageHeader } from "../../../components/pageHeader";
import Transactions from "./components/transaction";
import { TableWidget } from "../../../components/tableWidget";
import { TableTab } from "../../../components/tableTab";
import FilterComponent from "./components/filterComponent";
import { useEffect, useState } from "react";
import { transactionTabs } from "./components/data";
import { getTradeUrl } from "../../../urls";
import {
  CurrencyTradeStatus,
  QueryKeys,
  userRoles,
} from "../../../constants/enums";
import { useGet } from "../../../hooks/api";
import { useSelector } from "react-redux";
import { LineLoader } from "../../../components/lineLoader";
import { useLocation } from "react-router-dom";

const TransactionHistory = () => {
  const user = useSelector((state) => state?.user);
  const userRole = user?.roles[0];
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentHashId, setCurrentHashId] = useState(transactionTabs[0].value);
  const [currentHash, setCurrentHash] = useState(transactionTabs[0].hash);
  const [currencyStatus, setCurrencyStatus] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const { hash } = useLocation();
  const urlHash = hash.substring(1);

  const statusSetter = (hash) => {
    console.log({ hash });
    if (hash === "pending-approval") {
      setCurrencyStatus(
        userRole?.toLowerCase() === userRoles.COO?.toLowerCase()
          ? CurrencyTradeStatus.PendingCOO
          : CurrencyTradeStatus.PendingCFO
      );
      setCurrentHashId(null);
      setCurrentHash(hash);
    } else {
      const hashValue = transactionTabs.find((x) => x.hash === hash);
      setCurrentHashId(hashValue?.value);
      setCurrencyStatus(null);
      setCurrentHash(hash);
    }
  };

  useEffect(() => {
    if (urlHash) {
      statusSetter(urlHash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlHash]);

  const getTabs = () => {
    if (
      userRole?.toLowerCase() === userRoles.CFO?.toLowerCase() ||
      userRole?.toLowerCase() === userRoles.COO?.toLowerCase()
    ) {
      return transactionTabs;
    } else {
      return transactionTabs.slice(1);
    }
  };

  const { data: transactions, isLoading } = useGet(
    [QueryKeys.trade.getAll, currentHashId, currencyStatus, pageNumber],
    getTradeUrl({
      tradeStatus: currentHashId,
      currencyTradeStatus: currencyStatus,
      pageIndex: pageNumber,
    })
  );

  const handleTabChange = (selectedTab) => {
    statusSetter(selectedTab);
  };

  return (
    <Container>
      <PageHeader
        title={"Transaction History"}
        subTitle={"Here is an overview of all your transactions "}
      />
      <WidgetWrapper>
        <TableWidget
          customFilter={<FilterComponent setFilterOpen={setFilterOpen} />}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />
        <Divider />
        <TableTab tabs={getTabs()} onTabChange={handleTabChange} />
      </WidgetWrapper>
      <Transactions
        data={transactions?.data}
        totalCount={transactions?.totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        hash={currentHash}
      />
      <LineLoader loading={isLoading} />
    </Container>
  );
};

export { TransactionHistory };

TransactionHistory.displayName = "TransactionHistory";

const Container = styled.div``;

const WidgetWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  margin-top: 1rem;
  border-radius: 12px;
  padding: 16px 24px;
  width: 100%;
`;

export const Divider = styled.div`
  margin: ${({ $margin }) => $margin ?? "20px 0"};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;
