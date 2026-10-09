"use client";

import { useId, useState, type TextareaHTMLAttributes } from "react";

type InputTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; value: string; showErrors?: boolean };

export default function InputTextarea({ label, value, showErrors, required, id, onBlur, ...props }: InputTextareaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [touched, setTouched] = useState(false);
  const invalid = required && !value.trim() && (touched || showErrors);

  return (
    <div className="registration-field">
      <label htmlFor={inputId}>{label} {required ? <span className="registration-required" aria-hidden="true">*</span> : <span className="registration-optional">optional</span>}</label>
      <textarea {...props} id={inputId} value={value} rows={3} required={required} aria-invalid={!!invalid} aria-describedby={invalid ? `${inputId}-error` : undefined} onBlur={(event) => { setTouched(true); onBlur?.(event); }} />
      {invalid && <span id={`${inputId}-error`} className="registration-field-error">Tell us what you hope to gain from your first-choice department.</span>}
    </div>
  );
}
