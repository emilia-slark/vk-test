import { DataTable } from "primereact/datatable";
import { Column, ColumnBodyOptions } from "primereact/column";
import { Tag } from "primereact/tag";
//import { Button } from "primereact/button";
//import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

import { IStudent } from "../utils/types";
import { tagStatus } from "../utils/helpers";
import { useEffect, useRef, useState } from "react";


interface IProps {
  source: IStudent[],
  selectedStudent: IStudent | null,
  onSelectCallback: (selected: IStudent | null) => void,
  //onDeleteStudent: (student: IStudent) => void
}

const StudentsTable = ({
  source,
  selectedStudent,
  onSelectCallback,
  //onDeleteStudent
}: IProps) => {
  // const [isActivePopup, setIsActivePopup] = useState<boolean>(false);
  // const buttonRef = useRef<HTMLButtonElement | null>(null);

  // const accept = () => {
  //   console.log()
  // }

  // const reject = () => {
  //   setIsActivePopup(false);
  // }

  // useEffect(() => {
  //   if (isActivePopup) {

  //   } else buttonRef.current = null;
  // }, [isActivePopup]);

  return (
    <>
      {/* <ConfirmPopup
        message="Вы уверены?"
        acceptClassName="p-button-danger"
        acceptLabel="Да"
        rejectLabel="Нет"
        defaultFocus='reject'
        target={buttonRef.current as HTMLButtonElement | undefined}
        visible={isActivePopup} accept={accept}
        reject={reject}
        onHide={() => setIsActivePopup(false)} /> */}
      <DataTable
        value={source}
        showGridlines
        stripedRows
        selectionMode="single"
        selection={selectedStudent}
        onSelectionChange={(e) => onSelectCallback(e.value as IStudent)}
        tableStyle={{ blockSize: "2rem" }}
        dataKey="id"
      >
        <Column
          body={(_data, tableElementOptions: ColumnBodyOptions) => tableElementOptions.rowIndex + 1}
          headerStyle={{ inlineSize: 20 }}
          header="#"
        ></Column>
        <Column field="fullName" header="ФИО"></Column>
        <Column field="phone" header="Номер телефона"></Column>
        <Column field="faculty" header="Факультет"></Column>
        <Column field="specialty" header="Специальность"></Column>
        <Column field="year" header="Курс"></Column>
        <Column field="group" header="Группа"></Column>
        <Column
          field="status"
          header="Статус"
          body={(sourceStudent: IStudent, _tableElementOptions) => (
            <Tag
              style={{ fontSize: 12 }}
              value={sourceStudent.status}
              severity={tagStatus(sourceStudent.status)} />
          )}
        ></Column>
        <Column field="studyForm" header="Форма обучения"></Column>
        <Column field="gpa" header="Средний балл"></Column>
        <Column field="scholarship" header="Размер стипендии"></Column>
        <Column field="lastUpdated" header="Обновлено"></Column>
        {/* <Column
          bodyStyle={{ padding: "0.5rem" }}
          body={(sourceStudent: IStudent, _tableElementOptions) => (
            <Button label="X" outlined className="button-delete" onClick={(e) => {
              buttonRef.current = e.target as HTMLButtonElement;
              setIsActivePopup(true);
            }} severity="danger"
            />
          )}
          style={{ inlineSize: 30 }}></Column> */}
      </DataTable >
    </>)
};

export default StudentsTable;