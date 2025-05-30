import { useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from "primereact/button";
import StudentsTable from "./components/StudentsTable";
import Popup from "./components/Popup";
import FormNewStudent from "./components/FormNewStudent/index";
import "./App.scss";
import useLoadStudents from "./hooks/useLoadStudents";
import { LABEL_ADD, LABEL_LOADING } from "./constants";

function App() {
  const { students, setStudents, totalStudents, isLoading, setIsLoading } = useLoadStudents();
  const [isActivePopup, setIsActivePopup] = useState<boolean>(false);

  return (
    <div className="App">
      <Button
        disabled={isLoading}
        label={!isLoading ? LABEL_ADD : LABEL_LOADING}
        className="button-add"
        onClick={() => setIsActivePopup(true)} />
      <Popup isActivePopup={isActivePopup} setIsActivePopup={setIsActivePopup}>
        <FormNewStudent setItems={setStudents} setIsActivePopup={setIsActivePopup} />
      </Popup>
      <StudentsTable items={students} totalItems={totalStudents} setIsLoading={setIsLoading} />
    </div >
  );
}

export default App;