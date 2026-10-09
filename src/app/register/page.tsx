"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, LoaderCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import RegistrationStepper from "@/components/auth/RegistrationStepper";
import BecomeMember from "@/sections/BecomeMember";
import DepartmentSelection from "@/sections/DepartmentSelection";
import MotivationSection from "@/sections/MotivationSection";
import SubmitSection from "@/sections/SubmitSection";
import ThankYou from "@/sections/ThankYou";
import { registrationSteps, useRegister } from "@/hooks/useRegister";

export default function RegisterPage() {
  const registration = useRegister();
  const { isRegistered, currPage, maxStep, completed, mainData, setMainData, departmentData, setDepartmentData, motivationData, setMotivationData, scrollPrev, scrollNext, scrollTo, canSubmit, isSubmitting, submissionError, handleSubmit } = registration;
  const [showErrors, setShowErrors] = useState(false);
  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(currPage);
  const step = registrationSteps[currPage];

  useEffect(() => {
    if (previousStep.current === currPage) return;
    previousStep.current = currPage;
    headingRef.current?.focus({ preventScroll: true });
    if (formRef.current && formRef.current.getBoundingClientRect().top < 0) {
      formRef.current.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
    }
  }, [currPage, reducedMotion]);

  const goToStep = (index: number) => {
    setDirection(index < currPage ? -1 : 1);
    setShowErrors(false);
    scrollTo(index);
  };

  const onContinue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currPage === 3) {
      void handleSubmit();
      return;
    }
    if (!completed[currPage]) {
      setShowErrors(true);
      requestAnimationFrame(() => {
        const invalidField = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
        const accordion = invalidField?.closest("details");
        if (accordion) accordion.open = true;
        invalidField?.focus();
      });
      return;
    }
    setShowErrors(false);
    setDirection(1);
    scrollNext();
  };

  return (
    <main className="registration-page">
      <div className="registration-ambient" aria-hidden="true" />
      <header className="registration-topbar">
        <Link href="/" className="registration-brand" aria-label="ESCC home">
          <Image src="/svg/misc/logo.svg" alt="" width={30} height={42} />
          <span>ESCC<span>SPORT & CULTURE CLUB</span></span>
        </Link>
        <Link className="registration-home-link" href="/"><ArrowLeft size={16} aria-hidden="true" /><span>Back to home</span></Link>
      </header>

      {isRegistered ? <ThankYou /> : (
        <div className="registration-shell">
          <article className="registration-card">
            {isRegistered === null ? (
              <div className="registration-loading" role="status"><LoaderCircle size={26} className="registration-spinner" aria-hidden="true" /><p>Getting your application ready…</p></div>
            ) : (
              <form ref={formRef} noValidate onSubmit={onContinue} aria-label="ESCC membership application" aria-busy={isSubmitting}>
                <RegistrationStepper current={currPage} maxStep={maxStep} completed={completed} disabled={isSubmitting} onSelect={goToStep} />
                <div className="registration-form-content">
                  <div className="registration-stage-caption"><span>MEMBERSHIP APPLICATION</span><span>STEP {String(currPage + 1).padStart(2, "0")} / 04</span></div>
                  <div className="registration-step-heading">
                    <h2 ref={headingRef} tabIndex={-1}>{step.title}</h2>
                    <p>{step.description}</p>
                    {currPage < 3 && <p className="registration-required-caption"><span>*</span> Required fields</p>}
                  </div>
                  <motion.div key={step.key} initial={reducedMotion ? false : { opacity: 0, x: direction * 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22, ease: "easeOut" }}>
                    <fieldset disabled={isSubmitting} className="registration-fieldset">
                      <legend className="registration-sr-only">{step.label}</legend>
                      {currPage === 0 && <BecomeMember mainData={mainData} setMainData={setMainData} showErrors={showErrors} />}
                      {currPage === 1 && <DepartmentSelection departmentData={departmentData} setDepartmentData={setDepartmentData} showErrors={showErrors} />}
                      {currPage === 2 && <MotivationSection departmentData={departmentData} motivationData={motivationData} setMotivationData={setMotivationData} showErrors={showErrors} />}
                      {currPage === 3 && <SubmitSection mainData={mainData} departmentData={departmentData} motivationData={motivationData} onEdit={goToStep} />}
                    </fieldset>
                  </motion.div>
                  {showErrors && !completed[currPage] && <p className="registration-error" role="alert">Please check the highlighted fields before continuing.</p>}
                  {submissionError && <p className="registration-error" role="alert">{submissionError}</p>}
                </div>
                <footer className="registration-form-footer">
                  {currPage > 0 ? <button type="button" className="registration-button registration-button-back" disabled={isSubmitting} onClick={() => { setDirection(-1); setShowErrors(false); scrollPrev(); }}><ArrowLeft size={17} aria-hidden="true" />Back</button> : <span className="registration-footer-note">Your next chapter<br /><strong>starts here.</strong></span>}
                  <button type="submit" className="registration-button registration-button-primary" disabled={isSubmitting || (currPage === 3 && !canSubmit)}>
                    {isSubmitting ? <><LoaderCircle size={18} className="registration-spinner" aria-hidden="true" />Sending…</> : currPage === 3 ? <>Send application<Check size={18} aria-hidden="true" /></> : <>Continue<ArrowRight size={18} aria-hidden="true" /></>}
                  </button>
                </footer>
              </form>
            )}
          </article>
        </div>
      )}
      <p className="registration-page-footer"><span>ENSIA SPORT & CULTURE CLUB</span><span className="registration-footer-dot" aria-hidden="true" /><span>Made for students. Powered by community.</span></p>
    </main>
  );
}
