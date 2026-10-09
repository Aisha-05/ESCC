"use client";

import Input from "@/components/auth/InputText";
import InputSelect from "@/components/auth/InputSelect";
import type { MainFormData } from "@/types/registration";
import { verifyFirstName, verifyLastName, verifyEmail, verifyPhone } from "@/utils/verify";

const schools = [
  { title: "ENSIA", value: "ensia" }, { title: "NHSM", value: "nhsm" },
  { title: "NHSAST", value: "nhsast" }, { title: "NSNN", value: "nsnn" },
  { title: "ESI", value: "esi" }, { title: "Other", value: "other" },
];
const years = [
  { title: "1st Year", value: "1" }, { title: "2nd Year", value: "2" },
  { title: "3rd Year", value: "3" }, { title: "4th Year", value: "4" },
  { title: "5th Year", value: "5" }, { title: "Alumni", value: "alumni" },
];

type BecomeMemberProps = { mainData: MainFormData; setMainData: (data: MainFormData) => void; showErrors: boolean };

export default function BecomeMember({ mainData, setMainData, showErrors }: BecomeMemberProps) {
  const update = (field: keyof MainFormData, value: string) => setMainData({ ...mainData, [field]: value });
  return (
    <div className="registration-fields">
      <Input label="First name" placeholder="Your first name" name="firstName" autoComplete="given-name" value={mainData.firstName} onChange={(e) => update("firstName", e.target.value)} verifier={verifyFirstName} necessary showErrors={showErrors} errorMessage="Enter your first name using letters." />
      <Input label="Last name" placeholder="Your last name" name="lastName" autoComplete="family-name" value={mainData.lastName} onChange={(e) => update("lastName", e.target.value)} verifier={verifyLastName} necessary showErrors={showErrors} errorMessage="Enter your last name using letters." />
      <Input label="Email address" placeholder="you@example.com" type="email" name="email" autoComplete="email" inputMode="email" value={mainData.email} onChange={(e) => update("email", e.target.value)} verifier={verifyEmail} necessary showErrors={showErrors} errorMessage="Enter a valid email address." />
      <Input label="Phone number" placeholder="0550 123 456" type="tel" name="phone" autoComplete="tel" inputMode="tel" value={mainData.phone} onChange={(e) => update("phone", e.target.value)} verifier={verifyPhone} necessary showErrors={showErrors} errorMessage="Use an Algerian number starting with 05, 06, 07, or +213." />
      <InputSelect label="School" name="school" value={mainData.school} onChange={(e) => update("school", e.target.value)} options={schools} required />
      <InputSelect label="Year of study" name="year" value={mainData.year} onChange={(e) => update("year", e.target.value)} options={years} required />
      <div className="registration-field-wide">
        <Input label="Instagram username" placeholder="@your.username" name="instagram" autoCapitalize="none" value={mainData.instagram ?? ""} onChange={(e) => update("instagram", e.target.value)} />
      </div>
    </div>
  );
}
