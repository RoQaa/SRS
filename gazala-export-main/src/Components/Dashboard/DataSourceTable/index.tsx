import HtmlSourcedData from "./HtmlSourcedData";

interface DataSourceContainerProps<T extends object> {
  data: T[];
  columns: T[];
  filterKey: keyof T & string;
  title: string;
}

const DataSourceContainer = <T extends object>({
  title,
  data,
  columns,
  filterKey,
}: DataSourceContainerProps<T>) => {
  return (
    <HtmlSourcedData
      data={data}
      columns={columns}
      filterKey={filterKey}
      title={title}
    />
  );
};

export default DataSourceContainer;
