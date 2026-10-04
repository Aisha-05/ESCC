"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { CarouselApi } from "@/components/ui/carousel";
import { getRegistrationStatus, postData } from "@/server/post";
import type {
  DepartmentPreferences,
  MainFormData,
  MotivationFormData,
} from "@/types/registration";
import {
  verifyDepartment,
  verifyEmail,
  verifyExpectations,
  verifyExperience,
  verifyFirstName,
  verifyLastName,
  verifyPhone,
  verifySchool,
  verifyWork,
  verifyYear,
} from "@/utils/verify";

export type StepKey = "main" | "departments" | "motivations" | "submit";

type UseRegisterReturn = {
  isRegistered: boolean | null;
  allowed: StepKey[];
  currPage: number;
  setCarouselApi: Dispatch<SetStateAction<CarouselApi | undefined>>;
  mainData: MainFormData;
  setMainData: (data: MainFormData) => void;
  departmentData: DepartmentPreferences;
  setDepartmentData: (data: DepartmentPreferences) => void;
  motivationData: MotivationFormData;
  setMotivationData: (data: MotivationFormData) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  disablePrev: boolean;
  disableNext: boolean;
  canSubmit: boolean;
  isSubmitting: boolean;
  submissionError: string | null;
  hasApplied: boolean;
  handleSubmit: () => Promise<void>;
};

export function useRegister(): UseRegisterReturn {
  const [api, setApi] = useState<CarouselApi>();
  const [currPage, setCurrPage] = useState(0);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [allowed, setAllowed] = useState<StepKey[]>(["main"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  const [mainData, setMainDataState] = useState<MainFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    school: "ensia",
    year: "1",
    instagram: "",
  });

  const [departmentData, setDepartmentDataState] = useState<DepartmentPreferences>({
    department1: "",
    department2: "",
    department3: "",
  });

  const [motivationData, setMotivationDataState] = useState<MotivationFormData>({
    choice1: { work: "", experience: "", expectations: "" },
    choice2: { work: "", experience: "", expectations: "" },
    choice3: { work: "", experience: "", expectations: "" },
  });

  useEffect(() => {
    let mounted = true;

    void getRegistrationStatus().then((registered) => {
      if (mounted) {
        setIsRegistered(registered);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!api) return;

    setCurrPage(api.selectedScrollSnap());

    const handleSelect = () => setCurrPage(api.selectedScrollSnap());

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const isMainComplete = useMemo(
    () =>
      verifyFirstName(mainData.firstName) &&
      verifyLastName(mainData.lastName) &&
      verifyEmail(mainData.email) &&
      verifyPhone(mainData.phone) &&
      verifySchool(mainData.school) &&
      verifyYear(mainData.year),
    [mainData]
  );

  const departmentsSelections = useMemo(
    () => [
      departmentData.department1,
      departmentData.department2,
      departmentData.department3,
    ],
    [departmentData]
  );

  const isDepartmentsComplete = useMemo(() => {
    if (departmentsSelections.some((selection) => !verifyDepartment(selection))) {
      return false;
    }

    const uniqueCount = new Set(departmentsSelections).size;
    return uniqueCount === departmentsSelections.length;
  }, [departmentsSelections]);

  const isMotivationsComplete = useMemo(
    () => verifyExpectations(motivationData.choice1.expectations),
    [motivationData]
  );

  const allComplete = useMemo(
    () => isMainComplete && isDepartmentsComplete && isMotivationsComplete,
    [isMainComplete, isDepartmentsComplete, isMotivationsComplete]
  );

  useEffect(() => {
    setAllowed((prev) => {
      const nextSteps: StepKey[] = ["main"];

      if (isMainComplete) {
        nextSteps.push("departments");
      }

      if (isMainComplete && isDepartmentsComplete) {
        nextSteps.push("motivations");
      }

      if (allComplete) {
        nextSteps.push("submit");
      }

      if (
        prev.length === nextSteps.length &&
        prev.every((step, index) => step === nextSteps[index])
      ) {
        return prev;
      }

      return nextSteps;
    });
  }, [allComplete, isDepartmentsComplete, isMainComplete]);

  useEffect(() => {
    if (!api) return;
    api.reInit();
  }, [api, allowed.length]);

  useEffect(() => {
    if (!api) return;
    const maxIndex = allowed.length - 1;
    if (currPage > maxIndex) {
      api.scrollTo(maxIndex);
    }
  }, [allowed.length, api, currPage]);

  const canSubmit = allComplete && !isSubmitting && !hasApplied;

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return;
    try {
      setIsSubmitting(true);
      setSubmissionError(null);
      await postData({ mainData, departmentData, motivationData });
      setHasApplied(true);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setSubmissionError("We couldn't submit your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [canSubmit, departmentData, mainData, motivationData]);

  const scrollPrev = useCallback(() => {
    if (!api) return;
    if (currPage <= 0) return;
    api.scrollPrev();
  }, [api, currPage]);

  const scrollNext = useCallback(() => {
    if (!api || allowed.length === 0) return;

    const lastIndex = allowed.length - 1;

    if (currPage < lastIndex) {
      api.scrollNext();
      return;
    }

    if (allowed[lastIndex] === "submit") {
      void handleSubmit();
    }
  }, [allowed, api, currPage, handleSubmit]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!api) return;
      if (index < 0 || index >= allowed.length) return;
      api.scrollTo(index);
    },
    [api, allowed.length]
  );

  const disablePrev = !api || currPage <= 0;

  const disableNext = useMemo(() => {
    if (!api || allowed.length === 0) return true;

    const lastIndex = allowed.length - 1;

    if (currPage < lastIndex) {
      return false;
    }

    const lastStep = allowed[lastIndex];
    if (lastStep === "submit") {
      return !canSubmit;
    }

    return true;
  }, [api, allowed, canSubmit, currPage]);

  const updateMainData = useCallback(
    (data: MainFormData) => {
      setMainDataState(data);
    },
    [setMainDataState]
  );

  const updateDepartmentData = useCallback(
    (data: DepartmentPreferences) => {
      setDepartmentDataState(data);
    },
    [setDepartmentDataState]
  );

  const updateMotivationData = useCallback(
    (data: MotivationFormData) => {
      setMotivationDataState(data);
    },
    [setMotivationDataState]
  );

  return {
    isRegistered,
    allowed,
    currPage,
    setCarouselApi: setApi,
    mainData,
    setMainData: updateMainData,
    departmentData,
    setDepartmentData: updateDepartmentData,
    motivationData,
    setMotivationData: updateMotivationData,
    scrollPrev,
    scrollNext,
    scrollTo,
    disablePrev,
    disableNext,
    canSubmit,
    isSubmitting,
    submissionError,
    hasApplied,
    handleSubmit,
  };
}
