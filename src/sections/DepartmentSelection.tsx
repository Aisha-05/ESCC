"use client";

import { Info } from "lucide-react";
import InputSelect from "@/components/auth/InputSelect";
import type { DepartmentPreferences } from "@/types/registration";

const departments = ["Sports", "Culture", "Multimedia", "Design", "Relex", "Dev", "Marketing"];
const choices = [
  { key: "department1", label: "First choice", caption: "The team you’re most excited to join." },
  { key: "department2", label: "Second choice", caption: "Another place you’d love to contribute." },
  { key: "department3", label: "Third choice", caption: "One more team that sparks your interest." },
] as const;

type DepartmentSelectionProps = { departmentData: DepartmentPreferences; setDepartmentData: (data: DepartmentPreferences) => void; showErrors: boolean };

export default function DepartmentSelection({ departmentData, setDepartmentData, showErrors }: DepartmentSelectionProps) {
  return (
    <div className="registration-departments">
      {choices.map((choice, index) => (
        <div className="registration-department-choice" key={choice.key}>
          <span className="registration-preference-number" aria-hidden="true">0{index + 1}</span>
          <div>
            <InputSelect label={choice.label} name={choice.key} value={departmentData[choice.key]} onChange={(e) => setDepartmentData({ ...departmentData, [choice.key]: e.target.value })} options={departments.filter((department) => department === departmentData[choice.key] || !Object.values(departmentData).includes(department)).map((department) => ({ title: department, value: department }))} placeholder="Choose a department" required showErrors={showErrors} />
            <p className="registration-field-hint">{choice.caption}</p>
          </div>
        </div>
      ))}
      <div className="registration-note"><Info size={18} aria-hidden="true" /><p>Put your favourite first. Each department can only be selected once.</p></div>
    </div>
  );
}
