import React from 'react';
import ReactDom from 'react-dom';
import './styles.scss';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Modal = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;

  return ReactDom.createPortal(
    <>
      <div className="overLay" onClick={() => toggleModal()}></div>
      <div className="modal-wrap">
        <button className="closed-btn" onClick={() => toggleModal()}>
          <FontAwesomeIcon className="i" icon={faTimes} size="2x" />
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