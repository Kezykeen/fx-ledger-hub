import { TMTable } from "../../../../../components/table/TMTable";

export const Table = ({
  columns = [],
  data,
  isLoading,
  availablePages,
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
      availablePages={availablePages}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      metaData={metaData}
    />
  );
};
