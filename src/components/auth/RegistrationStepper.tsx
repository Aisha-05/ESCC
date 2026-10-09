import { Check } from "lucide-react";
import { registrationSteps } from "@/hooks/useRegister";

type RegistrationStepperProps = { current: number; maxStep: number; completed: boolean[]; disabled: boolean; onSelect: (index: number) => void };

export default function RegistrationStepper({ current, maxStep, completed, disabled, onSelect }: RegistrationStepperProps) {
  return (
    <nav className="registration-stepper" aria-label="Registration progress">
      <ol>
        {registrationSteps.map((step, index) => (
          <li key={step.key} data-active={current === index} data-complete={completed[index] ?? false}>
            <button type="button" onClick={() => onSelect(index)} disabled={disabled || index > maxStep} aria-current={index === current ? "step" : undefined} aria-label={`Step ${index + 1}: ${step.label}${completed[index] ? ", complete" : index > maxStep ? ", complete the previous steps first" : ""}`}>
              <span className="registration-step-number">{completed[index] && index !== current ? <Check size={18} aria-hidden="true" /> : String(index + 1).padStart(2, "0")}</span>
              <span className="registration-step-label">{step.label}</span>
              <span className="registration-step-short-label">{step.shortLabel}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
