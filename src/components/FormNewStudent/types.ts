import { Toast } from "primereact/toast"
import { IStudent } from "../../types"
import { Dispatch, RefObject, SetStateAction } from "react"

export interface FormNewStudentProps {
  setItems: Dispatch<SetStateAction<IStudent[]>>
  setIsActivePopup: Dispatch<SetStateAction<boolean>>,
  toastRef: RefObject<Toast | null>
}