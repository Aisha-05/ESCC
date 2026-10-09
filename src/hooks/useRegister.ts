"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getRegistrationStatus, postData } from "@/server/post";
import type { DepartmentPreferences, MainFormData, MotivationFormData } from "@/types/registration";
import { verifyDepartment, verifyEmail, verifyExpectations, verifyFirstName, verifyLastName, verifyPhone, verifySchool, verifyYear } from "@/utils/verify";

export const registrationSteps = [
  { key: "main", label: "Your details", shortLabel: "Details", title: "Let’s get to know you.", description: "A few details to get your ESCC journey started." },
  { key: "departments", label: "Departments", shortLabel: "Teams", title: "Find your people.", description: "Choose three different departments, in order of preference." },
  { key: "motivations", label: "Your motivation", shortLabel: "Motivation", title: "Tell us what moves you.", description: "Share your interests, ideas, and what you’d like to bring to the club." },
  { key: "submit", label: "Review & send", shortLabel: "Review", title: "Ready for your next chapter?", description: "Check your application below. You can still go back and make changes." },
] as const;

export function useRegister() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const submittingRef = useRef(false);

  const [mainData, setMainData] = useState<MainFormData>({ firstName: "", lastName: "", email: "", phone: "", school: "ensia", year: "1", instagram: "" });
  const [departmentData, setDepartmentData] = useState<DepartmentPreferences>({ department1: "", department2: "", department3: "" });
  const [motivationData, setMotivationData] = useState<MotivationFormData>({
    choice1: { work: "", experience: "", expectations: "" },
    choice2: { work: "", experience: "", expectations: "" },
    choice3: { work: "", experience: "", expectations: "" },
  });

  useEffect(() => {
    let mounted = true;
    void getRegistrationStatus()
      .then((registered) => { if (mounted) setIsRegistered(registered); })
      .catch(() => { if (mounted) setIsRegistered(false); });
    return () => { mounted = false; };
  }, []);

  const selections = Object.values(departmentData);
  const completed = [
    verifyFirstName(mainData.firstName) && verifyLastName(mainData.lastName) && verifyEmail(mainData.email) && verifyPhone(mainData.phone) && verifySchool(mainData.school) && verifyYear(mainData.year),
    selections.every(verifyDepartment) && new Set(selections).size === 3,
    motivationData.choice1.expectations.trim().length > 0 && verifyExpectations(motivationData.choice1.expectations),
  ];
  const firstIncomplete = completed.findIndex((complete) => !complete);
  const maxStep = firstIncomplete === -1 ? 3 : firstIncomplete;
  const currPage = Math.min(currentIndex, maxStep);
  const canSubmit = completed.every(Boolean) && !isSubmitting && !isRegistered;

  const scrollTo = (index: number) => {
    if (isSubmitting || index < 0 || index > maxStep) return;
    setCurrentIndex(index);
    setSubmissionError(null);
  };
  const scrollPrev = () => scrollTo(currPage - 1);
  const scrollNext = () => {
    if (completed[currPage]) scrollTo(currPage + 1);
  };

  const handleSubmit = useCallback(async () => {
    if (!canSubmit || submittingRef.current) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      await postData({ mainData, departmentData, motivationData });
      setIsRegistered(true);
    } catch (error) {
      console.error(error);
      setSubmissionError("We couldn’t submit your application. Your details are still here — please try again.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }, [canSubmit, mainData, departmentData, motivationData]);

  return { isRegistered, currPage, maxStep, completed, mainData, setMainData, departmentData, setDepartmentData, motivationData, setMotivationData, scrollPrev, scrollNext, scrollTo, canSubmit, isSubmitting, submissionError, handleSubmit };
}
