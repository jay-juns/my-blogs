import React from 'react';
import './styles.scss';

const FormTextArea = ({ handleChange, label, formClass, ...otherProps }) => {
  return (
    <div className={formClass}>
      {label && (
        <label>
          {label}
        </label>
      )}

      <textarea className="form-textArea"  onChange={handleChange} {...otherProps} ></textarea>
    </div>
  );
}

export default FormTextArea;