"use client";

import { ChevronDown } from "lucide-react";
import Input from "@/components/auth/InputText";
import InputTextarea from "@/components/auth/InputTextarea";
import type { DepartmentPreferences, MotivationEntry, MotivationFormData } from "@/types/registration";

const choices = [
  { key: "choice1", department: "department1", label: "First choice", required: true },
  { key: "choice2", department: "department2", label: "Second choice", required: false },
  { key: "choice3", department: "department3", label: "Third choice", required: false },
] as const;

type MotivationSectionProps = { motivationData: MotivationFormData; departmentData: DepartmentPreferences; setMotivationData: (data: MotivationFormData) => void; showErrors: boolean };

export default function MotivationSection({ motivationData, departmentData, setMotivationData, showErrors }: MotivationSectionProps) {
  const update = (choice: keyof MotivationFormData, field: keyof MotivationEntry, value: string) => setMotivationData({ ...motivationData, [choice]: { ...motivationData[choice], [field]: value } });
  return (
    <div className="registration-motivations">
      {choices.map((choice, index) => (
        <details className="registration-motivation" key={choice.key} open={index === 0 ? true : undefined}>
          <summary>
            <span className="registration-preference-number" aria-hidden="true">0{index + 1}</span>
            <span><span className="registration-choice-label">{choice.label}</span><strong>{departmentData[choice.department]}</strong></span>
            {!choice.required && <span className="registration-optional">optional</span>}
            <ChevronDown size={18} aria-hidden="true" />
          </summary>
          <div className="registration-motivation-fields">
            <InputTextarea label="What do you hope to gain or contribute?" name={`${choice.key}-expectations`} placeholder="Tell us what you’re looking forward to…" value={motivationData[choice.key].expectations} onChange={(e) => update(choice.key, "expectations", e.target.value)} required={choice.required} showErrors={showErrors} />
            <InputTextarea label="Relevant experience" name={`${choice.key}-experience`} placeholder="Any projects, activities, or skills you’d like to share?" value={motivationData[choice.key].experience} onChange={(e) => update(choice.key, "experience", e.target.value)} />
            <Input label="Link to your work" name={`${choice.key}-work`} placeholder="Portfolio, project, or social profile" inputMode="url" autoCapitalize="none" value={motivationData[choice.key].work} onChange={(e) => update(choice.key, "work", e.target.value)} />
          </div>
        </details>
      ))}
      <p className="registration-field-hint">No experience needed. Curiosity and a willingness to get involved are a great start.</p>
    </div>
  );
}
