import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

import { handleValidStyle, showErrorValidate, showToast } from "../../utils/helpers";
import { FormStudentValue } from "../../types";
import { FormNewStudentProps } from "./types";
import { STATUS_OPTIONS, STUDYFORM_OPTIONS } from "./constants";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toast } from "primereact/toast";
import { ERROR, ERROR_ADD_ITEM, SUCCESS, SUCCESS_ADD_ITEM } from "../../constants";
import { postStudent } from "../../api/fetch";

const FormNewStudent = ({
  setItems,
  setIsActivePopup
}: FormNewStudentProps) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [formStatus, setFormStatus] = useState<string>("");
  const [formStudyform, setFormStudyform] = useState<string>("");
  const toastRef = useRef<Toast>(null);
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormStudentValue>({
    mode: "onBlur"
  });

  const onSubmit: SubmitHandler<FormStudentValue> = async (data: FormStudentValue) => {
    setIsSending(true);
    try {
      const result = await postStudent(data);
      setItems(prev => [...prev, result]);
      setIsActivePopup(false);
      showToast(toastRef, SUCCESS, SUCCESS_ADD_ITEM, "success");
    } catch (error) {
      showToast(toastRef, ERROR, ERROR_ADD_ITEM, "error");
      console.error(error);
    } finally {
      setIsSending(false);
      reset();
      clearErrors();
    }
  };

  useEffect(() => {
    return () => {
      reset();
      clearErrors();
    }
  }, [])
  //    { isSending?}

  return (
    <>
      <Toast ref={toastRef} position="bottom-right" />
      <form id="popup__form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <Message
            severity={showErrorValidate(errors.fullName)}
            text="ФИО"
            style={{ justifyContent: "end" }} />
          <InputText
            className={handleValidStyle(errors.fullName)}
            placeholder="Обязательно"
            {...register("fullName", {
              required: true
            })} />

          <Message severity="secondary" text="Номер телефона" />
          <InputMask
            className={handleValidStyle(errors.phone)}
            placeholder={"(XXX) XXX-XX-XX"}
            {...register("phone")}
            mask="(999) 999-99-99"
          />

          <Message
            severity={showErrorValidate(errors.faculty)}
            text="Факультет"
            style={{ justifyContent: "end" }} />
          <InputText
            className={handleValidStyle(errors.faculty)}
            placeholder="Обязательно"
            {...register("faculty", {
              required: true
            })} />

          <Message
            severity={showErrorValidate(errors.specialty)}
            text="Специальность"
            style={{ justifyContent: "end" }} />
          <InputText
            className={handleValidStyle(errors.specialty)}
            placeholder="Обязательно"
            {...register("specialty", {
              required: true
            })} />

          <Message
            severity={showErrorValidate(errors.year)}
            text="Курс"
            style={{ justifyContent: "end" }} />
          <InputText
            className={handleValidStyle(errors.year)}
            placeholder="Обязательно | от 1 до 6"
            {...register("year", {
              required: true,
              validate: {
                checkYear: (year: number) => {
                  if (year < 1 || year > 6) return "Курс должен быть в промежутке от 1 до 6";
                }
              }
            })} keyfilter="int" />

          <Message
            severity={showErrorValidate(errors.group)}
            text="Группа"
            style={{ justifyContent: "end" }} />
          <InputMask
            className={handleValidStyle(errors.year)}
            placeholder="Обязательно | AA-XXX"
            {...register("group", {
              required: true
            })}
            mask="aa-999" />

          <Message
            severity={showErrorValidate(errors.status)}
            text="Статус"
            style={{ justifyContent: "end" }} />
          <Dropdown
            className={handleValidStyle(errors.status)}
            placeholder="Обязательно"
            {...register("status", { required: true })}
            options={STATUS_OPTIONS}
            value={formStatus}
            onChange={(e) => setFormStatus(e.value)}
          />

          <Message
            severity={showErrorValidate(errors.studyForm)}
            text="Форма обучения"
            style={{ justifyContent: "end" }} />
          <Dropdown
            className={handleValidStyle(errors.studyForm)}
            placeholder="Обязательно"
            {...register("studyForm", { required: true })}
            options={STUDYFORM_OPTIONS}
            value={formStudyform}
            onChange={(e) => setFormStudyform(e.value)}
          />

          <Message
            severity={showErrorValidate(errors.gpa)}
            text="Средний балл"
            style={{ justifyContent: "end" }} />
          <InputText
            className={handleValidStyle(errors.gpa)}
            placeholder={errors?.gpa?.message || "От 2 до 5"}
            {...register("gpa", {
              valueAsNumber: true,
              validate: {
                checkGpa: (gpa) => {
                  console.log(gpa)
                  if (gpa && gpa < 2 && gpa > 5) return "Средняя оценка должна быть в промежутке от 2 до 5";
                  return true;
                }
              }
            })} keyfilter="int" />

          <Message
            severity={showErrorValidate(errors.scholarship)}
            text="Размер стипендии"
            style={{ justifyContent: "end", textAlign: "right" }} />
          <InputText
            className={handleValidStyle(errors.scholarship)}
            {...register("scholarship", {
              required: true,
              valueAsNumber: true,
              validate: {
                checkScholarship: (scholarship) => {
                  if (scholarship && scholarship < 0) {
                    console.log("Размер стипендии должен быть положительным");
                    return "Размер стипендии должен быть положительным"
                  }
                }
              }
            })}
            placeholder={errors.scholarship?.message}
            keyfilter="int" />
        </fieldset>
        <footer>
          <Button label="Очистить" severity="secondary" onClick={() => {
            reset();
            clearErrors();
          }} />
          <Button label="Добавить" type="submit" disabled={!isValid} />
        </footer>
      </form>
    </>
  )
};

export default FormNewStudent;