import React from 'react';
import ReactDom from 'react-dom';
import './styles.scss';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Modal = ({ open, children, onClose }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="overLay" onClick={onClose}></div>
      <div className="modal-wrap">
        <button onClick={onClose}>
          <FontAwesomeIcon className="i" icon={faTimes} size="7x" />
        </button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default Modal;