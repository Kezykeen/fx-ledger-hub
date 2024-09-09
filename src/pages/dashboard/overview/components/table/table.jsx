import { TMTable } from "../../../../../components/table/TMTable";

export const Table = ({
  columns = [],
  data = [],
  isLoading,
  totalCount,
  pageNumber,
  setPageNumber,
  metaData,
  onRowClick,
}) => {
  return (
    <TMTable
      data={data}
      columns={columns}
      loading={isLoading}
      onRowClick={onRowClick}
      totalCount={totalCount}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      metaData={metaData}
    />
  );
};
