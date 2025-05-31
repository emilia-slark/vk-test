import { FieldError } from "react-hook-form";
import { ToastMessage, Toast } from "primereact/toast";
import { RefObject } from "react";
import { AxiosErrorInfo } from "../types";
import axios from "axios";
import { _ErrorMessage } from "../constants";

export function handleErrorRequest(error: unknown): AxiosErrorInfo {
  let customError: AxiosErrorInfo;

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    switch (status) {
      case 401:
        customError = { type: 'unauthorized', status, message: _ErrorMessage.forbidden };
        break;
      case 403:
        customError = { type: 'forbidden', status, message: _ErrorMessage.forbidden };
        break;
      case 404:
        customError = { type: 'notfound', status, message: _ErrorMessage.notfound };
        break;
      case 500:
        customError = { type: 'server', status, message: _ErrorMessage.server };
        break;
      default:
        if (error.code === 'ECONNABORTED')
          customError = { type: 'timeout', message: _ErrorMessage.timeout };
        else if (error.request)
          customError = { type: 'network', message: _ErrorMessage.network };
        else
          customError = { type: 'unknown', message: error.message };
    }
  } else if (error instanceof Error)
    customError = { type: 'unknown', message: error.message };
  else
    customError = { type: 'unknown', message: _ErrorMessage.unknown };

  return customError;
}

export function getCurrentDateFormatted(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const showErrorValidate = (field: FieldError | undefined) => field ? "error" : "secondary";

export const handleValidStyle = (field: FieldError | undefined): string => field ? "p-invalid" : "";

export const showToast = (toastRef: RefObject<Toast | null>, title: ToastMessage['summary'], text: ToastMessage['detail'], severity: ToastMessage['severity']) =>
  toastRef.current?.show({ severity: severity, summary: title, detail: text, life: 5000 });