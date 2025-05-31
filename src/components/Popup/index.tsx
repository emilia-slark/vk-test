import { Dialog } from "primereact/dialog";
import { PopupProps } from "./types";
import "./styles.scss";

const Popup = ({
  children,
  isActivePopup,
  setIsActivePopup,
  header
}: PopupProps) => {

    const onHidePopup = () => {
    if (!isActivePopup) return;
    setIsActivePopup(false);
  }

  return (
    <Dialog
      header={header}
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