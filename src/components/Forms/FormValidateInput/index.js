import React from 'react';
import { ErrorMessage, useField } from 'formik';
import './styles.scss';

const FormValidateInput = ({ 
  handleChange, 
  label, 
  ...otherProps }) => {
  
  const [field, meta] = useField(otherProps);
  
  return (
    <section className="formValidationSelection">
      {label && (
        <label className="formValidationTitle">
          {label}
        </label>
      )}
      <input 
        className={`formValidationInput ${meta.touched && meta.error && 'is-invalid'}`} 
        onChange={handleChange}
        {...field} {...otherProps}
        autoComplete="off" 
      />
      <ErrorMessage component="p" name={field.name} className="formValidationError" />
    </section>
  );
}

export default FormValidateInput;