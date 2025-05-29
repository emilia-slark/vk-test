import { FieldError } from "react-hook-form";
import { ToastMessage, Toast } from "primereact/toast";
import { RefObject } from "react";

export function getCurrentDateFormatted(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function tagStatus(status: string) {
  switch (status) {
    case "Академ. отпуск":
      return "warning";
    case "Отчислен":
      return "danger";
    default:
      return "info";
  }
}

export const showErrorValidate = (field: FieldError | undefined) => field ? "error" : "secondary";

export const handleValidStyle = (field: FieldError | undefined): string => field ? "p-invalid" : "";

export const showToast = (toastRef: RefObject<Toast | null>, title: ToastMessage['summary'], text: ToastMessage['detail'], severity: ToastMessage['severity']) => 
  toastRef.current?.show({ severity: severity, summary: title, detail: text, life: 3000 });