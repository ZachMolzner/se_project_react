// src/hooks/useForm.js
import { useState } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = (newValues = {}) => {
    setValues(newValues);
  };

  return { values, handleChange, resetForm };
}
