import React, { useState } from "react";
import { Card, CardBody, Input, Label } from "reactstrap";
import DataTable from "react-data-table-component";
import { SearchTableButton } from "@/Constant";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { useMemo } from "react";

interface HtmlSourcedDataProps<T> {
  data: T[];
  columns: T[];
  title: string;
  filterKey: keyof T & string; // Dynamic key for filter
}

const HtmlSourcedData = <T extends object>({
  data,
  columns,
  filterKey,
  title,
}: HtmlSourcedDataProps<T>) => {
  const [filterText, setFilterText] = useState("");

  const filteredItems =
    Array.isArray(data) &&
    data.filter((item) =>
      item[filterKey]
        ?.toString()
        .toLowerCase()
        .includes(filterText.toLowerCase())
    );

  const subHeaderComponentMemo = useMemo(
    () => (
      <div
        id="basic-1_filter"
        className="dataTables_filter d-flex align-items-center"
      >
        <Label className="me-1">{SearchTableButton}:</Label>
        <Input
          onChange={(e) => setFilterText(e.target.value)}
          type="search"
          value={filterText}
        />
      </div>
    ),
    [filterText]
  );

  return (
    <Card className="basic-data-table">
      <CommonCardHeader title={title} headClass="pb-0 card-no-border" />
      <CardBody>
        <div className="table-responsive">
          <DataTable
            className="theme-scrollbar"
            data={filteredItems || []}
            columns={columns}
            striped
            highlightOnHover
            pagination
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default HtmlSourcedData;
