"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState, type SelectHTMLAttributes } from "react";

type SelectOption = { title: string; value: string };
type InputSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "value"> & {
  label: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  showErrors?: boolean;
};

export default function InputSelect({ label, value, options, placeholder, showErrors, required, id, onBlur, ...props }: InputSelectProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [touched, setTouched] = useState(false);
  const invalid = required && !value && (touched || showErrors);

  return (
    <div className="registration-field">
      <label htmlFor={inputId}>{label} {required && <span className="registration-required" aria-hidden="true">*</span>}</label>
      <div className="registration-select">
        <select {...props} id={inputId} value={value} required={required} aria-invalid={!!invalid} aria-describedby={invalid ? `${inputId}-error` : undefined} onBlur={(event) => { setTouched(true); onBlur?.(event); }}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option) => <option key={option.value} value={option.value}>{option.title}</option>)}
        </select>
        <ChevronDown size={18} aria-hidden="true" />
      </div>
      {invalid && <span id={`${inputId}-error`} className="registration-field-error">Please select a department.</span>}
    </div>
  );
}
