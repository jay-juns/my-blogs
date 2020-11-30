import React from 'react';
import './styles.scss';

const FormInput = ({ handleChange, label, formClass, ...otherProps }) => {
  return (
    <div className={formClass}>
      {label && (
        <label>
          {label}
        </label>
      )}

      <input className="formInput"  onChange={handleChange} {...otherProps} />
    </div>
  );
}

export default FormInput;