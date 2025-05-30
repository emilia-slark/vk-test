import { Dialog } from "primereact/dialog";
import { PopupProps } from "./types";
import { useState } from "react";

const Popup = ({
  children,
  isActivePopup,
  setIsActivePopup
}: PopupProps) => {

    const onHidePopup = () => {
    if (!isActivePopup) return;
    setIsActivePopup(false);
  }

  return (
    <Dialog
      header="Форма заполнения"
      draggable={false}
      visible={isActivePopup}
      id="popup_new-student"
      onHide={onHidePopup}
    >
      {children}
    </Dialog>
  )
};

export default Popup;