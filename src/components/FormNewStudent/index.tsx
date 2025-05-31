import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { IMaskInput } from "react-imask";

import { handleValidStyle, showErrorValidate, showToast } from "../../utils/helpers";
import { FormStudentValue } from "../../types";
import { FormNewStudentProps } from "./types";
import { LETTER, STATUS_OPTIONS, STUDYFORM_OPTIONS } from "./constants";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ERROR, ERROR_ADD_ITEM, LABEL_ADD, LABEL_CLEAR, LABEL_REQUIRED, LABEL_WAIT, SUCCESS, SUCCESS_ADD_ITEM } from "../../constants";
import { postStudent } from "../../api/fetch";
import { ColumnName } from "../StudentsTable/constants";
import "./styles.scss"

const FormNewStudent = ({
  setItems,
  setIsActivePopup,
  toastRef
}: FormNewStudentProps) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [formStatus, setFormStatus] = useState<string>("");
  const [formStudyform, setFormStudyform] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormStudentValue>({
    mode: "onTouched",
    defaultValues: { scholarship: 0 }
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
    }
  };

  useEffect(() => {
    return () => {
      reset();
    }
  }, [])

  return (
    <>
      <form id="popup__form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <Message
            severity={showErrorValidate(errors.fullName)}
            text={ColumnName.fullName}
            style={{ justifyContent: "end", textAlign: "right" }}
          />
          <InputText
            className={handleValidStyle(errors.fullName)}
            placeholder={LABEL_REQUIRED}
            {...register("fullName", {
              required: true
            })} />


          <Message
            severity="secondary"
            text={ColumnName.phone}
          />
          <IMaskInput
            placeholder="(xxx) xxx-xx-xx"
            className="p-inputtext p-component"
            mask="(000) 000-00-00"
            {...register("phone")}
          />


          <Message
            severity={showErrorValidate(errors.faculty)}
            text={ColumnName.faculty}
            style={{ justifyContent: "end", textAlign: "right" }}
          />
          <InputText
            className={handleValidStyle(errors.faculty)}
            placeholder={LABEL_REQUIRED}
            {...register("faculty", {
              required: true
            })}
          />


          <Message
            severity={showErrorValidate(errors.specialty)}
            text={ColumnName.specialty}
            style={{ justifyContent: "end", textAlign: "right" }}
          />
          <InputText
            className={handleValidStyle(errors.specialty)}
            placeholder={LABEL_REQUIRED}
            {...register("specialty", {
              required: true
            })}
          />


          <Message
            severity={showErrorValidate(errors.year)}
            text={ColumnName.year}
            style={{ justifyContent: "end", textAlign: "right" }}
          />
          <InputText
            className={handleValidStyle(errors.year)}
            placeholder={`${LABEL_REQUIRED} | от 1 до 6`}
            {...register("year", {
              required: true,
              validate: {
                checkYear: (year: number) => !(year < 1 || year > 6)
              }
            })} keyfilter="int"
          />


          <Message
            severity={showErrorValidate(errors.group)}
            text={ColumnName.group}
            style={{ justifyContent: "end", textAlign: "right" }}
          />
          <IMaskInput
            placeholder={`${LABEL_REQUIRED} | xx-xxx`}
            className={`p-inputtext p-component ${handleValidStyle(errors.group)}`}
            mask="aa-000"
            definitions={{ "a": LETTER }}
            {...register("group", {
              required: true
            })}
          />


          <Message
            severity={showErrorValidate(errors.status)}
            text={ColumnName.status}
            style={{ justifyContent: "end", textAlign: "right" }}
          />
          <Dropdown
            className={handleValidStyle(errors.status)}
            placeholder={LABEL_REQUIRED}
            {...register("status", { required: true })}
            options={STATUS_OPTIONS}
            value={formStatus}
            onChange={(e) => setFormStatus(e.value)}
          />


          <Message
            severity={showErrorValidate(errors.studyForm)}
            text={ColumnName.studyForm}
            style={{ justifyContent: "end", textAlign: "right" }}
          />
          <Dropdown
            className={handleValidStyle(errors.studyForm)}
            placeholder={LABEL_REQUIRED}
            {...register("studyForm", { required: true })}
            options={STUDYFORM_OPTIONS}
            value={formStudyform}
            onChange={(e) => setFormStudyform(e.value)}
          />


          <Message
            severity={showErrorValidate(errors.gpa)}
            text={ColumnName.gpa}
            style={{ justifyContent: "end", textAlign: "right" }}
          />
          <InputText
            className={handleValidStyle(errors.gpa)}
            placeholder={`${LABEL_REQUIRED} | от 2 до 5`}
            {...register("gpa", {
              valueAsNumber: true,
              validate: {
                checkGpa: (gpa) => !(gpa && (gpa < 2 || gpa > 5))
              }
            })} keyfilter="num"
          />


          <Message
            severity={showErrorValidate(errors.scholarship)}
            text={ColumnName.scholarship}
            style={{ justifyContent: "end", textAlign: "right" }}
          />
          <InputText
            className={handleValidStyle(errors.scholarship)}
            {...register("scholarship", {
              required: true,
              valueAsNumber: true,
              validate: {
                checkScholarship: (scholarship) => !(scholarship && scholarship < 0)
              }
            })}
            keyfilter="int"
          />
        </fieldset>
        <footer>
          <Button label={LABEL_CLEAR} severity="secondary" onClick={() => {
            reset(undefined, { keepErrors: false });

          }} />
          <Button icon={isSending && <ProgressSpinner
            style={{
              width: '14px',
              height: '14px',
              backgroundColor: "transparent"
            }}
            strokeWidth="8"
            animationDuration=".3s" />}
            style={{ gap: "0.5rem" }}
            label={!isSending ? LABEL_ADD : LABEL_WAIT}
            type="submit"
            disabled={!isValid || isSending} />
        </footer>
      </form>
    </>
  )
};

export default FormNewStudent;