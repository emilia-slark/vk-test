import { IStudent } from "../../types"
import { Dispatch, SetStateAction } from "react"

export interface FormNewStudentProps {
  setItems: Dispatch<SetStateAction<IStudent[]>>,
  setIsActivePopup: Dispatch<SetStateAction<boolean>>
}