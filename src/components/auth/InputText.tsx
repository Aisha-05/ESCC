"use client";

import { useId, useState, type InputHTMLAttributes } from "react";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value"> & {
  label: string;
  value: string;
  verifier?: (value: string) => boolean;
  necessary?: boolean;
  showErrors?: boolean;
  errorMessage?: string;
  hint?: string;
};

export default function Input({ label, value, verifier, necessary, showErrors = false, errorMessage = "Please complete this field.", hint, id, onBlur, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [touched, setTouched] = useState(false);
  const valid = (!necessary || value.trim().length > 0) && (!verifier || verifier(value));
  const invalid = !valid && (touched || showErrors);
  const description = invalid ? errorMessage : hint;

  return (
    <div className="registration-field">
      <label htmlFor={inputId}>{label} {necessary ? <span className="registration-required" aria-hidden="true">*</span> : <span className="registration-optional">optional</span>}</label>
      <input {...props} id={inputId} value={value} required={necessary} aria-invalid={invalid} aria-describedby={description ? `${inputId}-description` : undefined} onBlur={(event) => { setTouched(true); onBlur?.(event); }} />
      {description && <span id={`${inputId}-description`} className={invalid ? "registration-field-error" : "registration-field-hint"}>{description}</span>}
    </div>
  );
}
