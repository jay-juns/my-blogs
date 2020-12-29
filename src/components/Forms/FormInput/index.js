import React from 'react';
import './styles.scss';

const FormInput = ({ handleChange, label, formClass, ...otherProps }) => {
  return (
    <section className={formClass}>
      {label && (
        <label>
          {label}
        </label>
      )}

      <input className="formInput" onChange={handleChange} {...otherProps} />
    </section>
  );
}

export default FormInput;