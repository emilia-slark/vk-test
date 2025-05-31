import { DataTable } from "primereact/datatable";
import { Column, ColumnBodyOptions } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";

import { HEADER_LABEL_FORM_ADD_ITEM, LABEL_ADD, LABEL_ERROR, LABEL_LOADING } from "../../constants";
import { IStudent } from "../../types";
import { ColumnName, TagStudentStatus } from "./constants";
import { useRef, useState } from "react";
import Popup from "../Popup";
import FormNewStudent from "../FormNewStudent";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useLoadStudents from "../../hooks/useLoadStudents";
import "./styles.scss";


const StudentsTable = () => {
  const [isActivePopup, setIsActivePopup] = useState<boolean>(false);
  const toastRef = useRef<Toast>(null);

  const { students, setStudents, totalStudents, isLoading, setIsLoading, isError } = useLoadStudents();
  useInfiniteScroll(students, totalStudents, setIsLoading);

  return (
    <div className="students-table_wrapper">

      <Toast ref={toastRef} position="bottom-right" style={{ zIndex: 15 }} />
      <Popup
        isActivePopup={isActivePopup}
        setIsActivePopup={setIsActivePopup}
        header={HEADER_LABEL_FORM_ADD_ITEM}
      >
        <FormNewStudent
          toastRef={toastRef}
          setItems={setStudents}
          setIsActivePopup={setIsActivePopup}
        />
      </Popup>
      <DataTable
        value={students}
        showGridlines
        stripedRows
        selectionMode="single"
        tableStyle={{ blockSize: "2rem" }}
        dataKey="id"
        className="students-table"
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
              severity={TagStudentStatus[sourceStudent.status]} />
          )}
        />
        <Column field="studyForm" header={ColumnName.studyForm} />
        <Column field="gpa" header={ColumnName.gpa} />
        <Column field="scholarship" header={ColumnName.scholarship} />
        <Column field="lastUpdated" header={ColumnName.lastUpdated} />
      </DataTable >
      <Button
        icon={isLoading && <ProgressSpinner
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: "transparent"
          }}
          strokeWidth="8"
          animationDuration=".3s" />}
        disabled={isLoading || isError !== null}
        label={isLoading ? LABEL_LOADING : (isError ? LABEL_ERROR : LABEL_ADD)}
        className="button-add"
        severity={isError ? "danger" : undefined}
        onClick={() => setIsActivePopup(true)}
      />
    </div>)
};

export default StudentsTable;