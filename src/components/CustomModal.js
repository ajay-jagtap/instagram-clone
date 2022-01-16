import { Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const CustomModal = (props) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <div className="modal__container">
        <div className="modal__body">
          <a href="#!" onClick={props.handleClose} className="close__uploadModal">
            <CloseIcon />
          </a>
          {props.children}
        </div>
      </div>
    </Modal>
  );
};
