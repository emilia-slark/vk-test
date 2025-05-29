import { useEffect, useState, useRef, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { throttle } from "lodash";
import { getStudents, postStudent } from "./api/fetch";
import { IFormStudentValue, IStudent, TData } from "./utils/types";
import { showToast } from "./utils/helpers";


import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from 'primereact/progressspinner';

import StudentsTable from "./components/StudentsTable";
import Popup from "./components/Popup";
import FormNewStudent from "./components/Form";
import "./App.scss";

function App() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isActiveForm, setIsActiveForm] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const toastRef = useRef<Toast>(null);
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<IFormStudentValue>({
    mode: "onBlur"
  });

  const onLoad = async () => {
    try {
      const result: TData = await getStudents(currentPage);
      setStudents(prev => [...prev, ...result.students]);
      setCurrentPage(prev => prev + 1);
      setTotalStudents(result.total);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const onDeleteStudent = async (student: IStudent) => {
    console.log(student);
  }

  const onSubmit: SubmitHandler<IFormStudentValue> = async (data: IFormStudentValue) => {
    setIsSending(true);
    try {
      const result = await postStudent(data);
      setStudents(prev => [result, ...prev]);
      setIsActiveForm(false);
      showToast(toastRef, "Успех", "Запись добавлена", "success");
    } catch (error) {
      showToast(toastRef, "Ошибка", "Не удалось добавить запись", "error");
      console.error(error);
    } finally {
      setIsSending(false);
      reset();
      clearErrors();
    }
  };

  const onScroll = useCallback((e: Event) => {
    const doc: HTMLElement = document.documentElement;
    if (doc.scrollHeight - (doc.scrollTop + window.innerHeight) < 128 && totalStudents && students.length < totalStudents)
      setIsLoading(true);
  }, [students, totalStudents]);

  useEffect(() => {
    if (!isLoading) return;
    onLoad();
  }, [isLoading]);

  useEffect(() => {
    const onScrollThrottled = throttle(onScroll, 500);
    window.addEventListener('scroll', onScrollThrottled);
    return () => window.removeEventListener("scroll", onScrollThrottled);
  }, [onScroll]);

  return (
    <div className="App">
      <Toast ref={toastRef} position="bottom-right" />
      <Button
        label="Добавить"
        className="button-add"
        onClick={() => setIsActiveForm(true)}
      />
      <Popup
        visible={isActiveForm}
        onHideCallback={() => {
          if (!isActiveForm) return;
          setIsActiveForm(false);
          clearErrors();
          reset();
        }}>
        {isSending ? (<ProgressSpinner />
        ) : (
          <FormNewStudent
            config={{ register, errors, isValid, handleSubmit, reset, clearErrors }}
            onSubmitCallback={onSubmit}
          />
        )}
      </Popup>
      <StudentsTable source={students} selectedStudent={selectedStudent} onSelectCallback={setSelectedStudent}
      //onDeleteStudent={onDeleteStudent} 
      />
    </div >
  );
}

export default App;