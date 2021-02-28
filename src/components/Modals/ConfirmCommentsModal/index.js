import React from 'react';
import ReactDom from 'react-dom';

import './styles.scss';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ConfirmCommentsModal = ({ hideModal, modalType, toggleModal, children, id, target }) => {
  if (hideModal || modalType !== 'ConfirmCommentsModal') return null;
  if ( target !== id) return null; 

  return ReactDom.createPortal(
    <>
      <div className="overLay"></div>
      <div className="confirm-modal-wrap">
        <button className="confirm-modal--closed-btn btn" onClick={() => toggleModal()}>
          <FontAwesomeIcon className="i" icon={faTimes} />
        </button>
        <div className="confirm-modal--contents">
          {children}
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default ConfirmCommentsModal;