import React from 'react';
import ReactDom from 'react-dom';
import './styles.scss';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Modal = ({ hideModal, modalType, toggleModal, children }) => {
  if (hideModal || modalType !== 'modal') return null;

  return ReactDom.createPortal(
    <>
      <div className="overLay" onClick={() => toggleModal()}></div>
      <div className="modal-wrap">
        <button className="closed-btn btn" onClick={() => toggleModal()}>
          <FontAwesomeIcon className="i" icon={faTimes} />
        </button>
        <div className="modal-contents">
          {children}
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default Modal;