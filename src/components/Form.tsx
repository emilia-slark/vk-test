import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import { handleValidStyle, showErrorValidate } from "../utils/helpers";
import { IFormStudentValue } from "../utils/types";
import { FieldErrors, SubmitHandler, UseFormClearErrors, UseFormHandleSubmit, UseFormRegister, UseFormReset } from "react-hook-form";

interface IProps<T extends IFormStudentValue> {
  config: {
    register: UseFormRegister<T>
    errors: FieldErrors<T>,
    isValid: boolean,
    handleSubmit: UseFormHandleSubmit<T, T>
    reset: UseFormReset<T>,
    clearErrors: UseFormClearErrors<T>
  },
  onSubmitCallback: SubmitHandler<T>,
}

const status = ["Активный", "Академ. отпуск", "Отчислен"];
const studyForm = ["Бюджет", "Договор"]

const FormNewStudent = ({
  config, onSubmitCallback
}: IProps<IFormStudentValue>) => {

  return (
    <form id="popup__form" onSubmit={config.handleSubmit(onSubmitCallback)}>
      <fieldset>
        <Message
          severity={showErrorValidate(config.errors.fullName)}
          text="ФИО"
          style={{ justifyContent: "end" }} />
        <InputText
          className={handleValidStyle(config.errors.fullName)}
          placeholder="Обязательно"
          {...config.register("fullName", {
            required: true
          })} />

        <Message severity="secondary" text="Номер телефона" />
        <InputMask
          className={handleValidStyle(config.errors.phone)}
          placeholder={"(XXX) XXX-XX-XX"}
          {...config.register("phone")}
          mask="(999) 999-99-99"
        />

        <Message
          severity={showErrorValidate(config.errors.faculty)}
          text="Факультет"
          style={{ justifyContent: "end" }} />
        <InputText
          className={handleValidStyle(config.errors.faculty)}
          placeholder="Обязательно"
          {...config.register("faculty", {
            required: true
          })} />

        <Message
          severity={showErrorValidate(config.errors.specialty)}
          text="Специальность"
          style={{ justifyContent: "end" }} />
        <InputText
          className={handleValidStyle(config.errors.specialty)}
          placeholder="Обязательно"
          {...config.register("specialty", {
            required: true
          })} />

        <Message
          severity={showErrorValidate(config.errors.year)}
          text="Курс"
          style={{ justifyContent: "end" }} />
        <InputText
          className={handleValidStyle(config.errors.year)}
          placeholder="Обязательно | от 1 до 6"
          {...config.register("year", {
            required: true,
            validate: {
              checkYear: (year: number) => {
                if (year < 1 || year > 6) return "Курс должен быть в промежутке от 1 до 6";
              }
            }
          })} keyfilter="int" />

        <Message
          severity={showErrorValidate(config.errors.group)}
          text="Группа"
          style={{ justifyContent: "end" }} />
        <InputMask
          className={handleValidStyle(config.errors.year)}
          placeholder="Обязательно | AA-XXX"
          {...config.register("group", {
            required: true
          })}
          mask="aa-999" />

        <Message
          severity={showErrorValidate(config.errors.status)}
          text="Статус"
          style={{ justifyContent: "end" }} />
        <Dropdown
          className={handleValidStyle(config.errors.status)}
          placeholder="Обязательно"
          {...config.register("status", { required: true })}
          options={status} />

        <Message
          severity={showErrorValidate(config.errors.studyForm)}
          text="Форма обучения"
          style={{ justifyContent: "end" }} />
        <Dropdown
          className={handleValidStyle(config.errors.studyForm)}
          // placeholder="Обязательно"
          {...config.register("studyForm", { required: true })}
          options={studyForm} />

        <Message
          severity={showErrorValidate(config.errors.gpa)}
          text="Средний балл"
          style={{ textAlign: "right" }} />
        <InputText
          className={handleValidStyle(config.errors.gpa)}
          placeholder="От 2 до 5"
          {...config.register("gpa", {
            valueAsNumber: true,
            validate: {
              checkGpa: (gpa) => {
                if (gpa && gpa < 2 && gpa > 5) return "Средняя оценка должна быть в промежутке от 2 до 5";
                return true;
              }
            }
          })} keyfilter="int" />

        <Message
          severity={showErrorValidate(config.errors.scholarship)}
          text="Размер стипендии"
          style={{ textAlign: "right" }} />
        <InputText
          className={handleValidStyle(config.errors.scholarship)}
          {...config.register("scholarship", {
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
          placeholder={config.errors.scholarship?.message}
          keyfilter="int" />
      </fieldset>
      <footer>
        <Button label="Очистить" severity="secondary" onClick={() => {
          config.reset();
          config.clearErrors();
        }} />
        <Button label="Добавить" type="submit" disabled={!config.isValid} />
      </footer>
    </form>
  )
};

export default FormNewStudent;