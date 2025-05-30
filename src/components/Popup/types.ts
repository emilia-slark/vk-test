import { Dispatch, ReactElement, SetStateAction } from "react"

export interface PopupProps {
  children: ReactElement,
  isActivePopup: boolean,
  setIsActivePopup: Dispatch<SetStateAction<boolean>>
}
