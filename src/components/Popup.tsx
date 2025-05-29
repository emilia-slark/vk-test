import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";

interface IProps {
  visible: boolean,
  onHideCallback: () => void
  children: ReactElement
}

const Popup = ({
  visible, onHideCallback, children
}: IProps) => {

  return (
    <Dialog
      header="Форма заполнения"
      draggable={false}
      visible={visible}
      id="popup_new-student"
      onHide={onHideCallback}
    >
      {children}
    </Dialog>
  )
};

export default Popup;