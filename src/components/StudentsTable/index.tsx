import { DataTable } from "primereact/datatable";
import { Column, ColumnBodyOptions } from "primereact/column";
import { Tag } from "primereact/tag";

import { IStudent } from "../../types";
import { tagStatus } from "../../utils/helpers";
import { useState } from "react";
import { StudentTableProps } from "./types";
import { ColumnName } from "./constants";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

const StudentsTable = ({
  items,
  totalItems,
  setIsLoading
}: StudentTableProps) => {
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);

  
  useInfiniteScroll(items, totalItems, setIsLoading);

  return (
    <>
      <DataTable
        value={items}
        showGridlines
        stripedRows
        selectionMode="single"
        selection={selectedStudent}
        onSelectionChange={(e) => setSelectedStudent(e.value as IStudent)}
        tableStyle={{ blockSize: "2rem" }}
        dataKey="id"
      >
        <Column
          body={(_data, tableElementOptions: ColumnBodyOptions) => tableElementOptions.rowIndex + 1}
          headerStyle={{ inlineSize: 20 }}
          header="#"
        ></Column>
        <Column field="fullName" header={ColumnName.fullName} />
        <Column field="phone" header={ColumnName.phone} />
        <Column field="faculty" header={ColumnName.faculty} />
        <Column field="specialty" header={ColumnName.specialty} />
        <Column field="year" header={ColumnName.year} />
        <Column field="group" header={ColumnName.group} />
        <Column
          field="status"
          header={ColumnName.status}
          body={(sourceStudent: IStudent, _tableElementOptions) => (
            <Tag
              style={{ fontSize: 12 }}
              value={sourceStudent.status}
              severity={tagStatus(sourceStudent.status)} />
          )}
        />
        <Column field="studyForm" header={ColumnName.studyForm} />
        <Column field="gpa" header={ColumnName.gpa} />
        <Column field="scholarship" header={ColumnName.scholarship} />
        <Column field="lastUpdated" header={ColumnName.lastUpdated} />
      </DataTable >
    </>)
};

export default StudentsTable;