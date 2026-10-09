"use client";

import { Check, ChevronDown, Pencil } from "lucide-react";
import type { DepartmentPreferences, MainFormData, MotivationFormData } from "@/types/registration";

type SubmitSectionProps = { mainData: MainFormData; departmentData: DepartmentPreferences; motivationData: MotivationFormData; onEdit: (index: number) => void };
const motivationKeys = ["choice1", "choice2", "choice3"] as const;

export default function SubmitSection({ mainData, departmentData, motivationData, onEdit }: SubmitSectionProps) {
  const departments = Object.values(departmentData);
  const details = [
    ["Full name", `${mainData.firstName} ${mainData.lastName}`],
    ["Email", mainData.email], ["Phone", mainData.phone],
    ["School", mainData.school === "other" ? "Other" : mainData.school.toUpperCase()],
    ["Year of study", mainData.year === "alumni" ? "Alumni" : `Year ${mainData.year}`],
    ...(mainData.instagram ? [["Instagram", mainData.instagram]] : []),
  ];
  return (
    <div className="registration-review">
      <div className="registration-review-section">
        <div className="registration-review-heading"><h3>Your details</h3><button type="button" onClick={() => onEdit(0)}><Pencil size={14} aria-hidden="true" />Edit details</button></div>
        <dl className="registration-review-details">{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </div>
      <div className="registration-review-section">
        <div className="registration-review-heading"><h3>Your departments</h3><button type="button" onClick={() => onEdit(1)}><Pencil size={14} aria-hidden="true" />Edit teams</button></div>
        <ol className="registration-review-departments">{departments.map((department, index) => <li key={department}><span>0{index + 1}</span>{department}<Check size={16} aria-label="Selected" /></li>)}</ol>
      </div>
      <div className="registration-review-section">
        <div className="registration-review-heading"><h3>Your motivation</h3><button type="button" onClick={() => onEdit(2)}><Pencil size={14} aria-hidden="true" />Edit motivation</button></div>
        {motivationKeys.map((key, index) => {
          const entry = motivationData[key];
          return <details key={key} className="registration-review-motivation" open={index === 0 ? true : undefined}><summary>{departments[index]}<ChevronDown size={16} aria-hidden="true" /></summary><dl>
            <div><dt>Expectations</dt><dd>{entry.expectations || "Not provided"}</dd></div>
            <div><dt>Experience</dt><dd>{entry.experience || "Not provided"}</dd></div>
            <div><dt>Previous work</dt><dd>{entry.work || "Not provided"}</dd></div>
          </dl></details>;
        })}
      </div>
    </div>
  );
}
