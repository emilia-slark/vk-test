import { IStudent } from "../../types";
import { Dispatch, SetStateAction } from "react";

export interface StudentTableProps {
  items: IStudent[],
  totalItems: number
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  isError?: boolean
}